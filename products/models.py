from django.db import models


class Manufacturer(models.Model):
    name = models.CharField(max_length=50, unique=True)
    image = models.ImageField(upload_to='image/manufacturers/', blank=True)  # TODO: add default image

    def __str__(self):
        return self.name


class Category(models.Model):
    name = models.CharField(max_length=30, unique=True)

    class Meta:
        verbose_name_plural = 'categories'

    def __str__(self):
        return self.name


class Product(models.Model):
    name = models.CharField(max_length=150)
    price = models.DecimalField(max_digits=7, decimal_places=2)
    image = models.ImageField(upload_to='image/products/', blank=True)  # TODO: add default image
    manufacturer = models.ForeignKey(Manufacturer, blank=True, null=True, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, blank=True, null=True, on_delete=models.CASCADE)
    time_added = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

'''class ProductImage(models.Model):
    product = models.ForeignKey(Product,on_delete=models.CASCADE)
    image = models.ImageField(upload_to='images/')
'''
