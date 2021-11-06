from .models import Presence, PresenceCoach
from rest_framework import serializers
from creneau.models import Creneau
from abonnement.models import AbonnementClient
from client.models import Client
from datetime import datetime


now = datetime.now()
print(now, type(now))

class SimilarCreneauSerializer(serializers.ModelSerializer):
    activity = serializers.SerializerMethodField('get_activity_name', read_only=True)
    class Meta:
        model = Creneau
        fields = ('id', 'activity')

    def get_activity_name(self, obj):
        return obj.activity.name


class PresencePostSerialiser(serializers.ModelSerializer):
    abonnement_client = serializers.IntegerField(max_value=None, min_value=None, write_only=True)
    class Meta:
        model = Presence
        fields= ('id','creneau', 'hour_entree', 'hour_sortie', 'client', 'note', 'abonnement_client')

    def create(self, validated_data):
        # creneaux_actuel = Creneau.range.get_creneau()
        # creneau = Creneau.range.get_creneau()[0]
        # print('validate ...................................data ', request)
        print('validate ::::::::::::::::::::::::::::::::::::::::::::::::::::data ', validated_data)
        client = validated_data['client']
        client_id = client.id
        abonnement = Client.abonnement_manager.get_abonnement(client_id)
        selected_abonnement = validated_data['abonnement_client']
        hour_in = validated_data['hour_entree']
        # hour_out = None
        in_salle = False
        creneau = validated_data['creneau']
        try:
            hour_out = validated_data['hour_sortie']
        except :
            hour_out = None
        in_salle = True 
        for abon in abonnement:
            if abon.id == selected_abonnement:
                abc_id = abon.id
                # current_time = now.strftime("%H:%M:%S")
                # he = current_time
                # is_in = Creneau.range.get_abc( abc_id)
                prenseces = abon.presence_quantity 
                # if is_in:
                # presence = Presence.objects.create(client= client, creneau= creneau, hour_entree=hour_in , hour_sortie=hour_out, is_in_list=True, is_in_salle=in_salle)
                presence = Presence.objects.create(client= client, creneau= creneau, hour_entree=hour_in , hour_sortie=hour_out,is_in_list=True, is_in_salle=in_salle)
                # abonnement = Client.abonnement_manager.get_abonnement(client_id)
                abc = AbonnementClient.objects.get(id=selected_abonnement)
                abc.presence_quantity =- 1 
                return presence
            else:
                print('le clients nest pas inscrit dans ce cours')

class PresenceEditSerialiser(serializers.ModelSerializer):
    client_last_name = serializers.RelatedField(source='last_name', read_only=True)

    class Meta:
        model = Presence
        read_only_fields = ('client_last_name', 'date', 'client')
        fields= ('id','creneau', 'hour_entree', 'hour_sortie','client_last_name', 'client', 'date', 'note')
        
    def update(self, instance, validate_data):
        current_time = now.strftime("%H:%M:%S")
        instance.hour_sortie = current_time
        instance.is_in_salle = False
        instance.save()
        return instance

class PresenceSerialiser(serializers.ModelSerializer):
    client_last_name = serializers.SerializerMethodField('get_client_name', read_only=True)
    activity = serializers.SerializerMethodField('get_activity', read_only=True)
    dettes = serializers.SerializerMethodField('get_client_dettes', read_only=True)

    class Meta:
        model = Presence
        fields= ('id','client','creneau', 'is_in_list','client_last_name', 'note','hour_entree', 'hour_sortie', 'is_in_salle','note','activity', 'date', 'dettes')
        
    def get_client_name(self, obj):
        nom = f"{obj.client.last_name} {obj.client.first_name} "
        # print('he hosdfvhnidso', nom) 
        return nom

    def get_activity(self, obj):
        # activite = obj.creneau.activity.name
        try:
            return obj.creneau.activity.name
        except:

            return False

    # def get_similar_creneaux( self, obj):
    #     cren = []
    #     try:
    #         creneau_id = obj.creneau.id
    #         creneaux = Creneau.range.get_similar_creneaux(creneau_id)
    #         return SimilarCreneauSerializer(creneaux, many=True).data
    #     except:
    #         return cren
    def get_client_dettes(self, obj):
        dettes = obj.client.dette
        # print('he hosdfvhnidso', nom) 
        return dettes


class PresenceClientSerialiser(serializers.ModelSerializer):
    client_activity = serializers.SerializerMethodField('get_activity', read_only=True)
    client_last_name = serializers.SerializerMethodField('get_client_name', read_only=True)
    

    class Meta:
        model = Presence
        fields= ('id','client','creneau', 'is_in_list', 'hour_entree', 'hour_sortie', 'is_in_salle','client_activity', 'client_last_name','date')
        

    def get_activity(self, obj):
        # activite = obj.creneau.activity.name
        try:
            return obj.creneau.activity.name
        except:

            return False
    def get_client_name(self, obj):
        nom = obj.client.last_name
        # print('he hosdfvhnidso', nom) 
        return nom



class PresenceCreateSerialiser(serializers.ModelSerializer):
    client_last_name = serializers.RelatedField(source='last_name', read_only=True)

    class Meta:
        model = Presence
        read_only_fields = ('creneau', 'is_in_list','client_last_name', 'hour_entree', 'hour_sortie', 'is_in_salle')
        fields= ('client','client_last_name')
      

    def create(self, validated_data):
        # print('la premeire des choses ====>', validated_data)
        creneaux_actuel = Creneau.range.get_creneau()
        # print('Le  creneau Actuel ==========>', creneaux_actuel)
        creneau = Creneau.range.get_creneau()[0]
        # print('val=====>', validated_data)
        client = validated_data['client']
        # print('CLIENT ID => ', client.id)
        client_id = client.id
        abonnement = Client.abonnement_manager.get_abonnement(client_id)
        # print('l \'abonnement du client est le :>>>>>>>>>>', abonnement)

        for abon in abonnement:
            abc_id = abon.id

        # abon = abonnement[0]
        # print('le id l \'abonnement du client est le :>>>>>>>>>>', abon, abon.id)
            current_time = now.strftime("%H:%M:%S")
            he = current_time
        # id_abon = abon.id
            is_in = Creneau.range.get_abc( abc_id)
        # print('IS IN ???????????????????????', is_in)
        # # AbonnementClient
            prenseces = abon.presence_quantity 
            # print('ceci est labonnement du client ', abon)
            if is_in:
                # print('il est dans la liste')

                presence = Presence.objects.create(client= client, creneau= creneau, hour_entree=he ,is_in_list=True, is_in_salle=True)
                abonnement = Client.abonnement_manager.get_abonnement(client_id)
                abonnement.update(presence_quantity = prenseces - 1 )

                return presence
        else:
            print('le clients nest pas inscrit dans ce cours')

    def update(self, instance, validate_data):
        current_time = now.strftime("%H:%M:%S")
        instance.hour_sortie = current_time
        instance.is_in_salle = False
        instance.save()
        return instance
    

class PresenceCoachSerializer(serializers.ModelSerializer):
    class Meta:
        model = PresenceCoach
        read_only_fields = ('date', 'hour_entree', 'hour_sortie', 'is_in_salle')

        fields= ('coach', 'date', 'hour_entree', 'hour_sortie', 'is_in_salle')  
    
    def create(self, validated_data):
        coach = validated_data['coach']
        current_time = now.strftime("%H:%M:%S")
        print('heure===============================', coach)
        presence = PresenceCoach.objects.create(coach= coach, hour_entree=current_time , is_in_salle=True)
        return presence

    def update(self, instance, validated_data):
        current_time = now.strftime("%H:%M:%S")
        instance.hour_sortie = current_time
        instance.is_in_salle = False
        instance.save()
        return instance