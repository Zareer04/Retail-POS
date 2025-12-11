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
         formData.append("category_id", String(values.category));

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
      <div className="min-h-screen p-6 flex flex-col items-center">
         <Link href="/products" className="text-blue-500 hover:underline mb-4 self-start">
            ← Back to products page
         </Link>

         <div
            className="w-full max-w-2xl bg-white/20 backdrop-blur-xl 
                 shadow-xl border border-white/30 rounded-3xl p-8"
         >
            <h1 className="text-3xl font-bold mb-6 text-center">
               Edit Product
            </h1>

            {initialLoad ? (
               <p className="text-center">Loading product...</p>
            ) : (
               <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                     {/* Image Preview */}
                     <div className="flex flex-col items-center mb-4">
                        {form.watch("image")?.[0] ? (
                           <img
                              src={URL.createObjectURL(form.watch("image")[0])}
                              className="w-32 h-32 object-cover rounded-xl border border-white/40 shadow-md"
                              alt="Preview"
                           />
                        ) : (
                           <div className="w-32 h-32 flex items-center justify-center bg-black/10 text-gray-500 rounded-xl">
                              No Image
                           </div>
                        )}
                     </div>

                     {/* Name */}
                     <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Product Name</FormLabel>
                              <FormControl>
                                 <Input
                                    placeholder="Enter product name"
                                    className="bg-white/60"
                                    {...field}
                                 />
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
                                 <Input
                                    placeholder="Enter SKU"
                                    className="bg-white/60"
                                    {...field}
                                 />
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
                                 <Input
                                    placeholder="Enter price"
                                    className="bg-white/60"
                                    {...field}
                                 />
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
                                 <Input
                                    placeholder="Enter stock"
                                    className="bg-white/60"
                                    {...field}
                                 />
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
                                 <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                 >
                                    <SelectTrigger className="bg-white/60">
                                       <SelectValue placeholder="Select category" />
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
                                    className="bg-white/60"
                                    onChange={(e) => field.onChange(e.target.files)}
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     {/* Buttons */}
                     <div className="flex justify-between">
                        <Button
                           type="button"
                           variant="secondary"
                           onClick={() => router.push("/products")}
                        >
                           Cancel
                        </Button>

                        <Button type="submit" disabled={loading}>
                           {loading ? "Updating..." : "Update Product"}
                        </Button>
                     </div>
                  </form>
               </Form>
            )}
         </div>
      </div>
   );
}