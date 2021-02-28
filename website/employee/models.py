from django.db import models
from .choices import RESIGN_FLAG_CHOICES

# Create your models here.
class Employee(models.Model):
    employee_id = models.IntegerField(primary_key=True,help_text='Enter Employee ID')
    name = models.CharField(max_length=100)
    division = models.CharField(max_length=100,default='Missing',null=True)
    section = models.CharField(max_length=100,default='Missing',null=True)
    position = models.CharField(max_length=100,default='Missing',null=True)
    grade = models.CharField(max_length=10,default='-',null=True)
    is_expatriate = models.BooleanField(default=False)
    is_exclude = models.BooleanField(default=False) # to exclude abnormal record from irms
    join_date = models.DateField(null=True)
    resign_date = models.DateField(blank=True,null=True)
    resign_flag = models.CharField(max_length=1,choices=RESIGN_FLAG_CHOICES,null=True)
    address = models.TextField(blank=True)
    class Meta:
        ordering = ["employee_id"]

    def __str__(self):
        return str(self.employee_id)

    def __repr__(self):
        return str(self.employee_id) + '({})'.format(self.name)