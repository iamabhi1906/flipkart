"use client";

import React from "react";
import { Box, CircularProgress } from "@mui/material";
import PrimarySearchAppBar from "@/components/appbar";
import PlpFilters from "./components/plp-filters";
import PlpTopBar from "./components/plp-top-bar";
import PlpGrid from "./components/plp-grid";
import { useProductCatalog } from "./hooks/use-product-catalog";
import styles from "./plp.module.css";

export default function ProductCatalogPage() {
  const {
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
  } = useProductCatalog();

  return (
    <Box className={styles.plpContainer}>
      <PrimarySearchAppBar />

      <Box className={styles.plpMain}>
        <PlpFilters
          categories={categories}
          categoryId={categoryId}
          onSelectCategory={setCategoryId}
          minPrice={minPrice}
          onMinPriceChange={setMinPrice}
          maxPrice={maxPrice}
          onMaxPriceChange={setMaxPrice}
          onReset={handleResetFilters}
        />

        <Box className={styles.contentColumn}>
          <PlpTopBar
            search={search}
            onSearchChange={setSearch}
            total={total}
            sortBy={sortBy}
            onSortByChange={setSortBy}
          />

          {loading ? (
            <Box style={{ textAlign: "center", padding: 64 }}>
              <CircularProgress />
            </Box>
          ) : (
            <PlpGrid
              products={products}
              page={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
}
