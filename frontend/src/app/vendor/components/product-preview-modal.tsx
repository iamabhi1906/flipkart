"use client";

import React from "react";
import Image from "next/image";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  Chip,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ProductData } from "@/services/product.service";
import styles from "../vendor.module.css";

interface ProductPreviewModalProps {
  open: boolean;
  onClose: () => void;
  product: ProductData | null;
}

export default function ProductPreviewModal({
  open,
  onClose,
  product,
}: ProductPreviewModalProps) {
  if (!product) return null;

  const primaryImg =
    product.images && product.images.length > 0
      ? product.images[0].imageUrl || product.images[0]
      : product.imageUrls && product.imageUrls.length > 0
      ? product.imageUrls[0]
      : "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400";

  const stock = Number(product.stockQuantity || 0);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      slotProps={{ paper: { className: styles.dialogPaper } }}
    >
      <DialogTitle className={styles.modalTitle}>
        <Box className={styles.modalHeaderBar}>
          <Typography className={styles.modalTitle}>
            Storefront Product Preview
          </Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent dividers>
        <Box className={styles.previewCard}>
          <Image
            src={primaryImg}
            alt={product.name}
            width={200}
            height={200}
            className={styles.previewImageMain}
            unoptimized
          />

          <Box className={styles.previewDetails}>
            <Chip
              label={product.category?.name || "Category"}
              size="small"
              className={styles.categoryChip}
            />
            <Typography className={styles.previewTitle}>{product.name}</Typography>
            <Typography className={styles.productSkuText}>
              SKU: {product.sku || "N/A"}
            </Typography>

            <Box className={styles.previewPriceRow}>
              <Typography className={styles.previewPrice}>
                ₹{Number(product.price).toLocaleString("en-IN")}
              </Typography>
              {product.compareAtPrice &&
                Number(product.compareAtPrice) > Number(product.price) && (
                  <Typography className={styles.previewCompare}>
                    ₹{Number(product.compareAtPrice).toLocaleString("en-IN")}
                  </Typography>
                )}
            </Box>

            <Typography className={styles.previewDesc}>
              {product.description || "No product description provided."}
            </Typography>

            <Box>
              <Chip
                label={
                  stock === 0 ? "Out of Stock" : `${stock} Units In Stock`
                }
                size="small"
                className={
                  stock === 0 ? styles.stockChipOut : styles.stockChipInStock
                }
              />
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
