# Generated by Django 3.1.6 on 2021-03-30 08:25

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('creneau', '0007_creneau_abonnements'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='creneau',
            name='abonnements',
        ),
    ]
