from django.contrib.auth import login, logout
from rest_framework.views import APIView
from .validations import custom_validation
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication
from django.shortcuts import render
from django.http import HttpResponseNotFound

from rest_framework import viewsets, permissions, status
from .models import User
from .serializers import ApiUserSerializers, UserRegisterSerializer, UserLoginSerializer, UserSerializer


class ApiUserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ApiUserSerializers


class UserRegister(APIView):
    permission_classes = [
        permissions.AllowAny
    ]
    
    def post(self, request):
        clean_data = custom_validation(request.data)
        serializer = UserRegisterSerializer(data=clean_data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.create(clean_data)
            if user:
                return Response({
                    'id': user.id,
                    'username': user.username,
                    'password': user.password
                }, status=status.HTTP_200_OK)
            
        return Response(status=status.HTTP_400_BAD_REQUEST)


class UserLogin(APIView):
    permission_classes = [
        permissions.AllowAny
    ]
    authentication_classes = [
        SessionAuthentication
    ]
    
    def post(self, request):
        data = request.data
        serializer = UserLoginSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.check_user(data)
            login(request, user)
            return Response({
                'id': user.id,
                'username': user.username,
                'password': user.password
            }, status=status.HTTP_200_OK)
        

class UserLogout(APIView):
    def post(self, requset):
        logout(requset)
        return Response(status=status.HTTP_200_OK)


class UserView(APIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    authentication_classes = [
        SessionAuthentication
    ]

    def get(self, requset):
        serializer = UserSerializer(requset.user)
        return Response({'user': serializer.data}, status=status.HTTP_200_OK)
    
    
# def pageNotFound(request, exception):
#     return render(request, '404.html', status=404)

def pageNotFound(request, exception):
    return HttpResponseNotFound('<h1>Страница не найдена</h1>')