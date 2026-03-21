"use client";

import { useState, useEffect, useCallback } from "react";
import { Search, X } from "lucide-react";
import { Post } from "@/lib/utils";

interface SearchInputProps {
  onResults: (results: Post[]) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  onClear?: () => void;
}

export default function SearchInput({
  onResults,
  loading,
  setLoading,
  onClear,
}: SearchInputProps) {
  const [query, setQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const debouncedSearch = useCallback(
    async (searchQuery: string) => {
      if (!searchQuery.trim()) {
        if (hasSearched) {
          onResults([]);
          onClear?.();
          setHasSearched(false);
        }
        setLoading(false);
        return;
      }

      setHasSearched(true);
      setLoading(true);
      try {
        const response = await fetch(
          `/api/search?q=${encodeURIComponent(searchQuery)}`,
        );
        if (response.ok) {
          const results = await response.json();
          onResults(results);
        }
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setLoading(false);
      }
    },
    [onResults, setLoading, onClear, hasSearched],
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      debouncedSearch(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query, debouncedSearch]);

  const handleClear = () => {
    setQuery("");
    setHasSearched(false);
    onResults([]);
    onClear?.();
  };

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <input
          type="text"
          placeholder="Search posts..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (e.target.value) {
              setLoading(true);
            }
          }}
          className="w-full pl-10 pr-10 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      {loading && query && (
        <div className="absolute right-10 top-1/2 transform -translate-y-1/2">
          <div className="animate-spin h-4 w-4 border-2 border-muted-foreground border-t-transparent rounded-full"></div>
        </div>
      )}
    </div>
  );
}
