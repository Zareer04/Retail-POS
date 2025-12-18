"use client";

import { useRef } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../../lib/api";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";


export default function SaleDetailPage() {
   const { id } = useParams();
   const receiptRef = useRef<HTMLDivElement>(null);
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

   const handlePrint = () => {
      window.print();
   };

   const handleDownloadPDF = async () => {
      if (!receiptRef.current) return;

      const canvas = await html2canvas(receiptRef.current);
      const imgData = canvas.toDataURL('image/png');

      const pdf = new jsPDF({
         orientation: 'portrait',
         unit: 'mm',
         format: 'a4',
      });

      const width = 190;
      const height = (canvas.height * width) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, width, height);
      pdf.save(`sale-${sale.id}.pdf`);
   }

   return (
      <div className="p-6">
         {/* Action Buttons */}
         <div className="flex gap-3 mb-4 print:hidden">
            <Button onClick={handlePrint}>Print</Button>
            <Button variant="outline" onClick={handleDownloadPDF}>
               Download PDF
            </Button>
            <Link href="/sales">
               <Button variant="ghost">Back</Button>
            </Link>
         </div>

         {/* RECEIPT */}
         <div
            ref={receiptRef}
            className="max-w-sm mx-auto border rounded-lg p-4 text-sm bg-white"
         >
            <h2 className="text-center text-lg font-bold">Retail POS</h2>
            <p className="text-center text-xs mb-3">
               Sale #{sale.id}
               <br />
               {new Date(sale.created_at).toLocaleString()}
            </p>

            <hr className="my-2" />

            {sale.items.map((item: any) => (
               <div key={item.id} className="flex justify-between mb-1">
                  <span>
                     {item.product_name} × {item.quantity}
                  </span>
                  <span>
                     ৳{item.quantity * item.price}
                  </span>
               </div>
            ))}

            <hr className="my-2" />

            <div className="flex justify-between font-bold">
               <span>Total</span>
               <span>৳{sale.total}</span>
            </div>

            <p className="text-center text-xs mt-4">
               Thank you for your purchase!
            </p>
         </div>
      </div>
   );
}