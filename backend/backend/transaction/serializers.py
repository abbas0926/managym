from .models import Paiement, Autre, AssuranceTransaction, Remuneration, RemunerationProf, Transaction
from rest_framework import serializers
from client.serializers import ClientNameSerializer
from rest_framework.response import Response

class PaiementSerialiser(serializers.ModelSerializer):
    client = serializers.SerializerMethodField('get_client_name', read_only=True)
    class Meta:
        model = Paiement
        fields= ('id', 'amount', 'client', 'last_modified', 'notes')
        
    def get_client_name(self, obj):
        return Response({'id' : obj.client.id, 'name' : obj.client.last_name}).data

class PaiementPostSerialiser(serializers.ModelSerializer):
    class Meta:
        model = Paiement
        fields= '__all__'

class RemunerationProfPostSerialiser(serializers.ModelSerializer):
    class Meta:
        model = RemunerationProf
        fields= '__all__'

class AssuranceSerialiser(serializers.ModelSerializer):
    client = serializers.SerializerMethodField('get_client_name', read_only=True)

    class Meta:
        model = AssuranceTransaction
        fields= ('id', 'amount', 'client', 'last_modified', 'notes')

    def get_client_name(self, obj):
        return Response({'id' : obj.client.id, 'name' : obj.client.last_name}).data


class AutreSerialiser(serializers.ModelSerializer):
    class Meta:
        model = Autre
        fields= '__all__'

class AssurancePostSerialiser(serializers.ModelSerializer):
    class Meta:
        model = AssuranceTransaction
        fields= '__all__'

class RemunerationSerialiser(serializers.ModelSerializer):
    client = serializers.SerializerMethodField('get_client_name', read_only=True)
    class Meta:
        model = Remuneration 
        fields= ('id', 'amount', 'client', 'last_modified', 'notes')
    def get_client_name(self, obj):
        return Response({'id' : obj.nom.id, 'name' : obj.nom.last_name}).data


class RemunerationPostSerialiser(serializers.ModelSerializer):
    class Meta:
        model = Remuneration 
        fields= '__all__'

class RemunerationProfSerialiser(serializers.ModelSerializer):
    coach = serializers.SerializerMethodField('get_coach_name', read_only=True)

    class Meta:
        model = RemunerationProf
        fields= ('id', 'amount', 'coach', 'last_modified', 'notes')
    def get_coach_name(self, obj):
        return Response({'id' : obj.coach.id, 'name' : obj.coach.last_name}).data


class TransactionSerialiser(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields= '__all__'
        depth = 1