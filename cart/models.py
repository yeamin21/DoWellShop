from django.db import models

from products.models import Product
from users.models import User, Address


class OrderItem(models.Model):
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name='cart_item')
    quantity = models.PositiveSmallIntegerField()
    unit_price = models.DecimalField(max_digits=7, decimal_places=2)
    total_price = models.DecimalField(max_digits=7, decimal_places=2)
    # user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='cart_user', blank=True)

    @property
    def total(self):
        return self.product.price * self.quantity

    def save(self, *args, **kwargs):
        self.total_price = self.total
        self.unit_price = self.product.price
        super(OrderItem, self).save(*args, **kwargs)

    def __str__(self):
        return self.product.name + '|' + str(self.quantity)


class Order(models.Model):
    orderItem = models.ManyToManyField(OrderItem)
    is_ordered = models.BooleanField(default=False)
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='order_user', blank=True)
    delivery_address = models.ForeignKey(
        Address, on_delete=models.CASCADE, blank=True)
    is_canceled = models.BooleanField(default=False)
    orderTotal = models.DecimalField(max_digits=7, decimal_places=2)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    @property
    def orderTotal(self):
        orderItems = self.orderItem.all()
        totalAmount = sum(i.total_price for i in orderItems)
        return totalAmount

    def status(self):
        if self.is_ordered and not self.is_canceled:
            return 'Ordered'
        elif self.is_ordered and self.is_canceled:
            return 'Canceled'

    def __str__(self):
        return str(self.id)

    class Meta:
        ordering = ['-created']
