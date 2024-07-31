from .views import ApiUserViewSet, UserRegister, UserLogin, UserLogout, UserView
from rest_framework.routers import DefaultRouter
from django.urls import path


urlpatterns = [
    path('api/register', UserRegister.as_view()),
    path('api/login', UserLogin.as_view()),
    path('api/logout', UserLogout.as_view()),
    path('api/user', UserView.as_view()),
]   




# {
#     "userlogin": "2222",
#     "username": "S44Sssss",
#     "email": "k2wwrrw2@dsf.ru",
#     "is_staff": true,
#     "password": "Krw&w1234"
# }


# {
#     "userlogin": "3333",
#     "username": "S44Sssss",
#     "email": "k33333s2@dsf.ru",
#     "is_staff": true,
#     "password": "Krw&w1234"
# }

# {
#     "userlogin": "4444",
#     "username": "S44Se45s",
#     "email": "k3errr3333s2@dsf.ru",
#     "is_staff": false,
#     "password": "Krwer&w1234"
# }