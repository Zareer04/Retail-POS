// frontend/components/ProductListClient.tsx
"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import { Product } from "../types/product";
import ProductCard from "./ProductCard";
import ProductSearch from "./ProductSearch";

type ProductsResponse = {
  results: Product[];
  count: number;
  next: string | null;
  previous: string | null;
};

async function fetchProducts(params: { q?: string; page?: number }): Promise<ProductsResponse> {
  const { q, page } = params;
  const res = await api.get("/products/", {
    params: {
      q: q || undefined,
      page: page || 1,
      page_size: 24,
    },
  });
  return res.data;
}

export default function ProductListClient() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["products", query, page],
    queryFn: () => fetchProducts({ q: query, page }),
    placeholderData: (previousData) => previousData,
    staleTime: 1000 * 60 * 1, // 1 minute
  });

  const products = data?.results ?? [];
  const total = data?.count ?? 0;
  const hasNext = !!data?.next;
  const hasPrev = !!data?.previous;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6 gap-4">
        <h2 className="text-2xl font-bold">Products</h2>
        <a
          href="/products/new"
          className="bg-blue-600 text-white px-4 py-2 rounded shadow-sm text-sm"
        >
          + Add Product
        </a>
      </div>

      <div className="mb-4">
        <ProductSearch value={query} onChange={(v) => { setQuery(v); setPage(1); }} />
      </div>

      {isLoading ? (
        <div className="text-center py-12">Loading products…</div>
      ) : isError ? (
        <div className="text-center py-12 text-red-600">
          Something went wrong fetching products. <button onClick={() => refetch()} className="underline">Retry</button>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-12 text-gray-600">No products found.</div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-gray-600">Total: {total} products</div>
            <div className="flex items-center gap-2">
              <button
                className={`px-3 py-1 rounded border ${!hasPrev ? "opacity-50 cursor-not-allowed" : ""}`}
                onClick={() => hasPrev && setPage((s) => Math.max(1, s - 1))}
                disabled={!hasPrev}
              >
                Prev
              </button>
              <div className="px-3 py-1">Page {page}</div>
              <button
                className={`px-3 py-1 rounded border ${!hasNext ? "opacity-50 cursor-not-allowed" : ""}`}
                onClick={() => hasNext && setPage((s) => s + 1)}
                disabled={!hasNext}
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
