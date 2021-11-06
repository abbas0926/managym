from django.shortcuts import render, get_object_or_404
from rest_framework import generics
from .models import Creneau
from .serializers import CreneauSerialiser, CreneauxSimpleSerialiser, CreneauClientSerialiser
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import api_view
from rest_framework.response import Response

class CreneauAPIView(generics.CreateAPIView):
    queryset = Creneau.objects.all()
    serializer_class = CreneauSerialiser


class CreneauListAPIView(generics.ListAPIView):
    serializer_class = CreneauSerialiser
    # permission_classes = (IsAuthenticated,)
    queryset = Creneau.objects.all()

class CreneauActivityListAPIView(generics.ListAPIView):
    serializer_class = CreneauSerialiser
    # permission_classes = (IsAuthenticated,)
    def get_queryset(self):
        par = self.request.query_params.get('day', None)
        activ = self.request.query_params.get('act', None)
        return Creneau.objects.filter(day=par, activity=activ)

class CreneauPerSalleListAPIView(generics.ListAPIView):
    serializer_class = CreneauSerialiser
    # permission_classes = (IsAuthenticated,)
    def get_queryset(self):
        salle = self.request.query_params.get('salle', None)



        return Creneau.objects.filter(activity__salle=salle)

class CreneauBySalleAndPlanningListAPIView(generics.ListAPIView):
    serializer_class = CreneauSerialiser
    # permission_classes = (IsAuthenticated,)
    def get_queryset(self):
        salle = self.request.query_params.get('sa', None)
        planning = self.request.query_params.get('pl', None)
        return Creneau.objects.filter(activity__salle=salle, planning=planning)

    # def get_queryset(self):
    #     jour = self.kwargs['day']
    #     # activ = self.kwargs['activity']
    #     creneaux= Creneau.objects.filter(day=jour)
    #     return creneaux
        
    
class CreneauDetailAPIView(generics.RetrieveUpdateAPIView):
    queryset = Creneau.objects.all()
    # permission_classes = (IsAuthenticated,)
    serializer_class = CreneauSerialiser

    def get_object(self):
        obj = get_object_or_404(Creneau.objects.filter(id=self.kwargs["pk"]))
        # range = Creneau.objects.filter(hour_start) 
        # print('Salle ... ', Creneau.range.get_clients(21))
        chose = Creneau.range.get_creneaux_of_day()
        print('la choooose,', chose)
        # print('Salle ... ', self.kwargs)
        return obj

class CreneauDestroyAPIView(generics.DestroyAPIView):
    queryset = Creneau.objects.all()
    serializer_class = CreneauSerialiser

    
class CreneauByAbonnement(generics.ListAPIView):
    serializer_class = CreneauxSimpleSerialiser
    def get_queryset(self):
        abonnement = self.request.query_params.get('ab', None)
        creneaux = Creneau.objects.filter(activity__activities__id = abonnement)
        # print('les ceneaux', creneaux.count())
        return creneaux



class CreneauClientListAPIView(generics.ListAPIView):
    serializer_class = CreneauClientSerialiser
    # permission_classes = (IsAuthenticated,)
    def get_queryset(self):
        
        client = self.request.query_params.get('cl', None)
        print('cliiiientr', client)
        creneaux = Creneau.objects.filter(pizzas__client=client)
        return creneaux

class CreneauCoachListAPIView(generics.ListAPIView):
    serializer_class = CreneauClientSerialiser
    # permission_classes = (IsAuthenticated,)
    def get_queryset(self):
        
        coach = self.request.query_params.get('cl', None)
        print('cliiiientr', coach)
        creneaux = Creneau.objects.filter(coach=coach)
        return creneaux



# @api_view(['GET'])
# def creneau_by_abonnee(request):
#     creneaux = Creneau.objects.filter()
#     return Response({'creneaux': creneaux})


