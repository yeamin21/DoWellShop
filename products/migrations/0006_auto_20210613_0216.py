# Generated by Django 3.1.3 on 2021-06-12 20:16

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0005_auto_20210613_0208'),
    ]

    operations = [
        migrations.AlterField(
            model_name='details',
            name='product',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='product_details', to='products.product'),
        ),
    ]