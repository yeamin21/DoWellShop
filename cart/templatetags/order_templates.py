from django import template as temp

from cart.models import Order

register = temp.Library()


@register.inclusion_tag('cart/block_order_list.html')
def orders(user):
    user_orders = Order.objects.filter(user=user).order_by('-created')
    return {'orders': user_orders}
