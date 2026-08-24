"use client";

import { useState } from "react";
import { ProductData } from "@/services/product.service";

export const INITIAL_PRODUCT_FORM: ProductData & { editingId?: string } = {
  name: "",
  categoryId: "",
  description: "",
  sku: "",
  price: 0,
  compareAtPrice: 0,
  stockQuantity: 10,
  status: "active",
  imageUrls: [""],
};

export function useVendorState() {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  // Modals
  const [showFormModal, setShowFormModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Feedback Alert
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    msg: string;
  } | null>(null);

  const [formData, setFormData] = useState<
    ProductData & { editingId?: string }
  >(INITIAL_PRODUCT_FORM);

  return {
    products,
    setProducts,
    categories,
    setCategories,
    loading,
    setLoading,
    submitting,
    setSubmitting,
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
    deletingId,
    setDeletingId,
    feedback,
    setFeedback,
    formData,
    setFormData,
  };
}
