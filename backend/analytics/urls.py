from django.urls import path
from .views import CSVUploadAPIView, DatasetHistoryAPIView

urlpatterns = [
    path("upload/", CSVUploadAPIView.as_view()),
    path("history/", DatasetHistoryAPIView.as_view()),
]
