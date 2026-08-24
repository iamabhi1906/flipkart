"use client";

import React from "react";
import {
  Box,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Autocomplete,
  FormHelperText,
} from "@mui/material";
import { Control, Controller } from "react-hook-form";
import { ProductFormValues } from "../schemas/product-form-schema";
import styles from "../vendor.module.css";

interface ProductFormFieldsProps {
  control: Control<ProductFormValues>;
  categories: any[];
  onCategorySearchInputChange?: (val: string) => void;
  loadingCategories?: boolean;
}

export default function ProductFormFields({
  control,
  categories,
  onCategorySearchInputChange,
  loadingCategories,
}: ProductFormFieldsProps) {
  return (
    <Box className={styles.formCardGrid}>
      <Box className={styles.formRow}>
        <Box className={styles.formGroupFlex2}>
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                fullWidth
                label="Product Name *"
                size="small"
                error={Boolean(fieldState.error)}
                helperText={fieldState.error?.message}
              />
            )}
          />
        </Box>
        <Box className={styles.formGroupFlex1}>
          <Controller
            name="categoryId"
            control={control}
            render={({ field, fieldState }) => {
              const selectedCatObj = categories.find((c) => c.id === field.value) || null;
              return (
                <Autocomplete
                  size="small"
                  options={categories}
                  loading={loadingCategories}
                  getOptionLabel={(opt) => (typeof opt === "string" ? opt : opt.name || "")}
                  value={selectedCatObj}
                  onChange={(_, val) => field.onChange(val ? val.id : "")}
                  onInputChange={(_, val, reason) => {
                    if (reason === "input" && onCategorySearchInputChange) {
                      onCategorySearchInputChange(val);
                    }
                  }}
                  isOptionEqualToValue={(opt, val) => opt.id === val.id}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Category *"
                      placeholder="Search categories..."
                      error={Boolean(fieldState.error)}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
              );
            }}
          />
        </Box>
      </Box>

      <Box className={styles.formRow}>
        <Box className={styles.formGroupFlex1}>
          <Controller
            name="price"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                onChange={(e) => field.onChange(Number(e.target.value))}
                fullWidth
                type="number"
                label="Selling Price (₹) *"
                size="small"
                error={Boolean(fieldState.error)}
                helperText={fieldState.error?.message}
              />
            )}
          />
        </Box>
        <Box className={styles.formGroupFlex1}>
          <Controller
            name="compareAtPrice"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                fullWidth
                type="number"
                label="MRP / Compare Price (₹)"
                size="small"
                error={Boolean(fieldState.error)}
                helperText={fieldState.error?.message}
              />
            )}
          />
        </Box>
        <Box className={styles.formGroupFlex1}>
          <Controller
            name="stockQuantity"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                onChange={(e) => field.onChange(Number(e.target.value))}
                fullWidth
                type="number"
                label="Stock Quantity *"
                size="small"
                error={Boolean(fieldState.error)}
                helperText={fieldState.error?.message}
              />
            )}
          />
        </Box>
        <Box className={styles.formGroupFlex1}>
          <Controller
            name="sku"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                fullWidth
                label="SKU Code"
                size="small"
                placeholder="Auto-generated if empty"
                error={Boolean(fieldState.error)}
                helperText={fieldState.error?.message}
              />
            )}
          />
        </Box>
      </Box>

      <Box className={styles.formRow}>
        <Box className={styles.formGroupFlex1}>
          <Controller
            name="status"
            control={control}
            render={({ field, fieldState }) => (
              <FormControl fullWidth size="small" error={Boolean(fieldState.error)}>
                <Select {...field}>
                  <MenuItem value="active">Active (Visible on Storefront)</MenuItem>
                  <MenuItem value="draft">Draft (Hidden from buyers)</MenuItem>
                </Select>
                {fieldState.error && <FormHelperText>{fieldState.error.message}</FormHelperText>}
              </FormControl>
            )}
          />
        </Box>
      </Box>

      <Box className={styles.formRow}>
        <Box className={styles.formGroupFlex1}>
          <Controller
            name="description"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                fullWidth
                multiline
                rows={3}
                label="Product Description"
                placeholder="Specifications, features, warranty, and key details..."
                error={Boolean(fieldState.error)}
                helperText={fieldState.error?.message}
              />
            )}
          />
        </Box>
      </Box>
    </Box>
  );
}
