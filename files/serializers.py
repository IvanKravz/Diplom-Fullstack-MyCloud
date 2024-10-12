from rest_framework import serializers
from .models import File

class ApiFileSerializers(serializers.ModelSerializer):
    size = serializers.SerializerMethodField()
    link = serializers.SerializerMethodField()
    upload_time = serializers.SerializerMethodField()
    
    class Meta:
        model = File
        fields = ['id', 'filename', 'file', 'description', 'upload_time', 'downloadTime', 'user', 'size', 'link']

    def get_size(self, obj):
        return obj.size
    
    def get_link(self, obj):
        return obj.link
    
    def get_upload_time(self, obj):
        return obj.upload_time.strftime('%d %b %Y %H:%M:%S') if obj.upload_time else None
