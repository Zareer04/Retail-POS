"use client";

import { useEffect, useState } from "react";
import { api } from "../../../../lib/api";
import { useCart } from "../../../../store/useCart";

interface ProductListProps {
   search?: string;
   category?: string;
}

export default function ProductList({ search = "", category = "" }: ProductListProps) {
   const [products, setProducts] = useState([]);
   const addItem = useCart((state) => state.addItem);

   useEffect(() => {
      async function fetchProducts() {
         const res = await api.get("/products/");
         setProducts(res.data);
      }
      fetchProducts();
   }, []);

   const filtered = products.filter((p: any) => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category ? p.category === category : true;
      return matchesSearch && matchesCategory;
   });

   return (
      <div className="grid grid-cols-2 md:grid cols-4 gap-4">
         {filtered.map((p: any) => (
            <div
               key={p.id}
               className="border rounded-lg p-4 shadow hover:shadow-lg transition cursor-pointer"
               onClick={() =>
                  addItem({
                     id: p.id,
                     name: p.name,
                     price: Number(p.price),
                     quantity: 1,
                  })
               }
            >
               <h3 className="font-semibold">{p.name}</h3>
               <p className="text-sm text-gray-500">৳ {p.price}</p>
               {p.image && (
                  <img
                     src={p.image}
                     alt={p.name}
                     className="w-full h-32 object-cover rounded mt-2"
                  />
               )}
            </div>
         ))}
      </div>
   );
}