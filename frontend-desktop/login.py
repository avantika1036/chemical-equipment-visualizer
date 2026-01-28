import requests
from PyQt5.QtWidgets import (
    QWidget, QLabel, QLineEdit, QPushButton,
    QVBoxLayout, QHBoxLayout, QMessageBox, QFrame, QGraphicsDropShadowEffect
)
from PyQt5.QtCore import Qt, QPropertyAnimation, QEasingCurve
from PyQt5.QtGui import QFont, QColor

from styles import *


class LoginWindow(QWidget):
    def __init__(self):
        super().__init__()

        self.setWindowTitle("Chemical Equipment Visualizer - Login")
        self.setFixedSize(1100, 1200)  # Even larger!

        # login / signup mode
        self.is_login = True

        self.init_ui()
        self.setStyleSheet(LOGIN_CONTAINER_STYLE)

    # ==========================
    # UI (MUCH LARGER & MORE READABLE)
    # ==========================
    def init_ui(self):
        # Main container with gradient background
        main_layout = QVBoxLayout()
        main_layout.setContentsMargins(40, 40, 40, 40)
        main_layout.setAlignment(Qt.AlignCenter)

        # Central card - MUCH LARGER
        card = QFrame()
        card.setStyleSheet(LOGIN_CARD_STYLE)
        card.setFixedWidth(850)  # Wider card
        
        # Enhanced shadow effect
        shadow = QGraphicsDropShadowEffect()
        shadow.setBlurRadius(50)
        shadow.setColor(QColor(0, 0, 0, 120))
        shadow.setOffset(0, 18)
        card.setGraphicsEffect(shadow)

        card_layout = QVBoxLayout()
        card_layout.setSpacing(32)
        card_layout.setContentsMargins(60, 60, 60, 60)

        # App icon/logo - MUCH LARGER
        logo_label = QLabel("🧪")
        logo_label.setAlignment(Qt.AlignCenter)
        logo_label.setStyleSheet("font-size: 120px;")  # HUGE!

        # Title - MUCH LARGER
        title = QLabel("Chemical Equipment")
        title.setAlignment(Qt.AlignCenter)
        title.setStyleSheet(f"""
            QLabel {{
                color: {PRIMARY_MAIN};
                font-size: 56px;
                font-weight: 700;
                letter-spacing: -0.5px;
            }}
        """)

        subtitle_main = QLabel("Visualizer")
        subtitle_main.setAlignment(Qt.AlignCenter)
        subtitle_main.setStyleSheet(f"""
            QLabel {{
                color: {SECONDARY_MAIN};
                font-size: 50px;
                font-weight: 700;
                letter-spacing: -0.3px;
            }}
        """)

        # Tagline - LARGER
        tagline = QLabel("Analyze • Visualize • Optimize")
        tagline.setAlignment(Qt.AlignCenter)
        tagline.setStyleSheet(f"""
            QLabel {{
                color: {NEUTRAL_MEDIUM};
                font-size: 24px;
                font-weight: 500;
                font-style: italic;
                letter-spacing: 1.2px;
            }}
        """)

        # Login/Signup label - LARGER
        self.mode_label = QLabel("Sign in to your account")
        self.mode_label.setAlignment(Qt.AlignCenter)
        self.mode_label.setStyleSheet(f"""
            QLabel {{
                color: {NEUTRAL_DARK};
                font-size: 32px;
                font-weight: 600;
                padding: 12px;
            }}
        """)

        # Input fields - MUCH LARGER
        self.email_input = QLineEdit()
        self.email_input.setPlaceholderText("📧 Email Address")
        self.email_input.setMinimumHeight(75)  # TALLER!
        self.email_input.setStyleSheet(f"""
            QLineEdit {{
                background-color: {NEUTRAL_LIGHTEST};
                border: 3px solid {NEUTRAL_LIGHT};
                border-radius: 16px;
                padding: 18px 30px;
                font-size: 26px;
                color: {NEUTRAL_DARKEST};
            }}
            QLineEdit:focus {{
                border: 3px solid {PRIMARY_MAIN};
                background-color: white;
                outline: none;
            }}
            QLineEdit:hover {{
                border: 3px solid {PRIMARY_LIGHT};
                background-color: white;
            }}
        """)

        self.password_input = QLineEdit()
        self.password_input.setPlaceholderText("🔒 Password")
        self.password_input.setEchoMode(QLineEdit.Password)
        self.password_input.setMinimumHeight(75)  # TALLER!
        self.password_input.setStyleSheet(f"""
            QLineEdit {{
                background-color: {NEUTRAL_LIGHTEST};
                border: 3px solid {NEUTRAL_LIGHT};
                border-radius: 16px;
                padding: 20px 30px;
                font-size: 26px;
                color: {NEUTRAL_DARKEST};
            }}
            QLineEdit:focus {{
                border: 3px solid {PRIMARY_MAIN};
                background-color: white;
                outline: none;
            }}
            QLineEdit:hover {{
                border: 3px solid {PRIMARY_LIGHT};
                background-color: white;
            }}
        """)

        # Submit button - MUCH LARGER
        self.submit_btn = QPushButton("SIGN IN")
        self.submit_btn.setMinimumHeight(80)  # TALLER!
        self.submit_btn.setCursor(Qt.PointingHandCursor)
        self.submit_btn.setStyleSheet(f"""
            QPushButton {{
                background: qlineargradient(
                    x1:0, y1:0, x2:1, y2:0,
                    stop:0 {PRIMARY_MAIN},
                    stop:0.5 {PRIMARY_LIGHT},
                    stop:1 {SECONDARY_MAIN}
                );
                color: white;
                border: none;
                border-radius: 18px;
                padding: 24px 36px;
                font-size: 28px;
                font-weight: 700;
                letter-spacing: 2px;
            }}
            QPushButton:hover {{
                background: qlineargradient(
                    x1:0, y1:0, x2:1, y2:0,
                    stop:0 {PRIMARY_LIGHT},
                    stop:0.5 {PRIMARY_GLOW},
                    stop:1 {SECONDARY_LIGHT}
                );
                padding: 25px 36px;
            }}
            QPushButton:pressed {{
                background-color: {PRIMARY_DARK};
                padding: 23px 36px;
            }}
        """)
        self.submit_btn.clicked.connect(self.handle_submit)

        # Toggle button - LARGER
        self.toggle_btn = QPushButton("Don't have an account? Sign up")
        self.toggle_btn.setCursor(Qt.PointingHandCursor)
        self.toggle_btn.setStyleSheet(f"""
            QPushButton {{
                background-color: transparent;
                color: {SECONDARY_MAIN};
                border: none;
                font-size: 26px;
                font-weight: 600;
                text-decoration: underline;
                padding: 12px;
            }}
            QPushButton:hover {{
                color: {SECONDARY_LIGHT};
            }}
        """)
        self.toggle_btn.clicked.connect(self.toggle_mode)

        # Decorative divider
        divider = QFrame()
        divider.setFrameShape(QFrame.HLine)
        divider.setStyleSheet(f"""
            QFrame {{
                background-color: {NEUTRAL_LIGHT};
                border: none;
                height: 2px;
                margin: 12px 0px;
            }}
        """)

        # Add all widgets to card layout
        card_layout.addWidget(logo_label)
        card_layout.addWidget(title)
        card_layout.addWidget(subtitle_main)
        card_layout.addWidget(tagline)
        card_layout.addSpacing(20)
        card_layout.addWidget(self.mode_label)
        card_layout.addSpacing(25)
        card_layout.addWidget(self.email_input)
        card_layout.addWidget(self.password_input)
        card_layout.addSpacing(20)
        card_layout.addWidget(self.submit_btn)
        card_layout.addWidget(divider)
        card_layout.addWidget(self.toggle_btn)
        card_layout.addSpacing(15)

        card.setLayout(card_layout)
        main_layout.addWidget(card)
        
        self.setLayout(main_layout)

    # ==========================
    # TOGGLE LOGIN / SIGNUP
    # ==========================
    def toggle_mode(self):
        self.is_login = not self.is_login

        if self.is_login:
            self.mode_label.setText("Sign in to access your datasets")
            self.submit_btn.setText("SIGN IN")
            self.toggle_btn.setText("Don't have an account? Sign up")
        else:
            self.mode_label.setText("Create an account to get started")
            self.submit_btn.setText("CREATE ACCOUNT")
            self.toggle_btn.setText("Already have an account? Sign in")

    # ==========================
    # SUBMIT
    # ==========================
    def handle_submit(self):
        email = self.email_input.text().strip()
        password = self.password_input.text().strip()

        if not email or not password:
            self.show_message("Error", "All fields are required", QMessageBox.Warning)
            return

        if self.is_login:
            self.login(email, password)
        else:
            self.register(email, password)

    # ==========================
    # LOGIN
    # ==========================
    def login(self, email, password):
        try:
            response = requests.post(
                "http://127.0.0.1:8000/api/auth/login/",
                json={
                    "email": email,
                    "password": password
                }
            )

            if response.status_code != 200:
                self.show_message(
                    "Login Failed",
                    "Invalid email or password",
                    QMessageBox.Warning
                )
                return

            data = response.json()
            self.open_dashboard(data["token"], data["email"])

        except Exception as e:
            self.show_message("Error", str(e), QMessageBox.Critical)

    # ==========================
    # REGISTER
    # ==========================
    def register(self, email, password):
        try:
            response = requests.post(
                "http://127.0.0.1:8000/api/auth/register/",
                json={
                    "email": email,
                    "password": password
                }
            )

            if response.status_code not in (200, 201):
                self.show_message(
                    "Signup Failed",
                    "User may already exist",
                    QMessageBox.Warning
                )
                return

            # auto-login after signup
            self.login(email, password)

        except Exception as e:
            self.show_message("Error", str(e), QMessageBox.Critical)

    # ==========================
    # OPEN DASHBOARD
    # ==========================
    def open_dashboard(self, token, email):
        # save token locally
        with open("token.txt", "w") as f:
            f.write(token)

        self.show_message(
            "Success",
            f"Welcome, {email}! 🎉",
            QMessageBox.Information
        )

        from dashboard import DashboardWindow
        self.dashboard = DashboardWindow(token, email)
        self.dashboard.show()
        self.close()

    # ==========================
    # CUSTOM MESSAGE BOX (LARGER TEXT)
    # ==========================
    def show_message(self, title, message, icon):
        msg = QMessageBox(self)
        msg.setWindowTitle(title)
        msg.setText(message)
        msg.setIcon(icon)
        msg.setStyleSheet(f"""
            QMessageBox {{
                background-color: white;
                border-radius: 14px;
            }}
            QMessageBox QLabel {{
                color: white;
                font-weight: 600;
                font-size: 24px;
                min-width: 450px;
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
                padding: 14px 32px;
                font-size: 24px;
                font-weight: 700;
                min-width: 120px;
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