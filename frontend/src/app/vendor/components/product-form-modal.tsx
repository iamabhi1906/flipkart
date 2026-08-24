"use client";

import React from "react";
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
import { ProductData } from "@/services/product.service";
import ProductFormFields from "./product-form-fields";
import ProductFormImages from "./product-form-images";
import styles from "../vendor.module.css";

interface ProductFormModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  formData: ProductData & { editingId?: string };
  setFormData: React.Dispatch<
    React.SetStateAction<ProductData & { editingId?: string }>
  >;
  categories: any[];
  submitting: boolean;
  onCategorySearchInputChange?: (val: string) => void;
  loadingCategories?: boolean;
}

export default function ProductFormModal({
  open,
  onClose,
  onSubmit,
  formData,
  setFormData,
  categories,
  submitting,
  onCategorySearchInputChange,
  loadingCategories,
}: ProductFormModalProps) {
  const handleAddImageUrl = () => {
    setFormData((prev) => ({
      ...prev,
      imageUrls: [...(prev.imageUrls || []), ""],
    }));
  };

  const handleImageUrlChange = (index: number, value: string) => {
    const updated = [...(formData.imageUrls || [])];
    updated[index] = value;
    setFormData((prev) => ({ ...prev, imageUrls: updated }));
  };

  const handleRemoveImageUrl = (index: number) => {
    const updated = (formData.imageUrls || []).filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      imageUrls: updated.length > 0 ? updated : [""],
    }));
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

      <form onSubmit={onSubmit}>
        <DialogContent dividers>
          <Box className={styles.formCardGrid}>
            <ProductFormFields
              formData={formData}
              setFormData={setFormData}
              categories={categories}
              onCategorySearchInputChange={onCategorySearchInputChange}
              loadingCategories={loadingCategories}
            />
            <ProductFormImages
              imageUrls={formData.imageUrls || [""]}
              onAddImageUrl={handleAddImageUrl}
              onImageUrlChange={handleImageUrlChange}
              onRemoveImageUrl={handleRemoveImageUrl}
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
