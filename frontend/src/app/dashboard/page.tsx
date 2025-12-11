'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';

export default function DashboardPage() {
  // --- Fetch Products ---
  const { data: products, isLoading: loadingProducts } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await api.get('/products/');
      return res.data;
    },
  });

  // --- Fetch Categories ---
  const { data: categories, isLoading: loadingCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await api.get('/categories/');
      return res.data;
    },
  });

  // --- Fetch Sales ---
  const { data: sales, isLoading: loadingSales } = useQuery({
    queryKey: ['sales'],
    queryFn: async () => {
      const res = await api.get('/sales/');
      return res.data;
    },
  });

  // --- Show Loading State ---
  if (loadingProducts || loadingCategories || loadingSales) {
    return <div className="p-6">Loading dashboard...</div>;
  }

  // --- Totals ---
  const totalProducts = products?.length || 0;
  const totalCategories = categories?.length || 0;
  const totalSales = sales?.length || 0;
  const totalRevenue =
    sales?.reduce((sum: number, sale: any) => sum + Number(sale.total_amount), 0) || 0;

  // --- Top 5 Best-selling Products ---
  const bestSelling = (() => {
    if (!sales || sales.length === 0) return [];

    const counts: Record<number, number> = {};

    sales.forEach((sale: any) => {
      if (!sale.items) return; // safe check
      sale.items.forEach((item: any) => {
        counts[item.product] = (counts[item.product] || 0) + item.quantity;
      });
    });

    const arr = Object.entries(counts).map(([id, qty]) => ({
      id: Number(id),
      qty,
    }));

    arr.sort((a, b) => b.qty - a.qty);
    return arr.slice(0, 5);
  })();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* Totals Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="p-4 bg-gray-100 rounded-xl">
          <h2 className="font-bold text-gray-600">Total Products</h2>
          <p className="text-2xl">{totalProducts}</p>
        </div>
        <div className="p-4 bg-gray-100 rounded-xl">
          <h2 className="font-bold text-gray-600">Total Categories</h2>
          <p className="text-2xl">{totalCategories}</p>
        </div>
        <div className="p-4 bg-gray-100 rounded-xl">
          <h2 className="font-bold text-gray-600">Total Sales</h2>
          <p className="text-2xl">{totalSales}</p>
        </div>
        <div className="p-4 bg-gray-100 rounded-xl">
          <h2 className="font-bold text-gray-600">Total Revenue</h2>
          <p className="text-2xl">${totalRevenue.toFixed(2)}</p>
        </div>
      </div>

      {/* Top-selling Products */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Top 5 Best-selling Products</h2>
        {bestSelling.length === 0 ? (
          <p>No sales yet</p>
        ) : (
          <ul className="list-disc ml-6">
            {bestSelling.map((item) => {
              const product = products?.find((p: any) => p.id === item.id);
              return (
                <li key={item.id}>
                  {product?.name || 'Unknown'} — Qty: {item.qty}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
