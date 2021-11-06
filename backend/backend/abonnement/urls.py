from django.urls import path, include
from .views import AbonnementAPIView, AbonnementListAPIView, AbonnementDetailAPIView, AbonnementDestroyAPIView ,AbonnementClientCreateAPIView ,AbonnementClientListAPIView ,AbonnementClientDetailAPIView ,AbonnementClientDestroyAPIView, renew_api_view, AbonnementClientDetailListApi
# , RenewalSubscription
from .views import *
app_name = 'abonnement'


urlpatterns = [
    path('abonnement/', AbonnementListAPIView.as_view(),  name="abonnement"),
    path('abonnement/<int:pk>/', AbonnementDetailAPIView.as_view(), name="abonnement-delete"),
    path('abonnement/create', AbonnementAPIView.as_view(),  name="abonnement-create"),
    path('abonnement/delete/<int:pk>/', AbonnementDestroyAPIView.as_view(), name="abonnement-delete"),

    path('abonnement-client/', AbonnementClientListAPIView.as_view(),  name="type"),
    path('abonnement-by-client/', AbonnementClientDetailListApi.as_view(),  name="abc-by-client"),
    path('abonnement-client/renew/<int:pk>/', renew_api_view, name="type-delete"),
    path('abonnement-client/<int:pk>/', AbonnementClientDetailAPIView.as_view(), name="type-delete"),
    path('abonnement-client/create', AbonnementClientCreateAPIView.as_view(),  name="type-create"),
    path('abonnement-client/delete/<int:pk>/', AbonnementClientDestroyAPIView.as_view(), name="type-delete"),
]


