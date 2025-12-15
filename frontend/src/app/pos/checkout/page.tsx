
"use client";

import { useCart } from "@/store/useCart";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
   const { items, clearCart } = useCart();
   const [paymentMethod, setPaymentMethod] = useState("Cash");
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [error, setError] = useState("");
   const router = useRouter();

   const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

   const handleCheckout = async () => {
      if (items.length === 0) {
         setError("Cart is empty");
         return;
      }
      setIsSubmitting(true);
      setError("");

      const payload = {
         items: items.map((item) => ({
            product: item.id,
            quantity: item.quantity,
         })),
         payment_method: paymentMethod,
      };

      try {
         const response = await fetch("http://127.0.0.1:8000/api/sales/", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
         });

         if (!response.ok) {
            const data = await response.json();
            throw new Error(data.error || "Checkout failed");
         }

         // Success
         clearCart();
         alert("Order completed successfully!"); // Simple feedback for now
         router.push("/pos");
      } catch (err: any) {
         setError(err.message);
      } finally {
         setIsSubmitting(false);
      }
   };

   if (items.length === 0) {
      return (
         <div className="flex flex-col items-center justify-center h-screen bg-gray-50 dark:bg-zinc-900 text-gray-900 dark:text-gray-100">
            <h2 className="text-2xl font-bold mb-4">Cart is Empty</h2>
            <Link href="/pos" className="text-blue-600 hover:underline">
               Go back to POS
            </Link>
         </div>
      );
   }

   return (
      <div className="min-h-screen bg-gray-50 dark:bg-zinc-900 py-8 px-4 sm:px-6 lg:px-8 text-gray-900 dark:text-gray-100">
         <div className="max-w-4xl mx-auto">
            <header className="mb-8 flex items-center justify-between">
               <div className="flex items-center gap-4">
                  <Link href="/pos" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                     &larr; Back
                  </Link>
                  <h1 className="text-3xl font-bold">Checkout</h1>
               </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {/* Order Summary */}
               <div className="bg-white dark:bg-zinc-800 rounded-lg shadow p-6">
                  <h2 className="text-xl font-semibold mb-4 border-b pb-2">Order Summary</h2>
                  <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                     {items.map((item) => (
                        <div key={item.id} className="flex justify-between items-center bg-gray-50 dark:bg-zinc-900/50 p-3 rounded">
                           <div>
                              <p className="font-medium">{item.name}</p>
                              <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                           </div>
                           <p className="font-semibold">৳ {(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                     ))}
                  </div>
                  <div className="mt-6 pt-4 border-t flex justify-between items-center text-xl font-bold">
                     <span>Total</span>
                     <span className="text-primary">৳ {total.toFixed(2)}</span>
                  </div>
               </div>

               {/* Payment & Actions */}
               <div className="bg-white dark:bg-zinc-800 rounded-lg shadow p-6 h-fit">
                  <h2 className="text-xl font-semibold mb-4 border-b pb-2">Payment Details</h2>

                  {error && (
                     <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-sm">
                        {error}
                     </div>
                  )}

                  <div className="space-y-4 mb-6">
                     <label className="block text-sm font-medium mb-1">Payment Method</label>
                     <div className="grid grid-cols-3 gap-3">
                        {["Cash", "Card", "Mobile Banking"].map((method) => (
                           <button
                              key={method}
                              onClick={() => setPaymentMethod(method)}
                              className={`py-2 px-4 rounded border text-sm font-medium transition-colors ${paymentMethod === method
                                    ? "bg-primary text-primary-foreground border-primary"
                                    : "bg-gray-50 dark:bg-zinc-900 border-gray-200 dark:border-zinc-700 hover:bg-gray-100 dark:hover:bg-zinc-800"
                                 }`}
                           >
                              {method}
                           </button>
                        ))}
                     </div>
                  </div>

                  <button
                     onClick={handleCheckout}
                     disabled={isSubmitting}
                     className="w-full py-4 bg-green-600 text-white font-bold rounded-lg shadow hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-lg"
                  >
                     {isSubmitting ? "Processing..." : `Pay ৳ ${total.toFixed(2)}`}
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
}
