// frontend/components/ProductSearch.tsx
"use client";

import React, { useEffect, useState } from "react";

type Props = {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
};

export default function ProductSearch({ value, onChange, placeholder }: Props) {
  const [local, setLocal] = useState(value);

  useEffect(() => setLocal(value), [value]);

  // debounce user typing (300ms)
  useEffect(() => {
    const id = setTimeout(() => {
      if (local !== value) onChange(local);
    }, 300);
    return () => clearTimeout(id);
  }, [local, onChange, value]);

  return (
    <div className="flex items-center gap-2">
      <input
        className="border p-2 rounded w-full"
        placeholder={placeholder ?? "Search products by name, SKU or barcode..."}
        value={local}
        onChange={(e) => setLocal(e.target.value)}
      />
      <button
        className="px-3 py-2 bg-black text-white rounded"
        onClick={() => onChange(local)}
        aria-label="Search"
      >
        Search
      </button>
    </div>
  );
}
