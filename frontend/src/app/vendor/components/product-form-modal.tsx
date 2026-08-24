"use client";

import React, { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductData } from "@/services/product.service";
import {
  productFormSchema,
  ProductFormValues,
} from "../schemas/product-form-schema";
import ProductFormFields from "./product-form-fields";
import ProductFormImages from "./product-form-images";
import ProductFormVariants from "./product-form-variants";
import styles from "../vendor.module.css";

interface ProductFormModalProps {
  open: boolean;
  onClose: () => void;
  onSubmitProduct: (values: ProductFormValues) => void;
  formData: ProductData & { editingId?: string };
  categories: any[];
  submitting: boolean;
  onCategorySearchInputChange?: (val: string) => void;
  loadingCategories?: boolean;
}

export default function ProductFormModal({
  open,
  onClose,
  onSubmitProduct,
  formData,
  categories,
  submitting,
  onCategorySearchInputChange,
  loadingCategories,
}: ProductFormModalProps) {
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
        imageUrls: [""],
        variants: [],
      },
    });

  useEffect(() => {
    if (!open) return;
    reset({
      name: formData.name || "",
      description: formData.description || "",
      categoryId: formData.categoryId || "",
      price: Number(formData.price || 0),
      compareAtPrice: Number(formData.compareAtPrice || 0),
      stockQuantity: Number(formData.stockQuantity || 0),
      sku: formData.sku || "",
      status: formData.status === "draft" ? "draft" : "active",
      imageUrls: formData.imageUrls && formData.imageUrls.length > 0 ? formData.imageUrls : [""],
      variants: formData.variants
        ? formData.variants.map((v) => ({
            id: v.id,
            name: v.name,
            sku: v.sku,
            price: v.price ? Number(v.price) : undefined,
            stockQuantity: Number(v.stockQuantity || 0),
            attributes: v.attributes || {},
          }))
        : [],
    });
  }, [open, formData, reset]);

  const imageUrls = watch("imageUrls") || [""];
  const variants = watch("variants") || [];

  const handleAddImageUrl = () => {
    setValue("imageUrls", [...imageUrls, ""]);
  };

  const handleImageUrlChange = (index: number, val: string) => {
    const updated = [...imageUrls];
    updated[index] = val;
    setValue("imageUrls", updated);
  };

  const handleRemoveImageUrl = (index: number) => {
    const updated = imageUrls.filter((_, i) => i !== index);
    setValue("imageUrls", updated.length > 0 ? updated : [""]);
  };

  const handleAddVariant = () => {
    setValue("variants", [
      ...variants,
      { name: "", stockQuantity: 10, price: undefined, attributes: {} },
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
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      slotProps={{ paper: { className: styles.dialogPaper } }}
    >
      <DialogTitle className={styles.modalTitle}>
        <Box className={styles.modalHeaderBar}>
          <Typography className={styles.modalTitle}>
            {formData.editingId ? "Edit Product Listing" : "Add New Product"}
          </Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <form onSubmit={handleSubmit(onSubmitProduct)}>
        <DialogContent dividers>
          <Box className={styles.formCardGrid}>
            <ProductFormFields
              control={control}
              categories={categories}
              onCategorySearchInputChange={onCategorySearchInputChange}
              loadingCategories={loadingCategories}
            />
            <ProductFormImages
              imageUrls={imageUrls}
              onAddImageUrl={handleAddImageUrl}
              onImageUrlChange={handleImageUrlChange}
              onRemoveImageUrl={handleRemoveImageUrl}
            />
            <ProductFormVariants
              variants={variants}
              onAddVariant={handleAddVariant}
              onUpdateVariant={handleUpdateVariant}
              onRemoveVariant={handleRemoveVariant}
            />
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} className={styles.cancelBtn}>
            CANCEL
          </Button>
          <Button
            type="submit"
            disabled={submitting}
            className={styles.saveBtn}
          >
            {submitting
              ? "SAVING..."
              : formData.editingId
              ? "UPDATE PRODUCT"
              : "SAVE PRODUCT"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
