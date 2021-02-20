from django.views import generic
from products.filters import ProductFilter
from products.models import Product, Category, Manufacturer


class ProductList(generic.ListView):
    model = Product
    context_object_name = 'products'
    ordering = 'price'
    paginate_by = 9
    
    def get_queryset(self):
        query = Product.objects.all()
        print(self.request.GET)
        category = self.request.GET.get('category')
        manufacturer = self.request.GET.get('manufacturer')
        product = self.request.GET.get('product')
        lt = self.request.GET.get('lt')
        print(lt)
        if category:
            if category =='all':
                if product:
                    query = Product.objects.filter(name__icontains=product)
            else:
                category = Category.objects.get(name = category)
                if product:
                    query = Product.objects.product_by_category_and_name(category,product)
                else:
                    query = Product.objects.products_by_category(category)
        elif manufacturer:
            manufacturer = Manufacturer.objects.get(name = manufacturer)
            query = Product.objects.product_by_manufacturer(manufacturer)
        return query
    

class ProductDetails(generic.DetailView):
    model = Product
    context_object_name = 'product'
    template_name = 'products/product_details.html'


    

class CategoryList(generic.ListView):
    model = Category
    context_object_name = 'categories'


# class CategorizedItems(ProductList):
#     def get_queryset(self):
#         context = super().get_queryset()
#         context = Product.objects.filter(category=Category.objects.get(name=self.kwargs['category']))
#         return context


class ManufacturerItems(ProductList):
    def get_queryset(self):
        context = super().get_queryset()
        context = Product.objects.filter(manufacturer=Manufacturer.objects.get(name=self.kwargs['manufacturer']))
        return context


def query(request):
    print(request)