'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useState } from 'react';

export default function ProductsPage() {
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
      ? (typeof p.category === 'object' ? p.category?.id : p.category) === Number(categoryFilter)
      : true;

    return matchSearch && matchCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
        <Link href="/">
          <Button variant="outline">Back to Home</Button>
        </Link>
        <h1 className="text-2xl font-bold">Products</h1>
        <div className="flex gap-4 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-2 rounded w-full md:w-64"
          />
          <select
            className="border p-2 rounded"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories?.map((c: any) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <Link href="/products/new">
            <Button>Add Product</Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts?.map((p: any) => (
          <div key={p.id} className="bg-white dark:bg-zinc-800 border dark:border-zinc-700 rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col group">

            {/* Image Area */}
            <div className="aspect-square w-full overflow-hidden bg-gray-100 dark:bg-zinc-900 relative">
              {p.image ? (
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  <span className="text-4xl">📷</span>
                </div>
              )}
            </div>

            {/* Content Area */}
            <div className="p-4 flex flex-col flex-1">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-lg line-clamp-1">{p.name}</h3>
                  <p className="text-xs text-gray-500 font-mono">{p.sku}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${p.stock_quantity > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {p.stock_quantity > 0 ? `${p.stock_quantity} in stock` : 'Out of stock'}
                </span>
              </div>

              <p className="text-xl font-bold text-primary mb-4">৳{p.price}</p>

              <div className="mt-auto grid grid-cols-2 gap-2">
                <Link href={`/products/${p.id}/edit`} className="w-full">
                  <Button variant="outline" className="w-full">
                    Edit
                  </Button>
                </Link>
                <Button
                  variant="destructive"
                  className="w-full"
                  onClick={() => alert("Delete functionality later")}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
