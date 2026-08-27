"use client";

import React from "react";
import {
  Box,
  TextField,
  MenuItem,
  Autocomplete,
  CircularProgress,
} from "@mui/material";
import { Controller, Control } from "react-hook-form";
import { ProductFormValues } from "../schemas/product-form-schema";
import ProductPriceFields from "./product-price-fields";
import styles from "./product-basic-fields.module.css";

interface ProductBasicFieldsProps {
  control: Control<ProductFormValues>;
  categories: any[];
  onCategorySearchInputChange?: (val: string) => void;
  loadingCategories?: boolean;
}

export default function ProductBasicFields({
  control,
  categories,
  onCategorySearchInputChange,
  loadingCategories,
}: ProductBasicFieldsProps) {
  return (
    <Box className={styles.fieldsContainer}>
      <Controller
        name="name"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="Product Name *"
            placeholder="e.g. Nike Air Max / iPhone 15 Pro / Cotton T-Shirt"
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            size="small"
            fullWidth
          />
        )}
      />

      <Box className={styles.rowTwo}>
        <Controller
          name="categoryId"
          control={control}
          render={({ field, fieldState }) => {
            const selectedCategory =
              categories.find((c) => c.id === field.value) || null;
            return (
              <Autocomplete
                options={categories}
                getOptionLabel={(opt) => opt.name || ""}
                value={selectedCategory}
                onChange={(_, newVal) => field.onChange(newVal ? newVal.id : "")}
                onInputChange={(_, val) =>
                  onCategorySearchInputChange && onCategorySearchInputChange(val)
                }
                loading={loadingCategories}
                renderInput={(params) => {
                  const { InputProps, ...otherParams } = params as any;
                  return (
                    <TextField
                      {...otherParams}
                      label="Category *"
                      size="small"
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                      InputProps={{
                        ...InputProps,
                        endAdornment: (
                          <>
                            {loadingCategories ? (
                              <CircularProgress color="inherit" size={18} />
                            ) : null}
                            {InputProps?.endAdornment}
                          </>
                        ),
                      }}
                    />
                  );
                }}
              />
            );
          }}
        />

        <Controller
          name="sku"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Product SKU *"
              placeholder="e.g. TS-BLK-001"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              size="small"
              fullWidth
            />
          )}
        />
      </Box>

      <ProductPriceFields control={control} />

      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Product Description"
            multiline
            rows={3}
            placeholder="Detailed features, specifications, and warranty info..."
            size="small"
            fullWidth
          />
        )}
      />

      <Controller
        name="status"
        control={control}
        render={({ field }) => (
          <TextField {...field} select label="Listing Status" size="small" fullWidth>
            <MenuItem value="active">Active (Visible to Buyers)</MenuItem>
            <MenuItem value="draft">Draft (Hidden)</MenuItem>
          </TextField>
        )}
      />
    </Box>
  );
}
