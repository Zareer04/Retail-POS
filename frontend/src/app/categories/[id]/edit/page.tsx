"use client";

import { useEffect, useState } from "react";
import { api } from "../../../../lib/api";
import CategoryForm from "./CategoryForm";
import { useParams, useRouter } from "next/navigation";

export default function EditCategoryPage() {
   const { id } = useParams();
   const router = useRouter();
   const [category, setCategory] = useState(null);

   useEffect(() => {
      async function fetchCategory() {
         try {
            const { data } = await api.get(`/categories/${id}/`);
            setCategory(data);
         } catch (error) {
            console.error("Failed to fetch category", error);
         }
      }
      if (id) fetchCategory();
   }, [id]);

   async function onSubmit(values: any) {
      try {
         await api.patch(`/categories/${id}/`, values);
         alert("Category updated!");
         router.push("/categories");
      } catch (error) {
         console.error("Failed to update category", error);
         alert("Failed to update category");
      }
   }

   if (!category) return <div>Loading...</div>;

   return (
      <div className="p-6">
         <h1 className="text-xl font-semibold mb-4">Edit Category</h1>
         <CategoryForm defaultValues={category} onSubmit={onSubmit} />
      </div>
   );
}