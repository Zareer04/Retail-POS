'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCart } from '@/store/useCart';

import Providers from '../../../components/Providers';
import ProductListClient from '../../../components/ProductListClient';
import Link from 'next/link';
import { useState } from 'react';

export default function ProductsPage() {
  const add = useCart(s => s.addItem);

  // const { data, isLoading } = useQuery({
  //   queryKey: ['products'],
  //   queryFn: async () => {
  //     const res = await api.get('products');
  //     return res.data;
  //   },
  // });



  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  // Fetch Products
  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await api.get("/products/");
      return res.data;
    },
  });



  // Fetch Categories
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await api.get("/categories/");
      return res.data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Filtering logic
  const filteredProducts = products?.filter((p: any) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase());

    const matchCategory = categoryFilter
      ? p.category === Number(categoryFilter)
      : true;

    return matchSearch && matchCategory;
  });

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left border">Image</th>
            <th className="p-3 text-left border">Name</th>
            <th className="p-3 text-left border">SKU</th>
            <th className="p-3 text-left border">Price</th>
            <th className="p-3 text-left border">Stock</th>
            <th className="p-3 text-left border">Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredProducts?.map((p: any) => (
            <tr key={p.id} className="border-b">
              <td className="p-3 border">
                {p.image ? (
                  <img
                    src={p.image}
                    alt=""
                    className="w-12 h-12 object-cover rounded"
                  />
                ) : (
                  <div className="w-12 h-12 bg-gray-200 rounded" />
                )}
              </td>
              <td className="p-3 border">{p.name}</td>
              <td className="p-3 border">{p.sku}</td>
              <td className="p-3 border">৳{p.price}</td>
              <td className="p-3 border">{p.stock_quantity}</td>

              <td className="p-3 border">
                <div className="flex gap-2">
                  <Link href={`/products/${p.id}/edit`}>
                    <Button size="sm" variant="outline">
                      Edit
                    </Button>
                  </Link>

                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() =>
                      alert("Delete functionality later")
                    }
                  >
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
