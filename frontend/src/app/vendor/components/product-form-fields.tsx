"use client";

import React from "react";
import {
  Box,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Autocomplete,
} from "@mui/material";
import { ProductData } from "@/services/product.service";
import styles from "../vendor.module.css";

interface ProductFormFieldsProps {
  formData: ProductData & { editingId?: string };
  setFormData: React.Dispatch<
    React.SetStateAction<ProductData & { editingId?: string }>
  >;
  categories: any[];
  onCategorySearchInputChange?: (val: string) => void;
  loadingCategories?: boolean;
}

export default function ProductFormFields({
  formData,
  setFormData,
  categories,
  onCategorySearchInputChange,
  loadingCategories,
}: ProductFormFieldsProps) {
  const selectedCatObj =
    categories.find((cat) => cat.id === formData.categoryId) || null;

  return (
    <Box className={styles.formCardGrid}>
      <Box className={styles.formRow}>
        <Box className={styles.formGroupFlex2}>
          <TextField
            fullWidth
            required
            label="Product Name"
            size="small"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        </Box>
        <Box className={styles.formGroupFlex1}>
          <Autocomplete
            size="small"
            options={categories}
            loading={loadingCategories}
            getOptionLabel={(opt) => (typeof opt === "string" ? opt : opt.name || "")}
            value={selectedCatObj}
            onChange={(_, val) => {
              setFormData((prev) => ({ ...prev, categoryId: val ? val.id : "" }));
            }}
            onInputChange={(_, val, reason) => {
              if (reason === "input" && onCategorySearchInputChange) {
                onCategorySearchInputChange(val);
              }
            }}
            isOptionEqualToValue={(opt, val) => opt.id === val.id}
            renderInput={(params) => (
              <TextField
                {...params}
                required
                label="Category"
                placeholder="Type to search backend categories..."
              />
            )}
          />
        </Box>
      </Box>

      <Box className={styles.formRow}>
        <Box className={styles.formGroupFlex1}>
          <TextField
            fullWidth
            required
            type="number"
            label="Selling Price (₹)"
            size="small"
            value={formData.price || ""}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, price: Number(e.target.value) }))
            }
          />
        </Box>
        <Box className={styles.formGroupFlex1}>
          <TextField
            fullWidth
            type="number"
            label="MRP / Compare Price (₹)"
            size="small"
            value={formData.compareAtPrice || ""}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, compareAtPrice: Number(e.target.value) }))
            }
          />
        </Box>
        <Box className={styles.formGroupFlex1}>
          <TextField
            fullWidth
            required
            type="number"
            label="Stock Quantity"
            size="small"
            value={formData.stockQuantity}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, stockQuantity: Number(e.target.value) }))
            }
          />
        </Box>
        <Box className={styles.formGroupFlex1}>
          <TextField
            fullWidth
            label="SKU Code"
            size="small"
            placeholder="Auto-generated if empty"
            value={formData.sku || ""}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, sku: e.target.value }))
            }
          />
        </Box>
      </Box>

      <Box className={styles.formRow}>
        <Box className={styles.formGroupFlex1}>
          <FormControl fullWidth size="small">
            <Select
              value={formData.status || "active"}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, status: e.target.value as any }))
              }
            >
              <MenuItem value="active">Active (Visible on Storefront)</MenuItem>
              <MenuItem value="draft">Draft (Hidden from buyers)</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      <Box className={styles.formRow}>
        <Box className={styles.formGroupFlex1}>
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Product Description"
            placeholder="Specifications, features, warranty, and key details..."
            value={formData.description || ""}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, description: e.target.value }))
            }
          />
        </Box>
      </Box>
    </Box>
  );
}
