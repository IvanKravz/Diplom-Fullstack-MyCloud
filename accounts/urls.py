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
#     "userlogin": "Sdfdfg",
#     "username": "Frr55",
#     "email": "k33333s2@dsf.ru",
#     "is_staff": true,
#     "password": "Krw&w12345"
# }

# {
#     "userlogin": "S44Se45s",
#     "username": "4444",
#     "email": "k3errr3333s2@dsf.ru",
#     "is_staff": false,
#     "password": "Krwer&w1234"
# }

# {
#         "userlogin": "S466yy",
#         "username": "Gffr$$",
#         "password": "GFrrt444#",
#         "email": "k2@dsf.ru",
#         "is_active": true,
#         "is_staff": true
# }