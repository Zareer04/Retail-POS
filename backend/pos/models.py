from django.db import models

# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Product(models.Model):
   name = models.CharField(max_length=200)
   sku = models.CharField(max_length=50, unique=True)
   barcode = models.CharField(max_length=100, unique=True)
   price = models.DecimalField(max_digits=10, decimal_places=2)
   stock_quantity = models.IntegerField(default=0)
   category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True)
   image = models.ImageField(upload_to='product_images/', blank=True)
   created_at = models.DateTimeField(auto_now_add=True)
   updated_at = models.DateTimeField(auto_now=True)

   def __str__(self):
      return self.name


class Sale(models.Model):
   invoice_number = models.CharField(max_length=50, unique=True)
   total_amount = models.DecimalField(max_digits=10, decimal_places=2)
   payment_method = models.CharField(max_length=50)
   created_at = models.DateTimeField(auto_now_add=True)
   

class SaleItem(models.Model):
   sale = models.ForeignKey(Sale, related_name='items', on_delete=models.CASCADE)
   product = models.ForeignKey(Product, on_delete=models.CASCADE)
   quantity = models.IntegerField()
   unit_price = models.DecimalField(max_digits=10, decimal_places=2)
   subtotal = models.DecimalField(max_digits=10, decimal_places=2)

   