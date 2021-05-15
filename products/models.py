from django.db import models


class Manufacturer(models.Model):
    name = models.CharField(max_length=50, unique=True)
    # TODO: add default image
    image = models.ImageField(upload_to='image/manufacturers/', blank=True)

    def __str__(self):
        return self.name


class Category(models.Model):
    name = models.CharField(max_length=30, unique=True)

    class Meta:
        verbose_name_plural = 'categories'

    def __str__(self):
        return self.name


class ProductQueryset(models.QuerySet):
    def products_by_category(self, category):
        return self.filter(category=category)

    def product_by_manufacturer(self, manufacturer):
        return self.filter(manufacturer=manufacturer)

    def product_by_category_and_name(self, category, name):
        return self.filter(category=category, name__icontains=name)

    def prodcut_by_price(self, price_lte):
        return self.filter(price__lte=price_lte)


class Product(models.Model):
    name = models.CharField(max_length=150)
    price = models.DecimalField(max_digits=7, decimal_places=2)
    # TODO: add default image
    image = models.ImageField(upload_to='image/products/', blank=True)
    manufacturer = models.ForeignKey(
        Manufacturer, blank=True, null=True, on_delete=models.CASCADE)
    category = models.ForeignKey(
        Category, blank=True, null=True, on_delete=models.CASCADE)
    time_added = models.DateTimeField(auto_now=True)
    objects = ProductQueryset.as_manager()

    def __str__(self):
        return self.name


class ProductDetails(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)


'''class ProductImage(models.Model):
    product = models.ForeignKey(Product,on_delete=models.CASCADE)
    image = models.ImageField(upload_to='images/')
'''
