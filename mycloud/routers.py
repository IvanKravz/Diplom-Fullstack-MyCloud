from rest_framework import routers
from accounts.views import ApiUserViewSet
from files.views import ApiFileViewSet

router = routers.DefaultRouter()
router.register('users', ApiUserViewSet, basename='users')
router.register('files', ApiFileViewSet, basename='files')


