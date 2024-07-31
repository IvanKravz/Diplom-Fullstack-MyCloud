from rest_framework import serializers
from .models import User
from django.contrib.auth import authenticate


class ApiUserSerializers(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('userlogin', 'username', 'email', 'is_staff', 'password')
    
    def create(self, clean_data):
        print(clean_data)
        user_obj = User.objects.create_user(
            userlogin=clean_data['userlogin'],
            username=clean_data['username'],
            email=clean_data['email'],
            is_staff=clean_data['is_staff'],
            password=clean_data['password']
        )
        return user_obj


class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def check_user(self, data):
        user = authenticate(username=data['username'], password=data['password'])
        if not user:
            raise serializers.ValidationError('Пользователь не найден')
        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'userlogin')