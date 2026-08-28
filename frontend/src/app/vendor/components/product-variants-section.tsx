"use client";

import React from "react";
import { Box, Typography, Button, Chip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import StyleIcon from "@mui/icons-material/Style";
import { ProductVariantFormValues } from "../schemas/product-form-schema";
import ProductVariantItem from "./product-variant-item";
import styles from "./product-variants-section.module.css";

interface ProductVariantsSectionProps {
  variants: ProductVariantFormValues[];
  onAddVariant: () => void;
  onUpdateVariant: (
    index: number,
    fieldOrObject: string | Record<string, any>,
    val?: any,
  ) => void;
  onRemoveVariant: (index: number) => void;
}

export default function ProductVariantsSection({
  variants,
  onAddVariant,
  onUpdateVariant,
  onRemoveVariant,
}: ProductVariantsSectionProps) {
  const totalStock = variants.reduce(
    (sum, v) => sum + Number(v.stockQuantity || 0),
    0
  );

  return (
    <Box className={styles.sectionBox}>
      <Box className={styles.topHeader}>
        <Box className={styles.headerTitle}>
          <StyleIcon style={{ color: "#2874f0" }} />
          <Typography variant="subtitle1" style={{ fontWeight: 700 }}>
            Dynamic Product Variants ({variants.length})
          </Typography>
        </Box>
        {variants.length > 0 && (
          <Chip
            label={`Combined Stock: ${totalStock} units`}
            color="info"
            size="small"
          />
        )}
      </Box>

      {variants.length === 0 ? (
        <Box className={styles.emptyBox}>
          <Typography
            variant="body2"
            style={{ color: "#64748b", marginBottom: 12 }}
          >
            No variants added. Base product pricing and stock will be used.
          </Typography>
          <Button
            size="small"
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={onAddVariant}
          >
            Add First Product Variant
          </Button>
        </Box>
      ) : (
        <Box className={styles.variantsList}>
          {variants.map((v, idx) => (
            <ProductVariantItem
              key={idx}
              index={idx}
              variant={v}
              onUpdateVariant={onUpdateVariant}
              onRemoveVariant={onRemoveVariant}
            />
          ))}

          <Button
            size="small"
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={onAddVariant}
            style={{ alignSelf: "flex-start" }}
          >
            Add Another Variant
          </Button>
        </Box>
      )}
    </Box>
  );
}
