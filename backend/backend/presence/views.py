from django.shortcuts import render, get_object_or_404
from rest_framework import generics
from .models import Presence, PresenceCoach
from .serializers import PresenceSerialiser, PresenceCreateSerialiser, PresenceEditSerialiser, PresenceCoachSerializer, PresenceClientSerialiser, PresencePostSerialiser
from rest_framework.permissions import AllowAny, IsAuthenticated
from client.models import Client # a supprimer apres les tests
# from abonnement.models import AbonnementClient
from datetime import date 
from rest_framework import status

from rest_framework.response import Response 
class PresenceAPIView(generics.CreateAPIView):
    queryset = Presence.objects.all()
    serializer_class = PresenceCreateSerialiser

class PresencePostAPIView(generics.CreateAPIView):
    queryset = Presence.objects.all()
    serializer_class = PresencePostSerialiser

    # def create(self, request, format =''):
    #     serializer = self.get_serializer(data=request.data)
    #     presence = serializer.instance
    #     print('ppresence validate data', presence)

    #     if serializer.is_valid():

    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)





        # self.perform_create(serializer)
        # print('hello create presnce',type( serializer.instance), serializer.data)
        # headers = self.get_success_headers(serializer.data)
        # presence = serializer.instance
        # print('ppresence validate data', presence)
        # if not presence.hour_sortie:
        #     presence.is_in_salle = True
        #     serializer.save()
        # return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)



class PresenceListAPIView(generics.ListAPIView):
    queryset = Presence.objects.all().order_by('-date')
    # permission_classes = (IsAuthenticated,)
    serializer_class = PresenceSerialiser


class PresenceDetailAPIView(generics.RetrieveUpdateAPIView):
    queryset = Presence.objects.all()
    # permission_classes = (IsAuthenticated,)
    serializer_class = PresenceSerialiser

    def get_object(self):
        obj = get_object_or_404(Presence.objects.filter(id=self.kwargs["pk"]))
        creneaux = Presence.presence_manager.get_presence(30)
        # abon = abonnement[0].id
        print('get_abonnement..................0....', creneaux)
        # #### ce passe dans une fonction
        # prenseces = abon.presence_quantity 
        # print('ceci est labonnement du client ', abon)

        # abonnement.update(presence_quantity = prenseces - 1 )
        return obj

class PresenceEditAPIView(generics.RetrieveUpdateAPIView):
    queryset = Presence.objects.all()
    # permission_classes = (IsAuthenticated,)
    serializer_class = PresenceEditSerialiser
    def get_object(self):
        obj = get_object_or_404(Presence.objects.filter(id=self.kwargs["pk"]))
        return obj



class PresenceDestroyAPIView(generics.DestroyAPIView):
    queryset = Presence.objects.all()
    serializer_class = PresenceSerialiser


class PresenceCoachCreateAPI(generics.CreateAPIView):
    queryset = PresenceCoach.objects.all()
    serializer_class = PresenceCoachSerializer

class PresenceCoachListAPI(generics.ListAPIView):
    queryset = PresenceCoach.objects.all()
    serializer_class = PresenceCoachSerializer

class PresenceByCoachListAPI(generics.ListAPIView):
    serializer_class = PresenceCoachSerializer
    def get_queryset(self):
        
        coach = self.request.query_params.get('cl', None)
        print('cliiiientr', coach)
        presences = PresenceCoach.objects.filter(coach=coach)
        return presences



class PresenceCoachDetailUpdateAPI(generics.RetrieveUpdateAPIView):
    queryset = PresenceCoach.objects.all()
    serializer_class = PresenceCoachSerializer

    def get_object(self):
        obj = get_object_or_404(PresenceCoach.objects.filter(id=self.kwargs["pk"]))
        return obj


class PresenceCoachDestroyAPI(generics.DestroyAPIView):
    queryset = PresenceCoach.objects.all()
    serializer_class = PresenceCoachSerializer


    
class PresenceCoachEditAPIView(generics.RetrieveUpdateAPIView):
    queryset = Presence.objects.all()
    # permission_classes = (IsAuthenticated,)
    serializer_class = PresenceEditSerialiser
    def get_object(self):
        obj = get_object_or_404(PresenceCoach.objects.filter(id=self.kwargs["pk"]))

        # obj = get_object_or_404(Presence.objects.filter(id=self.kwargs["pk"]))
        # creneaux = Presence.presence_manager.get_presence(30)
        # # abon = abonnement[0].id
        # print('get_abonnement..................0....', creneaux)
        # #### ce passe dans une fonction
        # prenseces = abon.presence_quantity 
        # print('ceci est labonnement du client ', abon)

        # abonnement.update(presence_quantity = prenseces - 1 )
        return obj

class PresenceClientDetailAPI(generics.ListAPIView):
    # queryset = PresenceCoach.objects.all()
    serializer_class = PresenceClientSerialiser
    def get_queryset(self):
        client = self.request.query_params.get('cl', None)
        # print('client', client)
        presences = Presence.objects.filter(client=client)
        return presences

class PresenceClientIsInAPI(generics.ListAPIView):
    # queryset = PresenceCoach.objects.all()
    serializer_class = PresenceClientSerialiser
    def get_queryset(self):
        # client = self.request.query_params.filter('cl', None)
        # print('client', client)
        presences = Presence.objects.filter(is_in_salle=True)

        return presences


