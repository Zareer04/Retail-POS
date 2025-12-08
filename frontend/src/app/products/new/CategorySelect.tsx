"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export default function CategorySelect({ value, onChange }: any) {
   const [categories, setCategories] = useState([]);

   useEffect(() => {
      async function loadcategories() {
         try {
            const res = await api.get("/categories/");
            setCategories(res.data);
         } catch (error) {
            console.error("Failed to load categories:", error);
         }
      }
      loadcategories();
   }, []);

   return (
      <select
         className="border p-2 rounded w-full"
         value={value}
         onChange={(e) => onChange(e.target.value)}
      >
         <option value="">Select Category</option>
         {categories.map((category: any) => (
            <option key={category.id} value={category.id}>
               {category.name}
            </option>
         ))}
      </select>
   )
}