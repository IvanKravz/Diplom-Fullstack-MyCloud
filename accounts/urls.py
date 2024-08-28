from .views import UserRegister, UserLogin, UserLogout, UserView
from django.urls import path

urlpatterns = [
    path('api/register', UserRegister.as_view()),
    path('api/login', UserLogin.as_view()),
    path('api/logout', UserLogout.as_view()),
    path('api/user', UserView.as_view()),
]   
