'use client';

import Cart from "./components/Cart";
import ProductList from "./components/ProductList";
import CategoryFilter from "./components/CategoryFilter";
import SearchBar from "./components/SearchBar";
import { useState } from "react";
import Link from "next/link";

export default function POSpage() {
   const [search, setSearch] = useState('');
   const [category, setCategory] = useState('');

   return (
      <div className="flex h-screen w-full bg-gray-50 dark:bg-zinc-900 text-gray-900 dark:text-gray-100 overflow-hidden">
         {/* Left Side: Products area */}
         <div className="flex-1 flex flex-col h-full min-w-0">
            {/* Header / Nav */}
            <header className="p-4 border-b bg-white dark:bg-zinc-800 flex items-center justify-between shadow-sm z-10">
               <div className="flex items-center gap-4">
                  <Link href="/" className="text-blue-600 hover:text-blue-700 font-bold flex items-center gap-2">
                     &larr; Home
                  </Link>
                  <h1 className="text-xl font-bold">POS System</h1>
               </div>
               <div className="flex gap-2">
                  <Link href="/products/new" className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:opacity-90 transition">
                     + New Product
                  </Link>
               </div>
            </header>

            {/* Controls: Search & Category */}
            <div className="p-4 space-y-4 bg-gray-50 dark:bg-zinc-900 shrink-0">
               <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                     <SearchBar search={search} setSearch={setSearch} />
                  </div>
               </div>
               <CategoryFilter selected={category} setSelected={setCategory} />
            </div>

            {/* Scrollable Product Grid */}
            <div className="flex-1 overflow-y-auto p-4 pt-0">
               <ProductList search={search} category={category} />
            </div>
         </div>

         {/* Right Side: Cart Sidebar */}
         <div className="w-[400px] border-l bg-white dark:bg-zinc-800 h-full shadow-xl z-20 flex flex-col">
            <Cart />
         </div>
      </div>
   );
}
