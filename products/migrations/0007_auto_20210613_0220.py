# Generated by Django 3.1.3 on 2021-06-12 20:20

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0006_auto_20210613_0216'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Details',
            new_name='ProductDetails',
        ),
    ]
