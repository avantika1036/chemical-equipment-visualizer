import requests
from PyQt5.QtWidgets import (
    QWidget, QLabel, QLineEdit, QPushButton,
    QVBoxLayout, QMessageBox
)
from PyQt5.QtCore import Qt

from dashboard import DashboardWindow


class LoginWindow(QWidget):
    def __init__(self):
        super().__init__()

        self.setWindowTitle("Chemical Equipment Visualizer")
        self.setFixedSize(360, 280)

        # login / signup mode
        self.is_login = True

        self.init_ui()

    # ==========================
    # UI
    # ==========================
    def init_ui(self):
        layout = QVBoxLayout()
        layout.setSpacing(12)

        title = QLabel("Chemical Equipment Visualizer")
        title.setAlignment(Qt.AlignCenter)
        title.setStyleSheet("font-size:18px;font-weight:700;")

        subtitle = QLabel("Login")
        subtitle.setAlignment(Qt.AlignCenter)
        subtitle.setStyleSheet("font-size:14px;")

        self.subtitle = subtitle

        self.email_input = QLineEdit()
        self.email_input.setPlaceholderText("Email")

        self.password_input = QLineEdit()
        self.password_input.setPlaceholderText("Password")
        self.password_input.setEchoMode(QLineEdit.Password)

        self.submit_btn = QPushButton("Login")
        self.submit_btn.setFixedHeight(36)
        self.submit_btn.clicked.connect(self.handle_submit)

        self.toggle_btn = QPushButton("Create Account")
        self.toggle_btn.setFlat(True)
        self.toggle_btn.clicked.connect(self.toggle_mode)

        layout.addWidget(title)
        layout.addWidget(subtitle)
        layout.addSpacing(10)
        layout.addWidget(self.email_input)
        layout.addWidget(self.password_input)
        layout.addWidget(self.submit_btn)
        layout.addWidget(self.toggle_btn)

        self.setLayout(layout)

    # ==========================
    # TOGGLE LOGIN / SIGNUP
    # ==========================
    def toggle_mode(self):
        self.is_login = not self.is_login

        if self.is_login:
            self.subtitle.setText("Login")
            self.submit_btn.setText("Login")
            self.toggle_btn.setText("Create Account")
        else:
            self.subtitle.setText("Create Account")
            self.submit_btn.setText("Create Account")
            self.toggle_btn.setText("Already have an account? Login")

    # ==========================
    # SUBMIT
    # ==========================
    def handle_submit(self):
        email = self.email_input.text().strip()
        password = self.password_input.text().strip()

        if not email or not password:
            QMessageBox.warning(self, "Error", "All fields are required")
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
                QMessageBox.warning(
                    self,
                    "Login Failed",
                    "Invalid email or password"
                )
                return

            data = response.json()
            self.open_dashboard(data["token"], data["email"])

        except Exception as e:
            QMessageBox.critical(self, "Error", str(e))

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
                QMessageBox.warning(
                    self,
                    "Signup Failed",
                    "User may already exist"
                )
                return

            # auto-login after signup
            self.login(email, password)

        except Exception as e:
            QMessageBox.critical(self, "Error", str(e))

    # ==========================
    # OPEN DASHBOARD
    # ==========================
    def open_dashboard(self, token, email):
        # save token locally
        with open("token.txt", "w") as f:
            f.write(token)

        QMessageBox.information(
            self,
            "Success",
            f"Logged in as {email}"
        )

        self.dashboard = DashboardWindow(token, email)
        self.dashboard.show()
        self.close()