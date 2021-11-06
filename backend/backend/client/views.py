from django.shortcuts import render, get_object_or_404
from rest_framework import generics, viewsets
from .models import Client, Personnel, Coach, Maladie
from .serializers import ClientSerialiser, PersonnelSerializer, CoachSerializer, MaladieSerializer, ClientNameSerializer, ClientTransactionsSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from django_auto_prefetching import AutoPrefetchViewSetMixin
from rest_framework.decorators import api_view, permission_classes
from django.db.models import Sum
from rest_framework import pagination
from rest_framework import filters


class StandardResultsSetPagination(pagination.PageNumberPagination):
    page_size = 20
    page_size_query_param = 'page_size'
    max_page_size = 100


class ClientAPIView(generics.CreateAPIView):
    serializer_class = ClientSerialiser
    queryset = Client.objects.all()
    parser_classes = [MultiPartParser, FormParser]

    # lookup_field = 'slug'
   # permission_classes = (AllowAny, )



class ClientListAPIView(AutoPrefetchViewSetMixin, generics.ListAPIView):
    pagination_class = StandardResultsSetPagination

    queryset = Client.objects.all()
    # permission_classes = (IsAuthenticated,)
    serializer_class = ClientSerialiser
    # lookup_field = 'slug'
    permission_classes = (AllowAny, )
    search_fields = ['last_name',  'first_name', 'birth_date']


class ClientDetailAPIView(generics.RetrieveUpdateAPIView):
    queryset = Client.objects.all()
    # permission_classes = (IsAuthenticated,)
    serializer_class = ClientSerialiser
    # permission_classes = (AllowAny, )

    def get_object(self):
        obj = get_object_or_404(Client.objects.filter(id=self.kwargs["pk"]))
        return obj
    

class ClientDestroyAPIView(generics.DestroyAPIView):
    queryset = Client.objects.all()
    serializer_class = ClientSerialiser
    # lookup_field = 'slug'
    permission_classes = (AllowAny, )

################################################
#################  PERSONNEL  ##################
################################################


class PersonnelCreateAPIView(generics.CreateAPIView):
    queryset = Personnel.objects.all()
    serializer_class = PersonnelSerializer
    permission_classes = (AllowAny, )



class PersonnelListAPIView(generics.ListAPIView):
    queryset = Personnel.objects.all()
    # permission_classes = (IsAuthenticated,)
    serializer_class = PersonnelSerializer
    # lookup_field = 'slug'
    permission_classes = (AllowAny, )


class PersonnelDetailAPIView(generics.RetrieveUpdateAPIView):
    queryset = Personnel.objects.all()
    # permission_classes = (IsAuthenticated,)
    serializer_class = PersonnelSerializer
    # permission_classes = (AllowAny, )

    def get_object(self):
        obj = get_object_or_404(Personnel.objects.filter(id=self.kwargs["pk"]))
        return obj
    

class PersonnelDestroyAPIView(generics.DestroyAPIView):
    queryset = Personnel.objects.all()
    serializer_class = PersonnelSerializer
    # lookup_field = 'slug'
    permission_classes = (AllowAny, )

###############################################
#################   COACHS   ##################
###############################################
class CoachCreateAPIView(generics.CreateAPIView):
    queryset = Coach.objects.all()
    serializer_class = CoachSerializer
    permission_classes = (AllowAny, )



class CoachListAPIView(generics.ListAPIView):
    queryset = Coach.objects.all()
    # permission_classes = (IsAuthenticated,)
    serializer_class = CoachSerializer
    # lookup_field = 'slug'
    permission_classes = (AllowAny, )


class CoachDetailAPIView(generics.RetrieveUpdateAPIView):
    queryset = Coach.objects.all()
    # permission_classes = (IsAuthenticated,)
    serializer_class = CoachSerializer
    # permission_classes = (AllowAny, )

    def get_object(self):
        obj = get_object_or_404(Coach.objects.filter(id=self.kwargs["pk"]))
        return obj
    

class CoachDestroyAPIView(generics.DestroyAPIView):
    queryset = Coach.objects.all()
    serializer_class = CoachSerializer
    # lookup_field = 'slug'
    permission_classes = (AllowAny, )

class MaladieCreateAPIView(generics.CreateAPIView):
    queryset = Maladie.objects.all()
    serializer_class = MaladieSerializer
    permission_classes = (AllowAny, )

class MaladieViewSet(viewsets.ViewSet):
    queryset = Maladie.objects.all()
    serializer_class = MaladieSerializer
    permission_classes = (AllowAny, )

    def list(self, request):
        queryset = Maladie.objects.all()
        serializer = MaladieSerializer(queryset, many=True)
        return Response(serializer.data)


class ClientNameViewAPI(generics.ListAPIView):
    pagination_class = StandardResultsSetPagination

    queryset = Client.objects.all().order_by('-date_added')
    serializer_class = ClientNameSerializer
    search_fields = ['last_name', 'id', 'first_name', 'faux_id']
    filter_backends = (filters.SearchFilter,)

class ClientPariementsViewAPI(generics.RetrieveAPIView):
    queryset = Client.objects.all()
    serializer_class = ClientTransactionsSerializer


@api_view(['GET'])
def total_dettes(request):
    dettes = Client.objects.all().aggregate(Sum('dette'))

    return Response(dettes)

@api_view(['GET'])
def total_abonnes(request):
    total_abonnees = Client.objects.all().count()
    return Response( { 'abonnees': total_abonnees})


# @api_view(['GET'])
# def abonnements(request):
#     total_abonnees = Client.objects.all().count()
#     return Response( { 'abonnees': total_abonnees})
