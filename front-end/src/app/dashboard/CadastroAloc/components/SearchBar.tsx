"use client";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  initialQuery?: string;
}

export default function SearchBar({
  onSearch,
  initialQuery = "",
}: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [query, onSearch]);

  return (
    <div className="flex items-center gap-2 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar..."
          className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
    </div>
  );
}