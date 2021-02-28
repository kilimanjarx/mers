from django.urls import path

from . import views
from django.conf.urls import url
from django.contrib.auth.decorators import login_required

app_name = 'employee'
urlpatterns = [
    path('index',login_required(views.Index.as_view()), name='home'),
    path('update',login_required(views.Update.as_view()), name='update'),
    path('clerk_update',login_required(views.Clerk_Update.as_view()), name='clerk_update'),
]