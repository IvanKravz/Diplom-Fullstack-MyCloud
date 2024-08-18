from django.shortcuts import render
from rest_framework import viewsets, permissions, status
from .serializers import ApiFileSerializers
from .models import File
from rest_framework.authentication import SessionAuthentication
from rest_framework.response import Response

class ApiFileViewSet(viewsets.ModelViewSet):
    queryset = File.objects.all()
    
    permission_classes = [
        permissions.IsAuthenticated
    ] 

    # permission_classes = [
    #     permissions.AllowAny
    # ]

    authentication_classes = ([
        SessionAuthentication
    ])
    
    serializer_class = ApiFileSerializers

    def post(self, request):
        serializer = ApiFileSerializers(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED, content_type='application/json')
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST, content_type='application/json')
    
    # def update(self, request):
    #     return
    
    def partial_update(self, request, pk=None):
        file = self.get_object()
        serializer = ApiFileSerializers(file, data=request.data, partial=True)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        serializer.save()
        return Response(serializer.data)

    


