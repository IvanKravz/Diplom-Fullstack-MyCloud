from .views import ApiUserViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('user', ApiUserViewSet)

urlpatterns = router.urls