# Generated by Django 3.1.6 on 2021-03-21 11:04

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('client', '0016_auto_20210321_1153'),
    ]

    operations = [
        migrations.RenameField(
            model_name='maladie',
            old_name='Client',
            new_name='client',
        ),
    ]
