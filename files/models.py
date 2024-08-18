from django.db import models
from accounts.models import User
import os
import math
from django.conf import settings
from datetime import datetime

class File(models.Model):
    id = models.AutoField(primary_key=True)
    file = models.FileField()
    filename = models.CharField(max_length=10, null=True)
    description = models.TextField(null=True)
    size = models.CharField(null=True)
    link = models.CharField(null=True)
    upload_time = models.CharField(default=datetime.now().strftime('%d %b %Y %H:%M:%S'))
    downloadTime = models.CharField(null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    

    def save(self, *args, **kwargs):
        # print('upload_time', self.upload_time)
        # userfolder = self.user.username
        # old_full_filepath = self.file.path
        # new_full_filepath = os.path.join(settings.MEDIA_ROOT, userfolder, self.filename)
        # self.file.name = os.path.join(userfolder, self.filename)
        # # os.rename(old_full_filepath, new_full_filepath)
        # date = datetime.now().strftime('%d %b %Y %H:%M:%S')
        # if self.upload_time == date:
        #     self.upload_time = date
        # else:
        #     self.upload_time = self.upload_time

        self.link = self.file.url
        self.size = self.file.size
        # self.upload_time = datetime.now().strftime('%d %b %Y %H:%M:%S')
        
        super().save(*args, **kwargs)


    def __str__(self):
        return str(self.file.name)