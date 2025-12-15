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

class SaleItemSerializer(serializers.ModelSerializer):
   product = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all())
   quantity = serializers.IntegerField(min_value=1)

   class Meta:
      model = SaleItem
      fields = ['id', 'product', 'quantity', 'unit_price', 'subtotal']

class SaleSerializer(serializers.ModelSerializer):
   items = SaleItemSerializer(many=True, read_only=True)
   
   class Meta:
      model = Sale
      fields = ['id', 'invoice_number', 'total_amount', 'payment_method', 'created_at', 'items']

   def validate(self, data):
      # Validation logic might need adjustment depending on how data is passed, 
      # but sticking to the original intent for now, although views.py handles creation.
      # If read_only=True above, this might not be reachable for items validation during strict serializer validation.
      # But let's keep it structurally correct.
      if 'items' in data:
         for item in data['items']:
            product = item['product']
            qty = item['quantity']
            
            if product.stock_quantity < qty:
               raise serializers.ValidationError(
                  f"Not enough stock for {product.name}"
               )
            
      return data
