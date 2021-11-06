from django.shortcuts import render, get_object_or_404
from rest_framework import generics
from .models import Abonnement,  AbonnementClient
from .serializers import AbonnementClientSerialiser, AbonnementSerialiser, AbonnementClientDetailUpdateSerialiser, AbonnementClientDetailSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from datetime import timedelta
from rest_framework.response import Response
from client.models import Client

class AbonnementClientCreateAPIView(generics.CreateAPIView):
    queryset = AbonnementClient.objects.all()
    serializer_class = AbonnementClientSerialiser


class AbonnementClientListAPIView(generics.ListAPIView):
    queryset = AbonnementClient.objects.all()
    # permission_classes = (IsAuthenticated,)
    serializer_class = AbonnementClientSerialiser


class AbonnementClientDetailAPIView(generics.RetrieveUpdateAPIView):
    queryset = AbonnementClient.objects.all()
    # permission_classes = (IsAuthenticated,)
    serializer_class = AbonnementClientDetailUpdateSerialiser

    def get_object(self):
        obj = get_object_or_404(AbonnementClient.objects.filter(id=self.kwargs["pk"]))
        print('Test de get client =======> ', obj.creneaux.all() )
        return obj
    

class AbonnementClientDestroyAPIView(generics.DestroyAPIView):
    queryset = AbonnementClient.objects.all()
    serializer_class = AbonnementClientSerialiser


    ##### FIN TYPE #####


class AbonnementAPIView(generics.CreateAPIView):
    queryset = Abonnement.objects.all()
    serializer_class = AbonnementSerialiser


class AbonnementListAPIView(generics.ListAPIView):
    queryset = Abonnement.objects.all()
    # permission_classes = (IsAuthenticated,)
    serializer_class = AbonnementSerialiser


class AbonnementDetailAPIView(generics.RetrieveUpdateAPIView):
    queryset = Abonnement.objects.all()
    # permission_classes = (IsAuthenticated,)
    serializer_class = AbonnementSerialiser

    def get_object(self):
        obj = get_object_or_404(Abonnement.objects.filter(id=self.kwargs["pk"]))
        return obj
    

class AbonnementDestroyAPIView(generics.DestroyAPIView):
    queryset = Abonnement.objects.all()
    serializer_class = AbonnementSerialiser


@api_view(['GET'])
def renew_api_view(request, pk):
    abc  = AbonnementClient.objects.get( id = pk)
    abon = abc.type_abonnement
    jours =   abon.number_of_days
    seances = abon.seances_quantity
    delta = timedelta(days = jours)
    abc.end_date = abc.end_date + delta
    abc.presence_quantity += seances
    print('le type dabonnement', delta)
    client = Client.objects.get(abonnement_client__id= abc.id)
    client.dette += abon.price
    abc.save()
    client.save()
    
    # print('reqeust', jours, ' heeey', seances)
    return Response({'new date' : abc.end_date, 'seances': abc.presence_quantity, 'dettes_client': client.dette})

class AbonnementClientDetailListApi(generics.ListAPIView):
    serializer_class = AbonnementClientDetailSerializer    
    def get_queryset(self):
        
        client = self.request.query_params.get('cl', None)
        print('cliiiientr', client)
        abonnements = AbonnementClient.objects.filter(client=client)
        return abonnements