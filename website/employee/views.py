from django.shortcuts import render
from django.http import HttpResponse
from employee.models import Employee
from django.http import JsonResponse
from django.contrib.auth import get_user_model
from django.contrib.auth.models import User
from django.views.generic.base import TemplateView
from django.views import View
from django.contrib import messages

# Create your views here.
class Index(View):
    template_name = "home.html"

    def get(self, request,*args, **kwargs):
        
        emp = []
        emp = Employee.objects.filter(employee_id=request.user.username).values()
        list_result = [entry for entry in emp]
        print(list_result)
        ctx = {
            'param': list_result,
        }
        
        return render(request, self.template_name,ctx)
        # return JsonResponse(list_result,safe=False)

    def post(self, request):
        emp_id = request.POST.get('employee_id')
        address = request.POST.get('address')
        clerk_input_address = request.POST.get('clerk_input_address')
        try:
            if clerk_input_address:
                Employee.objects.filter(employee_id=emp_id).update(address=clerk_input_address)
            else:
                Employee.objects.filter(employee_id=request.user.username).update(address=address)
            messages.success(request, 'Form submission successful')

        except Exception as e:
            messages.error(request, e)

        emp = []
        emp = Employee.objects.filter(employee_id=request.user.username).values()
        list_result = [entry for entry in emp]
        # print(list_result)
        ctx = {
            'param': list_result,
        }
        
        return render(request, self.template_name,ctx)

    
class Update(View):
    template_name = "update.html"

    def get(self, request,*args, **kwargs):
        emp = []
        emp = Employee.objects.filter(employee_id=request.user.username).values()
        list_result = [entry for entry in emp]
        print(list_result)
        ctx = {
            'param': list_result,
        }

        return render(request, self.template_name,ctx)

class Clerk_Update(View):
    template_name = "clerk_update.html"

    def get(self, request,*args, **kwargs):
        return render(request, self.template_name)

    def post(self, request):
        emp = []
        user = Employee.objects.filter(employee_id=request.user.username).values()
        emp = Employee.objects.filter(employee_id=request.POST.get('user_id')).values()

        user_list_result = [entry for entry in user]
        emp_list_result = [entry for entry in emp]

        if emp_list_result[0]['section'] != user_list_result[0]['section']:
            messages.error(request, 'Please input employee in your section or division only!')
            return render(request, self.template_name)
        else:
            ctx = {
            'param': emp_list_result,
            }
            return render(request, self.template_name,ctx)

    
        

