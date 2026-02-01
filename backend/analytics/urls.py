from django.urls import path
from .views import CSVUploadAPIView, DatasetHistoryAPIView, health_check
from .views_pdf import generate_pdf
from .views_auth import RegisterAPIView, LoginAPIView

urlpatterns = [
    path("", health_check),  # Add this line
    path("upload/", CSVUploadAPIView.as_view()),
    path("history/", DatasetHistoryAPIView.as_view()),
    path("pdf/<int:dataset_id>/", generate_pdf),
    path("auth/register/", RegisterAPIView.as_view()),
    path("auth/login/", LoginAPIView.as_view()),
]