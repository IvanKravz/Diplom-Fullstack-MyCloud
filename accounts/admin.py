from django.contrib import admin
from .models import User

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['id', 'username', 'userlogin', 'email',]
    list_display_links = ['id', 'username',]
    search_fields = ['id', 'username', 'userlogin', 'email',]
    list_filter = ['id', 'username', 'userlogin',]
