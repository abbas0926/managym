from django.urls import path, include
from .views import ClientAPIView, ClientListAPIView, ClientDestroyAPIView, ClientDetailAPIView, PersonnelCreateAPIView, PersonnelListAPIView, PersonnelDetailAPIView, PersonnelDestroyAPIView ,CoachCreateAPIView ,CoachListAPIView ,CoachDetailAPIView ,CoachDestroyAPIView, MaladieCreateAPIView, MaladieViewSet, ClientNameViewAPI, ClientPariementsViewAPI, total_dettes, total_abonnes

app_name = 'client'


urlpatterns = [
    # Clients paths
    path('clients/', ClientListAPIView.as_view(),  name="client"),
    path('clients-transactions/<int:pk>/', ClientPariementsViewAPI.as_view(),  name="client-transactions"),
    path('clients-dettes/', total_dettes,  name="client-dettes"),
    path('clients-count/', total_abonnes,  name="client-dettes"),
    
    path('clients-name/', ClientNameViewAPI.as_view(),  name="client-name"),
    path('clients/<int:pk>/', ClientDetailAPIView.as_view(), name="client-delete"),
    path('clients/create', ClientAPIView.as_view(),  name="client-create"),
    path('clients/delete/<int:pk>/', ClientDestroyAPIView.as_view(), name="client-delete"),
    # Personnel paths
    path('personnel/', PersonnelListAPIView.as_view(),  name="personnel"),
    path('personnel/<int:pk>/', PersonnelDetailAPIView.as_view(), name="personnel-delete"),
    path('personnel/create', PersonnelCreateAPIView.as_view(),  name="personnel-create"),
    path('personnel/delete/<int:pk>/', PersonnelDestroyAPIView.as_view(), name="personnel-delete"),
        # Coach CoachListAPIView
    path('coach/', CoachListAPIView.as_view(),  name="coach"),
    path('coach/<int:pk>/', CoachDetailAPIView.as_view(), name="coach-delete"),
    path('coach/create', CoachCreateAPIView.as_view(),  name="coach-create"),
    path('coach/delete/<int:pk>/', CoachDestroyAPIView.as_view(), name="coach-delete"),


    path('maladie/create/', MaladieCreateAPIView.as_view(), name="maladie-create"),
    path('maladie/', MaladieViewSet.as_view({'get':'list'}), name="maladie-create-list"),
]


