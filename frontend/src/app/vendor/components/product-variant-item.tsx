"use client";

import React from "react";
import { Box, Typography, TextField, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { ProductVariantFormValues } from "../schemas/product-form-schema";
import ProductVariantAttributes from "./product-variant-attributes";
import VariantImageManager from "@/components/variants/variant-image-manager";
import styles from "./product-variant-item.module.css";

interface ProductVariantItemProps {
  index: number;
  variant: ProductVariantFormValues;
  onUpdateVariant: (
    index: number,
    fieldOrObject: string | Record<string, any>,
    val?: any,
  ) => void;
  onRemoveVariant: (index: number) => void;
}

export default function ProductVariantItem({
  index,
  variant,
  onUpdateVariant,
  onRemoveVariant,
}: ProductVariantItemProps) {
  const images = variant.images || [];

  const handleImagesChange = (newUrls: string[]) => {
    onUpdateVariant(index, {
      images: newUrls,
      thumbnail: newUrls.length > 0 ? newUrls[0] : "",
    });
  };

  return (
    <Box className={styles.itemCard}>
      <Box className={styles.itemHeader}>
        <Typography variant="subtitle2" style={{ fontWeight: 700 }}>
          Variant #{index + 1}: {variant.name || "Untitled Variant"}
        </Typography>
        <IconButton
          color="error"
          size="small"
          onClick={() => onRemoveVariant(index)}
        >
          <DeleteIcon />
        </IconButton>
      </Box>

      <Box className={styles.inputsGrid}>
        <TextField
          size="small"
          label="Variant Title *"
          placeholder="e.g. Red / 8GB RAM / 256GB"
          value={variant.name}
          onChange={(e) => onUpdateVariant(index, "name", e.target.value)}
        />
        <TextField
          size="small"
          type="number"
          label="Stock *"
          value={variant.stockQuantity}
          onChange={(e) =>
            onUpdateVariant(index, "stockQuantity", Number(e.target.value))
          }
        />
        <TextField
          size="small"
          type="number"
          label="Price (₹)"
          placeholder="Override price"
          value={variant.price || ""}
          onChange={(e) =>
            onUpdateVariant(
              index,
              "price",
              e.target.value ? Number(e.target.value) : undefined,
            )
          }
        />
      </Box>

      <VariantImageManager
        label={`Variant #${index + 1} Images`}
        images={images}
        onChange={handleImagesChange}
      />

      <ProductVariantAttributes
        attributes={variant.attributes}
        onChangeAttributes={(newAttrs) =>
          onUpdateVariant(index, "attributes", newAttrs)
        }
      />
    </Box>
  );
}
