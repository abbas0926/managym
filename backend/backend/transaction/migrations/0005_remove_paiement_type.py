# Generated by Django 3.1.6 on 2021-04-18 12:14

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('transaction', '0004_auto_20210322_1605'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='paiement',
            name='type',
        ),
    ]
