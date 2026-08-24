"use client";

import {
  createProduct,
  updateProduct,
  deleteProduct,
  ProductData,
} from "@/services/product.service";
import { INITIAL_PRODUCT_FORM } from "./use-vendor-state";

export function useProductCrud(
  state: any,
  reloadProducts: () => void,
  reloadCategories?: () => void,
) {
  const handleOpenAddForm = async () => {
    if (reloadCategories) {
      await reloadCategories();
    }
    state.setFormData({
      ...INITIAL_PRODUCT_FORM,
      categoryId: state.categories.length > 0 ? state.categories[0].id : "",
    });
    state.setShowFormModal(true);
  };

  const handleEditProduct = async (prod: ProductData) => {
    if (reloadCategories) {
      await reloadCategories();
    }
    const existingImages =
      prod.images && prod.images.length > 0
        ? prod.images.map((img: any) => img.imageUrl || img)
        : prod.imageUrls || [""];

    state.setFormData({
      editingId: prod.id,
      name: prod.name,
      categoryId: prod.categoryId || (prod.category?.id ?? ""),
      description: prod.description || "",
      sku: prod.sku || "",
      price: Number(prod.price) || 0,
      compareAtPrice: prod.compareAtPrice ? Number(prod.compareAtPrice) : 0,
      stockQuantity: prod.stockQuantity ?? 10,
      status: prod.status || "active",
      imageUrls: existingImages.length > 0 ? existingImages : [""],
    });
    state.setShowFormModal(true);
  };

  const handleSubmit = async (validatedValues: any) => {
    state.setSubmitting(true);
    state.setFeedback(null);

    const filteredImages = (validatedValues.imageUrls || []).filter(
      (url: string) => url && url.trim().length > 0,
    );

    const payload: ProductData = {
      name: validatedValues.name,
      categoryId: validatedValues.categoryId,
      description: validatedValues.description,
      sku: validatedValues.sku || undefined,
      price: Number(validatedValues.price),
      compareAtPrice: validatedValues.compareAtPrice
        ? Number(validatedValues.compareAtPrice)
        : undefined,
      stockQuantity: Number(validatedValues.stockQuantity || 0),
      status: validatedValues.status || "active",
      imageUrls: filteredImages.length > 0 ? filteredImages : undefined,
    };

    try {
      if (state.formData.editingId) {
        await updateProduct(state.formData.editingId, payload);
        state.setFeedback({
          type: "success",
          msg: `Product "${validatedValues.name}" updated successfully!`,
        });
      } else {
        await createProduct(payload);
        state.setFeedback({
          type: "success",
          msg: `New product "${validatedValues.name}" added to inventory!`,
        });
      }
      state.setShowFormModal(false);
      state.setFormData(INITIAL_PRODUCT_FORM);
      reloadProducts();
    } catch (err: any) {
      state.setFeedback({
        type: "error",
        msg: err.response?.data?.message || err.message || "Failed to save product.",
      });
    } finally {
      state.setSubmitting(false);
    }
  };

  const handleQuickStockChange = async (prod: ProductData, delta: number) => {
    if (!prod.id) return;
    const currentStock = Number(prod.stockQuantity || 0);
    const newStock = Math.max(0, currentStock + delta);
    if (newStock === currentStock) return;

    try {
      await updateProduct(prod.id, { stockQuantity: newStock });
      state.setProducts((prev: any[]) =>
        prev.map((p) => (p.id === prod.id ? { ...p, stockQuantity: newStock } : p)),
      );
    } catch (err) {
      state.setFeedback({ type: "error", msg: "Failed to update stock quantity." });
    }
  };

  const handleQuickStatusChange = async (
    prod: ProductData,
    newStatus: "active" | "draft",
  ) => {
    if (!prod.id) return;
    try {
      await updateProduct(prod.id, { status: newStatus });
      state.setProducts((prev: any[]) =>
        prev.map((p) => (p.id === prod.id ? { ...p, status: newStatus } : p)),
      );
      state.setFeedback({
        type: "success",
        msg: `Product status updated to ${newStatus.toUpperCase()}`,
      });
    } catch (err) {
      state.setFeedback({ type: "error", msg: "Failed to update status." });
    }
  };

  const handleConfirmDelete = async () => {
    if (!state.deletingId) return;
    state.setFeedback(null);
    try {
      await deleteProduct(state.deletingId);
      state.setFeedback({
        type: "success",
        msg: "Product deleted from inventory successfully!",
      });
      state.setShowDeleteModal(false);
      state.setDeletingId(null);
      state.setSelectedProduct(null);
      reloadProducts();
    } catch (err: any) {
      state.setFeedback({
        type: "error",
        msg: err.response?.data?.message || "Failed to delete product",
      });
    }
  };

  return {
    handleOpenAddForm,
    handleEditProduct,
    handleSubmit,
    handleQuickStockChange,
    handleQuickStatusChange,
    handleConfirmDelete,
  };
}
