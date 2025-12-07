from rest_framework import serializers
from .models import Product, Category, Sale, SaleItem

class CategorySerializer(serializers.ModelSerializer):
   class Meta:
      model = Category
      fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
   category = CategorySerializer(read_only=True)
   category_id = serializers.IntegerField(write_only=True, required=False)

   class Meta:
      model = Product
      fields = ['id', 'name', 'sku', 'barcode', 'price', 'stock_quantity', 'category', 'category_id', 'image', 'created_at', 'updated_at']
   
class SaleSerializer(serializers.ModelSerializer):
   class Meta:
      model = Sale
      fields = ['id', 'invoice_number', 'total_amount', 'payment_method', 'created_at', 'items']
      
class SaleItemSerializer(serializers.ModelSerializer):
   class Meta:
      model = SaleItem
      fields = '__all__'