import requests
import os
import random
import string

# Create a dummy image file
with open('test_image.jpg', 'wb') as f:
    f.write(os.urandom(1024))

url = 'http://127.0.0.1:8000/api/products/'
data = {
    'name': 'Test Product',
    'sku': ''.join(random.choices(string.ascii_uppercase + string.digits, k=10)),
    'barcode': ''.join(random.choices(string.digits, k=12)),
    'price': '100.00',
    'stock_quantity': '10',
    'category': '1',
    'category_id': '1' # Try both or just category_id if serializer expects it
}
files = {
    'image': open('test_image.jpg', 'rb')
}

try:
    response = requests.post(url, data=data, files=files)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.text}")
except Exception as e:
    print(f"Error: {e}")
finally:
    if os.path.exists('test_image.jpg'):
        os.remove('test_image.jpg')
