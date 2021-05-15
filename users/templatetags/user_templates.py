from django import template as temp

from cart.models import Order
from users.forms import AddressCreationForm
from users.models import Address

register = temp.Library()


@register.inclusion_tag('users/dummy_template.html')
def addresses(user, template='users/block_address_list.html'):
    return {'addresses': Address.objects.filter(user=user), 'template': template}


@register.inclusion_tag('users/block_order_list.html')
def orders(user):
    user_orders = Order.objects.filter(user=user).order_by('-created')
    return {'orders': user_orders}


@register.inclusion_tag('users/block_address_add.html')
def add_address():
    return {'form': AddressCreationForm()}
