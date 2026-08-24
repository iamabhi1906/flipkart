"use client";

import { useState, useEffect, useCallback } from "react";
import { getProducts, getCategories, ProductData } from "@/services/product.service";

export function useProductCatalog() {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [sortBy, setSortBy] = useState("newest");
  const [page, setPage] = useState(1);

  const fetchCatalog = useCallback(async () => {
    setLoading(true);
    try {
      const params: any = {
        page,
        limit: 12,
        sortBy,
      };

      if (search.trim()) params.search = search.trim();
      if (categoryId) params.categoryId = categoryId;
      if (minPrice && !isNaN(Number(minPrice))) params.minPrice = Number(minPrice);
      if (maxPrice && !isNaN(Number(maxPrice))) params.maxPrice = Number(maxPrice);

      const res = await getProducts(params);
      if (res) {
        setProducts(res.items || res);
        setTotal(res.total || 0);
        setTotalPages(res.totalPages || 1);
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  }, [page, sortBy, search, categoryId, minPrice, maxPrice]);

  useEffect(() => {
    fetchCatalog();
  }, [fetchCatalog]);

  useEffect(() => {
    async function loadCats() {
      try {
        const catRes = await getCategories({ limit: 100 });
        setCategories(Array.isArray(catRes) ? catRes : catRes?.items || []);
      } catch (err) {}
    }
    loadCats();
  }, []);

  const handleResetFilters = () => {
    setSearch("");
    setCategoryId("");
    setMinPrice("");
    setMaxPrice("");
    setSortBy("newest");
    setPage(1);
  };

  return {
    products,
    categories,
    total,
    totalPages,
    loading,
    search,
    setSearch,
    categoryId,
    setCategoryId,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    sortBy,
    setSortBy,
    page,
    setPage,
    handleResetFilters,
  };
}
