# Generated by Django 3.1.6 on 2021-03-22 15:05

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('client', '0019_remove_coach_maladies'),
        ('assurance', '0001_initial'),
        ('transaction', '0003_auto_20210221_1618'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Assurance',
            new_name='AssuranceTransaction',
        ),
    ]
