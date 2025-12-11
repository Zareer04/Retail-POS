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
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Products</h1>
        <Link href="/products/new">
          <Button>Add New Product</Button>
        </Link>
        <Link href="/">
          <Button variant="outline">Back to Home</Button>
        </Link>
        <div className="flex gap-4 mb-6">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-2 rounded w-full md:w-64"
          />
          <select
            className="border py-2 px-3 rounded-md bg-white/40 backdrop-blur-md"
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
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts?.map((p: any) => (
          <div key={p.id} className="p-4 rounded-2xl shadow-lg border border-white/30 
              bg-white/20 backdrop-blur-xl
              hover:scale-[1.03] transition-all duration-300
              flex flex-col
            ">

            {/* Image Area */}
            <div className="w-full h-40 rounded-xl overflow-hidden mb-3 bg-white/30">
              {p.image ? (
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center text-sm py-10 text-gray-600">
                  <span className="text-4xl">📷</span>
                </div>
              )}
            </div>

            {/* Content Area */}
            <h2 className="text-lg font-semibold">{p.name}</h2>
            <p className="text-gray-700">SKU: {p.sku}</p>

            <div className="mt-2">
              <span className="text-xl font-bold">${p.price}</span>
            </div>

            <p className="text-gray-700 text-sm">Stock: {p.stock_quantity}</p>

            <span className="bg-black/20 text-sm text-black px-3 py-1 rounded-full mt-2 w-fit">
              {categories.find((c: any) => c.id === p.category)?.name ||
                "Unknown"}
            </span>

            {/* Action Area */}
            <div className="flex justify-between mt-4">
              <Link href={`/products/${p.id}/edit`}>
                <Button variant="secondary" className="px-4 py-1">
                  Edit
                </Button>
              </Link>

              <Button
                variant="destructive"
                className="px-4 py-1"
                onClick={async () => {
                  if (!confirm("Delete this product?")) return;
                  await api.delete(`/products/${p.id}/`);
                  window.location.reload();
                }}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
