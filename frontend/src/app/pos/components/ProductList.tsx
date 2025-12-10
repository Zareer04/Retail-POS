"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useCart } from "@/store/useCart";

interface ProductListProps {
   search?: string;
   category?: string;
}

export default function ProductList({ search = "", category = "" }: ProductListProps) {
   const [products, setProducts] = useState<any[]>([]);
   const addItem = useCart((state) => state.addItem);

   useEffect(() => {
      async function fetchProducts() {
         const res = await api.get("/products/");
         setProducts(res.data);
      }
      fetchProducts();
   }, []);

   const filtered = products.filter((p: any) => {
      // DEBUG: Remove later
      // console.log('Check:', { pCat: p.category, filterCat: category, typeP: typeof p.category, typeF: typeof category });

      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());

      const productCatId = typeof p.category === 'object' ? p.category?.id : p.category;
      const matchesCategory = category ? Number(productCatId) === Number(category) : true;

      return matchesSearch && matchesCategory;
   });



   // DEBUG: Remove after fixing
   // return (
   //    <div className="p-4 bg-red-100 text-red-800">
   //       <p>Filter Category: {JSON.stringify(category)} (Type: {typeof category})</p>
   //       <p>First Product Cat: {products[0] ? JSON.stringify(products[0].category) : 'N/A'}</p>
   //    </div>
   // )

   return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 pb-20">

         {filtered.map((p: any) => (
            <div
               key={p.id}
               className="group relative bg-white dark:bg-zinc-800 border dark:border-zinc-700 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer overflow-hidden flex flex-col"
               onClick={() =>
                  addItem({
                     id: p.id,
                     name: p.name,
                     price: Number(p.price),
                     quantity: 1,
                  })
               }
            >
               <div className="aspect-square w-full overflow-hidden bg-gray-100 dark:bg-zinc-900 relative">
                  {p.image ? (
                     <img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                     />
                  ) : (
                     <div className="flex items-center justify-center h-full text-gray-400">
                        <span className="text-4xl">📷</span>
                     </div>
                  )}
                  {/* Overlay on hover/click could go here */}
               </div>

               <div className="p-3 flex flex-col flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 line-clamp-2 text-sm mb-1">{p.name}</h3>
                  <div className="mt-auto flex items-center justify-between">
                     <p className="font-bold text-primary">৳ {p.price}</p>
                     <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                        +
                     </div>
                  </div>
               </div>
            </div>
         ))}
      </div>
   );
}