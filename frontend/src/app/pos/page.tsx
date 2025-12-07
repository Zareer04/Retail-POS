'use client';

import Cart from "./components/Cart";
import ProductList from "./components/ProductList";
import CategoryFilter from "./components/CategoryFilter";
import SearchBar from "./components/SearchBar";
import { useState } from "react";

export default function POSpage() {
   const [search, setSearch] = useState('');
   const [category, setCategory] = useState('');

   return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
         {/*Left-products*/}
         <div className="col-span-2 space-y-4">
            <SearchBar search={search} setSearch={setSearch} />
            <CategoryFilter selected={category} setSelected={setCategory} />
            <ProductList search={search} category={category} />
         </div>

         {/*Right-cart*/}
         <div className="col-span-1">
            <Cart />
         </div>
      </div>
   );
}
