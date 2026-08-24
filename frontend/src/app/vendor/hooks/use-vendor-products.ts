"use client";

import { useEffect, useMemo } from "react";
import { useAppDispatch } from "@/store";
import { getUserThunk } from "@/features/users/user.action";
import { getMyVendorProducts } from "@/services/product.service";
import { useVendorState } from "./use-vendor-state";
import { useProductCrud } from "./use-product-crud";
import { useDebouncedCategories } from "./use-debounced-categories";

export function useVendorProducts() {
  const dispatch = useAppDispatch();
  const state = useVendorState();
  const debouncedCat = useDebouncedCategories();

  useEffect(() => {
    dispatch(getUserThunk());
    loadVendorProducts();
  }, [dispatch]);

  const loadVendorProducts = async () => {
    state.setLoading(true);
    try {
      const data = await getMyVendorProducts();
      state.setProducts(Array.isArray(data) ? data : data?.items || []);
    } catch (err) {
    } finally {
      state.setLoading(false);
    }
  };

  const crud = useProductCrud(
    { ...state, categories: debouncedCat.categories },
    loadVendorProducts,
    debouncedCat.refetchCategories,
  );

  const filteredProducts = useMemo(() => {
    return state.products
      .filter((p) => {
        const query = state.searchQuery.toLowerCase().trim();
        const matchesSearch =
          !query ||
          p.name.toLowerCase().includes(query) ||
          (p.sku && p.sku.toLowerCase().includes(query));

        const catId = p.categoryId || p.category?.id;
        const matchesCategory =
          state.selectedCategory === "all" || catId === state.selectedCategory;

        const matchesStatus =
          state.selectedStatus === "all"
            ? true
            : state.selectedStatus === "out_of_stock"
            ? Number(p.stockQuantity || 0) === 0
            : p.status === state.selectedStatus;

        return matchesSearch && matchesCategory && matchesStatus;
      })
      .sort((a, b) => {
        if (state.sortBy === "price_asc") return Number(a.price) - Number(b.price);
        if (state.sortBy === "price_desc") return Number(b.price) - Number(a.price);
        if (state.sortBy === "stock_desc")
          return Number(b.stockQuantity || 0) - Number(a.stockQuantity || 0);
        if (state.sortBy === "name_asc") return a.name.localeCompare(b.name);
        return 0;
      });
  }, [
    state.products,
    state.searchQuery,
    state.selectedCategory,
    state.selectedStatus,
    state.sortBy,
  ]);

  return {
    ...state,
    ...crud,
    categories: debouncedCat.categories,
    categorySearchInput: debouncedCat.searchInput,
    setCategorySearchInput: debouncedCat.setSearchInput,
    loadingCategories: debouncedCat.loading,
    refetchCategories: debouncedCat.refetchCategories,
    filteredProducts,
    loadVendorProducts,
  };
}
