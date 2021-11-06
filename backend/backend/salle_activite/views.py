

from django.shortcuts import render, get_object_or_404
from rest_framework import generics
from .models import Salle, Activity
from .serializers import SalleSerialiser, ActivitySerialiser
from rest_framework.permissions import AllowAny, IsAuthenticated


class SalleAPIView(generics.CreateAPIView):
    queryset = Salle.objects.all()
    serializer_class = SalleSerialiser


class SalleListAPIView(generics.ListAPIView):
    queryset = Salle.objects.all()
    # permission_classes = (IsAuthenticated,)
    serializer_class = SalleSerialiser


class SalleDetailAPIView(generics.RetrieveUpdateAPIView):
    queryset = Salle.objects.all()
    # permission_classes = (IsAuthenticated,)
    serializer_class = SalleSerialiser

    def get_object(self):
        obj = get_object_or_404(Salle.objects.filter(id=self.kwargs["pk"]))
        print('Salle ... ', obj , obj.id)
        return obj
    

class SalleDestroyAPIView(generics.DestroyAPIView):
    queryset = Salle.objects.all()
    serializer_class = SalleSerialiser


class ActivityAPIView(generics.CreateAPIView):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerialiser



class ActivityListAPIView(generics.ListAPIView):
    queryset = Activity.objects.all()
    # permission_classes = (IsAuthenticated,)
    serializer_class = ActivitySerialiser


class ActivityDetailAPIView(generics.RetrieveUpdateAPIView):
    queryset = Activity.objects.all()
    # permission_classes = (IsAuthenticated,)
    serializer_class = ActivitySerialiser

    def get_object(self):
        obj = get_object_or_404(Activity.objects.filter(id=self.kwargs["pk"]))
        print('ACTIVITé ', obj , obj.id)
        return obj
    

class ActivityDestroyAPIView(generics.DestroyAPIView):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerialiser


