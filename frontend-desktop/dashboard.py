from PyQt5.QtWidgets import (
    QWidget, QLabel, QPushButton,
    QVBoxLayout, QHBoxLayout, QGridLayout,
    QFrame, QListWidget,
    QMessageBox, QFileDialog,
    QTableWidget, QTableWidgetItem,
    QScrollArea, QGraphicsDropShadowEffect, QSizePolicy, QHeaderView
)

from PyQt5.QtCore import Qt, QSize, QPropertyAnimation, QEasingCurve, pyqtProperty
from PyQt5.QtGui import QFont, QColor
import requests

from matplotlib.backends.backend_qt5agg import FigureCanvasQTAgg
from matplotlib.figure import Figure
import matplotlib.pyplot as plt

from styles import *


# ==========================
# MATPLOTLIB CANVAS (MUCH LARGER & MORE VISIBLE)
# ==========================
class ChartCanvas(FigureCanvasQTAgg):
    def __init__(self, width=10, height=7):
        fig = Figure(figsize=(width, height), facecolor='white', dpi=100)
        self.ax = fig.add_subplot(111)
        self.ax.set_facecolor('#FAFBFC')
        super().__init__(fig)
        
        # Store figure reference for later layout adjustments
        self.fig = fig
        self.setMinimumSize(700, 550)
        
        # Set size policy to expand
        self.setSizePolicy(QSizePolicy.Expanding, QSizePolicy.Expanding)
        
        # Update size on draw
        self.updateGeometry()


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
        """Update table with enhanced formatting"""
        self.table.setRowCount(len(rows))

        for row_index, row in enumerate(rows):
            # Create items with centered alignment
            name_item = QTableWidgetItem(str(row["equipmentName"]))
            type_item = QTableWidgetItem(str(row["type"]))
            flow_item = QTableWidgetItem(f"{row['flowrate']:.2f}")
            press_item = QTableWidgetItem(f"{row['pressure']:.2f}")
            temp_item = QTableWidgetItem(f"{row['temperature']:.2f}")
            
            # Center align numeric values
            flow_item.setTextAlignment(Qt.AlignCenter)
            press_item.setTextAlignment(Qt.AlignCenter)
            temp_item.setTextAlignment(Qt.AlignCenter)
            
            self.table.setItem(row_index, 0, name_item)
            self.table.setItem(row_index, 1, type_item)
            self.table.setItem(row_index, 2, flow_item)
            self.table.setItem(row_index, 3, press_item)
            self.table.setItem(row_index, 4, temp_item)
        
        # Force table to use full width
        self.table.horizontalHeader().setStretchLastSection(True)
        for i in range(self.table.columnCount()):
            self.table.horizontalHeader().setSectionResizeMode(i, QHeaderView.Stretch)

    # ==========================
    # UI (DRAMATICALLY ENHANCED WITH LARGER SIZES)
    # ==========================
    def init_ui(self):
        # Main horizontal layout: SIDEBAR + MAIN CONTENT
        main_layout = QHBoxLayout()
        main_layout.setSpacing(0)
        main_layout.setContentsMargins(0, 0, 0, 0)

        # ==================== LEFT SIDEBAR (LARGER) ====================
        sidebar = QFrame()
        sidebar.setStyleSheet(SIDEBAR_STYLE)
        sidebar.setFixedWidth(490)
        
        sidebar_layout = QVBoxLayout()
        sidebar_layout.setSpacing(22)
        sidebar_layout.setContentsMargins(30, 40, 30, 40)

        # Sidebar Title with Icon (LARGER)
        sidebar_title = QLabel("📊 Control Panel")
        sidebar_title.setStyleSheet(f"""
            QLabel {{
                color: white;
                font-size: 34px;
                font-weight: 700;
                padding: 28px 20px;
                background: qlineargradient(
                    x1:0, y1:0, x2:1, y2:0,
                    stop:0 {PRIMARY_MAIN},
                    stop:1 {PRIMARY_LIGHT}
                );
                border-radius: 16px;
                letter-spacing: 0.5px;
            }}
        """)
        sidebar_title.setAlignment(Qt.AlignCenter)

        # Upload Button (MUCH LARGER)
        upload_btn = QPushButton("📤 Upload CSV")
        upload_btn.setMinimumHeight(80)
        upload_btn.setCursor(Qt.PointingHandCursor)
        upload_btn.setStyleSheet(f"""
            QPushButton {{
                background: qlineargradient(
                    x1:0, y1:0, x2:0, y2:1,
                    stop:0 {SECONDARY_LIGHT},
                    stop:1 {SECONDARY_MAIN}
                );
                color: white;
                border: none;
                border-radius: 16px;
                padding: 24px 30px;
                font-size: 26px;
                font-weight: 700;
                letter-spacing: 1px;
            }}
            QPushButton:hover {{
                background: qlineargradient(
                    x1:0, y1:0, x2:0, y2:1,
                    stop:0 {SECONDARY_GLOW},
                    stop:1 {SECONDARY_LIGHT}
                );
                padding: 25px 30px;
            }}
            QPushButton:pressed {{
                background-color: {SECONDARY_DARK};
                padding: 23px 30px;
            }}
        """)
        upload_btn.clicked.connect(self.upload_csv)

        # PDF Button (MUCH LARGER)
        pdf_btn = QPushButton("📄 Download PDF")
        pdf_btn.setMinimumHeight(80)
        pdf_btn.setCursor(Qt.PointingHandCursor)
        pdf_btn.setStyleSheet(f"""
            QPushButton {{
                background: qlineargradient(
                    x1:0, y1:0, x2:0, y2:1,
                    stop:0 {ACCENT_LIGHT},
                    stop:1 {ACCENT_MAIN}
                );
                color: white;
                border: none;
                border-radius: 16px;
                padding: 24px 30px;
                font-size: 26px;
                font-weight: 700;
                letter-spacing: 1px;
            }}
            QPushButton:hover {{
                background: qlineargradient(
                    x1:0, y1:0, x2:0, y2:1,
                    stop:0 {ACCENT_GLOW},
                    stop:1 {ACCENT_LIGHT}
                );
                padding: 25px 30px;
            }}
            QPushButton:pressed {{
                background-color: {ACCENT_DARK};
                padding: 23px 30px;
            }}
        """)
        pdf_btn.clicked.connect(self.download_pdf)

        # Summary Section (LARGER TEXT)
        summary_header = QLabel("📈 Summary Statistics")
        summary_header.setStyleSheet(f"""
            QLabel {{
                color: white;
                font-size: 32px;
                font-weight: 700;
                padding: 18px 14px;
                letter-spacing: 0.5px;
            }}
        """)

        self.stats_label = QLabel("📁 Upload CSV\nto view statistics")
        self.stats_label.setWordWrap(True)
        self.stats_label.setAlignment(Qt.AlignLeft | Qt.AlignTop)
        self.stats_label.setStyleSheet(f"""
            QLabel {{
                padding: 32px;
                background: qlineargradient(
                    x1:0, y1:0, x2:0, y2:1,
                    stop:0 {NEUTRAL_DARKEST},
                    stop:1 {NEUTRAL_DARK}
                );
                border: 3px solid {SECONDARY_MAIN};
                border-radius: 16px;
                font-size: 24px;
                color: white;
                line-height: 2.2;
            }}
        """)
        self.stats_label.setMinimumHeight(240)

        # History Section (LARGER TEXT)
        history_header = QLabel("📜 Upload History")
        history_header.setStyleSheet(f"""
            QLabel {{
                color: white;
                font-size: 28px;
                font-weight: 700;
                padding: 18px 14px;
                letter-spacing: 0.5px;
            }}
        """)

        self.history_list = QListWidget()
        self.history_list.setStyleSheet(f"""
            QListWidget {{
                background: qlineargradient(
                    x1:0, y1:0, x2:0, y2:1,
                    stop:0 {NEUTRAL_DARKEST},
                    stop:1 {NEUTRAL_DARK}
                );
                border: 3px solid {PRIMARY_LIGHT};
                border-radius: 14px;
                padding: 16px;
                font-size: 22px;
                color: white;
                outline: none;
            }}
            QListWidget::item {{
                padding: 22px 16px;
                border-radius: 12px;
                margin: 8px 0px;
                background-color: rgba(255, 255, 255, 0.05);
                border: 1px solid rgba(255, 255, 255, 0.1);
            }}
            QListWidget::item:selected {{
                background: qlineargradient(
                    x1:0, y1:0, x2:1, y2:0,
                    stop:0 {PRIMARY_MAIN},
                    stop:1 {PRIMARY_LIGHT}
                );
                color: white;
                border: 2px solid {PRIMARY_GLOW};
            }}
            QListWidget::item:hover {{
                background-color: rgba(255, 255, 255, 0.12);
                border: 1px solid {PRIMARY_LIGHT};
            }}
        """)
        self.history_list.itemClicked.connect(self.load_selected_dataset)

        # Add widgets to sidebar
        sidebar_layout.addWidget(sidebar_title)
        sidebar_layout.addSpacing(15)
        sidebar_layout.addWidget(upload_btn)
        sidebar_layout.addWidget(pdf_btn)
        sidebar_layout.addSpacing(25)
        sidebar_layout.addWidget(summary_header)
        sidebar_layout.addWidget(self.stats_label)
        sidebar_layout.addSpacing(25)
        sidebar_layout.addWidget(history_header)
        sidebar_layout.addWidget(self.history_list, 1)
        
        sidebar.setLayout(sidebar_layout)

        # ==================== RIGHT CONTENT AREA (FULL WIDTH) ====================
        scroll_area = QScrollArea()
        scroll_area.setWidgetResizable(True)
        scroll_area.setHorizontalScrollBarPolicy(Qt.ScrollBarAsNeeded)
        scroll_area.setVerticalScrollBarPolicy(Qt.ScrollBarAsNeeded)
        scroll_area.setStyleSheet(f"""
            QScrollArea {{
                border: none;
                background-color: {NEUTRAL_LIGHTEST};
            }}
        """)

        content_widget = QWidget()
        content_widget.setStyleSheet(f"background-color: {NEUTRAL_LIGHTEST};")
        
        content_layout = QVBoxLayout()
        content_layout.setSpacing(30)
        content_layout.setContentsMargins(35, 30, 35, 30)

        # Top Bar (LARGER TEXT)
        top_bar = QFrame()
        top_bar.setStyleSheet(f"""
            QFrame {{
                background: qlineargradient(
                    x1:0, y1:0, x2:1, y2:0,
                    stop:0 {PRIMARY_MAIN},
                    stop:0.5 {PRIMARY_LIGHT},
                    stop:1 {SECONDARY_MAIN}
                );
                border-radius: 18px;
                padding: 24px 35px;
                border: none;
            }}
        """)
        
        # Add shadow to top bar
        shadow = QGraphicsDropShadowEffect()
        shadow.setBlurRadius(25)
        shadow.setColor(QColor(0, 0, 0, 70))
        shadow.setOffset(0, 6)
        top_bar.setGraphicsEffect(shadow)
        
        top_bar_layout = QHBoxLayout()
        top_bar_layout.setContentsMargins(0, 0, 0, 0)

        # Title with icon (MUCH LARGER)
        title_label = QLabel("🧪 Chemical Equipment Visualizer")
        title_label.setStyleSheet(f"""
            QLabel {{
                color: white;
                font-size: 38px;
                font-weight: 700;
                letter-spacing: -0.3px;
            }}
        """)

        # User info (LARGER)
        user_label = QLabel(f"👤 {self.email}")
        user_label.setStyleSheet(f"""
            QLabel {{
                color: white;
                font-size: 24px;
                font-weight: 600;
                padding: 14px 28px;
                background-color: rgba(255, 255, 255, 0.2);
                border: 2px solid rgba(255, 255, 255, 0.4);
                border-radius: 28px;
                backdrop-filter: blur(10px);
            }}
        """)

        # Logout button (LARGER)
        logout_btn = QPushButton("🚪 Sign Out")
        logout_btn.setCursor(Qt.PointingHandCursor)
        logout_btn.setStyleSheet(f"""
            QPushButton {{
                background: qlineargradient(
                    x1:0, y1:0, x2:1, y2:0,
                    stop:0 {ALERT_MAIN},
                    stop:1 {ALERT_LIGHT}
                );
                color: white;
                border: none;
                border-radius: 14px;
                padding: 14px 32px;
                font-size: 24px;
                font-weight: 700;
                letter-spacing: 0.5px;
            }}
            QPushButton:hover {{
                background: qlineargradient(
                    x1:0, y1:0, x2:1, y2:0,
                    stop:0 {ALERT_LIGHT},
                    stop:1 #FF8A9A
                );
                padding: 15px 32px;
            }}
            QPushButton:pressed {{
                background-color: {ALERT_DARK};
                padding: 13px 32px;
            }}
        """)
        logout_btn.clicked.connect(self.logout)

        top_bar_layout.addWidget(title_label)
        top_bar_layout.addStretch()
        top_bar_layout.addWidget(user_label)
        top_bar_layout.addSpacing(20)
        top_bar_layout.addWidget(logout_btn)
        
        top_bar.setLayout(top_bar_layout)

        # Data Visualizations Section Header (LARGER)
        viz_header = QLabel("📊 Data Visualizations")
        viz_header.setStyleSheet(f"""
            QLabel {{
                color: {PRIMARY_MAIN};
                font-size: 34px;
                font-weight: 700;
                padding: 18px 0px;
                letter-spacing: -0.3px;
            }}
        """)

        # Charts Grid (2x2) with MUCH LARGER CHARTS
        charts_grid = QGridLayout()
        charts_grid.setSpacing(20)
        charts_grid.setContentsMargins(0, 0, 0, 0)

        # Create chart containers with larger charts
        self.chart_type = ChartCanvas(width=10, height=7)
        self.chart_avg_type = ChartCanvas(width=10, height=7)
        self.chart_top10 = ChartCanvas(width=10, height=7)
        self.chart_sorted = ChartCanvas(width=10, height=7)

        # Wrap charts in styled frames
        chart_frames = []
        for chart in [self.chart_type, self.chart_avg_type, self.chart_top10, self.chart_sorted]:
            frame = QFrame()
            frame.setStyleSheet(f"""
                QFrame {{
                    background-color: white;
                    border-radius: 18px;
                    border: 2px solid {NEUTRAL_LIGHT};
                    padding: 10px;
                }}
            """)
            
            # Add shadow effect
            shadow = QGraphicsDropShadowEffect()
            shadow.setBlurRadius(20)
            shadow.setColor(QColor(0, 0, 0, 50))
            shadow.setOffset(0, 5)
            frame.setGraphicsEffect(shadow)
            
            frame_layout = QVBoxLayout()
            frame_layout.setContentsMargins(8, 8, 8, 8)
            frame_layout.addWidget(chart)
            frame.setLayout(frame_layout)
            frame.setSizePolicy(QSizePolicy.Expanding, QSizePolicy.Expanding)
            chart_frames.append(frame)

        # Add charts to grid (2x2 layout)
        charts_grid.addWidget(chart_frames[0], 0, 0)  # Top-left
        charts_grid.addWidget(chart_frames[1], 0, 1)  # Top-right
        charts_grid.addWidget(chart_frames[2], 1, 0)  # Bottom-left
        charts_grid.addWidget(chart_frames[3], 1, 1)  # Bottom-right

        # Equipment Data Table Section (LARGER TEXT)
        table_header = QLabel("📋 Equipment Data Table")
        table_header.setStyleSheet(f"""
            QLabel {{
                color: {PRIMARY_MAIN};
                font-size: 34px;
                font-weight: 700;
                padding: 18px 0px;
                letter-spacing: -0.3px;
            }}
        """)

        # Table with MUCH LARGER text
        self.table = QTableWidget()
        self.table.setColumnCount(5)
        self.table.setHorizontalHeaderLabels([
            "EQUIPMENT NAME", "TYPE", "FLOWRATE", "PRESSURE", "TEMPERATURE"
        ])
        
        # Enhanced table styling with LARGER TEXT
        self.table.setStyleSheet(f"""
            QTableWidget {{
                background-color: white;
                border: 3px solid {NEUTRAL_LIGHT};
                border-radius: 16px;
                gridline-color: {NEUTRAL_LIGHT};
                font-size: 22px;
                selection-background-color: {PRIMARY_LIGHT};
                selection-color: white;
            }}
            QTableWidget::item {{
                padding: 18px 14px;
                border-bottom: 1px solid {NEUTRAL_LIGHTEST};
            }}
            QTableWidget::item:selected {{
                background-color: {PRIMARY_LIGHT};
                color: white;
            }}
            QTableWidget::item:hover {{
                background-color: {NEUTRAL_LIGHTEST};
            }}
            QHeaderView::section {{
                background: qlineargradient(
                    x1:0, y1:0, x2:0, y2:1,
                    stop:0 {PRIMARY_LIGHT},
                    stop:1 {PRIMARY_MAIN}
                );
                color: white;
                padding: 22px 16px;
                border: none;
                font-weight: 700;
                font-size: 22px;
                text-transform: uppercase;
                letter-spacing: 1px;
            }}
            QHeaderView::section:hover {{
                background: qlineargradient(
                    x1:0, y1:0, x2:0, y2:1,
                    stop:0 {PRIMARY_GLOW},
                    stop:1 {PRIMARY_LIGHT}
                );
            }}
        """)
        
        # Set table properties for FULL WIDTH display
        self.table.setAlternatingRowColors(True)
        self.table.setSelectionBehavior(QTableWidget.SelectRows)
        self.table.setSelectionMode(QTableWidget.SingleSelection)
        self.table.verticalHeader().setVisible(False)
        self.table.setMinimumHeight(400)
        
        # Make ALL columns stretch to fill width - NO WHITE SPACE!
        header = self.table.horizontalHeader()
        for i in range(5):
            header.setSectionResizeMode(i, QHeaderView.Stretch)
        
        # Add shadow to table
        table_shadow = QGraphicsDropShadowEffect()
        table_shadow.setBlurRadius(20)
        table_shadow.setColor(QColor(0, 0, 0, 50))
        table_shadow.setOffset(0, 5)
        self.table.setGraphicsEffect(table_shadow)

        # Add all components to content layout
        content_layout.addWidget(top_bar)
        content_layout.addWidget(viz_header)
        content_layout.addLayout(charts_grid, stretch=2)
        content_layout.addWidget(table_header)
        content_layout.addWidget(self.table, stretch=1)

        content_widget.setLayout(content_layout)

        # Add sidebar and content to main layout
        scroll_area.setWidget(content_widget)

        # Add sidebar and scroll area to main layout
        main_layout.addWidget(sidebar)
        main_layout.addWidget(scroll_area, 1)
        
        self.setLayout(main_layout)

    # ==========================
    # UPLOAD CSV
    # ==========================
    def upload_csv(self):
        file_path, _ = QFileDialog.getOpenFileName(
            self, "Select CSV File", "", "CSV Files (*.csv)"
        )
        if not file_path:
            return

        try:
            with open(file_path, "rb") as f:
                response = requests.post(
                    "https://chemical-equipment-visualizer-xtbs.onrender.com/api/upload/",
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
<div style='line-height: 2.2; color: white;'>
<p style='font-size: 24px; color: {SECONDARY_LIGHT}; font-weight: 700; margin-bottom: 14px;'>
✅ Data Loaded Successfully
</p>
<p style='font-size: 22px;'><b>Total Equipment:</b> {data['total_equipment']}</p>
<p style='font-size: 22px;'><b>Avg Flowrate:</b> {data['avg_flowrate']:.2f}</p>
<p style='font-size: 22px;'><b>Avg Pressure:</b> {data['avg_pressure']:.2f}</p>
<p style='font-size: 22px;'><b>Avg Temperature:</b> {data['avg_temperature']:.2f}</p>
</div>
"""
            )

            self.draw_charts(data)
            self.update_table(data["data"])
            self.load_history()

        except Exception as e:
            self.show_message("Error", str(e), QMessageBox.Critical)

    # ==========================
    # DRAW CHARTS (MUCH LARGER & MORE READABLE)
    # ==========================
    def draw_charts(self, data):
        equipment = data["data"]
        
        # Professional color palette
        colors = [
            CHART_COLOR_1, CHART_COLOR_2, CHART_COLOR_3, 
            CHART_COLOR_4, CHART_COLOR_5, CHART_COLOR_6,
            CHART_COLOR_7, CHART_COLOR_8
        ]
        
        # Chart 1: Pie Chart (MUCH LARGER TEXT)
        self.chart_type.ax.clear()
        types = data["type_distribution"]
        wedges, texts, autotexts = self.chart_type.ax.pie(
            types.values(), 
            labels=types.keys(), 
            autopct="%1.1f%%",
            startangle=90, 
            colors=colors[:len(types)],
            textprops={'fontsize': 16, 'weight': 'bold'},
            explode=[0.05] * len(types),
            shadow=True,
            pctdistance=0.82,
            labeldistance=1.1
        )
        for autotext in autotexts:
            autotext.set_color('white')
            autotext.set_fontsize(15)
            autotext.set_weight('bold')
        for text in texts:
            text.set_fontsize(16)
            text.set_weight('700')
        self.chart_type.ax.set_title(
            "Equipment Types Distribution", 
            fontsize=22,
            weight='bold', 
            color=PRIMARY_MAIN, 
            pad=18
        )
        self.chart_type.fig.subplots_adjust(left=0.05, right=0.95, top=0.85, bottom=0.05)
        self.chart_type.draw()

        # Chart 2: Bar Chart (MUCH LARGER TEXT)
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
        bar_width = 0.25
        
        self.chart_avg_type.ax.clear()
        bars1 = self.chart_avg_type.ax.bar(
            x, avg_flow, width=bar_width, 
            label="Flowrate", color=SECONDARY_MAIN, 
            edgecolor='white', linewidth=1.5
        )
        bars2 = self.chart_avg_type.ax.bar(
            [i+bar_width for i in x], avg_pressure, width=bar_width, 
            label="Pressure", color=PRIMARY_MAIN,
            edgecolor='white', linewidth=1.5
        )
        bars3 = self.chart_avg_type.ax.bar(
            [i+bar_width*2 for i in x], avg_temp, width=bar_width, 
            label="Temperature", color=ACCENT_MAIN,
            edgecolor='white', linewidth=1.5
        )
        
        self.chart_avg_type.ax.set_xticks([i+bar_width for i in x])
        self.chart_avg_type.ax.set_xticklabels(types, rotation=12, ha='right', fontsize=14)
        self.chart_avg_type.ax.set_title(
            "Average Parameters by Type", 
            fontsize=22,
            weight='bold', 
            color=PRIMARY_MAIN, 
            pad=18
        )
        self.chart_avg_type.ax.legend(fontsize=14, frameon=True, shadow=True, loc='upper right')
        self.chart_avg_type.ax.grid(axis='y', alpha=0.3, linestyle='--', linewidth=1)
        self.chart_avg_type.ax.tick_params(axis='both', labelsize=13)
        self.chart_avg_type.ax.set_ylabel("Value", fontsize=15, weight='bold')
        self.chart_avg_type.fig.subplots_adjust(left=0.10, right=0.96, top=0.85, bottom=0.12)
        self.chart_avg_type.draw()

        # Chart 3: Top 10 Equipment (MUCH LARGER TEXT)
        top10 = equipment[:10]
        names = [e["equipmentName"][:12]+"..." if len(e["equipmentName"])>12 else e["equipmentName"] for e in top10]
        flow = [e["flowrate"] for e in top10]
        pressure = [e["pressure"] for e in top10]
        temp = [e["temperature"] for e in top10]

        x = range(len(names))
        
        self.chart_top10.ax.clear()
        bars1 = self.chart_top10.ax.bar(
            x, flow, width=bar_width, 
            label="Flowrate", color=SECONDARY_MAIN,
            edgecolor='white', linewidth=1.5
        )
        bars2 = self.chart_top10.ax.bar(
            [i+bar_width for i in x], pressure, width=bar_width, 
            label="Pressure", color=PRIMARY_MAIN,
            edgecolor='white', linewidth=1.5
        )
        bars3 = self.chart_top10.ax.bar(
            [i+bar_width*2 for i in x], temp, width=bar_width, 
            label="Temperature", color=ACCENT_MAIN,
            edgecolor='white', linewidth=1.5
        )
        
        self.chart_top10.ax.set_xticks([i+bar_width for i in x])
        self.chart_top10.ax.set_xticklabels(names, rotation=28, ha='right', fontsize=13)
        self.chart_top10.ax.set_title(
            "Top 10 Equipment", 
            fontsize=22,
            weight='bold', 
            color=PRIMARY_MAIN, 
            pad=18
        )
        self.chart_top10.ax.legend(fontsize=14, frameon=True, shadow=True, loc='upper right')
        self.chart_top10.ax.grid(axis='y', alpha=0.3, linestyle='--', linewidth=1)
        self.chart_top10.ax.tick_params(axis='both', labelsize=13)
        self.chart_top10.ax.set_ylabel("Value", fontsize=15, weight='bold')
        self.chart_top10.fig.subplots_adjust(left=0.10, right=0.96, top=0.85, bottom=0.16)
        self.chart_top10.draw()

        # Chart 4: Parameter Distribution (MUCH LARGER TEXT)
        sorted_eq = sorted(equipment, key=lambda x: x["flowrate"])
        flow_sorted = [e["flowrate"] for e in sorted_eq]
        pressure_sorted = [e["pressure"] for e in sorted_eq]

        self.chart_sorted.ax.clear()
        self.chart_sorted.ax.plot(
            flow_sorted, 
            label="Flowrate", 
            marker="o", 
            linewidth=3,
            color=SECONDARY_MAIN, 
            markersize=4,
            alpha=0.9
        )
        self.chart_sorted.ax.plot(
            pressure_sorted, 
            label="Pressure", 
            marker="s", 
            linewidth=3,
            color=PRIMARY_MAIN, 
            markersize=4,
            alpha=0.9
        )
        self.chart_sorted.ax.set_title(
            "Parameter Distribution", 
            fontsize=22,
            weight='bold', 
            color=PRIMARY_MAIN, 
            pad=18
        )
        self.chart_sorted.ax.legend(fontsize=14, frameon=True, shadow=True, loc='upper left')
        self.chart_sorted.ax.grid(alpha=0.3, linestyle='--', linewidth=1)
        self.chart_sorted.ax.set_xlabel("Equipment Index", fontsize=15, weight='bold')
        self.chart_sorted.ax.set_ylabel("Value", fontsize=15, weight='bold')
        self.chart_sorted.ax.tick_params(axis='both', labelsize=13)
        self.chart_sorted.ax.fill_between(
            range(len(flow_sorted)), 
            flow_sorted, 
            alpha=0.1, 
            color=SECONDARY_MAIN
        )
        self.chart_sorted.fig.subplots_adjust(left=0.10, right=0.96, top=0.85, bottom=0.12)
        self.chart_sorted.draw()

    def download_pdf(self):
        if not hasattr(self, "current_dataset_id"):
            self.show_message("No Dataset", "Please upload or select a dataset first.", QMessageBox.Warning)
            return

        save_path, _ = QFileDialog.getSaveFileName(
            self, "Save PDF", f"report_{self.current_dataset_id}.pdf", "PDF Files (*.pdf)"
        )
        if not save_path:
            return

        try:
            response = requests.get(
                f"https://chemical-equipment-visualizer-xtbs.onrender.com/api/pdf/{self.current_dataset_id}/", 
                headers={"Authorization": f"Token {self.token}"}
            )
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
            response = requests.get(
                "https://chemical-equipment-visualizer-xtbs.onrender.com/api/history/", 
                headers={"Authorization": f"Token {self.token}"}
            )
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
            response = requests.get(
                "https://chemical-equipment-visualizer-xtbs.onrender.com/api/history/", 
                headers={"Authorization": f"Token {self.token}"}
            )
            datasets = response.json()
            dataset = datasets[index]
            self.current_dataset_id = dataset["id"]

            self.stats_label.setText(
                f"""
<div style='line-height: 2.2; color: white;'>
<p style='font-size: 26px; color: {SECONDARY_LIGHT}; font-weight: 700; margin-bottom: 14px;'>
✅ Loaded from History
</p>
<p style='font-size: 24px;'><b>Total Equipment:</b> {dataset['total_equipment']}</p>
<p style='font-size: 24px;'><b>Avg Flowrate:</b> {dataset['avg_flowrate']:.2f}</p>
<p style='font-size: 24px;'><b>Avg Pressure:</b> {dataset['avg_pressure']:.2f}</p>
<p style='font-size: 24px;'><b>Avg Temperature:</b> {dataset['avg_temperature']:.2f}</p>
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
            QMessageBox {{ 
                background-color: white; 
            }}
            QMessageBox QLabel {{ 
                color: {NEUTRAL_DARKEST}; 
                font-size: 20px; 
                min-width: 500px; 
                padding: 24px; 
            }}
            QPushButton {{ 
                background: qlineargradient(
                    x1:0, y1:0, x2:1, y2:0,
                    stop:0 {PRIMARY_MAIN},
                    stop:1 {PRIMARY_LIGHT}
                );
                color: white; 
                border: none; 
                border-radius: 12px; 
                padding: 16px 36px; 
                font-size: 18px; 
                font-weight: 700; 
                min-width: 130px; 
            }}
            QPushButton:hover {{ 
                background: qlineargradient(
                    x1:0, y1:0, x2:1, y2:0,
                    stop:0 {PRIMARY_LIGHT},
                    stop:1 {PRIMARY_GLOW}
                );
            }}
        """)
        msg.exec_()