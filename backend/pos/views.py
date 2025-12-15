from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from django.db import transaction
import uuid
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

    def create(self, request, *args, **kwargs):
        """
        Expected payload:
        {
          "items": [
            { "product": 1, "quantity": 2 },
            { "product": 3, "quantity": 1 }
          ],
          "payment_method": "Cash"
        }
        """

        items = request.data.get("items", [])
        payment_method = request.data.get("payment_method", "Cash")

        if not items:
            return Response(
                {"error": "No items provided"},
                status=status.HTTP_400_BAD_REQUEST
            )

        with transaction.atomic():
            # Generate a unique invoice number
            invoice_number = f"INV-{uuid.uuid4().hex[:8].upper()}"
            
            sale = Sale.objects.create(
               total_amount=0,
               invoice_number=invoice_number,
               payment_method=payment_method
            )
            total_amount = 0

            for item in items:
                try:
                    product = Product.objects.get(id=item["product"])
                    quantity = int(item["quantity"])
                except (Product.DoesNotExist, KeyError, ValueError):
                    transaction.set_rollback(True)
                    return Response(
                        {"error": "Invalid product or quantity"},
                        status=status.HTTP_400_BAD_REQUEST
                    )

                # 🚨 STOCK VALIDATION
                if product.stock_quantity < quantity:
                    transaction.set_rollback(True)
                    return Response(
                        {"error": f"Not enough stock for {product.name}"},
                        status=status.HTTP_400_BAD_REQUEST
                    )

                # ✅ DEDUCT STOCK
                product.stock_quantity -= quantity
                product.save()

                # CREATE SALE ITEM
                SaleItem.objects.create(
                    sale=sale,
                    product=product,
                    quantity=quantity,
                    unit_price=product.price,
                    subtotal=product.price * quantity
                )

                total_amount += product.price * quantity

            # UPDATE SALE TOTAL
            sale.total_amount = total_amount
            sale.save()

        serializer = SaleSerializer(sale)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

   
class SaleItemViewSet(viewsets.ModelViewSet):
   queryset = SaleItem.objects.all().order_by('-id')
   serializer_class = SaleItemSerializer
