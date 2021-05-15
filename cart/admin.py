from django.contrib import admin

from cart.models import OrderItem, Order


class OrderAdmin(admin.ModelAdmin):
    fields = ('orderItem',
              'is_ordered',
              'user',
              'is_canceled',
              'orderTotal')
    readonly_fields = ('created', 'updated', 'orderTotal', 'delivery_address')


admin.site.register(OrderItem)
admin.site.register(Order, OrderAdmin)
