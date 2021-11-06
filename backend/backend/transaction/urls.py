from django.urls import path, include
from .views import PaiementAPIView, PaiementListAPIView, PaiementDetailAPIView, PaiementDestroyAPIView, AutreAPIView, AutreListAPIView, AutreDetailAPIView, AutreDestroyAPIView, AssuranceAPIView, AssuranceListAPIView, AssuranceDetailAPIView, AssuranceDestroyAPIView, RemunerationAPIView, RemunerationListAPIView, RemunerationDetailAPIView, RemunerationDestroyAPIView, RemunerationProfAPIView, RemunerationProfListAPIView, RemunerationProfDetailAPIView, RemunerationProfDestroyAPIView, TransactionListAPIView, TransactionDetailAPIView, PaiementCoachListAPIView, total_charges, chiffre_affaire,  TransToday


app_name = 'transactions'


urlpatterns = [
    path('', TransactionListAPIView.as_view(),  name="transaction"),
    # path('detail/<int:pk>/', TransactionDetailAPIView.as_view(),  name="transaction-detail"),
    path('paiement/create', PaiementAPIView.as_view(),  name="paiement-create"),
    path('paiement/', PaiementListAPIView.as_view(),  name="paiement"),
    path('paiement/<int:pk>/', PaiementDetailAPIView.as_view(), name="paiement-delete"),
    path('paiement/delete/<int:pk>/', PaiementDestroyAPIView.as_view(), name="paiement-delete"),

    path('autre/create', AutreAPIView.as_view(),  name="autre-create"),
    path('autre/', AutreListAPIView.as_view(),  name="autre"),
    path('autre/<int:pk>/', AutreDetailAPIView.as_view(), name="autre-delete"),
    path('autre/delete/<int:pk>/', AutreDestroyAPIView.as_view(), name="autre-delete"),

    path('assurance/create', AssuranceAPIView.as_view(),  name="assurance-create"),
    path('assurance/', AssuranceListAPIView.as_view(),  name="assurance"),
    path('assurance/<int:pk>/', AssuranceDetailAPIView.as_view(), name="assurance-delete"),
    path('assurance/delete/<int:pk>/', AssuranceDestroyAPIView.as_view(), name="assurance-delete"),

    path('remuneration/create', RemunerationAPIView.as_view(),  name="remuneration-create"),
    path('remuneration/', RemunerationListAPIView.as_view(),  name="remuneration"),
    path('remuneration/<int:pk>/', RemunerationDetailAPIView.as_view(), name="remuneration-delete"),
    path('remuneration/delete/<int:pk>/', RemunerationDestroyAPIView.as_view(), name="remuneration-delete"),

    path('remunerationProf/create', RemunerationProfAPIView.as_view(),  name="remunerationProf-create"),
    path('remunerationProf-by-coach/', PaiementCoachListAPIView.as_view(),  name="remunerationProf-create"),
    path('remunerationProf/', RemunerationProfListAPIView.as_view(),  name="remunerationProf"),
    path('remunerationProf/<int:pk>/', RemunerationProfDetailAPIView.as_view(), name="remunerationProf-delete"),
    path('remunerationProf/delete/<int:pk>/', RemunerationProfDestroyAPIView.as_view(), name="remunerationProf-delete"),
    path('total-charges/', total_charges, name="total-charges"),
    path('chiffre-affaire/', chiffre_affaire, name="chiffre-affaire"),
    # path('trans-today/', trans_today, name="trans-today"),
    path('trans-today/', TransToday.as_view(), name="trans-today"),
    
]


