# Generated by Django 3.1.3 on 2021-04-23 20:51

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cart', '0004_remove_order_ordertotal'),
    ]

    operations = [
        migrations.RenameField(
            model_name='orderitem',
            old_name='item',
            new_name='product',
        ),
    ]