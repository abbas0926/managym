# Generated by Django 3.1.6 on 2021-03-11 07:04

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('salle_sport', '0001_initial'),
        ('planning', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='planning',
            name='salle_sport',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='salle_sport.sallesport', verbose_name='Salle de sport'),
        ),
    ]
