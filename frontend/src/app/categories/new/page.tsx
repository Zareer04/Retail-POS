"use client";

import CategoryForm from "@/app/categories/[id]/edit/CategoryForm";
import { api } from "../../../lib/api";
import { useRouter } from "next/navigation";

export default function NewCategory() {
   const router = useRouter();

   async function onSubmit(values: any) {
      try {
         await api.post("/categories/", values);
         alert("Category created!");
         router.push("/categories");
      } catch (error) {
         console.error(error);
         alert("Failed to create category");
      }
   }

   return (
      <div className="p-6">
         <h1 className="text-xl font-semibold mb-4">Create Category</h1>
         <CategoryForm defaultValues={{ name: "" }} onSubmit={onSubmit} />
      </div>
   );
}