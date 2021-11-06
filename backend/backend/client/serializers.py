from .models import Client, Personnel, Coach, Maladie, CIVILITY_CHOICES, STATE_CHOICES, BLOOD_CHOICES 
from rest_framework import serializers
# from django.http import JsonResponse
from creneau.models import Creneau
from abonnement.models import AbonnementClient
from abonnement.serializers import AbonnementClientSerialiser
from presence.serializers import PresenceSerialiser
from datetime import date
# from transaction.serializers import PaiementPostSerialiser
from transaction.models import Paiement
# class CreneauHourSerialiser(serializers.ModelSerializer):
#     class Meta:
#         model = Creneau
#         fields= ('hour_start',)
class PaiementClientSerializer(serializers.ModelSerializer):
    class Meta:
            model = Paiement
            fields= '__all__'

class MaladieNameSerialiser(serializers.ModelSerializer):
    class Meta:
        model = Maladie
        fields= ('name',)

class AbonnementDetailSerialiser(serializers.ModelSerializer):
    activity = serializers.SerializerMethodField('get_activity', read_only=True)
    class Meta:
        model = AbonnementClient
        fields= ('end_date','type_abonnement', 'activity', 'presence_quantity', 'creneaux')

    def get_activity(self, obj):
        activity_queryset = obj.type_abonnement.name
        return activity_queryset

class ClientSerialiser(serializers.ModelSerializer):
    civility_display = serializers.ChoiceField(source='get_civility_display', choices=CIVILITY_CHOICES, read_only=True)
    state_display = serializers.ChoiceField(source='get_state_display', choices=STATE_CHOICES, read_only=True)
    maladies= serializers.PrimaryKeyRelatedField(many=True, queryset=Maladie.objects.all())
    maladie_name= serializers.SerializerMethodField('get_maladie_name', read_only=True)
    abonnement_detail = serializers.SerializerMethodField('get_abonnement_detail')
    presences = serializers.SerializerMethodField('get_presences')
    last_presence = serializers.SerializerMethodField('get_last_presence', read_only=True)
    age = serializers.SerializerMethodField('calculate_age', read_only=True)

    class Meta:
        model = Client
        read_only_fields = ('date_added','abonnement_detail')
        fields= ('id', 'picture','civility','civility_display','last_name', 'first_name', 'adress', 'phone', 'email', 'nationality', 'birth_date', 'blood', 'state_display','note', 'dette', 'date_added', 'maladies', 'maladie_name','abonnement_detail', 'presences', 'last_presence', 'age')
 
    def get_maladie_name(self, obj):
        maladies_queryset = obj.maladies.all()
        return MaladieNameSerialiser(maladies_queryset, many=True).data
    
    # def get_abonnement_detail(self, obj):
    #     abonnement_queryset = obj.abonnement_client.all()
    #     return AbonnementDetailSerialiser(abonnement_queryset, many=True).data
    
    def get_abonnement_detail(self, obj):
        abon = AbonnementClient.objects.filter(client__id=obj.id)
        # abonnement_queryset = obj.abonnement_client.all()
        return AbonnementDetailSerialiser(abon, many=True).data

    def get_presences(self, obj):
        query = obj.presences.all()
        # print('ceci sont les presneces', obj.presences.all())
        return PresenceSerialiser(query , many= True).data

    def get_last_presence(self, obj):
        print('this is the latest presence',Client.abonnement_manager.get_last_presence(obj.id))
        return Client.abonnement_manager.get_last_presence(obj.id)

    def calculate_age(self, obj):
        today = date.today()
        born = obj.birth_date
        print(born)
        try:
            return today.year - born.year - ((today.month, today.day) < (born.month, born.day))
        except:
            return 0


class PersonnelSerializer(serializers.ModelSerializer):
    state_display = serializers.ChoiceField(source='get_state_display', choices=STATE_CHOICES, read_only=True)
    civility_display = serializers.ChoiceField(source='get_civility_display', choices=CIVILITY_CHOICES, read_only=True)

    class Meta : 
        model = Personnel
        read_only_fields = ('date_added',)
        fields = ('id','civility','civility_display', 'last_name', 'first_name', 'adress', 'phone', 'email', 'nationality', 'birth_date', 'blood', 'state','state_display','note','date_added')


class CoachSerializer(serializers.ModelSerializer):
    civility_display = serializers.ChoiceField(source='get_civility_display', choices=CIVILITY_CHOICES, read_only=True)
    state_display = serializers.ChoiceField(source='get_state_display', choices=STATE_CHOICES, read_only=True)
    # creneau_hour = serializers.SerializerMethodField('get_creneau_hour')
    last_presence = serializers.SerializerMethodField('get_last_presence', read_only=True)
        

    class Meta:
        model = Coach
        read_only_fields = ('date_added',)
        fields= ('id','civility','civility_display','last_name', 'first_name', 'adress', 'phone', 'email', 'nationality', 'birth_date', 'blood', 'state','state_display','note', 'salaire', 'date_added', 'pay_per_hour',  'last_presence')

    def get_last_presence(self, obj):
        
        print('this is the latest presence',Coach.custom_manager.get_last_presence(obj.id))
        return Coach.custom_manager.get_last_presence(obj.id)

# creer a nested serialization to get abonnement client details in client detail
     
    # def get_creneau_hour(self, obj):
    #     return obj.creneaux.hour_start



class MaladieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Maladie
        fields= '__all__'
        

class ClientNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = ('id', 'last_name', 'first_name', 'adress', 'phone', 'date_added', 'faux_id')

class ClientTransactionsSerializer(serializers.ModelSerializer):
    transactions = serializers.SerializerMethodField('get_transactions', read_only=True)
    class Meta:
        model = Client
        fields = ('id', 'last_name', 'transactions')

    def get_transactions(self, obj):
        trans = obj.transactions.all()
        return PaiementClientSerializer(trans, many=True).data

# class ClientTransactionsSerializer(serializers.ModelSerializer):
#     transactions = serializers.SerializerMethodField('get_transactions', read_only=True)
#     class Meta:
#         model = Client
#         fields = ('id', 'last_name', 'transactions')

#     def get_transactions(self, obj):
#         trans = obj.transactions.all()
#         return PaiementClientSerializer(trans, many=True).data