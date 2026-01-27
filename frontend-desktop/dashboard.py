from PyQt5.QtWidgets import (
    QWidget, QLabel, QPushButton,
    QVBoxLayout, QHBoxLayout, QGridLayout,
    QFrame, QListWidget,
    QMessageBox, QFileDialog,
    QTableWidget, QTableWidgetItem,
    QScrollArea, QGraphicsDropShadowEffect, QSizePolicy
)

from PyQt5.QtCore import Qt, QSize
from PyQt5.QtGui import QFont
import requests

from matplotlib.backends.backend_qt5agg import FigureCanvasQTAgg
from matplotlib.figure import Figure
import matplotlib.pyplot as plt

from styles import *


# ==========================
# MATPLOTLIB CANVAS
# ==========================
class ChartCanvas(FigureCanvasQTAgg):
    def __init__(self, width=6.2, height=4.5):
        fig = Figure(figsize=(width, height), facecolor='white', dpi=105)
        self.ax = fig.add_subplot(111)
        self.ax.set_facecolor('#FAFBFC')
        super().__init__(fig)
        
        # Style the figure with more padding
        fig.tight_layout(pad=3.2)
        self.setMinimumSize(500, 380)


class DashboardWindow(QWidget):
    def __init__(self, token, email):
        super().__init__()

        self.token = token
        self.email = email

        self.setWindowTitle("Chemical Equipment Visualizer - Dashboard")
        self.setMinimumSize(1920, 1080)
        self.showMaximized()

        self.setStyleSheet(GLOBAL_STYLE)
        self.init_ui()
        self.load_history()
    
    def update_table(self, rows):
        self.table.setRowCount(len(rows))

        for row_index, row in enumerate(rows):
            self.table.setItem(row_index, 0, QTableWidgetItem(str(row["equipmentName"])))
            self.table.setItem(row_index, 1, QTableWidgetItem(str(row["type"])))
            self.table.setItem(row_index, 2, QTableWidgetItem(str(row["flowrate"])))
            self.table.setItem(row_index, 3, QTableWidgetItem(str(row["pressure"])))
            self.table.setItem(row_index, 4, QTableWidgetItem(str(row["temperature"])))

    # ==========================
    # UI
    # ==========================
    def init_ui(self):
        # Main horizontal layout: SIDEBAR + MAIN CONTENT
        main_layout = QHBoxLayout()
        main_layout.setSpacing(0)
        main_layout.setContentsMargins(0, 0, 0, 0)

        # ==================== LEFT SIDEBAR ====================
        sidebar = QFrame()
        sidebar.setStyleSheet(f"""
            QFrame {{
                background-color: {NEUTRAL_DARK};
                border: none;
            }}
        """)
        sidebar.setFixedWidth(360)
        
        sidebar_layout = QVBoxLayout()
        sidebar_layout.setSpacing(20)
        sidebar_layout.setContentsMargins(24, 30, 24, 30)

        # Sidebar Title
        sidebar_title = QLabel("📊 Control Panel")
        sidebar_title.setStyleSheet(f"""
            QLabel {{
                color: white;
                font-size: 30px;
                font-weight: 700;
                padding: 20px 14px;
                background-color: {PRIMARY_MAIN};
                border-radius: 12px;
            }}
        """)
        sidebar_title.setAlignment(Qt.AlignCenter)

        # Upload Button
        upload_btn = QPushButton("📤 Upload CSV")
        upload_btn.setMinimumHeight(75)
        upload_btn.setCursor(Qt.PointingHandCursor)
        upload_btn.setStyleSheet(f"""
            QPushButton {{
                background-color: {SECONDARY_MAIN};
                color: white;
                border: none;
                border-radius: 14px;
                padding: 22px 26px;
                font-size: 24px;
                font-weight: 700;
                letter-spacing: 0.5px;
            }}
            QPushButton:hover {{
                background-color: {SECONDARY_LIGHT};
                transform: scale(1.02);
            }}
            QPushButton:pressed {{
                background-color: {SECONDARY_DARK};
            }}
        """)
        upload_btn.clicked.connect(self.upload_csv)

        # PDF Button
        pdf_btn = QPushButton("📄 Download PDF")
        pdf_btn.setMinimumHeight(75)
        pdf_btn.setCursor(Qt.PointingHandCursor)
        pdf_btn.setStyleSheet(f"""
            QPushButton {{
                background-color: {ACCENT_MAIN};
                color: white;
                border: none;
                border-radius: 14px;
                padding: 22px 26px;
                font-size: 24px;
                font-weight: 700;
                letter-spacing: 0.5px;
            }}
            QPushButton:hover {{
                background-color: {ACCENT_LIGHT};
                transform: scale(1.02);
            }}
            QPushButton:pressed {{
                background-color: {ACCENT_DARK};
            }}
        """)
        pdf_btn.clicked.connect(self.download_pdf)

        # Summary Section
        summary_header = QLabel("📈 Summary")
        summary_header.setStyleSheet(f"""
            QLabel {{
                color: white;
                font-size: 26px;
                font-weight: 700;
                padding: 14px 10px;
            }}
        """)

        self.stats_label = QLabel("📁 Upload CSV\nto view statistics")
        self.stats_label.setWordWrap(True)
        self.stats_label.setAlignment(Qt.AlignLeft | Qt.AlignTop)
        self.stats_label.setStyleSheet(f"""
            QLabel {{
                padding: 24px;
                background-color: {NEUTRAL_DARKEST};
                border: 2px solid {SECONDARY_MAIN};
                border-radius: 12px;
                font-size: 21px;
                color: white;
                line-height: 2.4;
            }}
        """)
        self.stats_label.setMinimumHeight(210)

        # History Section
        history_header = QLabel("📜 Upload History")
        history_header.setStyleSheet(f"""
            QLabel {{
                color: white;
                font-size: 26px;
                font-weight: 700;
                padding: 14px 10px;
            }}
        """)

        self.history_list = QListWidget()
        self.history_list.setStyleSheet(f"""
            QListWidget {{
                background-color: {NEUTRAL_DARKEST};
                border: 2px solid {PRIMARY_MAIN};
                border-radius: 10px;
                padding: 12px;
                font-size: 18px;
                color: white;
            }}
            QListWidget::item {{
                padding: 18px;
                border-radius: 8px;
                margin: 6px 0px;
                background-color: {NEUTRAL_DARK};
                border: 1px solid {NEUTRAL_MEDIUM};
            }}
            QListWidget::item:selected {{
                background-color: {SECONDARY_MAIN};
                color: white;
                border: 2px solid {SECONDARY_LIGHT};
            }}
            QListWidget::item:hover {{
                background-color: {PRIMARY_MAIN};
                color: white;
                border: 2px solid {PRIMARY_LIGHT};
            }}
        """)
        self.history_list.itemClicked.connect(self.load_selected_dataset)

        # Add all to sidebar
        sidebar_layout.addWidget(sidebar_title)
        sidebar_layout.addWidget(upload_btn)
        sidebar_layout.addWidget(pdf_btn)
        sidebar_layout.addWidget(summary_header)
        sidebar_layout.addWidget(self.stats_label)
        sidebar_layout.addWidget(history_header)
        sidebar_layout.addWidget(self.history_list)

        sidebar.setLayout(sidebar_layout)

        # ==================== MAIN CONTENT AREA ====================
        content_area = QFrame()
        content_area.setStyleSheet(f"""
            QFrame {{
                background-color: {NEUTRAL_LIGHTEST};
                border: none;
            }}
        """)
        
        content_layout = QVBoxLayout()
        content_layout.setSpacing(20)
        content_layout.setContentsMargins(30, 30, 30, 30)

        # Header
        header_frame = QFrame()
        header_frame.setStyleSheet(f"""
            QFrame {{
                background: qlineargradient(
                    x1:0, y1:0, x2:1, y2:0,
                    stop:0 {PRIMARY_MAIN},
                    stop:1 {SECONDARY_MAIN}
                );
                border-radius: 16px;
            }}
        """)
        header_frame.setMaximumHeight(100)
        
        header_layout = QHBoxLayout()
        header_layout.setContentsMargins(30, 20, 30, 20)

        header_title = QLabel("🧪 Chemical Equipment Visualizer")
        header_title.setStyleSheet("""
            QLabel {
                color: white;
                font-size: 42px;
                font-weight: 700;
                letter-spacing: 0.5px;
            }
        """)

        user_label = QLabel(f"👤 {self.email}")
        user_label.setStyleSheet(f"""
            QLabel {{
                color: white;
                font-size: 21px;
                font-weight: 600;
                padding: 16px 30px;
                background-color: rgba(255, 255, 255, 0.2);
                border-radius: 26px;
            }}
        """)

        logout_btn = QPushButton("🚪 Sign Out")
        logout_btn.setMinimumHeight(58)
        logout_btn.setCursor(Qt.PointingHandCursor)
        logout_btn.setStyleSheet(f"""
            QPushButton {{
                background-color: {ALERT_MAIN};
                color: white;
                border: none;
                border-radius: 14px;
                padding: 18px 38px;
                font-size: 21px;
                font-weight: 700;
            }}
            QPushButton:hover {{
                background-color: {ALERT_LIGHT};
            }}
            QPushButton:pressed {{
                background-color: {ALERT_DARK};
            }}
        """)
        logout_btn.clicked.connect(self.logout)

        header_layout.addWidget(header_title)
        header_layout.addStretch()
        header_layout.addWidget(user_label)
        header_layout.addWidget(logout_btn)

        header_frame.setLayout(header_layout)
        content_layout.addWidget(header_frame)

        # Charts Section Header
        charts_header = QLabel("📊 Data Visualizations")
        charts_header.setStyleSheet(f"""
            QLabel {{
                color: {PRIMARY_MAIN};
                font-size: 34px;
                font-weight: 700;
                padding: 10px 0px;
            }}
        """)
        content_layout.addWidget(charts_header)

        # Charts Grid (2x2)
        charts_grid = QGridLayout()
        charts_grid.setSpacing(18)

        # Create 4 charts
        self.chart_type = ChartCanvas(6.2, 4.5)
        self.chart_avg_type = ChartCanvas(6.2, 4.5)
        self.chart_top10 = ChartCanvas(6.2, 4.5)
        self.chart_sorted = ChartCanvas(6.2, 4.5)

        # Create chart frames
        chart1_frame = self.create_chart_card(self.chart_type)
        chart2_frame = self.create_chart_card(self.chart_avg_type)
        chart3_frame = self.create_chart_card(self.chart_top10)
        chart4_frame = self.create_chart_card(self.chart_sorted)

        charts_grid.addWidget(chart1_frame, 0, 0)
        charts_grid.addWidget(chart2_frame, 0, 1)
        charts_grid.addWidget(chart3_frame, 1, 0)
        charts_grid.addWidget(chart4_frame, 1, 1)

        content_layout.addLayout(charts_grid, 1)

        # Table Section
        table_header = QLabel("📋 Equipment Data Table")
        table_header.setStyleSheet(f"""
            QLabel {{
                color: {PRIMARY_MAIN};
                font-size: 34px;
                font-weight: 700;
                padding: 10px 0px;
            }}
        """)
        content_layout.addWidget(table_header)

        table_frame = QFrame()
        table_frame.setStyleSheet(f"""
            QFrame {{
                background-color: white;
                border-radius: 16px;
                border: 2px solid {NEUTRAL_LIGHT};
                padding: 18px;
            }}
        """)
        table_frame.setMaximumHeight(240)
        
        table_layout = QVBoxLayout()
        table_layout.setContentsMargins(12, 12, 12, 12)

        self.table = QTableWidget()
        self.table.setColumnCount(5)
        self.table.setHorizontalHeaderLabels([
            "Equipment Name", "Type", "Flowrate", "Pressure", "Temperature"
        ])

        self.table.horizontalHeader().setStretchLastSection(True)
        self.table.setAlternatingRowColors(True)
        self.table.setStyleSheet(f"""
            QTableWidget {{
                background-color: white;
                border: none;
                border-radius: 8px;
                gridline-color: {NEUTRAL_LIGHT};
                font-size: 21px;
            }}
            QTableWidget::item {{
                padding: 16px;
            }}
            QTableWidget::item:selected {{
                background-color: {PRIMARY_LIGHT};
                color: white;
            }}
            QHeaderView::section {{
                background-color: {PRIMARY_MAIN};
                color: white;
                padding: 19px;
                border: none;
                font-weight: 700;
                font-size: 21px;
            }}
        """)

        table_layout.addWidget(self.table)
        table_frame.setLayout(table_layout)
        content_layout.addWidget(table_frame)

        content_area.setLayout(content_layout)

        # Add sidebar and content to main layout
        main_layout.addWidget(sidebar)
        main_layout.addWidget(content_area)

        self.setLayout(main_layout)
        
        # Initialize charts
        self.initialize_empty_charts()

    def create_chart_card(self, chart_widget):
        """Create styled card for charts"""
        frame = QFrame()
        frame.setStyleSheet(f"""
            QFrame {{
                background-color: white;
                border-radius: 16px;
                border: 2px solid {NEUTRAL_LIGHT};
                padding: 14px;
            }}
        """)
        
        layout = QVBoxLayout()
        layout.setContentsMargins(10, 10, 10, 10)
        layout.addWidget(chart_widget)
        frame.setLayout(layout)
        
        return frame

    def initialize_empty_charts(self):
        """Initialize charts with placeholders"""
        placeholder_style = {
            'ha': 'center', 'va': 'center',
            'fontsize': 20, 'color': NEUTRAL_MEDIUM, 'weight': 'bold'
        }
        
        self.chart_type.ax.clear()
        self.chart_type.ax.text(0.5, 0.5, 'Upload CSV\nEquipment Types', 
                                transform=self.chart_type.ax.transAxes, **placeholder_style)
        self.chart_type.ax.set_xticks([])
        self.chart_type.ax.set_yticks([])
        self.chart_type.draw()
        
        self.chart_avg_type.ax.clear()
        self.chart_avg_type.ax.text(0.5, 0.5, 'Upload CSV\nAverage Parameters', 
                                     transform=self.chart_avg_type.ax.transAxes, **placeholder_style)
        self.chart_avg_type.ax.set_xticks([])
        self.chart_avg_type.ax.set_yticks([])
        self.chart_avg_type.draw()
        
        self.chart_top10.ax.clear()
        self.chart_top10.ax.text(0.5, 0.5, 'Upload CSV\nTop 10 Equipment', 
                                 transform=self.chart_top10.ax.transAxes, **placeholder_style)
        self.chart_top10.ax.set_xticks([])
        self.chart_top10.ax.set_yticks([])
        self.chart_top10.draw()
        
        self.chart_sorted.ax.clear()
        self.chart_sorted.ax.text(0.5, 0.5, 'Upload CSV\nParameter Distribution', 
                                  transform=self.chart_sorted.ax.transAxes, **placeholder_style)
        self.chart_sorted.ax.set_xticks([])
        self.chart_sorted.ax.set_yticks([])
        self.chart_sorted.draw()

    # ==========================
    # CSV UPLOAD
    # ==========================
    def upload_csv(self):
        file_path, _ = QFileDialog.getOpenFileName(self, "Select CSV File", "", "CSV Files (*.csv)")
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
                self.show_message("Error", response.text, QMessageBox.Warning)
                return

            data = response.json()
            self.current_dataset_id = data["id"]

            self.stats_label.setText(
                f"""
<div style='line-height: 2.4; color: white;'>
<p style='font-size: 23px; color: {SECONDARY_LIGHT}; font-weight: 700; margin-bottom: 14px;'>
✅ Data Loaded
</p>
<p style='font-size: 21px;'><b>Total:</b> {data['total_equipment']}</p>
<p style='font-size: 21px;'><b>Flowrate:</b> {data['avg_flowrate']:.2f}</p>
<p style='font-size: 21px;'><b>Pressure:</b> {data['avg_pressure']:.2f}</p>
<p style='font-size: 21px;'><b>Temp:</b> {data['avg_temperature']:.2f}</p>
</div>
"""
            )

            self.draw_charts(data)
            self.update_table(data["data"])
            self.load_history()

        except Exception as e:
            self.show_message("Error", str(e), QMessageBox.Critical)

    # ==========================
    # DRAW CHARTS
    # ==========================
    def draw_charts(self, data):
        equipment = data["data"]
        colors = [PRIMARY_MAIN, SECONDARY_MAIN, ACCENT_MAIN, PRIMARY_LIGHT, SECONDARY_LIGHT, "#6A4C93"]
        
        # Chart 1: Pie
        self.chart_type.ax.clear()
        types = data["type_distribution"]
        wedges, texts, autotexts = self.chart_type.ax.pie(
            types.values(), labels=types.keys(), autopct="%1.1f%%",
            startangle=90, colors=colors, textprops={'fontsize': 16, 'weight': 'bold'}
        )
        for autotext in autotexts:
            autotext.set_color('white')
            autotext.set_fontsize(15)
            autotext.set_weight('bold')
        self.chart_type.ax.set_title("Equipment Types", fontsize=22, weight='bold', color=PRIMARY_MAIN, pad=18)
        self.chart_type.draw()

        # Chart 2: Bar
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
        self.chart_avg_type.ax.bar(x, avg_flow, width=0.25, label="Flow", color=SECONDARY_MAIN)
        self.chart_avg_type.ax.bar([i+0.25 for i in x], avg_pressure, width=0.25, label="Press", color=PRIMARY_MAIN)
        self.chart_avg_type.ax.bar([i+0.5 for i in x], avg_temp, width=0.25, label="Temp", color=ACCENT_MAIN)
        self.chart_avg_type.ax.set_xticks([i+0.25 for i in x])
        self.chart_avg_type.ax.set_xticklabels(types, rotation=18, fontsize=15)
        self.chart_avg_type.ax.set_title("Avg Parameters", fontsize=22, weight='bold', color=PRIMARY_MAIN, pad=18)
        self.chart_avg_type.ax.legend(fontsize=16, frameon=True, shadow=True, loc='upper right')
        self.chart_avg_type.ax.grid(axis='y', alpha=0.3, linestyle='--')
        self.chart_avg_type.ax.tick_params(axis='both', labelsize=14)
        self.chart_avg_type.draw()

        # Chart 3: Top 10
        top10 = equipment[:10]
        names = [e["equipmentName"][:9]+"..." if len(e["equipmentName"])>9 else e["equipmentName"] for e in top10]
        flow = [e["flowrate"] for e in top10]
        pressure = [e["pressure"] for e in top10]
        temp = [e["temperature"] for e in top10]

        x = range(len(names))
        self.chart_top10.ax.clear()
        self.chart_top10.ax.bar(x, flow, width=0.25, label="Flow", color=SECONDARY_MAIN)
        self.chart_top10.ax.bar([i+0.25 for i in x], pressure, width=0.25, label="Press", color=PRIMARY_MAIN)
        self.chart_top10.ax.bar([i+0.5 for i in x], temp, width=0.25, label="Temp", color=ACCENT_MAIN)
        self.chart_top10.ax.set_xticks([i+0.25 for i in x])
        self.chart_top10.ax.set_xticklabels(names, rotation=32, ha='right', fontsize=13)
        self.chart_top10.ax.set_title("Top 10 Equipment", fontsize=22, weight='bold', color=PRIMARY_MAIN, pad=18)
        self.chart_top10.ax.legend(fontsize=16, frameon=True, shadow=True, loc='upper right')
        self.chart_top10.ax.grid(axis='y', alpha=0.3, linestyle='--')
        self.chart_top10.ax.tick_params(axis='both', labelsize=14)
        self.chart_top10.draw()

        # Chart 4: Line
        sorted_eq = sorted(equipment, key=lambda x: x["flowrate"])
        flow_sorted = [e["flowrate"] for e in sorted_eq]
        pressure_sorted = [e["pressure"] for e in sorted_eq]

        self.chart_sorted.ax.clear()
        self.chart_sorted.ax.plot(flow_sorted, label="Flowrate", marker="o", linewidth=3.2, color=SECONDARY_MAIN, markersize=4.5)
        self.chart_sorted.ax.plot(pressure_sorted, label="Pressure", marker="s", linewidth=3.2, color=PRIMARY_MAIN, markersize=4.5)
        self.chart_sorted.ax.set_title("Parameter Distribution", fontsize=22, weight='bold', color=PRIMARY_MAIN, pad=18)
        self.chart_sorted.ax.legend(fontsize=16, frameon=True, shadow=True, loc='upper left')
        self.chart_sorted.ax.grid(alpha=0.3, linestyle='--')
        self.chart_sorted.ax.set_xlabel("Equipment Index", fontsize=16, weight='bold')
        self.chart_sorted.ax.set_ylabel("Value", fontsize=16, weight='bold')
        self.chart_sorted.ax.tick_params(axis='both', labelsize=14)
        self.chart_sorted.draw()

    def download_pdf(self):
        if not hasattr(self, "current_dataset_id"):
            self.show_message("No Dataset", "Please upload or select a dataset first.", QMessageBox.Warning)
            return

        save_path, _ = QFileDialog.getSaveFileName(self, "Save PDF", f"report_{self.current_dataset_id}.pdf", "PDF Files (*.pdf)")
        if not save_path:
            return

        try:
            response = requests.get(f"http://127.0.0.1:8000/api/pdf/{self.current_dataset_id}/", 
                                    headers={"Authorization": f"Token {self.token}"})
            if response.status_code != 200:
                self.show_message("Error", "Failed to generate PDF", QMessageBox.Warning)
                return

            with open(save_path, "wb") as f:
                f.write(response.content)
            self.show_message("Success", "PDF downloaded successfully! ✅", QMessageBox.Information)
        except Exception as e:
            self.show_message("Error", str(e), QMessageBox.Critical)

    def load_history(self):
        try:
            response = requests.get("http://127.0.0.1:8000/api/history/", headers={"Authorization": f"Token {self.token}"})
            if response.status_code != 200:
                return
            self.history_list.clear()
            for d in response.json():
                self.history_list.addItem(f"📄 {d['fileName']}\n📊 {d['total_equipment']} items")
        except:
            pass

    def load_selected_dataset(self, item):
        index = self.history_list.row(item)
        try:
            response = requests.get("http://127.0.0.1:8000/api/history/", headers={"Authorization": f"Token {self.token}"})
            datasets = response.json()
            dataset = datasets[index]
            self.current_dataset_id = dataset["id"]

            self.stats_label.setText(
                f"""
<div style='line-height: 2.4; color: white;'>
<p style='font-size: 23px; color: {SECONDARY_LIGHT}; font-weight: 700; margin-bottom: 14px;'>
✅ From History
</p>
<p style='font-size: 21px;'><b>Total:</b> {dataset['total_equipment']}</p>
<p style='font-size: 21px;'><b>Flowrate:</b> {dataset['avg_flowrate']:.2f}</p>
<p style='font-size: 21px;'><b>Pressure:</b> {dataset['avg_pressure']:.2f}</p>
<p style='font-size: 21px;'><b>Temp:</b> {dataset['avg_temperature']:.2f}</p>
</div>
"""
            )
            self.draw_charts(dataset)
            self.update_table(dataset["data"])
        except Exception as e:
            self.show_message("Error", str(e), QMessageBox.Warning)

    def logout(self):
        try:
            import os
            if os.path.exists("token.txt"):
                os.remove("token.txt")
        except:
            pass
        self.close()

    def show_message(self, title, message, icon):
        msg = QMessageBox(self)
        msg.setWindowTitle(title)
        msg.setText(message)
        msg.setIcon(icon)
        msg.setStyleSheet(f"""
            QMessageBox {{ background-color: white; }}
            QMessageBox QLabel {{ color: {NEUTRAL_DARKEST}; font-size: 20px; min-width: 420px; padding: 16px; }}
            QPushButton {{ background-color: {PRIMARY_MAIN}; color: white; border: none; border-radius: 10px; 
                          padding: 16px 34px; font-size: 19px; font-weight: 600; min-width: 120px; }}
            QPushButton:hover {{ background-color: {PRIMARY_LIGHT}; }}
        """)
        msg.exec_()