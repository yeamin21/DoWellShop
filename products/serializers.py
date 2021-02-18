from rest_framework import serializers
from rest_framework.permissions import IsAdminUser
from products.models import Product


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['name', 'price', 'image']
