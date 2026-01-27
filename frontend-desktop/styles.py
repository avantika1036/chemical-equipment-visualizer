# ==========================
# COLOR PALETTE
# ==========================

# Primary (Deep Ocean Blue)
PRIMARY_MAIN = "#0A4D8C"
PRIMARY_LIGHT = "#1E6BB8"
PRIMARY_DARK = "#083A6B"

# Secondary (Tech Green/Teal)
SECONDARY_MAIN = "#00A896"
SECONDARY_LIGHT = "#02C39A"
SECONDARY_DARK = "#028174"

# Neutral Grays
NEUTRAL_DARKEST = "#1A1D29"
NEUTRAL_DARK = "#2D3142"
NEUTRAL_MEDIUM = "#4F5D75"
NEUTRAL_LIGHT = "#BFC0C0"
NEUTRAL_LIGHTEST = "#F0F4F8"

# Accent (Vibrant Amber)
ACCENT_MAIN = "#F77F00"
ACCENT_LIGHT = "#FF9500"
ACCENT_DARK = "#D66D00"

# Alert Red
ALERT_MAIN = "#EF233C"
ALERT_LIGHT = "#F25C6B"
ALERT_DARK = "#D90429"

# Success
SUCCESS = SECONDARY_MAIN

# ==========================
# GLOBAL APP STYLE
# ==========================

GLOBAL_STYLE = f"""
QWidget {{
    background-color: {NEUTRAL_LIGHTEST};
    color: {NEUTRAL_DARKEST};
    font-family: 'Segoe UI', 'Arial', sans-serif;
    font-size: 18px;
}}

QLabel {{
    color: {NEUTRAL_DARKEST};
    font-size: 18px;
}}

QLineEdit {{
    background-color: white;
    border: 2px solid {NEUTRAL_LIGHT};
    border-radius: 8px;
    padding: 14px 18px;
    font-size: 19px;
    color: {NEUTRAL_DARKEST};
}}

QLineEdit:focus {{
    border: 2px solid {PRIMARY_MAIN};
    background-color: white;
}}

QLineEdit:hover {{
    border: 2px solid {PRIMARY_LIGHT};
}}

QPushButton {{
    background-color: {PRIMARY_MAIN};
    color: white;
    border: none;
    border-radius: 8px;
    padding: 16px 26px;
    font-size: 19px;
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
    border-radius: 8px;
    padding: 8px;
    font-size: 18px;
    outline: none;
}}

QListWidget::item {{
    padding: 14px;
    border-radius: 6px;
    margin: 2px 0px;
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
    border-radius: 8px;
    gridline-color: {NEUTRAL_LIGHT};
    font-size: 18px;
}}

QTableWidget::item {{
    padding: 10px;
}}

QTableWidget::item:selected {{
    background-color: {PRIMARY_LIGHT};
    color: white;
}}

QHeaderView::section {{
    background-color: {PRIMARY_MAIN};
    color: white;
    padding: 14px;
    border: none;
    font-weight: 600;
    font-size: 18px;
}}

QTableWidget QTableCornerButton::section {{
    background-color: {PRIMARY_MAIN};
    border: none;
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
        stop:1 {PRIMARY_MAIN}
    );
}}
"""

LOGIN_CARD_STYLE = f"""
QFrame {{
    background-color: white;
    border-radius: 16px;
    border: none;
}}
"""

TITLE_STYLE = f"""
QLabel {{
    color: {PRIMARY_MAIN};
    font-size: 32px;
    font-weight: 700;
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
    font-size: 28px;
    font-weight: 700;
}}
"""

USER_LABEL_STYLE = f"""
QLabel {{
    color: {NEUTRAL_DARK};
    font-size: 16px;
    font-weight: 500;
    padding: 8px 16px;
    background-color: {NEUTRAL_LIGHTEST};
    border-radius: 20px;
}}
"""

LOGOUT_BUTTON_STYLE = f"""
QPushButton {{
    background-color: {ALERT_MAIN};
    color: white;
    border: none;
    border-radius: 8px;
    padding: 10px 24px;
    font-size: 15px;
    font-weight: 600;
}}

QPushButton:hover {{
    background-color: {ALERT_LIGHT};
}}

QPushButton:pressed {{
    background-color: {ALERT_DARK};
}}
"""

UPLOAD_BUTTON_STYLE = f"""
QPushButton {{
    background-color: {SECONDARY_MAIN};
    color: white;
    border: none;
    border-radius: 10px;
    padding: 16px 24px;
    font-size: 16px;
    font-weight: 700;
}}

QPushButton:hover {{
    background-color: {SECONDARY_LIGHT};
}}

QPushButton:pressed {{
    background-color: {SECONDARY_DARK};
}}
"""

PDF_BUTTON_STYLE = f"""
QPushButton {{
    background-color: {ACCENT_MAIN};
    color: white;
    border: none;
    border-radius: 10px;
    padding: 16px 24px;
    font-size: 16px;
    font-weight: 700;
}}

QPushButton:hover {{
    background-color: {ACCENT_LIGHT};
}}

QPushButton:pressed {{
    background-color: {ACCENT_DARK};
}}
"""

STATS_CARD_STYLE = f"""
QLabel {{
    padding: 22px;
    background: qlineargradient(
        x1:0, y1:0, x2:0, y2:1,
        stop:0 white,
        stop:1 {NEUTRAL_LIGHTEST}
    );
    border: 2px solid {SECONDARY_LIGHT};
    border-radius: 12px;
    font-size: 19px;
    line-height: 2.0;
}}
"""

SECTION_HEADER_STYLE = f"""
QLabel {{
    color: {PRIMARY_MAIN};
    font-size: 28px;
    font-weight: 700;
    padding: 8px 0px;
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
    padding: 16px;
}}
"""