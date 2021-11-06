from django.db import models
from abonnement.models import Abonnement
from client.models import Personnel, Coach, Client
from assurance.models import Assurance
from datetime import date
# Create your models here.
from django.db.models.signals import post_save

class Transaction(models.Model):
    amount          = models.DecimalField(max_digits=10, decimal_places=2, default = 0)
    date_creation   = models.DateField(default=date.today)
    notes           = models.TextField(blank=True, null=True)
    last_modified   = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.amount

    class Meta:
        
        ordering = ['-last_modified']

    
class Paiement(Transaction):
    # type = models.ForeignKey(Abonnement, verbose_name="abonnement" , related_name="abonnements", on_delete=models.CASCADE)
    client = models.ForeignKey(Client,on_delete=models.CASCADE, related_name='transactions')
    def __str__(self):
        return self.amount

    class Meta:
        ordering = ['-last_modified']



class Autre(Transaction):
    name = models.CharField(max_length=200, null=True, blank=True)

    def __str__(self):
        return self.amount

    class Meta:
        ordering = ['-date_creation']

class AssuranceTransaction(Transaction):
    type = models.ForeignKey(Assurance, related_name="assurances", on_delete=models.CASCADE)
    client = models.ForeignKey(Client,on_delete=models.CASCADE)

    def __str__(self):
        return self.amount

    class Meta:
        ordering = ['-date_creation']


class Remuneration(Transaction):
    nom = models.ForeignKey(Personnel, related_name="rem_personnels", on_delete=models.CASCADE)

    def __str__(self):
        return self.amount

    class Meta:
        ordering = ['-date_creation']

class RemunerationProf(Transaction):
    coach = models.ForeignKey(Coach, related_name="rem_coachs", on_delete=models.CASCADE)

    def __str__(self):
        return self.amount

    class Meta:
        ordering = ['-date_creation']


def paiement_signal(sender, instance, **kwargs):
    id_client = instance.client.id
    client = Client.objects.get(id=id_client)
    price = instance.amount
    client.dette -= price
    client.save()




def paiement_assurance_signal(sender, instance, **kwargs):
    id_client = instance.client.id
    client = Client.objects.get(id=id_client)
    price = instance.amount
    try:
        client.dette -= price

    except:
        client.dette = price

    client.save()

post_save.connect(paiement_signal, sender=Paiement)
post_save.connect(paiement_assurance_signal, sender=AssuranceTransaction)

def salaire_coach_signal(sender, instance, created, **kwargs):
    if created:
        id_coach = instance.coach.id
        coach = Coach.objects.get(id=id_coach)
        montant = instance.amount
        coach.salaire -= montant
        coach.save()

post_save.connect(salaire_coach_signal, sender=RemunerationProf)
