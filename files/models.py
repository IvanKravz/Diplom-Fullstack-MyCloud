from django.utils import timezone
from django.db import models
from accounts.models import User

class File(models.Model):
    file = models.FileField(null=True)
    filename = models.CharField(max_length=10, null=True)
    description = models.TextField(null=True)
    size = models.CharField(null=True)
    link = models.CharField(null=True)
    upload_time = models.DateTimeField(default=timezone.now)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

