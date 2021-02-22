from django.contrib.auth import authenticate, logout, login
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseRedirect
from django.shortcuts import render, redirect
from django.urls import reverse
from django.views import generic

from users.forms import CustomerCreationForm, AddressCreationForm
from users.models import User, Address


# class LoginPage(LoginView):
#     template_name = 'users/login.html'

#     def get(self, request, *args, **kwargs):
#         if self.request.user.is_authenticated:
#             if self.request.user.is_customer:
#                 print("CUST")
#                 return HttpResponse("THSTSS")
#             elif self.request.user.is_restaurant:
#                 print("REST")
#                 return redirect('restaurant:home')
#         return super(LoginPage,self).get(request,*args,**kwargs)


def login_(request):
    next = request.GET.get('next', '')
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            # if user.is_seller:
            #     login(request, user)
            #     return redirect('restaurant:home')
            # elif user.is_customer:
            login(request, user)
            if next:
                return redirect(next)
            else:
                return redirect('/')

    return render(request, template_name='users/login.html')


def render_contact_page(request):
    return render(request, template_name='contact.html')


def logout_(request):
    logout(request)
    return redirect('/')


# class CreateRestaurant(generic.CreateView):
#     model = User
#     template_name = 'users/register.html'
#     form_class = RestaurantCreationForm
#
#     def get_success_url(self):
#         return reverse('users:login')


class CreateCustomer(generic.CreateView):
    model = User
    template_name = 'users/register.html'
    form_class = CustomerCreationForm

    def get_success_url(self):
        return reverse('users:login')


@login_required(login_url='users:login')
def userPanel(request):
    return render(request, template_name='users/user_panel.html', context={})


class AddAddress(generic.CreateView):
    model = Address
    template_name = 'users/user_panel.html'
    form_class = AddressCreationForm

    def form_valid(self, form):
        address = form.save(commit=False)
        address.user = self.request.user
        address.save()
        next = self.request.META.get('HTTP_REFERER', None) or '/'
        return HttpResponseRedirect(next)



class AddressUpdateView(generic.UpdateView):
    model = Address

# class AddressList(generic.ListView):
#     model = Address
#     context_object_name = 'addresses'
#
#     def get_queryset(self):
#         context = super(AddressList, self).get_queryset()
#         context = Address.objects.filter(user=self.request.user)
#         return context
