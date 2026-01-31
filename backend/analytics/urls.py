from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("analytics.urls")),
]

# Serve media files in both development and production.
# Render has no separate file-server, so Django must serve them directly.
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)