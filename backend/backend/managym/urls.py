"""octogym URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include,  re_path
from rest_framework import routers
from django.views.generic import TemplateView
from django.conf.urls.static import static
from django.conf import settings
urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include('authentification.urls')),
    path('api-auth/', include('rest_framework.urls')),
    path('', include('client.urls')),
    path('creneau/', include('creneau.urls')),
    path('materiel/', include('materiel.urls')),
    path('presence/', include('presence.urls')),
    path('salle-sport/', include('salle_sport.urls')),
    path('transactions/', include('transaction.urls')),
    path('', include('abonnement.urls')),
    path('planning/', include('planning.urls')),
    path('assurance/', include('assurance.urls')),
    path('salle-activite/', include('salle_activite.urls')),
]
# urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]
# urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

if settings.DEBUG:
    import debug_toolbar
    urlpatterns += [path('__debug__/', include(debug_toolbar.urls)),] 
