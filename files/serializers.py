from rest_framework import serializers
from accounts.models import User
from .models import File


class ApiFileSerializers(serializers.ModelSerializer):
    size = serializers.SerializerMethodField()
    link = serializers.SerializerMethodField()
    # upload_time = serializers.SerializerMethodField()
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    
    class Meta:
        model = File
        fields = ('id', 'filename', 'file', 'description',
                  'upload_time', 'downloadTime', 'user', 'size', 'link')

    def get_size(self, obj):
        return obj.size
    
    def get_link(self, obj):
        return obj.link
    
    # def get_upload_time(self, obj):
    #     return obj.upload_time
    
    def update(self, instance, validated_data):
        instance.filename = validated_data.get('filename', instance.filename)
        instance.description = validated_data.get('description', instance.description)
        instance.downloadTime = validated_data.get('downloadTime', instance.downloadTime)
        instance.link = validated_data.get('link', instance.link)
        instance.save()
        return instance
    
    # def to_representation(self, instance):
    #     representation = super().to_representation(instance)

    #     by_user_id = representation['user']
    #     user = User.objects.filter(pk=by_user_id).values(
    #         'username').first() if by_user_id else None
    #     representation['user'] = user['username'] if user else None

    #     return representation
    
    
    

