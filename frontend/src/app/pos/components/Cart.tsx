"use client";

import { useCart } from "@/store/useCart";

export default function Cart() {
   const { items, increaseQuantity, decreaseQuantity, removeItem } = useCart();

   const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

   return (
      <div className="flex flex-col h-full bg-white dark:bg-zinc-800 text-gray-900 dark:text-gray-100">
         <div className="p-4 border-b flex justify-between items-center bg-gray-50 dark:bg-zinc-900/50">
            <h2 className="text-xl font-bold">Current Order</h2>
            <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full dark:bg-blue-900 dark:text-blue-200">{items.length} items</span>
         </div>

         <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {items.length === 0 ? (
               <div className="flex flex-col items-center justify-center h-full text-gray-400 opacity-50">
                  <span className="text-4xl mb-2">🛒</span>
                  <p>Cart is empty</p>
               </div>
            ) : (
               items.map((item) => (
                  <div key={item.id} className="flex flex-col bg-gray-50 dark:bg-zinc-900 rounded-lg p-3 group relative">
                     <div className="flex justify-between items-start mb-2">
                        <p className="font-semibold text-sm line-clamp-2 pr-6">{item.name}</p>
                        <button
                           onClick={() => removeItem(item.id)}
                           className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                           </svg>
                        </button>
                     </div>

                     <div className="flex items-center justify-between">
                        <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                           ৳ {item.price}
                        </div>
                        <div className="flex items-center gap-3 bg-white dark:bg-zinc-800 rounded-md shadow-sm border dark:border-zinc-700 px-1 py-0.5">
                           <button
                              className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-primary active:bg-gray-100 rounded"
                              onClick={() => decreaseQuantity(item.id)}
                           >-</button>
                           <span className="text-sm font-semibold w-4 text-center">{item.quantity}</span>
                           <button
                              className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-primary active:bg-gray-100 rounded"
                              onClick={() => increaseQuantity(item.id)}
                           >+</button>
                        </div>
                     </div>
                  </div>
               ))
            )}
         </div>

         <div className="p-4 bg-gray-50 dark:bg-zinc-900 border-t space-y-3">
            <div className="flex justify-between items-center text-lg font-bold">
               <span>Total</span>
               <span className="text-primary">৳ {total.toFixed(2)}</span>
            </div>

            <button className="w-full py-3 bg-primary text-primary-foreground font-bold rounded-lg shadow-lg hover:shadow-xl hover:opacity-90 active:scale-[0.99] transition-all flex items-center justify-center gap-2">
               <span>Checkout</span>
               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
               </svg>
            </button>
         </div>
      </div>
   )
}