from django.shortcuts import render
from rest_framework import viewsets, permissions, status
from .serializers import ApiFileSerializers
from .models import File

class ApiFileViewSet(viewsets.ModelViewSet):
    queryset = File.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ApiFileSerializers
