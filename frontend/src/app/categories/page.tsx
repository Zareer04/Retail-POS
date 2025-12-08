"use client";

import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import Link from "next/link";

export default function CategoriesPage() {
   const [categories, setCategories] = useState([]);

   useEffect(() => {
      api.get("/categories/").then((res) => setCategories(res.data));
   }, []);

   return (
      <div className="p-6">
         <Link href="/" className="text-blue-500 hover:underline mb-4 inline-block">
            &larr; Back to Home
         </Link>
         <h1 className="text-xl font-semibold mb-4">Categories</h1>
         <Link href="/categories/new" className="bg-blue-500 text-white p-2 rounded inline-block">
            Add New Category
         </Link>
         <ul className="mt-4 space-y-2">
            {categories.map((category: any) => (
               <li key={category.id} className="border p-3 rounded flex justify-between items-center">
                  <span>{category.name}</span>
                  <Link href={`/categories/${category.id}/edit`} className="text-blue-500 hover:underline">
                     Edit
                  </Link>
               </li>
            ))}
         </ul>
      </div>
   );
}