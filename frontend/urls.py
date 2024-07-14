from django.urls import path
from .views import mycloud

urlpatterns = [
    path('', mycloud),
    # path('login/', mycloud, name='login'),
    # path('reg/', mycloud, name='reg'),
    # path('admin/', mycloud, name='admin'),
    # path('user/', mycloud, name='user'),
]