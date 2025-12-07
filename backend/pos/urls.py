from rest_framework import routers
from .views import ProductViewSet, CategoryViewSet, SaleViewSet, SaleItemViewSet

router = routers.DefaultRouter()
router.register(r'products', ProductViewSet)
router.register(r'categories', CategoryViewSet)
router.register(r'sales', SaleViewSet)
router.register(r'sale-items', SaleItemViewSet)

urlpatterns = router.urls