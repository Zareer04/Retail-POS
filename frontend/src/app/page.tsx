import Link from "next/link";
import PosDashboard from "./dashboard/page";

export default function Home() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Welcome</h1>
      <div className="flex gap-4">
        <Link href="/pos" className="px-4 py-2 bg-blue-600 text-white rounded">Go to POS</Link>
        <Link href="/categories" className="px-4 py-2 bg-blue-600 text-white rounded">Go to Categories</Link>
        <Link href="/products" className="px-4 py-2 bg-blue-600 text-white rounded">Go to Products</Link>
        <Link href="/reports/daily" className="px-4 py-2 bg-blue-600 text-white rounded">Go to Reports</Link>
      </div>
      <PosDashboard />
    </main>
  );
}