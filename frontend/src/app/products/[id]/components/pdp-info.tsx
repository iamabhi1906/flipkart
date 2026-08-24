"use client";

import React from "react";
import { Box, Typography, Button, Chip } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import VerifiedIcon from "@mui/icons-material/Verified";
import { ProductData, ProductVariantData } from "@/services/product.service";
import styles from "../pdp.module.css";

interface PdpInfoProps {
  product: ProductData;
  displayPrice: number;
  effectiveStock: number;
  selectedVariant: ProductVariantData | null;
  onSelectVariant: (v: ProductVariantData) => void;
}

export default function PdpInfo({
  product,
  displayPrice,
  effectiveStock,
  selectedVariant,
  onSelectVariant,
}: PdpInfoProps) {
  const comparePrice = Number(product.compareAtPrice || 0);
  const discountPercent =
    comparePrice > displayPrice
      ? Math.round(((comparePrice - displayPrice) / comparePrice) * 100)
      : 0;

  const vendorName =
    product.vendor?.vendorProfile?.businessName ||
    product.vendor?.email ||
    "Flipkart Verified Seller";

  return (
    <Box className={styles.infoSection}>
      <Typography className={styles.categoryTag}>
        {product.category?.name || "General Catalog"}
      </Typography>

      <Typography className={styles.productTitle}>{product.name}</Typography>

      <Box className={styles.priceRow}>
        <Typography className={styles.priceText}>
          ₹{displayPrice.toLocaleString("en-IN")}
        </Typography>

        {comparePrice > displayPrice && (
          <>
            <Typography className={styles.comparePriceText}>
              ₹{comparePrice.toLocaleString("en-IN")}
            </Typography>
            <Chip
              label={`${discountPercent}% OFF`}
              className={styles.discountBadge}
            />
          </>
        )}
      </Box>

      {product.variants && product.variants.length > 0 && (
        <Box className={styles.variantsSection}>
          <Typography className={styles.variantLabel}>
            Available Variants:
          </Typography>
          <Box className={styles.variantChipsRow}>
            {product.variants.map((variant) => {
              const isSelected = selectedVariant?.id === variant.id;
              return (
                <Chip
                  key={variant.id}
                  label={`${variant.name} (${variant.price ? `₹${variant.price}` : `₹${product.price}`})`}
                  variant={isSelected ? "filled" : "outlined"}
                  className={`${styles.variantChip} ${
                    isSelected ? styles.activeVariantChip : ""
                  }`}
                  onClick={() => onSelectVariant(variant)}
                />
              );
            })}
          </Box>
        </Box>
      )}

      <Box style={{ display: "flex", gap: 12, alignItems: "center" }}>
        {effectiveStock > 0 ? (
          <Chip
            label={`In Stock (${effectiveStock} units available)`}
            color="success"
            size="small"
          />
        ) : (
          <Chip label="Currently Out of Stock" color="error" size="small" />
        )}
        {product.sku && (
          <Typography variant="caption" style={{ color: "#64748b" }}>
            SKU: {selectedVariant?.sku || product.sku}
          </Typography>
        )}
      </Box>

      <Box className={styles.sellerBadge}>
        <VerifiedIcon style={{ color: "#2874f0", fontSize: 20 }} />
        <Typography variant="body2" style={{ fontWeight: 600 }} color="primary">
          Sold by: {vendorName}
        </Typography>
      </Box>

      <Box className={styles.actionsRow}>
        <Button
          variant="contained"
          className={styles.cartBtn}
          startIcon={<ShoppingCartIcon />}
          disabled={effectiveStock <= 0}
        >
          ADD TO CART
        </Button>
        <Button
          variant="contained"
          className={styles.buyBtn}
          startIcon={<FlashOnIcon />}
          disabled={effectiveStock <= 0}
        >
          BUY NOW
        </Button>
      </Box>
    </Box>
  );
}
