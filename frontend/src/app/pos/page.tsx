'use client';

import { useCart } from "../../../store/useCart";
import { Button } from "@/components/ui/button";

export default function POSPage() {
   const items = useCart(s => s.items);
   const remove = useCart(s => s.removeItem);

   const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

   return (
      <div className="p-6 grid grid-cols-2 gap-6">
         {/*Cart Area */}
         <div className="p-4 border rounded-lg">
            <h2 className="text-xl font-bold mb-4">Cart</h2>
            {items.map((i) => (
               <div key={i.id} className="flex justify-between border-b py-2">
                  <p>{i.name} x {i.quantity}</p>
                  <p>৳ {i.price * i.quantity}</p>
                  <Button variant="destructive" onClick={() => remove(i.id)}>Remove</Button>
               </div>
            ))}
            <div className="text-xl font-bold mt-4">Total: ৳ {total}</div>
         </div>
      </div>
   );
}
