import requests

BASE_URL = "http://127.0.0.1:8000/api"

def auth_headers(token):
    return {
        "Authorization": f"Token {token}"
    }

def get_history(token):
    return requests.get(
        f"{BASE_URL}/history/",
        headers=auth_headers(token)
    )

def upload_csv(token, file_path):
    files = {"file": open(file_path, "rb")}
    return requests.post(
        f"{BASE_URL}/upload/",
        headers=auth_headers(token),
        files=files
    )
