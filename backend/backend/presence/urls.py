from django.urls import path, include
from .views import PresenceAPIView, PresenceListAPIView, PresenceDetailAPIView, PresenceDestroyAPIView, PresenceEditAPIView,PresenceCoachCreateAPI,PresenceCoachListAPI,PresenceCoachDetailUpdateAPI,PresenceCoachDestroyAPI, PresenceCoachEditAPIView, PresenceClientDetailAPI, PresenceByCoachListAPI, PresenceClientIsInAPI, PresencePostAPIView


app_name = 'presence'


urlpatterns = [
    path('', PresenceListAPIView.as_view(),  name="presence"),
    path('presence-create', PresencePostAPIView.as_view(),  name="presence-create"),
    path('client/', PresenceClientDetailAPI.as_view(),  name="presence-client"),

    path('coachs/', PresenceCoachListAPI.as_view(), name="presence-edit"),
    path('by-coachs/', PresenceByCoachListAPI.as_view(), name="presence-by-coach"),
    path('is-in/', PresenceClientIsInAPI.as_view(), name="presence-in-salle"),
    path('coachs/<int:pk>/', PresenceCoachDetailUpdateAPI.as_view(), name="presence-detail"),
    # path('detail/<int:pk>/', PresenceDetailAPIView.as_view(), name="presence-detail"),
    path('coachs/create', PresenceCoachCreateAPI.as_view(),  name="presence-coach-create"),
    path('coachs/delete/<int:pk>/', PresenceCoachDestroyAPI.as_view(), name="presence-delete"),
    path('coach/edit/<int:pk>/', PresenceCoachEditAPIView.as_view(), name="presence-edit"),

    path('edit/<int:pk>/', PresenceEditAPIView.as_view(), name="presence-edit"),
    path('<int:pk>/', PresenceDetailAPIView.as_view(), name="presence-detail"),
    # path('detail/<int:pk>/', PresenceDetailAPIView.as_view(), name="presence-detail"),
    path('create', PresenceAPIView.as_view(),  name="presence-create"),
    path('delete/<int:pk>/', PresenceDestroyAPIView.as_view(), name="presence-delete"),
]


