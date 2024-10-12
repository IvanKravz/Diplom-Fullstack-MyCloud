from django.db import models
from accounts.models import User
from django.dispatch import receiver
import os
from django.conf import settings
from django.utils import timezone


def uniq_filename(filename):
    if File.objects.filter(filename=filename):
        filename = get_file_name(filename)  
    return filename
    

def get_file_name(filename):
    count = 0
    file_root, file_extention = os.path.splitext(filename)
    while File.objects.filter(filename=filename):
        count += 1
        filename = f'{file_root}_{count}{file_extention}'
    return filename


class File(models.Model):
    id = models.AutoField(primary_key=True)
    file = models.FileField()
    filename = models.CharField(max_length=20, null=True, default='')
    description = models.TextField(null=True, default='комментарий нет')
    size = models.CharField(null=True, default='')
    link = models.CharField(null=True, default='')
    upload_time = models.DateTimeField(default=timezone.now)
    downloadTime = models.CharField(default='', null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="files")
    

    def save(self, *args, **kwargs):
        userfolder = self.user.username
        hash_link = hash(self.upload_time)

        file_root, file_extention = os.path.splitext(self.file.name)
        if self.id:
        ## Меняем существующий файл
            filepath = self.file.path
            file_root, file_extention_file_name = os.path.splitext(self.filename)
            if file_extention_file_name == '':
                self.filename = f'{self.filename}{file_extention}'
            new_filepath = os.path.join(settings.MEDIA_ROOT, userfolder, self.filename)
            self.file.name = os.path.join(userfolder, self.filename)
            os.rename(filepath, new_filepath)
        else:
        ## Добавляем новый файл
            if self.filename:
                self.filename = uniq_filename(f'{self.filename}{file_extention}')
                self.file.name = os.path.join(userfolder, self.filename)
            else:
                self.filename = uniq_filename(f'{file_root[:10]}{file_extention}')
                self.file.name = os.path.join(userfolder, self.filename)


        self.link = os.path.join('http://127.0.0.1:8000/', 's/', f'file{hash_link}')
        self.size = self.file.size

        super().save(*args, **kwargs)

    def __str__(self):
        return str(self.file.name)
    

@receiver(models.signals.post_delete, sender=File)
def auto_delete_file_on_delete(sender, instance, **kwargs):
    if instance.file and os.path.isfile(instance.file.path):
        os.remove(instance.file.path)   
         