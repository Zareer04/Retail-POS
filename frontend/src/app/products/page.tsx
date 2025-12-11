"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";

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

  if (isLoading) return <div className="p-6">Loading...</div>;

  // Filtering logic
  const filteredProducts = products?.filter((p: any) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase());

    const matchCategory = categoryFilter
      ? (typeof p.category === "object" ? p.category?.id : p.category) ===
        Number(categoryFilter)
      : true;

    return matchSearch && matchCategory;
  });

  return (
    <div className="p-6">
      {/* ===================== Header ===================== */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold">Products</h1>

        <div className="flex gap-3">
          <Link href="/products/new">
            <Button>Add Product</Button>
          </Link>

          <Link href="/">
            <Button variant="outline">Back Home</Button>
          </Link>
        </div>
      </div>

      {/* ===================== Filters ===================== */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
        {/* Search */}
        <input
          type="text"
          placeholder="Search by name or SKU..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 px-3 rounded-lg w-full md:w-60 
                     bg-white/40 backdrop-blur-lg shadow-sm 
                     focus:outline-none focus:ring-2 focus:ring-black/30"
        />

        {/* Category Filter */}
        <select
          className="border p-2 px-3 rounded-lg bg-white/40 backdrop-blur-lg
                     shadow-sm"
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

      {/* ===================== Empty State ===================== */}
      {filteredProducts?.length === 0 && (
        <div className="text-center py-20 opacity-70">
          <div className="text-6xl mb-3">🔍</div>
          <p className="text-lg font-medium">No products found</p>
          <p className="text-sm text-gray-600">
            Try adjusting your search or filters.
          </p>
        </div>
      )}

      {/* ===================== Product Grid ===================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts?.map((p: any) => (
          <div
            key={p.id}
            className="p-4 rounded-2xl border bg-white/30 backdrop-blur-xl
                       shadow-sm hover:shadow-lg hover:scale-[1.02]
                       transition-all duration-300 flex flex-col"
          >
            {/* Image */}
            <div className="w-full h-40 rounded-xl overflow-hidden mb-3 bg-white/50">
              {p.image ? (
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-600">
                  📷 No Image
                </div>
              )}
            </div>

            {/* Content */}
            <h2 className="text-lg font-semibold">{p.name}</h2>
            <p className="text-gray-700 text-sm">SKU: {p.sku}</p>

            <div className="mt-2 text-xl font-bold">${p.price}</div>

            <p className="text-gray-700 text-sm">Stock: {p.stock_quantity}</p>

            <span className="bg-black/20 text-sm px-3 py-1 rounded-full mt-2 w-fit">
              {categories.find((c: any) => c.id === p.category)?.name ||
                "Unknown"}
            </span>

            {/* Actions */}
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
