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
   items = SaleSerializer(many=True)
   
   def validate(self, data):
      for item in data['items']:
         product = item['product']
         qty = item['quantity']
         
         if product.stock_quantity < qty:
            raise serializers.ValidationError(
               f"Not enough stock for {product.name}"
            )
            
      return data
   
class SaleItemSerializer(serializers.ModelSerializer):
   product = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all())
   quantity = serializers.IntegerField(min_value=1)