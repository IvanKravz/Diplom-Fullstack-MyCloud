from rest_framework import serializers
from files.models import File
from .models import User
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password
from rest_framework.authtoken.models import Token


class FilesSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = ('id', 'filename', 'description', 'size', 'link', 'upload_time', 'downloadTime')

class ApiUserSerializers(serializers.ModelSerializer):
    files = FilesSerializer(read_only=True)
    
    class Meta:
        model = User
        fields = ('id', 'userlogin', 'username', 'email', 'password', 'is_staff', 'files')

    def update(self, instance, validated_data):
        if 'password' in validated_data:
            validated_data['password'] = make_password(validated_data['password'])
        return super().update(instance, validated_data)   

    def create(self, validated_data):
        user_obj = User.objects.create_user(
            userlogin=validated_data['userlogin'],
            username=validated_data['username'],
            email=validated_data['email'],
            is_staff=validated_data['is_staff'],
            password=make_password(validated_data['password'])
        )
        return user_obj


class TokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Token
        fields = ['key']


class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'userlogin', 'username', 'email', 'is_staff', 'password')
    
    def create(self, validated_data):
        user_obj = User.objects.create_user(
            userlogin=validated_data['userlogin'],
            username=validated_data['username'],
            email=validated_data['email'],
            is_staff=validated_data['is_staff'],
            password=validated_data['password']
        )
        return user_obj


class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def check_user(self, data):
        user = authenticate(username=data['username'], password=data['password'])
        if user and user.is_active:
            return user
        raise serializers.ValidationError('Пользователь не найден')


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'userlogin', 'username', 'email', 'is_staff', 'password')
        