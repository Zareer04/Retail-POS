"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export default function CategoryFilter({ selected, setSelected }: any) {
   const [categories, setCategories] = useState([]);

   useEffect(() => {
      async function fetchCategories() {
         const res = await api.get("/categories/");
         setCategories(res.data);
      }
      fetchCategories();
   }, []);

   return (
      <div className="overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
         <div className="flex gap-2 min-w-max">
            <button
               onClick={() => setSelected("")}
               className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selected === ""
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-white dark:bg-zinc-800 border hover:bg-gray-100 dark:hover:bg-zinc-700"
                  }`}
            >
               All Items
            </button>
            {categories.map((c: any) => (
               <button
                  key={c.id}
                  onClick={() => setSelected(c.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selected === c.id
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "bg-white dark:bg-zinc-800 border hover:bg-gray-100 dark:hover:bg-zinc-700"
                     }`}
               >
                  {c.name}
               </button>
            ))}
         </div>
      </div>
   );
}
