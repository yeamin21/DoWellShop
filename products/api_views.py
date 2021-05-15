from django.db.models import query
from rest_framework import filters
from rest_framework.generics import ListAPIView, CreateAPIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import BasePermission, IsAdminUser, IsAuthenticated, IsAuthenticatedOrReadOnly, SAFE_METHODS
from rest_framework.filters import BaseFilterBackend, SearchFilter
from products.models import Category, Manufacturer, Product
from products.serializers import CategorySerializer, ManufacturerSerializer, ProductSerializer


# class CreateProductAPI(CreateAPIView):
#     permission_classes = [IsAdminUser]
#     serializer_class = ProductSerializer

class ReadOnly(BasePermission):
    def has_permission(self, request, view):
        return request.method in SAFE_METHODS


class ProductFilterBackend(BaseFilterBackend):
    def filter_queryset(self, request, queryset, view):
        filters = {}
        price_min = request.query_params.get('price_min', None)
        if price_min:
            filters['price__gte'] = price_min
        price_max = request.query_params.get('price_max', None)
        if price_max:
            filters['price__lte'] = price_max
        queryset = queryset.filter(**filters)
        return queryset


class ProductAPIViewset(ModelViewSet):

    serializer_class = ProductSerializer
    permission_classes = [IsAdminUser | ReadOnly]
    queryset = Product.objects.all()
    filter_backends = [ProductFilterBackend, SearchFilter]
    search_fields = ['name']
    # def get_queryset(self):
    #     name = self.request.query_params.get('price_min')
    #     if name:
    #         self.queryset = self.queryset.filter(price__gte=name)
    #     return self.queryset


class CategoryAPIViewset(ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAdminUser | ReadOnly]


class ManufacturerAPIViewset(ModelViewSet):
    queryset = Manufacturer.objects.all()
    serializer_class = ManufacturerSerializer
    permission_classes = [IsAdminUser | ReadOnly]
