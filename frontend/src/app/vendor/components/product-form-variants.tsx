"use client";

import React from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  IconButton,
  Chip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import StyleIcon from "@mui/icons-material/Style";
import { ProductVariantFormValues } from "../schemas/product-form-schema";
import VariantImageManager from "@/components/variants/variant-image-manager";
import styles from "../vendor.module.css";

interface ProductFormVariantsProps {
  variants: ProductVariantFormValues[];
  onAddVariant: () => void;
  onUpdateVariant: (
    index: number,
    fieldOrObject: string | Record<string, any>,
    val?: any,
  ) => void;
  onRemoveVariant: (index: number) => void;
}

export default function ProductFormVariants({
  variants,
  onAddVariant,
  onUpdateVariant,
  onRemoveVariant,
}: ProductFormVariantsProps) {
  const totalVariantStock = variants.reduce(
    (sum, v) => sum + Number(v.stockQuantity || 0),
    0,
  );

  return (
    <Box className={styles.formSectionBox}>
      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <StyleIcon style={{ color: "#2874f0" }} />
          <Typography variant="subtitle1" style={{ fontWeight: 700 }}>
            Product Variants (Colors, Sizes, Options)
          </Typography>
        </Box>
        {variants.length > 0 && (
          <Chip
            label={`Combined Stock: ${totalVariantStock} units`}
            color="info"
            size="small"
          />
        )}
      </Box>

      {variants.length === 0 ? (
        <Box style={{ textAlign: "center", padding: "16px 0" }}>
          <Typography
            variant="body2"
            style={{ color: "#64748b", marginBottom: 8 }}
          >
            No variants added. Base product stock will be used.
          </Typography>
          <Button
            size="small"
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={onAddVariant}
          >
            ADD FIRST VARIANT
          </Button>
        </Box>
      ) : (
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            marginTop: 12,
          }}
        >
          {variants.map((v, idx) => (
            <Box key={idx} className={styles.variantRowCard}>
              <Box
                style={{
                  display: "flex",
                  gap: 8,
                  flexWrap: "wrap",
                  alignItems: "center",
                }}
              >
                <TextField
                  size="small"
                  label="Variant Name *"
                  placeholder="e.g. Red / XL"
                  value={v.name}
                  onChange={(e) => onUpdateVariant(idx, "name", e.target.value)}
                  style={{ flex: 2, minWidth: 140 }}
                />
                <TextField
                  size="small"
                  type="number"
                  label="Stock *"
                  value={v.stockQuantity}
                  onChange={(e) =>
                    onUpdateVariant(
                      idx,
                      "stockQuantity",
                      Number(e.target.value),
                    )
                  }
                  style={{ flex: 1, minWidth: 90 }}
                />
                <TextField
                  size="small"
                  type="number"
                  label="Price (₹)"
                  placeholder="Override price"
                  value={v.price || ""}
                  onChange={(e) =>
                    onUpdateVariant(
                      idx,
                      "price",
                      e.target.value ? Number(e.target.value) : undefined,
                    )
                  }
                  style={{ flex: 1, minWidth: 100 }}
                />
                <TextField
                  size="small"
                  label="Color"
                  placeholder="e.g. Red"
                  value={v.attributes?.color || ""}
                  onChange={(e) =>
                    onUpdateVariant(idx, "attributes", {
                      ...v.attributes,
                      color: e.target.value,
                    })
                  }
                  style={{ flex: 1, minWidth: 90 }}
                />
                <TextField
                  size="small"
                  label="Size"
                  placeholder="e.g. XL"
                  value={v.attributes?.size || ""}
                  onChange={(e) =>
                    onUpdateVariant(idx, "attributes", {
                      ...v.attributes,
                      size: e.target.value,
                    })
                  }
                  style={{ flex: 1, minWidth: 90 }}
                />
                <IconButton
                  color="error"
                  size="small"
                  onClick={() => onRemoveVariant(idx)}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>

              <VariantImageManager
                label={`Variant #${idx + 1} Image Array`}
                images={v.images || []}
                onChange={(urls) => {
                  onUpdateVariant(idx, {
                    images: urls,
                    thumbnail: urls.length > 0 ? urls[0] : "",
                  });
                }}
              />
            </Box>
          ))}
          <Button
            size="small"
            variant="text"
            startIcon={<AddIcon />}
            onClick={onAddVariant}
            style={{ alignSelf: "flex-start" }}
          >
            ADD ANOTHER VARIANT
          </Button>
        </Box>
      )}
    </Box>
  );
}
