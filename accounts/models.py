from django.db import models
from django.utils import timezone

class User(models.Model):
    userlogin = models.CharField(max_length=24, unique=True)
    username = models.CharField(max_length=255, unique=True)
    email = models.EmailField(max_length=24)
    created_at = models.DateTimeField(default=timezone.now)
    is_authenticated = models.BooleanField(default=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    def __str__(self):
        return self.username
