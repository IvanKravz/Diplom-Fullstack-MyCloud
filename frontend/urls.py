from django.urls import path
from .views import mycloud

urlpatterns = [
    path('', mycloud),
    path('login/', mycloud),
    path('reg/', mycloud),
    path('admin/', mycloud),
    path('user/', mycloud),
]