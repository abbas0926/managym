from django.shortcuts import render, get_object_or_404
from rest_framework import generics
from .models import Paiement, Autre, AssuranceTransaction, Remuneration, RemunerationProf, Transaction

from .serializers import PaiementSerialiser, AutreSerialiser, AssuranceSerialiser, RemunerationSerialiser, RemunerationProfSerialiser, TransactionSerialiser, RemunerationProfPostSerialiser,PaiementPostSerialiser, AssurancePostSerialiser, RemunerationPostSerialiser
from rest_framework.permissions import AllowAny, IsAuthenticated
from drf_multiple_model.views import FlatMultipleModelAPIView, ObjectMultipleModelAPIView
from rest_framework.decorators import api_view, permission_classes
from django.db.models import Sum
from rest_framework.response import Response
from datetime import date
class PaiementAPIView(generics.CreateAPIView):
    queryset = Paiement.objects.all()
    serializer_class = PaiementPostSerialiser


class PaiementListAPIView(generics.ListAPIView):
    queryset = Paiement.objects.all()
    # permission_classes = (IsAuthenticated,)
    serializer_class = PaiementSerialiser


class PaiementDetailAPIView(generics.RetrieveUpdateAPIView):
    queryset = Paiement.objects.all()
    # permission_classes = (IsAuthenticated,)
    serializer_class = PaiementPostSerialiser

    def get_object(self): 
        obj = get_object_or_404(Paiement.objects.filter(id=self.kwargs["pk"]))
        return obj
    

class PaiementDestroyAPIView(generics.DestroyAPIView):
    queryset = Paiement.objects.all()
    serializer_class = PaiementSerialiser

# fin des paiement 


class AutreAPIView(generics.CreateAPIView):
    queryset = Autre.objects.all()
    serializer_class = AutreSerialiser


class AutreListAPIView(generics.ListAPIView):
    queryset = Autre.objects.all()
    # permission_classes = (IsAuthenticated,)
    serializer_class = AutreSerialiser


class AutreDetailAPIView(generics.RetrieveUpdateAPIView):
    queryset = Autre.objects.all()
    # permission_classes = (IsAuthenticated,)
    serializer_class = AutreSerialiser

    def get_object(self):
        obj = get_object_or_404(Autre.objects.filter(id=self.kwargs["pk"]))
        return obj
    

class AutreDestroyAPIView(generics.DestroyAPIView):
    queryset = Autre.objects.all()
    serializer_class = AutreSerialiser


# FIN AUTRE#########

class AssuranceAPIView(generics.CreateAPIView):
    queryset = AssuranceTransaction.objects.all()
    serializer_class = AssurancePostSerialiser



class AssuranceListAPIView(generics.ListAPIView):
    queryset = AssuranceTransaction.objects.all()
    # permission_classes = (IsAuthenticated,)
    serializer_class = AssuranceSerialiser


class AssuranceDetailAPIView(generics.RetrieveUpdateAPIView):
    queryset = AssuranceTransaction.objects.all()
    # permission_classes = (IsAuthenticated,)
    serializer_class = AssurancePostSerialiser

    def get_object(self):
        obj = get_object_or_404(AssuranceTransaction.objects.filter(id=self.kwargs["pk"]))
        return obj
    

class AssuranceDestroyAPIView(generics.DestroyAPIView):
    queryset = AssuranceTransaction.objects.all()
    serializer_class = AssuranceSerialiser

# FIN ASSURANCE#########

class RemunerationAPIView(generics.CreateAPIView):
    queryset = Remuneration.objects.all()
    serializer_class = RemunerationPostSerialiser


class RemunerationListAPIView(generics.ListAPIView):
    queryset = Remuneration.objects.all()
    # permission_classes = (IsAuthenticated,)
    serializer_class = RemunerationSerialiser


class RemunerationDetailAPIView(generics.RetrieveUpdateAPIView):
    queryset = Remuneration.objects.all()
    # permission_classes = (IsAuthenticated,)
    serializer_class = RemunerationPostSerialiser

    def get_object(self):
        obj = get_object_or_404(Remuneration.objects.filter(id=self.kwargs["pk"]))
        return obj
    

class RemunerationDestroyAPIView(generics.DestroyAPIView):
    queryset = Remuneration.objects.all()
    serializer_class = RemunerationSerialiser


# FIN ASSURANCE#########
class RemunerationProfAPIView(generics.CreateAPIView):
    queryset = RemunerationProf.objects.all()
    serializer_class = RemunerationProfPostSerialiser



class RemunerationProfListAPIView(generics.ListAPIView):
    queryset = RemunerationProf.objects.all()
    # permission_classes = (IsAuthenticated,)
    serializer_class = RemunerationProfSerialiser

class RemunerationProfDetailAPIView(generics.RetrieveUpdateAPIView):
    queryset = RemunerationProf.objects.all()
    # permission_classes = (IsAuthenticated,)
    serializer_class = RemunerationProfPostSerialiser

    def get_object(self):
        obj = get_object_or_404(RemunerationProf.objects.filter(id=self.kwargs["pk"]))
        return obj
    

class RemunerationProfDestroyAPIView(generics.DestroyAPIView):
    queryset = RemunerationProf.objects.all()
    serializer_class = RemunerationProfSerialiser

class TransactionListAPIView(FlatMultipleModelAPIView):
    sorting_fields = ['-last_modified']
    querylist = [
        {
            'queryset': Paiement.objects.all().order_by('-last_modified'),
            'serializer_class': PaiementSerialiser,
            'label': 'paiement',
        },
        {
            'queryset': Remuneration.objects.all().order_by('-last_modified'),
            'serializer_class': RemunerationSerialiser,
            'label': 'remuneration',
        },
        {
            'queryset': Autre.objects.all().order_by('-last_modified'),
            'serializer_class': AutreSerialiser,
            'label': 'autre',
        },
        {
            'queryset': RemunerationProf.objects.all().order_by('-last_modified'),
            'serializer_class': RemunerationProfSerialiser,
            'label': 'remunerationProf',
        },
        {
            'queryset': AssuranceTransaction.objects.all().order_by('-last_modified'),
            'serializer_class': AssuranceSerialiser,
            'label': 'assurance',
        },
     ]
    
    # def get_queryset(self):
    #     return Transaction.objects.select_subclasses()

class TransactionDetailAPIView(generics.RetrieveUpdateAPIView):
    # querylist = [
    #     {
    #         'queryset': Paiement.objects.all(),
    #         'serializer_class': PaiementSerialiser,
    #         'label': 'Paiements',
    #     },
    #     {
    #         'queryset': Remuneration.objects.all(),
    #         'serializer_class': RemunerationSerialiser,
    #         'label': 'Remunerations',
    #     },
    #  ]
    queryset = Transaction.objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = TransactionSerialiser

    def get_object(self): 
        obj = get_object_or_404(Transaction.objects.filter(id=self.kwargs["pk"]))
        return obj
    
class PaiementCoachListAPIView(generics.ListAPIView):
    serializer_class = RemunerationProfPostSerialiser
    # permission_classes = (IsAuthenticated,)
    def get_queryset(self):
        
        coach = self.request.query_params.get('cl', None)
        print('cliiiientr', coach)
        creneaux = RemunerationProf.objects.filter(coach=coach)
        return creneaux

@api_view(['GET'])
def total_charges(request):
    charges_coachs = RemunerationProf.objects.filter(amount__gte = 0).aggregate(Sum('amount'))
    charges_personnel = Remuneration.objects.filter(amount__gte = 0).aggregate(Sum('amount'))
    charges_autre = Autre.objects.filter(amount__lte = 0).aggregate(Sum('amount'))
    try:
        total = charges_coachs['amount__sum'] + charges_personnel['amount__sum'] + charges_autre['amount__sum']
    except:
        total = charges_coachs['amount__sum'] + charges_personnel['amount__sum'] 
        try:
            total = charges_coachs['amount__sum'] + charges_autre['amount__sum']
        except:
            total =  charges_personnel['amount__sum'] + charges_autre['amount__sum']
            try:
                total = charges_coachs['amount__sum'] 
            except:
                total = charges_personnel['amount__sum'] 
                try:
                    total =  charges_autre['amount__sum']
                except:
                    total = 0
    return Response( {'total_charges': total})


@api_view(['GET'])
def chiffre_affaire(request):
    # charges_coachs = RemunerationProf.objects.filter(amount__lte = 0).aggregate(Sum('amount'))
    # charges_personnel = Remuneration.objects.filter(amount__lte = 0).aggregate(Sum('amount'))
    ttc_autre = Autre.objects.filter(amount__gte = 0).aggregate(Sum('amount'))
    ttc_paiement = Paiement.objects.all().aggregate(Sum('amount'))
    ttc_assurance = Paiement.objects.all().aggregate(Sum('amount'))

    if not ttc_autre :
        ttc_autre = 0

    if not ttc_paiement :
        ttc_paiement = 0

    if not ttc_assurance :
        ttc_assurance = 0
    total = ttc_autre['amount__sum'] + ttc_paiement['amount__sum'] + ttc_assurance['amount__sum']
    return Response( {'chiffre_affaire': total})

# @api_view(['GET'])
# def trans_today(request):
#     today = date.today()
#     trans = Transaction.objects.filter(date_creation = today)

#     return Response(trans).data

class TransToday(FlatMultipleModelAPIView):
    today = date.today()

    sorting_fields = ['-last_modified']
    querylist = [
        {
            'queryset': Paiement.objects.filter(date_creation = today).order_by('-last_modified'),
            'serializer_class': PaiementSerialiser,
            'label': 'paiement',
        },
        {
            'queryset': Remuneration.objects.filter(date_creation = today).order_by('-last_modified'),
            'serializer_class': RemunerationSerialiser,
            'label': 'remuneration',
        },
        {
            'queryset': Autre.objects.filter(date_creation = today).order_by('-last_modified'),
            'serializer_class': AutreSerialiser,
            'label': 'autre',
        },
        {
            'queryset': RemunerationProf.objects.filter(date_creation = today).order_by('-last_modified'),
            'serializer_class': RemunerationProfSerialiser,
            'label': 'remunerationProf',
        },
        {
            'queryset': AssuranceTransaction.objects.filter(date_creation = today).order_by('-last_modified'),
            'serializer_class': AssuranceSerialiser,
            'label': 'assurance',
        },
     ]
    # def get_queryset(self):
    #     today = date.today()

    #     return Transaction.objects.filter(date_creation = today)