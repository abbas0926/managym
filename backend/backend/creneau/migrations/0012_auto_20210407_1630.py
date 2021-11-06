# Generated by Django 3.1.6 on 2021-04-07 15:30

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('salle_activite', '0005_activity_color'),
        ('creneau', '0011_auto_20210406_1346'),
    ]

    operations = [
        migrations.AlterField(
            model_name='creneau',
            name='activity',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='salle_activite.activity', verbose_name='creneaux'),
        ),
    ]
