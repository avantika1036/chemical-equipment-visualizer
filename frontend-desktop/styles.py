PRIMARY = "#2563eb"
BG = "#f8fafc"
CARD = "#ffffff"
TEXT = "#0f172a"
MUTED = "#64748b"
BORDER = "#e2e8f0"

CARD_STYLE = f"""
QFrame {{
    background-color: {CARD};
    border-radius: 12px;
    border: 1px solid {BORDER};
}}
"""

TITLE_STYLE = f"""
color: {TEXT};
font-size: 18px;
font-weight: bold;
"""

SUBTEXT_STYLE = f"""
color: {MUTED};
font-size: 11px;
"""