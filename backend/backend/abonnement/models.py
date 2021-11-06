from django.db import models
from client.models import Client
from datetime import datetime, timedelta, date
from salle_activite.models import Activity 
from creneau.models import Creneau
# Signals imports
from django.db.models.signals import post_save, pre_save


class CreneauManager(models.Manager):
    def get_creneaux(self):
        abon = AbonnementClient.objects.get(id=11)
        cren = abon.creneaux.all()
        print('CREN', cren)


class Abonnement(models.Model):
    name              = models.CharField(max_length=50, verbose_name="Nom")
    price             = models.DecimalField(max_digits=15, decimal_places=2, verbose_name="prix")
    number_of_days    = models.IntegerField()# number of days
    seances_quantity  = models.IntegerField()
    activity          = models.ManyToManyField(Activity, related_name='activities')
    systeme_cochage   = models.BooleanField(default=False)
    def __str__(self):
        return self.name

    def get_seances_quantity(self):
        return self.seances_quantity


class AbonnementClient(models.Model):
    start_date          = models.DateField(blank=True, null=True)# number of days
    end_date            = models.DateField(blank=True, null=True)# number of days
    client              = models.ForeignKey(Client, related_name="abonnement_client", on_delete=models.CASCADE, null=True, blank=True)
    type_abonnement     = models.ForeignKey(Abonnement, related_name="type_abonnement_client", on_delete=models.CASCADE)
    presence_quantity   = models.IntegerField(blank=True, null=True)
    creneaux            = models.ManyToManyField(Creneau, verbose_name="créneau", related_name='pizzas', blank=True)
    objects             = models.Manager()
    range               = CreneauManager()
    def __str__(self):
        return str(self.end_date)
    


def dette_signal(sender, instance, **kwargs):
    id_client = instance.client.id
    client = Client.objects.get(id=id_client)
    price = instance.type_abonnement.price
    try:
        client.dette += price
    except:
        client.dette = price
    client.save()

post_save.connect(dette_signal, sender=AbonnementClient)


def abc_created_signal(sender, instance, created,**kwargs):
    if created:
        abon = instance.type_abonnement
        number_of_days = abon.number_of_days
        presence_quantity = abon.seances_quantity
        end_date = datetime.now().date() + timedelta(days = number_of_days)
        #  updates
        instance.presence_quantity = presence_quantity
        instance.end_date = end_date
        instance.save()

post_save.connect(abc_created_signal, sender=AbonnementClient)


    # def create(self, validated_data):
    #     print('validated_data =====>', validated_data)
    #     # return AbonnementClient.objects.create(**validated_data)
    #     abon = validated_data['type_abonnement']
    #     number = Abonnement.objects.get(id = abon.id).number_of_days
    #     delta = timedelta(days = number)
    #     end_date = datetime.now().date() + delta
    #     presence_quantity = Abonnement.objects.get(id = abon.id).seances_quantity

    #     abonnement_client = AbonnementClient.objects.create(end_date=end_date,presence_quantity=presence_quantity, **validated_data)
    #     return abonnement_client