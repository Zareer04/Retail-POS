"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { productSchema, ProductSchema } from "@/lib/validation/productSchema";
import { api } from "@/lib/api";

import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
   Select,
   SelectTrigger,
   SelectContent,
   SelectItem,
   SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

export default function EditProduct() {
   const { id } = useParams();
   const router = useRouter();

   const [loading, setLoading] = useState(false);
   const [initialLoad, setInitialLoad] = useState(true);
   const [categories, setCategories] = useState<any[]>([]);

   const form = useForm<ProductSchema>({
      resolver: zodResolver(productSchema),
      defaultValues: {
         name: "",
         sku: "",
         barcode: "",
         price: "",
         stock_quantity: "",
         category: "",
         image: "",
      },
   });

   // Fetch product + categories
   useEffect(() => {
      async function fetchData() {
         try {
            const [productRes, catRes] = await Promise.all([
               api.get(`/products/${id}`),
               api.get(`/categories`),
            ]);

            const p = productRes.data;
            setCategories(catRes.data);

            form.reset({
               name: p.name,
               sku: p.sku,
               barcode: p.barcode,
               price: p.price,
               stock_quantity: p.stock_quantity,
               category: String(p.category), // ensure string
               image: "",
            });

            setInitialLoad(false);
         } catch (err) {
            console.error("Failed to load product:", err);
         }
      }

      fetchData();
   }, [id, form]);

   // Submit handler
   async function onSubmit(values: ProductSchema) {
      try {
         setLoading(true);

         const formData = new FormData();
         formData.append("name", values.name);
         formData.append("sku", values.sku);
         formData.append("barcode", values.barcode);
         formData.append("price", values.price);
         formData.append("stock_quantity", values.stock_quantity);
         formData.append("category", String(values.category));

         if (values.image?.[0]) {
            formData.append("image", values.image[0]);
         }

         await api.patch(`/products/${id}/`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
         });

         alert("Product updated!");
         router.push("/products");
      } catch (error) {
         console.error("Failed to update product:", error);
      } finally {
         setLoading(false);
      }
   }

   // Show loading state


   return (
      <div className="mx-auto p-6">
         <Link href="/" className="text-blue-500 hover:underline mb-4 inline-block">
            &larr; Back to Home
         </Link>
         <h1 className="text-2xl font-bold mb-6">Edit Product</h1>

         {initialLoad ? (
            <p>Loading product...</p>
         ) : (
            <Form {...form}>
               <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                  {/* Name */}
                  <FormField
                     control={form.control}
                     name="name"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Product Name</FormLabel>
                           <FormControl>
                              <Input placeholder="Enter Product Name" {...field} />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  {/* SKU */}
                  <FormField
                     control={form.control}
                     name="sku"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>SKU</FormLabel>
                           <FormControl>
                              <Input placeholder="Enter SKU" {...field} />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  {/* Price */}
                  <FormField
                     control={form.control}
                     name="price"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Price</FormLabel>
                           <FormControl>
                              <Input placeholder="Enter Price" {...field} />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  {/* Stock */}
                  <FormField
                     control={form.control}
                     name="stock_quantity"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Stock Quantity</FormLabel>
                           <FormControl>
                              <Input placeholder="Enter Stock Quantity" {...field} />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  {/* Category */}
                  <FormField
                     control={form.control}
                     name="category"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Category</FormLabel>
                           <FormControl>
                              <Select onValueChange={field.onChange} value={field.value}>
                                 <SelectTrigger>
                                    <SelectValue placeholder="Select Category" />
                                 </SelectTrigger>
                                 <SelectContent>
                                    {categories.map((c: any) => (
                                       <SelectItem key={c.id} value={String(c.id)}>
                                          {c.name}
                                       </SelectItem>
                                    ))}
                                 </SelectContent>
                              </Select>
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  {/* Image */}
                  <FormField
                     control={form.control}
                     name="image"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Image (optional)</FormLabel>
                           <FormControl>
                              <Input
                                 type="file"
                                 onChange={(e) => field.onChange(e.target.files)}
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  <Button type="submit" disabled={loading}>
                     {loading ? "Updating..." : "Update Product"}
                  </Button>
               </form>
            </Form>
         )}
      </div>
   );
}
