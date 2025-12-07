"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export default function CategoryFilter({ selected, setSelected }: any) {
   const [catagories, setCategories] = useState([]);

   useEffect(() => {
      async function fetchCategories() {
         const res = await api.get("/categories/");
         setCategories(res.data);
      }
      fetchCategories();
   }, []);

   return (
      <select
         className="border p-2 rounded"
         value={selected}
         onChange={(e) => setSelected(e.target.value)}
      >
         <option value="">All Categories</option>
         {catagories.map((c: any) => (
            <option key={c.id} value={c.name}>
               {c.name}
            </option>
         ))}
      </select>
   );
}
