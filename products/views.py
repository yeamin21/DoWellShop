from django.core.paginator import EmptyPage
from django.core.paginator import PageNotAnInteger
from django.core.paginator import Paginator
from django.shortcuts import render
from django.views import generic
from rest_framework import viewsets

from products.models import Product, Category, Manufacturer
from .serializers import ProductSerializer


class ProductList(generic.ListView):
    model = Product
    context_object_name = 'products'
    ordering = 'price'
    paginate_by = 9


class ProductDetails(generic.DetailView):
    model = Product
    context_object_name = 'product'
    template_name = 'products/product_details.html'


class CategoryList(generic.ListView):
    model = Category
    context_object_name = 'categories'


class CategorizedItems(ProductList):
    def get_queryset(self):
        context = super().get_queryset()
        context = Product.objects.filter(category=Category.objects.get(name=self.kwargs['category']))
        return context


class ManufacturerItems(ProductList):
    def get_queryset(self):
        context = super().get_queryset()
        context = Product.objects.filter(manufacturer=Manufacturer.objects.get(name=self.kwargs['manufacturer']))
        return context


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
