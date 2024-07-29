from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
from .routers import router

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('mycloud/', include('frontend.urls')),

    path('', include('accounts.urls')),
    # path('register'),
    # path('login'),
    # path('logout'),
    # path('user'),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
 