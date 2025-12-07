"use client";

export default function SearchBar({ search, setSearch }: any) {
   return (
      <input
         type="text"
         placeholder="Search products..."
         value={search}
         onChange={(e) => setSearch(e.target.value)}
         className="border p-2 rounded w-full"
      />
   );
}