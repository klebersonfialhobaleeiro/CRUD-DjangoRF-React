from django.contrib import admin
from django.urls import path, include
from API.urls import router

urlpatterns = [
    path('admin/', admin.site.urls),
    path('API/', include(router.urls)),
]
