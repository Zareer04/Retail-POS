"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CategorySchema, categorySchema } from "@/lib/validation/categorySchema";
import Link from "next/link";

export default function CategoryForm({ defaultValues, onSubmit }: any) {
   const form = useForm<CategorySchema>({
      resolver: zodResolver(categorySchema),
      defaultValues,
   });

   return (
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
         <div>
            <label className="block mb-1">Category Name</label>
            <input
               {...form.register("name")}
               className="border p-2 w-full"
               placeholder="Enter Category Name" 
             />
             <p className="text-red-500 text-sm mt-1">{form.formState.errors.name?.message}</p>
         </div>
         <button type="submit" className="bg-blue-500 text-white p-2 rounded">Save Changes</button>
         <Link href="/categories" className="text-blue-500 hover:underline">Cancel</Link>
      </form>
   );
}