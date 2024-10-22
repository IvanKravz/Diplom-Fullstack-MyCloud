from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
from .routers import router
from accounts.views import pageNotFound
from files.views import send_file

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('', include('frontend.urls')),
    path('s/<str:hash>/', send_file,  name='send_file'),
    path('', include('accounts.urls')),
] 
 
handler404 = pageNotFound

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
