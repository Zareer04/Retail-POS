import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from pos.models import Category

def seed():
    categories = ['Electronics', 'Clothing', 'Groceries']
    for name in categories:
        obj, created = Category.objects.get_or_create(name=name)
        if created:
            print(f'Created category: {name}')
        else:
            print(f'Category already exists: {name}')

if __name__ == '__main__':
    seed()
