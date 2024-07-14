from django.shortcuts import render

def mycloud(request, *args, **kwargs):
    return render(request, 'frontend/index.html')
