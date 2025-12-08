"use client";

export default function SearchBar({ search, setSearch }: any) {
   return (
      <div className="flex items-center gap-2">
         <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-2 rounded w-full"
         />
         <button
            onClick={() => setSearch('')}
            className="bg-blue-600 text-white p-2 rounded">Search</button>
      </div>
   );
}