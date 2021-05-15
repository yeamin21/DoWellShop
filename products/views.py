from django.views import generic

from products.models import Product, Category, Manufacturer


class ProductList(generic.ListView):
    model = Product
    context_object_name = 'products'
    ordering = 'price'
    paginate_by = 1

    def get_ordering(self):
        order = super(ProductList, self).get_ordering()
        ordering = self.request.GET.get('order')
        if ordering:
            order = ordering
        return order

    def get_queryset(self):
        query = super(ProductList, self).get_queryset()
        category = self.request.GET.get('category')
        manufacturer = self.request.GET.get('manufacturer')
        product = self.request.GET.get('product')
        lt = self.request.GET.get('lt')
        if category:
            if category == 'all':
                if product:
                    query = Product.objects.filter(name__icontains=product)
            else:
                category = Category.objects.get(name=category)
                if product:
                    query = Product.objects.product_by_category_and_name(
                        category, product)
                else:
                    query = Product.objects.products_by_category(category)
        elif manufacturer:
            manufacturer = Manufacturer.objects.get(name=manufacturer)
            query = Product.objects.product_by_manufacturer(manufacturer)

        if lt:
            query = query.filter(price__lte=lt)
        return query

    def get_context_data(self, *, object_list=None, **kwargs):
        c = super(ProductList, self).get_context_data(**kwargs)
        c['ordering'] = self.get_ordering()
        c['pagination'] = self.paginate_by
        return c


class ProductDetails(generic.DetailView):
    model = Product
    context_object_name = 'product'
    template_name = 'products/product_details.html'


class CategoryList(generic.ListView):
    model = Category
    context_object_name = 'categories'

#
# class CategorizedItems(ProductList):
#     def get_queryset(self):
#         query = Product.objects.products_by_category(category=Category.objects.get(name=self.kwargs['category']))
#         return query
#
#
# class ManufacturerItems(ProductList):
#     def get_queryset(self):
#         context = super().get_queryset()
#         context = Product.objects.filter(manufacturer=Manufacturer.objects.get(name=self.kwargs['manufacturer']))
#         return context
