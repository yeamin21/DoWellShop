from django.urls import path

from cart.views import cancel_order, create_order, updateCartItem, cartTable, checkout, test, OrderCreation, successful_order, OrderDetails

app_name = 'cart'
urlpatterns = [
    path('', cartTable, name='list'),
    path('add/', create_order, name='add'),
    path('update/<int:pk>', updateCartItem, name='update'),
    path('checkout/', checkout, name='checkout'),
    path('order/success/<pk>/', successful_order, name='success'),
    path('test', test, name='test'),
    path('order', OrderCreation.as_view(), name='order'),
    path('order/<pk>/', OrderDetails.as_view(), name='orderDetails'),
    path('cancel/<pk>/', cancel_order, name='cancel_order'),
]
