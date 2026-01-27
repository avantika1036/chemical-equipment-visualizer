from PyQt5.QtWidgets import (
    QWidget, QLabel, QPushButton,
    QVBoxLayout, QHBoxLayout,
    QFrame, QListWidget,
    QMessageBox, QFileDialog
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

        self.type_chart = ChartCanvas()
        self.flow_chart = ChartCanvas()
        self.pressure_chart = ChartCanvas()
        self.temp_chart = ChartCanvas()

        charts_layout.addWidget(self.type_chart)
        charts_layout.addWidget(self.flow_chart)
        charts_layout.addWidget(self.pressure_chart)
        charts_layout.addWidget(self.temp_chart)

        main_layout.addLayout(charts_layout)

        self.setLayout(main_layout)

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
            self.load_history()

        except Exception as e:
            QMessageBox.critical(self, "Error", str(e))

    # ==========================
    # DRAW ALL 4 CHARTS
    # ==========================
    def draw_charts(self, data):

        # 1️⃣ TYPE DISTRIBUTION (PIE)
        self.type_chart.ax.clear()
        labels = list(data["type_distribution"].keys())
        values = list(data["type_distribution"].values())
        self.type_chart.ax.pie(values, labels=labels, autopct="%1.1f%%")
        self.type_chart.ax.set_title("Equipment Types")
        self.type_chart.draw()

        # 2️⃣ FLOWRATE BAR
        self.flow_chart.ax.clear()
        flows = [r["flowrate"] for r in data["data"]]
        self.flow_chart.ax.bar(range(len(flows)), flows)
        self.flow_chart.ax.set_title("Flowrate")
        self.flow_chart.draw()

        # 3️⃣ PRESSURE BAR
        self.pressure_chart.ax.clear()
        pressures = [r["pressure"] for r in data["data"]]
        self.pressure_chart.ax.bar(range(len(pressures)), pressures)
        self.pressure_chart.ax.set_title("Pressure")
        self.pressure_chart.draw()

        # 4️⃣ TEMPERATURE LINE
        self.temp_chart.ax.clear()
        temps = [r["temperature"] for r in data["data"]]
        self.temp_chart.ax.plot(temps, marker="o")
        self.temp_chart.ax.set_title("Temperature Trend")
        self.temp_chart.draw()

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
