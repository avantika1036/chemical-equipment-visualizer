# ==========================
# ENHANCED COLOR PALETTE
# ==========================

# Primary (Deep Ocean Blue) - Enhanced
PRIMARY_MAIN = "#0A4D8C"
PRIMARY_LIGHT = "#1E7FD8"
PRIMARY_DARK = "#083A6B"
PRIMARY_GLOW = "#3A9BFF"

# Secondary (Tech Green/Teal) - Enhanced
SECONDARY_MAIN = "#00A896"
SECONDARY_LIGHT = "#02D9BA"
SECONDARY_DARK = "#028174"
SECONDARY_GLOW = "#3DFFEA"

# Neutral Grays - Refined
NEUTRAL_DARKEST = "#1A1D29"
NEUTRAL_DARK = "#2D3142"
NEUTRAL_MEDIUM = "#4F5D75"
NEUTRAL_LIGHT = "#BFC0C0"
NEUTRAL_LIGHTEST = "#F5F7FA"

# Accent (Vibrant Amber) - Enhanced
ACCENT_MAIN = "#F77F00"
ACCENT_LIGHT = "#FF9D3A"
ACCENT_DARK = "#D66D00"
ACCENT_GLOW = "#FFB366"

# Alert Red
ALERT_MAIN = "#EF233C"
ALERT_LIGHT = "#F25C6B"
ALERT_DARK = "#D90429"

# Success
SUCCESS = SECONDARY_MAIN
SUCCESS_LIGHT = "#3FD9A8"

# Chart Colors (Professional Palette)
CHART_COLOR_1 = "#0A4D8C"  # Blue
CHART_COLOR_2 = "#00A896"  # Teal
CHART_COLOR_3 = "#F77F00"  # Orange
CHART_COLOR_4 = "#6A4C93"  # Purple
CHART_COLOR_5 = "#E63946"  # Red
CHART_COLOR_6 = "#2A9D8F"  # Green
CHART_COLOR_7 = "#E9C46A"  # Yellow
CHART_COLOR_8 = "#264653"  # Dark Blue

# ==========================
# GLOBAL APP STYLE
# ==========================

GLOBAL_STYLE = f"""
QWidget {{
    background-color: {NEUTRAL_LIGHTEST};
    color: {NEUTRAL_DARKEST};
    font-family: 'Segoe UI', 'Inter', 'Roboto', 'Arial', sans-serif;
    font-size: 16px;
}}

QLabel {{
    color: {NEUTRAL_DARKEST};
    font-size: 16px;
}}

QLineEdit {{
    background-color: white;
    border: 2px solid {NEUTRAL_LIGHT};
    border-radius: 10px;
    padding: 14px 18px;
    font-size: 16px;
    color: {NEUTRAL_DARKEST};
}}

QLineEdit:focus {{
    border: 2px solid {PRIMARY_MAIN};
    background-color: white;
    outline: none;
}}

QLineEdit:hover {{
    border: 2px solid {PRIMARY_LIGHT};
}}

QPushButton {{
    background-color: {PRIMARY_MAIN};
    color: white;
    border: none;
    border-radius: 10px;
    padding: 14px 24px;
    font-size: 16px;
    font-weight: 600;
}}

QPushButton:hover {{
    background-color: {PRIMARY_LIGHT};
}}

QPushButton:pressed {{
    background-color: {PRIMARY_DARK};
}}

QPushButton:disabled {{
    background-color: {NEUTRAL_MEDIUM};
    color: {NEUTRAL_LIGHT};
}}

QFrame {{
    background-color: white;
    border-radius: 12px;
    border: 1px solid {NEUTRAL_LIGHT};
}}

QListWidget {{
    background-color: white;
    border: 2px solid {NEUTRAL_LIGHT};
    border-radius: 10px;
    padding: 8px;
    font-size: 16px;
    outline: none;
}}

QListWidget::item {{
    padding: 14px;
    border-radius: 8px;
    margin: 4px 0px;
}}

QListWidget::item:selected {{
    background-color: {PRIMARY_MAIN};
    color: white;
}}

QListWidget::item:hover {{
    background-color: {NEUTRAL_LIGHTEST};
}}

QTableWidget {{
    background-color: white;
    border: 2px solid {NEUTRAL_LIGHT};
    border-radius: 10px;
    gridline-color: {NEUTRAL_LIGHT};
    font-size: 15px;
    selection-background-color: {PRIMARY_LIGHT};
    selection-color: white;
}}

QTableWidget::item {{
    padding: 12px 8px;
    border: none;
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
        stop:0 {PRIMARY_MAIN},
        stop:1 {PRIMARY_DARK}
    );
    color: white;
    padding: 16px 12px;
    border: none;
    font-weight: 700;
    font-size: 16px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}}

QHeaderView::section:hover {{
    background: qlineargradient(
        x1:0, y1:0, x2:0, y2:1,
        stop:0 {PRIMARY_LIGHT},
        stop:1 {PRIMARY_MAIN}
    );
}}

QTableWidget QTableCornerButton::section {{
    background-color: {PRIMARY_MAIN};
    border: none;
}}

QScrollBar:vertical {{
    border: none;
    background: {NEUTRAL_LIGHTEST};
    width: 12px;
    margin: 0px;
    border-radius: 6px;
}}

QScrollBar::handle:vertical {{
    background: {NEUTRAL_MEDIUM};
    min-height: 20px;
    border-radius: 6px;
}}

QScrollBar::handle:vertical:hover {{
    background: {PRIMARY_MAIN};
}}

QScrollBar::add-line:vertical, QScrollBar::sub-line:vertical {{
    border: none;
    background: none;
}}

QScrollBar:horizontal {{
    border: none;
    background: {NEUTRAL_LIGHTEST};
    height: 12px;
    margin: 0px;
    border-radius: 6px;
}}

QScrollBar::handle:horizontal {{
    background: {NEUTRAL_MEDIUM};
    min-width: 20px;
    border-radius: 6px;
}}

QScrollBar::handle:horizontal:hover {{
    background: {PRIMARY_MAIN};
}}

QScrollBar::add-line:horizontal, QScrollBar::sub-line:horizontal {{
    border: none;
    background: none;
}}
"""

# ==========================
# SPECIFIC COMPONENT STYLES
# ==========================

LOGIN_CONTAINER_STYLE = f"""
QWidget {{
    background: qlineargradient(
        x1:0, y1:0, x2:1, y2:1,
        stop:0 {PRIMARY_DARK},
        stop:0.5 {PRIMARY_MAIN},
        stop:1 {SECONDARY_DARK}
    );
}}
"""

LOGIN_CARD_STYLE = f"""
QFrame {{
    background-color: white;
    border-radius: 20px;
    border: none;
}}
"""

TITLE_STYLE = f"""
QLabel {{
    color: {PRIMARY_MAIN};
    font-size: 36px;
    font-weight: 700;
    letter-spacing: -0.5px;
}}
"""

SUBTITLE_STYLE = f"""
QLabel {{
    color: {NEUTRAL_MEDIUM};
    font-size: 18px;
    font-weight: 500;
}}
"""

HEADER_TITLE_STYLE = f"""
QLabel {{
    color: {PRIMARY_MAIN};
    font-size: 32px;
    font-weight: 700;
    letter-spacing: -0.5px;
}}
"""

USER_LABEL_STYLE = f"""
QLabel {{
    color: {NEUTRAL_DARK};
    font-size: 15px;
    font-weight: 600;
    padding: 10px 20px;
    background: qlineargradient(
        x1:0, y1:0, x2:1, y2:0,
        stop:0 {NEUTRAL_LIGHTEST},
        stop:1 white
    );
    border: 2px solid {SECONDARY_MAIN};
    border-radius: 25px;
}}
"""

LOGOUT_BUTTON_STYLE = f"""
QPushButton {{
    background: qlineargradient(
        x1:0, y1:0, x2:1, y2:0,
        stop:0 {ALERT_MAIN},
        stop:1 {ALERT_LIGHT}
    );
    color: white;
    border: none;
    border-radius: 10px;
    padding: 10px 28px;
    font-size: 15px;
    font-weight: 700;
    letter-spacing: 0.5px;
}}

QPushButton:hover {{
    background: qlineargradient(
        x1:0, y1:0, x2:1, y2:0,
        stop:0 {ALERT_LIGHT},
        stop:1 #FF8A9A
    );
}}

QPushButton:pressed {{
    background-color: {ALERT_DARK};
}}
"""

UPLOAD_BUTTON_STYLE = f"""
QPushButton {{
    background: qlineargradient(
        x1:0, y1:0, x2:0, y2:1,
        stop:0 {SECONDARY_LIGHT},
        stop:1 {SECONDARY_MAIN}
    );
    color: white;
    border: none;
    border-radius: 12px;
    padding: 18px 26px;
    font-size: 18px;
    font-weight: 700;
    letter-spacing: 0.5px;
}}

QPushButton:hover {{
    background: qlineargradient(
        x1:0, y1:0, x2:0, y2:1,
        stop:0 {SECONDARY_GLOW},
        stop:1 {SECONDARY_LIGHT}
    );
}}

QPushButton:pressed {{
    background-color: {SECONDARY_DARK};
}}
"""

PDF_BUTTON_STYLE = f"""
QPushButton {{
    background: qlineargradient(
        x1:0, y1:0, x2:0, y2:1,
        stop:0 {ACCENT_LIGHT},
        stop:1 {ACCENT_MAIN}
    );
    color: white;
    border: none;
    border-radius: 12px;
    padding: 18px 26px;
    font-size: 18px;
    font-weight: 700;
    letter-spacing: 0.5px;
}}

QPushButton:hover {{
    background: qlineargradient(
        x1:0, y1:0, x2:0, y2:1,
        stop:0 {ACCENT_GLOW},
        stop:1 {ACCENT_LIGHT}
    );
}}

QPushButton:pressed {{
    background-color: {ACCENT_DARK};
}}
"""

STATS_CARD_STYLE = f"""
QLabel {{
    padding: 26px;
    background: qlineargradient(
        x1:0, y1:0, x2:0, y2:1,
        stop:0 {NEUTRAL_DARKEST},
        stop:1 {NEUTRAL_DARK}
    );
    border: 3px solid {SECONDARY_MAIN};
    border-radius: 14px;
    font-size: 18px;
    color: white;
    line-height: 2.2;
}}
"""

SECTION_HEADER_STYLE = f"""
QLabel {{
    color: {PRIMARY_MAIN};
    font-size: 26px;
    font-weight: 700;
    padding: 10px 0px;
    letter-spacing: -0.3px;
}}
"""

TOGGLE_BUTTON_STYLE = f"""
QPushButton {{
    background-color: transparent;
    color: {PRIMARY_MAIN};
    border: none;
    font-size: 14px;
    font-weight: 500;
    text-decoration: underline;
}}

QPushButton:hover {{
    color: {PRIMARY_LIGHT};
}}
"""

PANEL_STYLE = f"""
QFrame {{
    background-color: white;
    border-radius: 16px;
    border: 2px solid {NEUTRAL_LIGHT};
    padding: 20px;
}}
"""

CHART_CONTAINER_STYLE = f"""
QFrame {{
    background-color: white;
    border-radius: 14px;
    border: 2px solid {NEUTRAL_LIGHT};
    padding: 16px;
}}
"""

SIDEBAR_STYLE = f"""
QFrame {{
    background: qlineargradient(
        x1:0, y1:0, x2:0, y2:1,
        stop:0 {NEUTRAL_DARK},
        stop:1 {NEUTRAL_DARKEST}
    );
    border: none;
    border-radius: 0px;
}}
"""

SIDEBAR_BUTTON_BASE = f"""
QPushButton {{
    border: none;
    border-radius: 14px;
    padding: 20px 24px;
    font-size: 18px;
    font-weight: 700;
    letter-spacing: 0.5px;
    text-align: left;
}}
"""