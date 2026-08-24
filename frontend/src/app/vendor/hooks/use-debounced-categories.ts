"use client";

import { useState, useEffect, useCallback } from "react";
import { getCategories } from "@/services/product.service";

export function useDebouncedCategories(initialQuery: string = "") {
  const [categories, setCategories] = useState<any[]>([]);
  const [searchInput, setSearchInput] = useState(initialQuery);
  const [loading, setLoading] = useState(false);

  const fetchCategories = useCallback(async (query: string) => {
    setLoading(true);
    try {
      const res = await getCategories({
        search: query || undefined,
        limit: 50,
      });
      const list = Array.isArray(res)
        ? res
        : res?.items || res?.data || [];
      setCategories(list);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCategories(searchInput);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchInput, fetchCategories]);

  return {
    categories,
    setCategories,
    searchInput,
    setSearchInput,
    loading,
    refetchCategories: () => fetchCategories(searchInput),
  };
}
