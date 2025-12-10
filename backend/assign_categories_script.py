
import os
import django
import random

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from pos.models import Product, Category

def assign_defaults():
    categories = Category.objects.all()
    if not categories.exists():
        print("No categories found. Please create a category first.")
        return

    # Use the first category as default
    default_cat = categories.first()
    
    # Get products with no category
    products = Product.objects.filter(category__isnull=True)
    count = products.count()
    
    print(f"Found {count} products with no category.")
    
    if count > 0:
        print(f"Assigning '{default_cat.name}' to all of them...")
        for product in products:
            product.category = default_cat
            product.save()
        print("Done!")
    else:
        print("All products already have a category.")

if __name__ == "__main__":
    assign_defaults()
