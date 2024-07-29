from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model
import re

UserModel = get_user_model()

def custom_validation(data):
    patternLogin = (r"^[A-Z][a-zA-Z0-9]{4,20}$").strip()
    patternPassword = (r"(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}").strip()
    userlogin = data['userlogin'].strip()
    username = data['username'].strip()
    email = data['email'].strip()
    password = data['password'].strip()

    if not userlogin or re.match(patternLogin, userlogin) is None:
        raise ValidationError('Выберите другой логин')

    if not username:
        raise ValidationError('Выберите другое имя')
    
    if not password or re.match(patternPassword, password) is None:
        raise ValidationError('Выберите другой пароль')
    
    if not email or UserModel.objects.filter(email=email).exists():
        raise ValidationError('Такой email уже существует')
    
    return data