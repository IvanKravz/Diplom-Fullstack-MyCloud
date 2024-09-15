from django.contrib.auth import login, logout
from rest_framework.views import APIView
from .validations import custom_validation
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.authtoken.models import Token
from django.shortcuts import render

from rest_framework import viewsets, permissions, status
from .models import User
from .serializers import ApiUserSerializers, TokenSerializer, UserRegisterSerializer, UserLoginSerializer, UserSerializer


class ApiUserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = ApiUserSerializers
    
    
    # permission_classes = [
    #     permissions.IsAuthenticated
    # ]
    
    # authentication_classes = ([
    #     SessionAuthentication
    # ])

    # def perform_create(self, serializer):
    #     print('serializer', serializer)
    #     serializer.save()


    # def partial_update(self, request, *args, **kwargs): 
    #     isinstance = self.get_serializer()
    #     serializer = ApiUserSerializers(isinstance, data=request.data, partial=True)
    #     if not serializer.is_valid():
    #         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    #     serializer.save()
    #     return Response(serializer.data)


class UserRegister(APIView):
    permission_classes = [
        permissions.AllowAny
    ]
    authentication_classes = ([
        TokenAuthentication
    ])
    
    def post(self, request):
        clean_data = custom_validation(request.data)
        serializer = UserRegisterSerializer(data=clean_data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.save()
            if user:
                token = Token.objects.create(user=user)
                print('token', token)
                return Response({
                    'id': user.id,
                    'username': user.username,
                    'userlogin': user.username,
                    'password': user.password,
                    'is_staff': user.is_staff,
                    'token': TokenSerializer(token).data['key']
                }, status=status.HTTP_200_OK)
            
        return Response(status=status.HTTP_400_BAD_REQUEST)


class UserLogin(APIView):
    permission_classes = [
        permissions.AllowAny
    ]
    
    def post(self, request):
        data = request.data
        serializer = UserLoginSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.check_user(data)
            token = Token.objects.get(user=user)
            login(request, user)
            return Response({
                'id': user.id,
                'username': user.username,
                'userlogin': user.userlogin,
                'is_staff': user.is_staff,
                'token': TokenSerializer(token).data['key']
            }, status=status.HTTP_200_OK)
        

class UserLogout(APIView):
    def post(self, requset):
        logout(requset)
        return Response(status=status.HTTP_200_OK)


class UserView(APIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]

    # authentication_classes = [
    #     SessionAuthentication
    # ]

    def get(self, requset):
        serializer = UserSerializer(requset.user)
        return Response({'user': serializer.data}, status=status.HTTP_200_OK)
    
    
def pageNotFound(request, exception):
    return render(request, 'frontend/404.html', status=404)