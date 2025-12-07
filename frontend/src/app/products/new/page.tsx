"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema, ProductSchema } from "../../../../lib/validation/productSchema";

import { api } from "../../../../lib/api";
import { useQuery } from "@tanstack/react-query";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

import { useState } from "react";

export default function NewProductPage() {
   const [loading, setLoading] = useState(false);

   const { data: categories } = useQuery({
      queryKey: ["categories"],
      queryFn: async () => {
         const res = await api.get("/categories/");
         return res.data;
      },
   });

   const form = useForm<ProductSchema>({
      resolver: zodResolver(productSchema),
      defaultValues: {
         name: "",
         sku: "",
         price: "",
         stock_quantity: "",
         category: "",
         image: "",
      },
   });

   async function onSubmit(values: ProductSchema) {
      try {
         setLoading(true);

         const formData = new FormData();
         formData.append("name", values.name);
         formData.append("sku", values.sku);
         formData.append("price", values.price);
         formData.append("stock_quantity", values.stock_quantity);
         formData.append("category", values.category);

         if (values.image?.[0]) {
            formData.append("image", values.image?.[0]);
         }

         const res = await api.post("products", formData, {
            headers: { "Content-Type": "multipart/form-data" },
         });

         alert("Product created!");
         form.reset();
      } catch (error) {
         console.error(error);
         alert("Error creating product");
      } finally {
         setLoading(false);
      }
   }

   return (
      <div className="max-w-xl mx-auto p-6">
         <h1 className="text-2xl font-bold mb-6">Add New Product</h1>

         <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

               {/*Name*/}
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

               {/*SKU*/}
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

               {/*Price*/}
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

               {/*Stock Quantity*/}
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

               {/*Category*/}
               <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Category</FormLabel>
                        <FormControl>
                           <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                           >
                              <SelectTrigger>
                                 <SelectValue placeholder="Select Category" />
                              </SelectTrigger>
                              <SelectContent>
                                 {categories?.map((c: any) => (
                                    <SelectItem key={c.id} value={c.id}>
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

               {/*Image*/}
               <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Image</FormLabel>
                        <FormControl>
                           <Input type="file" {...field} />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />

               {/*Submit Button*/}
               <Button type="submit" disabled={loading}>
                  {loading ? "Creating..." : "Create Product"}
               </Button>
            </form>
         </Form>

      </div>
   )
}
