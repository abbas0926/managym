# Generated by Django 3.1.6 on 2021-05-03 10:59

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('client', '0034_client_faux_id'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='client',
            name='state',
        ),
    ]
