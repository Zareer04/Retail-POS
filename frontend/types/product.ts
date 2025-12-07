// frontend/types/product.ts
export interface Category {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  sku: string;
  barcode?: string;
  price: string | number; // backend returns string for Decimal; handle both
  stock_quantity: number;
  category?: Category | null;
  image?: string | null;
  created_at?: string;
}
