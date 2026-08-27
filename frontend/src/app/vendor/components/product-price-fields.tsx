"use client";

import React from "react";
import { Box, TextField } from "@mui/material";
import { Controller, Control } from "react-hook-form";
import { ProductFormValues } from "../schemas/product-form-schema";
import styles from "./product-basic-fields.module.css";

interface ProductPriceFieldsProps {
  control: Control<ProductFormValues>;
}

export default function ProductPriceFields({ control }: ProductPriceFieldsProps) {
  return (
    <Box className={styles.rowThree}>
      <Controller
        name="price"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="Selling Price (₹) *"
            type="number"
            onChange={(e) =>
              field.onChange(
                e.target.value === "" ? 0 : Number(e.target.value)
              )
            }
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            size="small"
            fullWidth
          />
        )}
      />

      <Controller
        name="compareAtPrice"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="MSRP / Original Price (₹)"
            type="number"
            onChange={(e) =>
              field.onChange(
                e.target.value === "" ? undefined : Number(e.target.value)
              )
            }
            size="small"
            fullWidth
          />
        )}
      />

      <Controller
        name="stockQuantity"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="Base Stock Quantity *"
            type="number"
            onChange={(e) =>
              field.onChange(
                e.target.value === "" ? 0 : Number(e.target.value)
              )
            }
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            size="small"
            fullWidth
          />
        )}
      />
    </Box>
  );
}
