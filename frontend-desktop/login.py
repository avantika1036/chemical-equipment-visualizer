import requests
from PyQt5.QtWidgets import (
    QWidget, QLabel, QLineEdit, QPushButton,
    QVBoxLayout, QHBoxLayout, QMessageBox, QFrame, QGraphicsDropShadowEffect
)
from PyQt5.QtCore import Qt
from PyQt5.QtGui import QFont

from dashboard import DashboardWindow
from styles import *


class LoginWindow(QWidget):
    def __init__(self):
        super().__init__()

        self.setWindowTitle("Chemical Equipment Visualizer - Login")
        self.setFixedSize(800, 1000)

        # login / signup mode
        self.is_login = True

        self.init_ui()
        self.setStyleSheet(LOGIN_CONTAINER_STYLE)

    # ==========================
    # UI
    # ==========================
    def init_ui(self):
        # Main container with gradient background
        main_layout = QVBoxLayout()
        main_layout.setContentsMargins(20, 20, 20, 20)
        main_layout.setAlignment(Qt.AlignCenter)

        # Central card
        card = QFrame()
        card.setStyleSheet(LOGIN_CARD_STYLE)
        card.setFixedWidth(600)
        
        # Add shadow effect
        shadow = QGraphicsDropShadowEffect()
        shadow.setBlurRadius(30)
        shadow.setColor(Qt.black)
        shadow.setOffset(0, 10)
        card.setGraphicsEffect(shadow)

        card_layout = QVBoxLayout()
        card_layout.setSpacing(25)
        card_layout.setContentsMargins(25, 25, 25, 25)

        # App icon/logo placeholder
        logo_label = QLabel("🧪")
        logo_label.setAlignment(Qt.AlignCenter)
        logo_label.setStyleSheet("font-size: 90px;")

        # Title
        title = QLabel("Chemical Equipment")
        title.setAlignment(Qt.AlignCenter)
        title.setStyleSheet(f"""
            QLabel {{
                color: {PRIMARY_MAIN};
                font-size: 45px;
                font-weight: 700;
            }}
        """)

        subtitle_main = QLabel("Visualizer")
        subtitle_main.setAlignment(Qt.AlignCenter)
        subtitle_main.setStyleSheet(f"""
            QLabel {{
                color: {SECONDARY_MAIN};
                font-size: 40px;
                font-weight: 700;
            }}
        """)

        # Login/Signup label
        self.mode_label = QLabel("Login to your account")
        self.mode_label.setAlignment(Qt.AlignCenter)
        self.mode_label.setStyleSheet(f"""
            QLabel {{
                color: {NEUTRAL_MEDIUM};
                font-size: 30px;
                font-weight: 500;
            }}
        """)

        # Input fields
        self.email_input = QLineEdit()
        self.email_input.setPlaceholderText("📧 Email Address")
        self.email_input.setMinimumHeight(60)
        self.email_input.setStyleSheet(f"""
            QLineEdit {{
                background-color: {NEUTRAL_LIGHTEST};
                border: 2px solid {NEUTRAL_LIGHT};
                border-radius: 12px;
                padding: 16px 24px;
                font-size: 28px;
                color: {NEUTRAL_DARKEST};
            }}
            QLineEdit:focus {{
                border: 2px solid {PRIMARY_MAIN};
                background-color: white;
            }}
            QLineEdit:hover {{
                border: 2px solid {PRIMARY_LIGHT};
            }}
        """)

        self.password_input = QLineEdit()
        self.password_input.setPlaceholderText("🔒 Password")
        self.password_input.setEchoMode(QLineEdit.Password)
        self.password_input.setMinimumHeight(60)
        self.password_input.setStyleSheet(f"""
            QLineEdit {{
                background-color: {NEUTRAL_LIGHTEST};
                border: 2px solid {NEUTRAL_LIGHT};
                border-radius: 12px;
                padding: 16px 24px;
                font-size: 28px;
                color: {NEUTRAL_DARKEST};
            }}
            QLineEdit:focus {{
                border: 2px solid {PRIMARY_MAIN};
                background-color: white;
            }}
            QLineEdit:hover {{
                border: 2px solid {PRIMARY_LIGHT};
            }}
        """)

        # Submit button
        self.submit_btn = QPushButton("LOGIN")
        self.submit_btn.setMinimumHeight(65)
        self.submit_btn.setCursor(Qt.PointingHandCursor)
        self.submit_btn.setStyleSheet(f"""
            QPushButton {{
                background: qlineargradient(
                    x1:0, y1:0, x2:1, y2:0,
                    stop:0 {PRIMARY_MAIN},
                    stop:1 {PRIMARY_LIGHT}
                );
                color: white;
                border: none;
                border-radius: 14px;
                padding: 18px 28px;
                font-size: 28px;
                font-weight: 700;
            }}
            QPushButton:hover {{
                background: qlineargradient(
                    x1:0, y1:0, x2:1, y2:0,
                    stop:0 {PRIMARY_LIGHT},
                    stop:1 {SECONDARY_LIGHT}
                );
            }}
            QPushButton:pressed {{
                background-color: {PRIMARY_DARK};
            }}
        """)
        self.submit_btn.clicked.connect(self.handle_submit)

        # Toggle button
        self.toggle_btn = QPushButton("Don't have an account? Create one")
        self.toggle_btn.setCursor(Qt.PointingHandCursor)
        self.toggle_btn.setStyleSheet(f"""
            QPushButton {{
                background-color: transparent;
                color: {SECONDARY_MAIN};
                border: none;
                font-size: 28px;
                font-weight: 600;
                text-decoration: underline;
            }}
            QPushButton:hover {{
                color: {SECONDARY_LIGHT};
            }}
        """)
        self.toggle_btn.clicked.connect(self.toggle_mode)

        # Add all widgets to card layout
        card_layout.addWidget(logo_label)
        card_layout.addWidget(title)
        card_layout.addWidget(subtitle_main)
        card_layout.addSpacing(10)
        card_layout.addWidget(self.mode_label)
        card_layout.addSpacing(20)
        card_layout.addWidget(self.email_input)
        card_layout.addWidget(self.password_input)
        card_layout.addSpacing(10)
        card_layout.addWidget(self.submit_btn)
        card_layout.addSpacing(10)
        card_layout.addWidget(self.toggle_btn)

        card.setLayout(card_layout)
        main_layout.addWidget(card)
        
        self.setLayout(main_layout)

    # ==========================
    # TOGGLE LOGIN / SIGNUP
    # ==========================
    def toggle_mode(self):
        self.is_login = not self.is_login

        if self.is_login:
            self.mode_label.setText("Login to your account")
            self.submit_btn.setText("LOGIN")
            self.toggle_btn.setText("Don't have an account? Create one")
        else:
            self.mode_label.setText("Create your account")
            self.submit_btn.setText("CREATE ACCOUNT")
            self.toggle_btn.setText("Already have an account? Login")

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
            f"Welcome, {email}!",
            QMessageBox.Information
        )

        self.dashboard = DashboardWindow(token, email)
        self.dashboard.show()
        self.close()

    # ==========================
    # CUSTOM MESSAGE BOX
    # ==========================
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
                font-size: 24px;
                min-width: 350px;
            }}
            QPushButton {{
                background-color: {PRIMARY_MAIN};
                color: white;
                border: none;
                border-radius: 6px;
                padding: 10px 24px;
                font-size: 23px;
                min-width: 90px;
            }}
            QPushButton:hover {{
                background-color: {PRIMARY_LIGHT};
            }}
        """)
        msg.exec_()