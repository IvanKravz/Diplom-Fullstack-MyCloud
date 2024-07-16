from rest_framework import routers
from accounts.views import ApiUserViewSet

router = routers.DefaultRouter()
router.register('users', ApiUserViewSet)