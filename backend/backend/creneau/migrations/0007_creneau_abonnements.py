# Generated by Django 3.1.6 on 2021-03-29 17:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('abonnement', '0012_remove_abonnementclient_creneau'),
        ('creneau', '0006_auto_20210329_1603'),
    ]

    operations = [
        migrations.AddField(
            model_name='creneau',
            name='abonnements',
            field=models.ManyToManyField(blank=True, related_name='creneaux', to='abonnement.AbonnementClient', verbose_name='créneau'),
        ),
    ]
