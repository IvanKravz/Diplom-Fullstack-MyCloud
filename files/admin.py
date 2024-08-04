from django.contrib import admin
from .models import File

@admin.register(File)
class UserAdmin(admin.ModelAdmin):
    list_display = ['id', 'filename', 'description', 'size', 'link', 'upload_time', 'user']
    list_display_links = ['id', 'filename', 'description', 'size', 'link', 'upload_time', 'user']
    search_fields = ['id', 'filename', 'user',]
    list_filter = ['id', 'filename', 'size',]
