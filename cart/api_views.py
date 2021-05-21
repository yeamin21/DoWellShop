from rest_framework.relations import PrimaryKeyRelatedField
from users.serializers import AddressSerializer
from django.db.models.query import QuerySet
from django.http import request
from django.http.request import validate_host
from rest_framework import serializers, status
from rest_framework.response import Response
from rest_framework.views import APIView
from users.models import Address, User
from cart.serializers import OrderItemSerializer, OrderSerializer
from rest_framework.viewsets import ModelViewSet, ViewSet
from cart.models import Order, OrderItem
from products.models import Product
from rest_framework.decorators import action


class OrderAPIViewset(ModelViewSet):
    serializer_class = OrderSerializer

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)

    def create(self, request, *args, **kwargs):
        orderItems = request.data.pop('orderItem')

        nd = []
        for item in orderItems:
            nd.append({'product': item['id'], 'quantity': item['quantity'],
                       'unit_price': item['price']})
        new_order = self.get_serializer(
            data={'user': request.user.id, 'delivery_address': request.data['delivery_address'], 'orderItem': nd})
        if new_order.is_valid():
            self.perform_create(new_order)
            return Response(new_order.data)

        return Response(status=status.HTTP_400_BAD_REQUEST)
