from django.urls import path
from .views import executePython

urlpatterns = [
    path('', executePython, name='execute_javascript'),
]
