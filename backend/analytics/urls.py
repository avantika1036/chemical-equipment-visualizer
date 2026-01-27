from django.urls import path
from .views import CSVUploadAPIView, DatasetHistoryAPIView
from .views_pdf import generate_pdf

urlpatterns = [
    path("upload/", CSVUploadAPIView.as_view()),
    path("history/", DatasetHistoryAPIView.as_view()),
    path("pdf/<int:dataset_id>/", generate_pdf),
]
