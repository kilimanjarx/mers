from import_export import resources
from .models import *

class EmployeeResource(resources.ModelResource):
    class Meta:
        model = Employee
