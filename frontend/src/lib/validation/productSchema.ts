import * as z from 'zod';

export const productSchema = z.object({
   name: z.string().min(2, 'Name is required'),
   sku: z.string().min(1, 'SKU is required'),
   barcode: z.string().min(1, 'Barcode is required'),
   price: z.string().min(1, 'Price is required'),
   stock_quantity: z.string().min(1, 'Stock quantity is required'),
   category: z.string().min(1, 'Category is required'),
   image: z.any().optional(),
});

export type ProductSchema = z.infer<typeof productSchema>;
