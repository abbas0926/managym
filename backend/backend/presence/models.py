from django.db import models
from client.models import Client, Coach
from creneau.models import Creneau
from django.db.models.signals import pre_save
# Create your models here.
from datetime import timedelta, datetime
from decimal import Decimal

class PresenceManager(models.Manager):
    def get_presence(self, client_id):
        # client = Client.objects.get(id=client_id)
        presences = Presence.objects.filter(client__id=client_id, is_in_salle=True)
        print('TRUEEEEEEEEEEEE', presences)
        try :
            presence = presences.last().id
        except :
            presence = False
        print('TRUEEEEEEEEEEEE', presence)
        return presence


class Presence(models.Model):
    client      = models.ForeignKey(Client, on_delete=models.CASCADE,related_name='presences', null=True, blank=True)
    date        = models.DateField(auto_now_add=True)
    creneau     = models.ForeignKey(Creneau, on_delete=models.CASCADE,related_name='presenses', null=True, blank=True)
    is_in_list  = models.BooleanField(default=True) # check if the person is in the list of client that should be in this creneau
    hour_entree = models.TimeField()
    hour_sortie = models.TimeField(auto_now_add=False, null=True, blank=True)
    is_in_salle = models.BooleanField(default=False)
    note        = models.CharField(max_length=200, blank=True, null=True)
    
    objects = models.Manager()
    presence_manager = PresenceManager()

    def __str__(self):
        return str(f' le client {self.client}, {self.date}')

    class Meta:
        ordering  = ['-date']
#quantité de presence
    # def save(self, *args, **kwargs):
    #     print(' Save() on Presence class ( model)')
         
    #     hour_sortie = datetime.datetime.now
    #     is_in_salle = True
    #     super().save(*args, **kwargs)


class PresenceCoach(models.Model):
    coach      = models.ForeignKey(Coach, on_delete=models.CASCADE,related_name='presencesCoach', null=True, blank=True)
    date        = models.DateField(auto_now_add=True)
    # creneau     = models.ForeignKey(Creneau, on_delete=models.CASCADE,related_name='presencesCoach', null=True, blank=True)
    # is_in_list  = models.BooleanField(default=True) # check if the person is in the list of client that should be in this creneau
    hour_entree = models.TimeField()
    hour_sortie = models.TimeField(auto_now_add=False, null=True, blank=True)
    is_in_salle = models.BooleanField(default=False)



def presence_coach_create_signal(sender, instance, created,**kwargs):
    FTM = '%H:%M:%S'
    if created :
        current_time = now.strftime("%H:%M:%S")
        # id_coach = instance.coach.id
        # coach = Coach.objects.get(id=id_coach)
        # creneaux_actuel = Creneau.range.get_creneau()
        instance.hour_entree = current_time
        # par_heur = coach.pay_per_hour 
        # entree = str(instance.hour_entree)
        # sortie = str(instance.hour_sortie)
        # duree_hour =   datetime.strptime(sortie, FTM) - datetime.strptime(entree, FTM) 
        # duree_seconde = timedelta.total_seconds(duree_hour) 
        # temps_heure = duree_seconde / 60
        # print('le total du temps passé COACH est de de !: ', par_heur)
        # # montant = instance.amount
        # # total_heures = 
        # # decimal.Decimal(str(a)

        # salaire_seance = (int(temps_heure) / 60 )  * par_heur
        # coach.salaire += Decimal(str(salaire_seance))
        # coach.save()


def presence_coach_signal(sender, instance, **kwargs):
    FTM = '%H:%M:%S'
    if instance.hour_sortie:
        id_coach = instance.coach.id
        coach = Coach.objects.get(id=id_coach)
        try :
            par_heur = coach.pay_per_hour 
            entree = str(instance.hour_entree)
            sortie = str(instance.hour_sortie)
            duree_hour =   datetime.strptime(sortie, FTM) - datetime.strptime(entree, FTM) 
            duree_seconde = timedelta.total_seconds(duree_hour) 
            temps_heure = duree_seconde / 60
            print('le total du temps passé COACH est de de !: ', par_heur)
            # montant = instance.amount
            # total_heures = 
            # decimal.Decimal(str(a)
        
            salaire_seance = (int(temps_heure) / 60 )  * par_heur
            coach.salaire += Decimal(str(salaire_seance))
            coach.save()
        except :
            coach.salaire += 0
            coach.save()
        

pre_save.connect(presence_coach_signal, sender=PresenceCoach)
# 33756.