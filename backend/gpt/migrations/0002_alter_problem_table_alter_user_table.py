# Generated by Django 4.2.1 on 2023-05-27 12:19

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('rating_system', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelTable(
            name='problem',
            table='problem',
        ),
        migrations.AlterModelTable(
            name='user',
            table='user',
        ),
    ]
