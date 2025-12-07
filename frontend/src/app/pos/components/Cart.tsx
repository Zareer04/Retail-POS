"use client";

import { useCart } from "../../../../store/useCart";

export default function Cart() {
   const { items, increaseQuantity, decreaseQuantity, removeItem } = useCart();

   const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

   return (
      <div className="border rounded-lg p-4 w-full">
         <h2 className="text-lg font-bold mb-4">Cart</h2> 

         {items.map((item) => (
            <div key={item.id} className="flex items-center justify-betweeen mb-2">
               <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-500">৳ {item.price} x {item.quantity}</p>
               </div>
               <div className="flex gap-2">
                  <button className="px-2 bg-gray-200 rounded" onClick={() => increaseQuantity(item.id)}>+</button>
                  <button className="px-2 bg-gray-200 rounded" onClick={() => decreaseQuantity(item.id)}>-</button>
                  <button className="px-2 bg-gray-200 rounded" onClick={() => removeItem(item.id)}>Remove</button>
               </div>
            </div>
         ))}
         <hr className="my-4" />
         <p className="font-bold">Total: ৳ {total.toFixed(2)}</p>
      </div>
   )
}