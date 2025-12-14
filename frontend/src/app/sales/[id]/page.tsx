"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../../lib/api";
import Link from "next/link";
import { Button } from "@/components/ui/button";


export default function SaleDetailPage() {
   const { id } = useParams();
   const { data: sale, isLoading } = useQuery({
      queryKey: ['sale', id],
      queryFn: async () => {
         const res = await api.get(`/sales/${id}/`);
         return res.data;
      },
   });

   if (isLoading) {
      return <div>Loading...</div>;
   }

   return (
      <div className="p-6 max-w-3xl mx-auto">
         <Link href="/sales" className="mb-4">
            <Button variant="outline">Back to Sales</Button>
         </Link>
         <h1 className="text-2xl font-bold mb-2">Sale #{sale.id}</h1>
         <p className="text-gray-600 mb-6">
            {new Date(sale.created_at).toLocaleDateString()}
         </p>

         <div className="space-y-3">
            {sale.items.map((item: any) => (
               <div
                  key={item.id}
                  className="flex justify-between p-4 border rounded-lg"
               >
                  <div>
                     <p className="font-medium">{item.product.name}</p>
                     <p className="text-sm text-gray-600">{item.quantity} x ${item.price}</p>
                  </div>
                  <p className="font-semibold">${(item.quantity * item.price).toFixed(2)}</p>
               </div>
            ))}
            <div className="mt-6 flex justify-end">
               <p className="text-xl font-bold">
                  Total: ${sale.total}
               </p>
            </div>
         </div>
      </div>
   );
}