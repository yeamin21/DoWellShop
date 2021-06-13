
from django.db import models
from django.db.models import fields
from rest_framework import serializers

from products.models import Category, Manufacturer, Product, ProductDetails


class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = ['name']


class ManufacturerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Manufacturer
        fields = ['name', 'image']


class ProductDetailsSerializer(serializers.ModelSerializer):

    class Meta:
        model = ProductDetails
        fields = ['is_featured', 'count_views']


class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer()
    manufacturer = ManufacturerSerializer()
    product_details = ProductDetailsSerializer()

    class Meta:
        model = Product
        fields = ['id', 'name', 'price', 'image',
                  'category', 'manufacturer', 'product_details']
