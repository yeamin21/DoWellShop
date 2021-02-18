from rest_framework.generics import ListAPIView, CreateAPIView
from rest_framework.permissions import IsAdminUser, BasePermission

from products.models import Product
from products.serializers import ProductSerializer


class ProductAPI(ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class CreateProductAPI(CreateAPIView):
    permission_classes = [IsAdminUser]
    serializer_class = ProductSerializer
