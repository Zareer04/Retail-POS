// frontend/components/ProductCard.tsx
"use client";

import React from "react";
import { Product } from "../types/product";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const price =
    typeof product.price === "string" ? parseFloat(product.price) : (product.price as number);

  return (
    <div className="bg-white border rounded-lg overflow-hidden shadow-sm">
      <div className="h-40 w-full bg-gray-100 flex items-center justify-center">
        {product.image ? (
          // assuming backend serves absolute or relative URLs
          // if relative, Next.js may need next/image config; using img for simplicity
          // add alt text for accessibility
          // set object-contain to avoid stretching
          <img
            src={product.image}
            alt={product.name}
            className="max-h-full max-w-full object-contain"
          />
        ) : (
          <div className="text-gray-400">No image</div>
        )}
      </div>

      <div className="p-3">
        <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
        <p className="text-xs text-gray-500 mt-1">SKU: {product.sku}</p>
        <div className="mt-3 flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold">৳ {price.toFixed(2)}</div>
            <div className="text-xs text-gray-500">Stock: {product.stock_quantity}</div>
          </div>
          <div>
            <a
              href={`/products/${product.id}`}
              className="inline-block px-3 py-1 text-xs border rounded hover:bg-gray-50"
            >
              View
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
