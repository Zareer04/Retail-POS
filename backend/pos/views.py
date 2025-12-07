from django.shortcuts import render
from rest_framework import viewsets
from .models import Product, Category, Sale, SaleItem
from .serializers import ProductSerializer, CategorySerializer, SaleSerializer, SaleItemSerializer

# Create your views here.

class ProductViewSet(viewsets.ModelViewSet):
   queryset = Product.objects.all().order_by('-id')
   serializer_class = ProductSerializer
   
class CategoryViewSet(viewsets.ModelViewSet):
   queryset = Category.objects.all()
   serializer_class = CategorySerializer
   
class SaleViewSet(viewsets.ModelViewSet):
   queryset = Sale.objects.all().order_by('-id')
   serializer_class = SaleSerializer
   
class SaleItemViewSet(viewsets.ModelViewSet):
   queryset = SaleItem.objects.all().order_by('-id')
   serializer_class = SaleItemSerializer
