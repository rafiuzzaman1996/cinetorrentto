"use client";

import { useState, useCallback, useRef } from "react";
import { MultiSelectOption } from "@/components/ui/multi-select";

interface UseApiSearchProps {
  apiUrl: string;
  debounceMs?: number;
  minQueryLength?: number;
}

export function useApiSearch({
  apiUrl,
  debounceMs = 300,
  minQueryLength = 2,
}: UseApiSearchProps) {
  const [options, setOptions] = useState<MultiSelectOption[]>([]);
  const [loading, setLoading] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const search = useCallback(
    async (query: string) => {
      if (query.length < minQueryLength) {
        setOptions([]);
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(`${apiUrl}?q=${encodeURIComponent(query)}`);
        if (!response.ok) {
          throw ("Failed to fetch");
        }
        const data = await response.json();
        setOptions(data.items || data);
      } catch (error) {
        console.error("Search error:", error);
        setOptions([]);
      } finally {
        setLoading(false);
      }
    },
    [apiUrl, minQueryLength]
  );

  const debouncedSearch = useCallback(
    (query: string) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        search(query);
      }, debounceMs);
    },
    [search, debounceMs]
  );

  return {
    options,
    loading,
    search: debouncedSearch,
  };
}