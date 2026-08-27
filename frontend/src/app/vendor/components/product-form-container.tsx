"use client";

import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, Box, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductData } from "@/services/product.service";
import {
  productFormSchema,
  ProductFormValues,
} from "../schemas/product-form-schema";
import ProductFormHeader from "./product-form-header";
import ProductBasicFields from "./product-basic-fields";
import ProductMediaFields from "./product-media-fields";
import ProductVariantsSection from "./product-variants-section";
import styles from "./product-form-container.module.css";

interface ProductFormContainerProps {
  open: boolean;
  onClose: () => void;
  onSubmitProduct: (values: ProductFormValues) => void;
  formData: ProductData & { editingId?: string };
  categories: any[];
  submitting: boolean;
  onCategorySearchInputChange?: (val: string) => void;
  loadingCategories?: boolean;
}

export default function ProductFormContainer({
  open,
  onClose,
  onSubmitProduct,
  formData,
  categories,
  submitting,
  onCategorySearchInputChange,
  loadingCategories,
}: ProductFormContainerProps) {
  const [activeTab, setActiveTab] = useState(0);

  const { control, handleSubmit, reset, watch, setValue } =
    useForm<ProductFormValues>({
      resolver: zodResolver(productFormSchema),
      defaultValues: {
        name: "",
        description: "",
        categoryId: "",
        price: 0,
        compareAtPrice: 0,
        stockQuantity: 0,
        sku: "",
        status: "active",
        imageUrls: [],
        variants: [],
      },
    });

  useEffect(() => {
    if (!open) return;
    setActiveTab(0);
    reset({
      name: formData.name || "",
      description: formData.description || "",
      categoryId: formData.categoryId || "",
      price: Number(formData.price || 0),
      compareAtPrice: Number(formData.compareAtPrice || 0),
      stockQuantity: Number(formData.stockQuantity || 0),
      sku: formData.sku || "",
      status: formData.status === "draft" ? "draft" : "active",
      imageUrls: formData.imageUrls || [],
      variants: formData.variants
        ? formData.variants.map((v) => ({
            id: v.id,
            name: v.name,
            sku: v.sku,
            price: v.price ? Number(v.price) : undefined,
            stockQuantity: Number(v.stockQuantity || 0),
            thumbnail: v.thumbnail || "",
            images: v.images || [],
            attributes: v.attributes || {},
          }))
        : [],
    });
  }, [open, formData, reset]);

  const imageUrls = watch("imageUrls") || [];
  const variants = watch("variants") || [];

  const handleAddImageUrl = () => setValue("imageUrls", [...imageUrls, ""]);
  const handleImageUrlChange = (index: number, val: string) => {
    const updated = [...imageUrls];
    updated[index] = val;
    setValue("imageUrls", updated);
  };
  const handleRemoveImageUrl = (index: number) => {
    setValue("imageUrls", imageUrls.filter((_, i) => i !== index));
  };

  const handleAddVariant = () => {
    setValue("variants", [
      ...variants,
      { name: "", stockQuantity: 10, price: undefined, attributes: {}, images: [], thumbnail: "" },
    ]);
  };
  const handleUpdateVariant = (idx: number, field: string, val: any) => {
    const updated = [...variants];
    updated[idx] = { ...updated[idx], [field]: val };
    setValue("variants", updated);
  };
  const handleRemoveVariant = (idx: number) => {
    setValue("variants", variants.filter((_, i) => i !== idx));
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <form onSubmit={handleSubmit(onSubmitProduct)}>
        <DialogContent dividers style={{ padding: "20px 24px" }}>
          <ProductFormHeader
            isEditing={!!formData.editingId}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onClose={onClose}
          />

          <Box className={styles.contentWrapper}>
            {activeTab === 0 && (
              <ProductBasicFields
                control={control}
                categories={categories}
                onCategorySearchInputChange={onCategorySearchInputChange}
                loadingCategories={loadingCategories}
              />
            )}
            {activeTab === 1 && (
              <ProductMediaFields
                imageUrls={imageUrls}
                onAddImageUrl={handleAddImageUrl}
                onImageUrlChange={handleImageUrlChange}
                onRemoveImageUrl={handleRemoveImageUrl}
                setValue={setValue}
              />
            )}
            {activeTab === 2 && (
              <ProductVariantsSection
                variants={variants}
                onAddVariant={handleAddVariant}
                onUpdateVariant={handleUpdateVariant}
                onRemoveVariant={handleRemoveVariant}
              />
            )}
          </Box>
        </DialogContent>

        <Box className={styles.actionFooter}>
          <Button onClick={onClose} className={styles.cancelBtn}>
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={submitting}
            variant="contained"
            className={styles.saveBtn}
          >
            {submitting
              ? "Saving..."
              : formData.editingId
              ? "Update Product Listing"
              : "Save Product Listing"}
          </Button>
        </Box>
      </form>
    </Dialog>
  );
}
