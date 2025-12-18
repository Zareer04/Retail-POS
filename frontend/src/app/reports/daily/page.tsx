'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function DailyReportPage() {
  const today = new Date().toISOString().split('T')[0];
  const [date, setDate] = useState(today);

  const { data: sales, isLoading } = useQuery({
    queryKey: ['sales'],
    queryFn: async () => {
      const res = await api.get('/sales/');
      return res.data;
    },
  });

  if (isLoading) return <p className="p-6">Loading report...</p>;

  // Filter sales by selected date
  const dailySales = sales.filter((sale: any) =>
    sale.created_at.startsWith(date)
  );

  // Calculations
  const totalRevenue = dailySales.reduce(
    (sum: number, sale: any) => sum + Number(sale.total),
    0
  );

  const totalTransactions = dailySales.length;

  let totalItemsSold = 0;
  const productCounts: Record<string, number> = {};

  dailySales.forEach((sale: any) => {
    sale.items?.forEach((item: any) => {
      totalItemsSold += item.quantity;
      productCounts[item.product_name] =
        (productCounts[item.product_name] || 0) + item.quantity;
    });
  });

  const topProducts = Object.entries(productCounts)
    .map(([name, qty]) => ({ name, qty }))
    .sort((a, b) => b.qty - a.qty)
    .slice(0, 5);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Daily Sales Report</h1>
        <Link href="/">
          <Button variant="outline">Back to Home</Button>
        </Link>
      </div>

      {/* Date Picker */}
      <div className="mb-6">
        <label className="font-semibold mr-2">Select Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border px-3 py-2 rounded"
        />
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <SummaryCard title="Total Revenue" value={`৳${totalRevenue}`} />
        <SummaryCard title="Transactions" value={totalTransactions} />
        <SummaryCard title="Items Sold" value={totalItemsSold} />
      </div>

      {/* Top Products */}
      <div className="bg-white border rounded-xl p-4">
        <h2 className="text-xl font-semibold mb-3">Top Selling Products</h2>

        {topProducts.length === 0 ? (
          <p className="text-gray-500">No sales on this day.</p>
        ) : (
          <ul className="space-y-2">
            {topProducts.map((p, i) => (
              <li
                key={p.name}
                className="flex justify-between border-b pb-1"
              >
                <span>
                  {i + 1}. {p.name}
                </span>
                <span>{p.qty} sold</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

// Reusable Card
function SummaryCard({ title, value }: any) {
  return (
    <div className="p-4 rounded-xl border bg-white">
      <p className="text-sm text-gray-600">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
