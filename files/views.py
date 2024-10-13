from django.shortcuts import render
from rest_framework import viewsets, permissions, status
from .serializers import ApiFileSerializers
from .models import File
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response
from django.http import HttpResponse

class ApiFileViewSet(viewsets.ModelViewSet):
    queryset = File.objects.all()
    
    # permission_classes = [
    #     permissions.IsAuthenticated
    # ] 

    authentication_classes = ([
        TokenAuthentication
    ])
    
    serializer_class = ApiFileSerializers

    def post(self, request):
        serializer = ApiFileSerializers(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED, content_type='application/json')
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST, content_type='application/json')


def send_file(self, hash):
    try:
        link = f"http://89.111.175.49:8000/s/{hash}"
        file_obj = File.objects.get(link=link)
        response = HttpResponse(file_obj.file)
        response['Content-Disposition'] = f'attachment; filename="{file_obj.filename}"'
        return response
    except File.DoesNotExist:
        return HttpResponse("Ссылка не найдена", status=404)