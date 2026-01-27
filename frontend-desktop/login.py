import sys
import requests
from PyQt5.QtWidgets import (
    QWidget, QLabel, QLineEdit, QPushButton,
    QVBoxLayout, QMessageBox
)
from dashboard import DashboardWindow


class LoginWindow(QWidget):
    def __init__(self):
        super().__init__()

        self.setWindowTitle("Login")
        self.setFixedSize(320, 220)

        layout = QVBoxLayout()

        self.email_input = QLineEdit()
        self.email_input.setPlaceholderText("Email")

        self.password_input = QLineEdit()
        self.password_input.setPlaceholderText("Password")
        self.password_input.setEchoMode(QLineEdit.Password)

        self.login_btn = QPushButton("Login")
        self.login_btn.clicked.connect(self.login)

        layout.addWidget(QLabel("Login"))
        layout.addWidget(self.email_input)
        layout.addWidget(self.password_input)
        layout.addWidget(self.login_btn)

        self.setLayout(layout)

    def login(self):
        email = self.email_input.text()
        password = self.password_input.text()

        try:
            response = requests.post(
                "http://127.0.0.1:8000/api/auth/login/",
                json={
                    "email": email,
                    "password": password
                }
            )

            if response.status_code == 200:
                data = response.json()

                token = data["token"]
                user_email = data["email"]

                # store token locally
                with open("token.txt", "w") as f:
                    f.write(token)

                QMessageBox.information(
                    self,
                    "Login Success",
                    f"Logged in as {user_email}"
                )

                # ✅ PASS TOKEN & EMAIL
                self.dashboard = DashboardWindow(token, user_email)
                self.dashboard.show()
                self.close()

            else:
                QMessageBox.warning(
                    self,
                    "Login Failed",
                    "Invalid credentials"
                )

        except Exception as e:
            QMessageBox.critical(self, "Error", str(e))
