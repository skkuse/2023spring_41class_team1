from django.urls import path
from . import views

urlpatterns = [
    path('gpt/', views.rating_code, name='eval_code')
]
