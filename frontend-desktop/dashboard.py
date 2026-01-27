from PyQt5.QtWidgets import (
    QWidget, QLabel, QPushButton,
    QVBoxLayout, QHBoxLayout,
    QFrame, QListWidget,
    QMessageBox, QFileDialog,
    QTableWidget, QTableWidgetItem
)

from PyQt5.QtCore import Qt
import requests

from matplotlib.backends.backend_qt5agg import FigureCanvasQTAgg
from matplotlib.figure import Figure


# ==========================
# MATPLOTLIB CANVAS
# ==========================
class ChartCanvas(FigureCanvasQTAgg):
    def __init__(self, width=4, height=3):
        fig = Figure(figsize=(width, height))
        self.ax = fig.add_subplot(111)
        super().__init__(fig)


class DashboardWindow(QWidget):
    def __init__(self, token, email):
        super().__init__()

        self.token = token
        self.email = email

        self.setWindowTitle("Chemical Equipment Visualizer")
        self.setMinimumSize(1200, 750)

        self.init_ui()
        self.load_history()
    
    def update_table(self, rows):
        self.table.setRowCount(len(rows))

        for row_index, row in enumerate(rows):
            self.table.setItem(
                row_index, 0,
                QTableWidgetItem(str(row["equipmentName"]))
            )
            self.table.setItem(
                row_index, 1,
                QTableWidgetItem(str(row["type"]))
            )
            self.table.setItem(
                row_index, 2,
                QTableWidgetItem(str(row["flowrate"]))
            )
            self.table.setItem(
                row_index, 3,
                QTableWidgetItem(str(row["pressure"]))
            )
            self.table.setItem(
                row_index, 4,
                QTableWidgetItem(str(row["temperature"]))
            )


    # ==========================
    # UI
    # ==========================
    def init_ui(self):
        main_layout = QVBoxLayout()

        # ---------------- HEADER ----------------
        header = QHBoxLayout()

        title = QLabel("Chemical Equipment Visualizer")
        title.setStyleSheet("font-size:22px;font-weight:700;")

        user_label = QLabel(f"👤 {self.email}")
        logout_btn = QPushButton("Sign Out")
        logout_btn.clicked.connect(self.logout)

        header.addWidget(title)
        header.addStretch()
        header.addWidget(user_label)
        header.addWidget(logout_btn)

        main_layout.addLayout(header)

        # ---------------- BODY ----------------
        body = QHBoxLayout()

        # LEFT PANEL
        left = QVBoxLayout()

        upload_btn = QPushButton("Upload CSV")
        pdf_btn = QPushButton("Download PDF Report")
        pdf_btn.setFixedHeight(40)
        pdf_btn.clicked.connect(self.download_pdf)

        upload_btn.setFixedHeight(42)
        upload_btn.clicked.connect(self.upload_csv)

        self.stats_label = QLabel("Upload CSV to view analytics")
        self.stats_label.setWordWrap(True)
        self.stats_label.setStyleSheet("padding:10px;background:#f5f6f8;border-radius:6px;")

        left.addWidget(upload_btn)
        left.addWidget(pdf_btn)
        left.addWidget(self.stats_label)
        left.addStretch()

        left_frame = QFrame()
        left_frame.setLayout(left)
        left_frame.setFrameShape(QFrame.StyledPanel)

        # RIGHT PANEL
        right = QVBoxLayout()

        history_label = QLabel("Upload History")
        history_label.setStyleSheet("font-size:16px;font-weight:600;")

        self.history_list = QListWidget()
        self.history_list.itemClicked.connect(self.load_selected_dataset)

        right.addWidget(history_label)
        right.addWidget(self.history_list)

        right_frame = QFrame()
        right_frame.setLayout(right)
        right_frame.setFrameShape(QFrame.StyledPanel)

        body.addWidget(left_frame, 1)
        body.addWidget(right_frame, 1)

        main_layout.addLayout(body)

        # ---------------- CHART GRID ----------------
        charts_layout = QHBoxLayout()

        self.chart_type = ChartCanvas(5, 4)
        self.chart_avg_type = ChartCanvas(5, 4)
        self.chart_top10 = ChartCanvas(5, 4)
        self.chart_sorted = ChartCanvas(5, 4)

        charts_layout.addWidget(self.chart_type)
        charts_layout.addWidget(self.chart_avg_type)
        charts_layout.addWidget(self.chart_top10)
        charts_layout.addWidget(self.chart_sorted)

        main_layout.addLayout(charts_layout)


        self.setLayout(main_layout)

        # ---------------- DATA TABLE ----------------
        table_label = QLabel("Equipment Data Table")
        table_label.setStyleSheet("font-size:16px;font-weight:600;")

        self.table = QTableWidget()
        self.table.setColumnCount(5)
        self.table.setHorizontalHeaderLabels([
            "Equipment Name",
            "Type",
            "Flowrate",
            "Pressure",
            "Temperature"
        ])

        self.table.horizontalHeader().setStretchLastSection(True)
        self.table.setAlternatingRowColors(True)

        main_layout.addWidget(table_label)
        main_layout.addWidget(self.table)


    # ==========================
    # CSV UPLOAD
    # ==========================
    def upload_csv(self):
        file_path, _ = QFileDialog.getOpenFileName(
            self, "Select CSV", "", "CSV Files (*.csv)"
        )

        if not file_path:
            return

        try:
            with open(file_path, "rb") as f:
                response = requests.post(
                    "http://127.0.0.1:8000/api/upload/",
                    headers={"Authorization": f"Token {self.token}"},
                    files={"file": f}
                )

            if response.status_code != 201:
                QMessageBox.warning(self, "Error", response.text)
                return

            data = response.json()
            self.current_dataset_id = data["id"]

            self.stats_label.setText(
                f"""
<b>Total Equipment:</b> {data['total_equipment']}<br>
<b>Avg Flowrate:</b> {data['avg_flowrate']:.2f}<br>
<b>Avg Pressure:</b> {data['avg_pressure']:.2f}<br>
<b>Avg Temperature:</b> {data['avg_temperature']:.2f}
"""
            )

            self.draw_charts(data)
            self.update_table(data["data"])
            self.load_history()

        except Exception as e:
            QMessageBox.critical(self, "Error", str(e))

    # ==========================
    # DRAW ALL 4 CHARTS
    # ==========================
    def draw_charts(self, data):
        equipment = data["data"]

        # ===============================
        # 1️⃣ EQUIPMENT TYPE DISTRIBUTION
        # ===============================
        self.chart_type.ax.clear()
        types = data["type_distribution"]

        self.chart_type.ax.pie(
            types.values(),
            labels=types.keys(),
            autopct="%1.1f%%",
            startangle=90
        )
        self.chart_type.ax.set_title("Equipment Type Distribution")
        self.chart_type.draw()

        # =====================================
        # 2️⃣ AVERAGE PARAMETERS BY TYPE
        # =====================================
        from collections import defaultdict

        type_groups = defaultdict(list)

        for e in equipment:
            type_groups[e["type"]].append(e)

        types = []
        avg_flow = []
        avg_pressure = []
        avg_temp = []

        for t, items in type_groups.items():
            types.append(t)
            avg_flow.append(sum(i["flowrate"] for i in items) / len(items))
            avg_pressure.append(sum(i["pressure"] for i in items) / len(items))
            avg_temp.append(sum(i["temperature"] for i in items) / len(items))

        x = range(len(types))

        self.chart_avg_type.ax.clear()
        self.chart_avg_type.ax.bar(x, avg_flow, width=0.25, label="Flowrate")
        self.chart_avg_type.ax.bar(
            [i + 0.25 for i in x], avg_pressure, width=0.25, label="Pressure"
        )
        self.chart_avg_type.ax.bar(
            [i + 0.5 for i in x], avg_temp, width=0.25, label="Temperature"
        )

        self.chart_avg_type.ax.set_xticks([i + 0.25 for i in x])
        self.chart_avg_type.ax.set_xticklabels(types, rotation=30)
        self.chart_avg_type.ax.set_title("Average Parameters by Type")
        self.chart_avg_type.ax.legend()
        self.chart_avg_type.draw()

        # =====================================
        # 3️⃣ TOP 10 EQUIPMENT PARAMETERS
        # =====================================
        top10 = equipment[:10]

        names = [e["equipmentName"] for e in top10]
        flow = [e["flowrate"] for e in top10]
        pressure = [e["pressure"] for e in top10]
        temp = [e["temperature"] for e in top10]

        x = range(len(names))

        self.chart_top10.ax.clear()
        self.chart_top10.ax.bar(x, flow, width=0.25, label="Flowrate")
        self.chart_top10.ax.bar(
            [i + 0.25 for i in x], pressure, width=0.25, label="Pressure"
        )
        self.chart_top10.ax.bar(
            [i + 0.5 for i in x], temp, width=0.25, label="Temperature"
        )

        self.chart_top10.ax.set_xticks([i + 0.25 for i in x])
        self.chart_top10.ax.set_xticklabels(names, rotation=30)
        self.chart_top10.ax.set_title("Top 10 Equipment Parameters")
        self.chart_top10.ax.legend()
        self.chart_top10.draw()

        # =====================================
        # 4️⃣ SORTED PARAMETER DISTRIBUTION
        # =====================================
        sorted_eq = sorted(equipment, key=lambda x: x["flowrate"])

        flow_sorted = [e["flowrate"] for e in sorted_eq]
        pressure_sorted = [e["pressure"] for e in sorted_eq]

        self.chart_sorted.ax.clear()
        self.chart_sorted.ax.plot(flow_sorted, label="Flowrate", marker="o")
        self.chart_sorted.ax.plot(pressure_sorted, label="Pressure", marker="o")

        self.chart_sorted.ax.set_title("Parameter Distribution (Sorted by Flowrate)")
        self.chart_sorted.ax.legend()
        self.chart_sorted.draw()


    def download_pdf(self):
        if not hasattr(self, "current_dataset_id"):
            QMessageBox.warning(
                self,
                "No Dataset",
                "Please upload or select a dataset first."
            )
            return

        save_path, _ = QFileDialog.getSaveFileName(
            self,
            "Save PDF",
            f"equipment_report_{self.current_dataset_id}.pdf",
            "PDF Files (*.pdf)"
        )

        if not save_path:
            return

        try:
            response = requests.get(
                f"http://127.0.0.1:8000/api/pdf/{self.current_dataset_id}/",
                headers={
                    "Authorization": f"Token {self.token}"
                }
            )

            if response.status_code != 200:
                QMessageBox.warning(
                    self,
                    "Error",
                    "Failed to generate PDF"
                )
                return

            with open(save_path, "wb") as f:
                f.write(response.content)

            QMessageBox.information(
                self,
                "Success",
                "PDF downloaded successfully!"
            )

        except Exception as e:
            QMessageBox.critical(self, "Error", str(e))

    # ==========================
    # HISTORY
    # ==========================
    def load_history(self):
        try:
            response = requests.get(
                "http://127.0.0.1:8000/api/history/",
                headers={"Authorization": f"Token {self.token}"}
            )

            if response.status_code != 200:
                return

            self.history_list.clear()
            for d in response.json():
                self.history_list.addItem(
                    f"{d['fileName']} | {d['total_equipment']} items"
                )

        except:
            pass

    def load_selected_dataset(self, item):
        index = self.history_list.row(item)

        try:
            response = requests.get(
                "http://127.0.0.1:8000/api/history/",
                headers={"Authorization": f"Token {self.token}"}
            )

            datasets = response.json()
            dataset = datasets[index]
            self.current_dataset_id = dataset["id"]

            # update stats
            self.stats_label.setText(
                f"""
    <b>Total Equipment:</b> {dataset['total_equipment']}<br>
    <b>Avg Flowrate:</b> {dataset['avg_flowrate']:.2f}<br>
    <b>Avg Pressure:</b> {dataset['avg_pressure']:.2f}<br>
    <b>Avg Temperature:</b> {dataset['avg_temperature']:.2f}
    """
            )

            # redraw charts
            self.draw_charts(dataset)

        except Exception as e:
            QMessageBox.warning(self, "Error", str(e))


    # ==========================
    # LOGOUT
    # ==========================
    def logout(self):
        try:
            import os
            if os.path.exists("token.txt"):
                os.remove("token.txt")
        except:
            pass

        self.close()