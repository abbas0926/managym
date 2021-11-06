from django.contrib import admin

# Register your models here.
from .models import Client
from import_export.admin import ImportExportModelAdmin

@admin.register(Client)
class PersonAdmin(ImportExportModelAdmin):
    pass