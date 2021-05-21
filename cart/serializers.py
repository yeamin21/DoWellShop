from rest_framework.relations import RelatedField
from products.models import Product
from users.models import Address, User
from django.db.models import query
from django.http import request
from users.api_views import AddressSerializer
from django.db import models
from rest_framework import fields
from rest_framework import serializers
from cart.models import Order, OrderItem
from rest_framework.serializers import ModelSerializer
from rest_framework.permissions import IsAuthenticated


class OrderItemSerializer(ModelSerializer):

    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'quantity', 'unit_price']
        permission_classes = [IsAuthenticated]


class OrderSerializer(ModelSerializer):
    orderItem = OrderItemSerializer(
        many=True)
    delivery_address = AddressSerializer()

    class Meta:
        model = Order
        fields = ['id', 'orderItem', 'delivery_address', 'user', 'is_ordered']
        permission_classes = [IsAuthenticated]

    def create(self, validated_data):
        print(validated_data)
        return super().create(validated_data)

    def create(self, validated_data):

        orderItems = validated_data['orderItem']
        new_order = Order.objects.create(
            user=validated_data['user'], delivery_address=validated_data['delivery_address'])
        for item in orderItems:
            new_orderItem = OrderItem.objects.create(
                product=item['product'], quantity=item["quantity"])
            new_order.orderItem.add(new_orderItem)
        new_order.is_ordered = True
        new_order.save()
        return new_order
