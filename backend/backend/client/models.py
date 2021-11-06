
from django.db import models
from django.urls import reverse
# from creneau.models import Creneau
from django.template.defaultfilters import slugify

from django.db import models

# Create your models here.
class AbonnementManager(models.Manager):
    def get_abonnement(self, client_id):
        client = Client.objects.get(id=client_id)
        abon = client.abonnement_client.all()
        # print('abonabonabonabon======>', abon)
        return abon

    def get_last_presence(self, client_id):
        client = Client.objects.get(id=client_id)
        try :
            presence = client.presences.filter(is_in_salle=True).last().id
            # print(presence, ' JJJJJJJJJJJJJJJJJJJJJJ')
            return presence
        except:
            presence = False
            return presence
        # presence = client.presences.last().id
        # print( 'le ID de la derniere presences du', client, 'est le:', presence )

CIVILITY_CHOICES = (
    ('MLL', 'Mlle'),
    ('MME', 'Mme'),
    ('MR', 'Mr')
)

BLOOD_CHOICES = (
    ('A-', 'A-'),
    ('A+', 'A+'),
    ('B-', 'B-'),
    ('B+', 'B+'),
    ('O-', 'O-'),
    ('O+', 'O+'),
    ('AB-', 'AB-'),
    ('AB+', 'AB+'),
)

STATE_CHOICES = (
    ('A', 'Active'),
    ('S', 'Suspendue'),
    ('N', 'Non active'),
)

class Client(models.Model):
    faux_id     = models.CharField(max_length=50, blank=True, null=True)
    last_name   = models.CharField(max_length=50, verbose_name='Nom')
    first_name  = models.CharField(max_length=50, verbose_name='Prénom')
    civility    = models.CharField(choices=CIVILITY_CHOICES , max_length=3, default='MME', verbose_name='Civilité', blank=True, null=True)
    adress      = models.CharField(max_length=200, verbose_name='Adresse', blank=True, null=True)
    picture     = models.ImageField(upload_to='photos', blank=True, null=True)
    phone       = models.CharField(max_length=22, verbose_name='Téléphone', blank=True, null=True)
    email       = models.CharField(max_length=50, verbose_name='E-mail',blank=True, null=True)
    nationality = models.CharField(max_length=50, verbose_name='Nationalité', blank=True, null=True)
    birth_date  = models.CharField(max_length=50, verbose_name='Date de naissance', blank=True, null=True)
    blood       = models.CharField(choices=BLOOD_CHOICES , max_length=3, verbose_name='Groupe sanguin', blank=True, null=True)
    date_added  = models.CharField(max_length=50, blank=True, null=True)
    # date_added  = models.DateTimeField(auto_now_add=True, verbose_name='Date d\'inscription')
    # state       = models.CharField(choices=STATE_CHOICES , max_length=3, verbose_name='Etat', blank=True, null=True)
    note        = models.TextField(blank=True, null=True)
    dette       = models.CharField(max_length=50, null=True, blank=True)

    objects = models.Manager()
    abonnement_manager = AbonnementManager()



    def __str__(self):
        return str(self.last_name)
    
    def get_absolute_url(self):
        return reverse("client:client-detail", args={"slug": self.slug})
    
class Maladie(models.Model):
    name = models.CharField(max_length=150)
    client = models.ForeignKey(Client, related_name="maladies", on_delete=models.CASCADE, null=True, blank=True)
    
    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Maladie'
        verbose_name_plural = 'Maladies'


class PresenceManager(models.Manager):

    def get_last_presence(self, coach_id):
            coach = Coach.objects.get(id=coach_id)
            try :
                presence = coach.presencesCoach.filter(is_in_salle=True).last().id
                # print(presence, ' JJJJJJJJJJJJJJJJJJJJJJ')
                return presence
            except:
                presence = False
                return presence


class Coach(models.Model):
    last_name       = models.CharField(max_length=50, verbose_name='Nom')
    first_name      = models.CharField(max_length=50, verbose_name='Prénom')
    civility        = models.CharField(choices=CIVILITY_CHOICES , max_length=3, default='MME', verbose_name='Civilité')
    adress          = models.CharField(max_length=200, verbose_name='Adresse', blank=True, null=True)
    phone           = models.CharField(max_length=22, verbose_name='Téléphone', blank=True, null=True)
    email           = models.CharField(max_length=50, verbose_name='E-mail',blank=True, null=True)
    nationality     = models.CharField(max_length=50, verbose_name='Nationalité')
    birth_date      = models.DateField(max_length=50, verbose_name='Date de naissance')
    blood           = models.CharField(choices=BLOOD_CHOICES , max_length=3, verbose_name='Groupe sanguin')
    date_added      = models.DateTimeField(auto_now_add=True, verbose_name='Date d\'inscription')
    state           = models.CharField(choices=STATE_CHOICES , max_length=3, verbose_name='Etat', default='A')
    note            = models.TextField(blank=True, null=True)
    salaire           = models.DecimalField(max_digits=10, decimal_places=2, blank=True, default=0)
    # s           = models.DecimalField(max_digits=10, decimal_places=2, null=True)
    # creneau         = models.ForeignKey(Creneau, verbose_name="créneau" , on_delete=models.CASCADE)

    # salle_activity  = models.ManyToManyField("Salle", verbose_name="salle d'activité")
    # salle_sport     = models.ManyToManyField("Salle", verbose_name="salle de sport")
    # maladies        = models.ManyToManyField(Maladie)
    heures_done     = models.IntegerField( blank=True, null=True)
    pay_per_hour    = models.IntegerField( blank=True, null=True, default=1)
    objects = models.Manager()
    custom_manager = PresenceManager()
    def __str__(self):
        return self.last_name

    def get_salaire(self):
        return self.heures_done * self.pay_per_hour

    def get_absolute_url(self):
        return reverse("client:coach_detail", kwargs={"pk": self.pk})



class Personnel(models.Model):
    last_name       = models.CharField(max_length=50, verbose_name='Nom')
    first_name      = models.CharField(max_length=50, verbose_name='Prénom')
    civility        = models.CharField(choices=CIVILITY_CHOICES , max_length=3, default='MME', verbose_name='Civilité')
    adress          = models.CharField(max_length=200, verbose_name='Adresse', blank=True, null=True)
    phone           = models.CharField(max_length=22, verbose_name='Téléphone', blank=True, null=True)
    email           = models.CharField(max_length=50, verbose_name='E-mail',blank=True, null=True)
    nationality     = models.CharField(max_length=50, verbose_name='Nationalité')
    birth_date      = models.DateField(max_length=50, verbose_name='Date de naissance')
    blood           = models.CharField(choices=BLOOD_CHOICES , max_length=3, verbose_name='Groupe sanguin')
    date_added      = models.DateTimeField(auto_now_add=True, verbose_name='Date de recrutement')
    state           = models.CharField(choices=STATE_CHOICES , max_length=3, verbose_name='Etat', default='A')
    note            = models.TextField(blank=True, null=True)
    social_security = models.CharField(max_length=150)
    # SALAIRE ======> stock all transaction to know when the personnel took money
    
    # avance          = models.DecimalField(max_digits=10, decimal_places=2, null=True)
    # assurance   = models.ForeignKey("app.Model", verbose_name=_(""), on_delete=models.CASCADE)
    # salle_sport = models.ForeignKey("app.Model", verbose_name=_(""), on_delete=models.CASCADE)
    # abonnement  = models.ForeignKey("app.Model", verbose_name=_(""), on_delete=models.CASCADE)
    # paiement    = models.ForeignKey("app.Model", verbose_name=_(""), on_delete=models.CASCADE)
    # planning    = models.ForeignKey("app.Model", verbose_name=_(""), on_delete=models.CASCADE)
    # maladies    = models.ForeignKey("app.Model", verbose_name=_(""), on_delete=models.CASCADE)

    def __str__(self):
        return self.first_name
    def get_absolute_url(self):
        return reverse("client:personnel_detail", kwargs={"pk": self.pk})

