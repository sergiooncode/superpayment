from django.urls import path

from . import views

urlpatterns = [
    path('api/vouchers/', views.create_voucher, name='create_voucher'),
]
