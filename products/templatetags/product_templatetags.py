from django import template
from django.http import QueryDict

from products.models import Product, Manufacturer

register = template.Library()


# @register.inclusion_tag('products/category_list.html')
# def categories():
#     return {'categories': Category.objects.all()}


@register.inclusion_tag('products/manufacturer_list.html')
def manufacturers():
    return {'manufacturers': Manufacturer.objects.all()}


@register.inclusion_tag('products/latestproduct_list.html')
def products(count=None):
    return {'products': Product.objects.order_by('-time_added')[:count]}

@register.simple_tag(takes_context=True)
def query_transform(context, **kwargs,):
    query = context['request'].GET.copy()
    for k, v in kwargs.items():
        query[k] = v
    return '?{}'.format(query.urlencode())