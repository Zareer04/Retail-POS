"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "../../../lib/api";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SalePage() {
    const { data: sales, isLoading } = useQuery({
        queryKey: ['sales'],
        queryFn: async () => {
            const res = await api.get(`/sales/`);
            return res.data;
        },
    });
    
    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
      <div className="p-6">
         <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Sales History</h1>
            <Link href="/">
               <Button variant="outline">Back to Home</Button>
            </Link>
         </div>
         <div className="space-y-4">
            {sales?.map((sale: any) => (
               <Link
                  key={sale.id}
                  href={`/sales/${sale.id}`}
                  className="block p-4 rounded-xl border hover:bg-gray-50 transition">
                     <div className="flex justify-between">
                        <div>
                           <p className="font-semibold">Sale #{sale.id}</p>
                           <p className="text-sm text-gray-500">{new Date(sale.created_at).toLocaleDateString()}</p>

                        </div>
                        <p className="text-lg font-bold">${sale.total}</p>
                     </div>
               </Link>
            ))}
         </div>
      </div>
    );
}