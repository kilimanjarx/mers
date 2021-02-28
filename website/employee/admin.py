from django.contrib import admin
from .models import *
from import_export import resources
from .resources import EmployeeResource
from import_export.admin import ImportExportModelAdmin

class EmployeeAdmin(ImportExportModelAdmin):
    resource_class = EmployeeResource
    list_display  = ['employee_id', 'name','division','section','position','grade','is_expatriate','is_exclude','join_date','resign_date','resign_flag','address']
admin.site.register(Employee, EmployeeAdmin)

# class LogAdmin(admin.ModelAdmin):
#     list_display = ('message', 'date')
# admin.site.register(Log, LogAdmin)