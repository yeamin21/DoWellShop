import json

from django.http import HttpResponse
from django.shortcuts import redirect, render
from django.views import generic

from cart.forms import OrderItemForm
from cart.models import OrderItem, Order
from products.models import Product
from users.models import Address


def test(request):
    filled_form = OrderItemForm(request.POST)
    filled_form.cleaned_data['quantity']
    print(filled_form)


class OrderCreation(generic.CreateView):
    model = OrderItem
    form_class = OrderItemForm
    template_name = 'cart/order.html'


# class OrderCreation(generic.CreateView):
#     model = Order
#     template_name = 'cart/checkout.html'
#

# @login_required(login_url='users:login')

def create_order(request):
    # print(request.POST['delivery-address'])
    if request.method == 'POST':
        items = json.loads(request.POST['products'])
        order = Order.objects.create(user=request.user,
                                     is_ordered=False,
                                     delivery_address=Address.objects.get(pk=request.POST['delivery_address']))
        for i in items:
            order_item = OrderItem.objects.create(
                item=Product.objects.get(pk=items[i]['productId']),
                quantity=items[i]['quantity']
            )
            order.orderItem.add(order_item)
        order.user = request.user
        order.is_ordered = True
        order.save()

        return HttpResponse(json.dumps({'success': True, 'orderId': order.id}))


def successful_order(request, pk):
    order = Order.objects.get(pk=pk)
    return render(request, template_name='cart/successful_order.html', context={'order': order})


def updateCartItem(request, pk):
    item = OrderItem.objects.get(pk=pk)
    item.quantity = request.POST['quantity']
    item.save()
    return redirect('cart:list')


class ListOrder(generic.ListView):
    model = Order
    context_object_name = 'items'
    template_name = 'cart/cart.html'

    def get_queryset(self):
        return Order.objects.filter(is_ordered=False, user=self.request.user)


def cartTable(request):
    return render(request, 'cart/cart.html', context={})


def checkout(request):
    return render(request, 'cart/checkout.html', context={})


class OrderDetails(generic.DetailView):
    model = Order
    template_name = 'cart/orderDetails.html'
    context_object_name = 'order'
    

def cancel_order(request,pk):
    order = Order.objects.get(user=request.user,pk=pk)
    order.is_canceled = True
    order.save()
    return redirect('users:user_panel')