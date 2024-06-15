from django.shortcuts import render
from django.http import JsonResponse

# Create your views here.
def executePython(request, data_structure):
    code = 'print(/"Hello from Docker!")'
    return JsonResponse({'logs': f"This is python the snake {data_structure}"})