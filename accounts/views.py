from rest_framework import viewsets, permissions
from .models import User
from .serializers import ApiUserSerializers

class ApiUserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ApiUserSerializers