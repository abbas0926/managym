
from .models import AbonnementClient, Abonnement
from rest_framework import serializers
from datetime import datetime, timedelta, date
from creneau.models import Creneau
from creneau.serializers import CreneauSerialiser
from salle_activite.serializers import ActivitySerialiser

class AbonnementClientDetailUpdateSerialiser(serializers.ModelSerializer):
    activity = serializers.SerializerMethodField('get_activity', read_only=True)
    type_abonnement = serializers.SerializerMethodField('get_abon_name', read_only=True)

    class Meta:
        model = AbonnementClient
        fields= ('id','end_date', 'client', 'type_abonnement', 'presence_quantity', 'creneaux', 'activity')

    def get_activity(self, obj):
        abonnement_id = obj.type_abonnement.id
        abonnement = Abonnement.objects.get(id = abonnement_id)
        acittys = abonnement.activity.all()
        return ActivitySerialiser(acittys, many=True).data
    def get_abon_name(self, obj):
        return obj.type_abonnement.name

class AbonnementClientSerialiser(serializers.ModelSerializer):
    # creneaux = serializers.PrimaryKeyRelatedField(many=True, queryset= Creneau.objects.all())
    # creneaux = CreneauSerialiser(many=True)
    type_abonnement_name = serializers.SerializerMethodField('get_abon_name', read_only=True)
    
    class Meta:
        model = AbonnementClient
        read_only_fields = ('end_date','presence_quantity')
        fields= ('id','end_date', 'client', 'type_abonnement', 'presence_quantity', 'creneaux', 'type_abonnement_name')


    def get_abon_name(self, obj):
        return obj.type_abonnement.name
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





        # abonnement_client.creneaux.create()
        # for creneau in creneaux:
        #     Creneau.objects.create(abonnements=abonnement_client, **creneaux)
        # for creneau in creneaux:
        #     Creneau.objects.create()
        
        
        # creneaux = validated_data['creneau']
        # client = validated_data['client']
        # abon = validated_data['type_abonnement']
        # print('presennnce =====>', presence_quantity)
        # return AbonnementClient.objects.create(end_date=end_date,presence_quantity=presence_quantity**validated_data)
class AbonnementClientDetailSerializer(serializers.ModelSerializer):
    type_abonnement_name = serializers.SerializerMethodField('get_type_abonnement_name', read_only=True)

    class Meta:
        model = AbonnementClient
        fields =('id', 'end_date', 'type_abonnement' , 'type_abonnement_name','presence_quantity', 'creneaux')
    def get_type_abonnement_name(self, obj):
        return obj.type_abonnement.name

class AbonnementSerialiser(serializers.ModelSerializer):
    clients_number = serializers.SerializerMethodField('get_clients_number', read_only=True)
    activity_name = serializers.SerializerMethodField('get_activity_name', read_only=True)
    class Meta:
        model = Abonnement
        read_only_fields = ('clients_number','activity_name')
        fields= ('id', 'name', 'price', 'number_of_days', 'seances_quantity', 'activity', 'clients_number','activity_name', 'systeme_cochage')

    def get_clients_number(self, obj):
        try:
            queryset = Abonnement.objects.get(id = obj.id)
            number = queryset.type_abonnement_client.count()
            return number 
        except:
            return False
    
    def get_activity_name(self, obj):
        try:
            return obj.activity.name
        except:
            return False

    # def create(self, validate_data):
    #     abon = Abonnement.objects.create(**validate_data)
    #     return True


# class AbonnementClientSimpleSerializer(serializers.ModelSerializer):
#     class Meta:
#         model= AbonnementClient
#         fields= '__all__'
        