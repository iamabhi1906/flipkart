"use client";

import React, { useState } from "react";
import { Box, Alert } from "@mui/material";

import PrimarySearchAppBar from "@/components/appbar";
import { useVendorProducts } from "./hooks/use-vendor-products";

import VendorHeader from "./components/vendor-header";
import VendorStats from "./components/vendor-stats";
import VendorFilters from "./components/vendor-filters";
import VendorProductTable from "./components/vendor-product-table";
import ProductFormModal from "./components/product-form-modal";
import ProductPreviewModal from "./components/product-preview-modal";
import DeleteConfirmModal from "./components/delete-confirm-modal";
import VendorProfileModal from "./components/vendor-profile-modal";

import styles from "./vendor.module.css";

export default function VendorProductsPage() {
  const [showProfileModal, setShowProfileModal] = useState(false);

  const {
    products,
    filteredProducts,
    categories,
    setCategorySearchInput,
    loadingCategories,
    loading,
    submitting,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedStatus,
    setSelectedStatus,
    sortBy,
    setSortBy,
    showFormModal,
    setShowFormModal,
    showPreviewModal,
    setShowPreviewModal,
    showDeleteModal,
    setShowDeleteModal,
    selectedProduct,
    setSelectedProduct,
    setDeletingId,
    feedback,
    setFeedback,
    formData,
    setFormData,
    loadVendorProducts,
    handleOpenAddForm,
    handleEditProduct,
    handleSubmit,
    handleQuickStockChange,
    handleQuickStatusChange,
    handleConfirmDelete,
  } = useVendorProducts();

  const totalProducts = products.length;
  const activeProducts = products.filter((p) => p.status === "active").length;
  const totalStock = products.reduce(
    (sum, p) => sum + Number(p.stockQuantity || 0),
    0,
  );
  const lowStockCount = products.filter(
    (p) => Number(p.stockQuantity || 0) <= 5,
  ).length;
  const totalValuation = products.reduce(
    (sum, p) => sum + Number(p.price || 0) * Number(p.stockQuantity || 0),
    0,
  );

  return (
    <Box className={styles.container}>
      <PrimarySearchAppBar />

      <Box className={styles.mainWrapper}>
        <VendorHeader
          onRefresh={loadVendorProducts}
          onOpenAddForm={handleOpenAddForm}
          onOpenProfile={() => setShowProfileModal(true)}
        />

        {feedback && (
          <Alert
            severity={feedback.type}
            onClose={() => setFeedback(null)}
            className={styles.alertBanner}
          >
            {feedback.msg}
          </Alert>
        )}

        <VendorStats
          totalProducts={totalProducts}
          activeProducts={activeProducts}
          totalStock={totalStock}
          lowStockCount={lowStockCount}
          totalValuation={totalValuation}
        />

        <VendorFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          sortBy={sortBy}
          setSortBy={setSortBy}
          categories={categories}
          onReset={() => {
            setSearchQuery("");
            setSelectedCategory("all");
            setSelectedStatus("all");
            setSortBy("newest");
          }}
        />

        <Box className={styles.contentCard}>
          <VendorProductTable
            loading={loading}
            products={filteredProducts}
            onOpenAddForm={handleOpenAddForm}
            onQuickStockChange={handleQuickStockChange}
            onQuickStatusChange={handleQuickStatusChange}
            onPreview={(prod) => {
              setSelectedProduct(prod);
              setShowPreviewModal(true);
            }}
            onEdit={handleEditProduct}
            onPromptDelete={(id, prod) => {
              setDeletingId(id);
              setSelectedProduct(prod);
              setShowDeleteModal(true);
            }}
          />
        </Box>
      </Box>

      <ProductFormModal
        open={showFormModal}
        onClose={() => setShowFormModal(false)}
        onSubmitProduct={handleSubmit}
        formData={formData}
        categories={categories}
        submitting={submitting}
        onCategorySearchInputChange={setCategorySearchInput}
        loadingCategories={loadingCategories}
      />

      <ProductPreviewModal
        open={showPreviewModal}
        onClose={() => setShowPreviewModal(false)}
        product={selectedProduct}
      />

      <DeleteConfirmModal
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        product={selectedProduct}
      />

      <VendorProfileModal
        open={showProfileModal}
        onClose={() => setShowProfileModal(false)}
      />
    </Box>
  );
}
