"use client";

import React from "react";
import { Box, Typography, Chip } from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import { ProductData, ProductVariantData } from "@/services/product.service";
import VariantSelector from "@/components/variants/variant-selector";
import PdpActions from "./pdp-actions";
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

  const variantsList = (product.variants || []).map((v, idx) => ({
    id: v.id || `variant-${idx}`,
    productId: v.productId || product.id || "",
    name: v.name,
    sku: v.sku,
    price: v.price ? Number(v.price) : Number(product.price || 0),
    stockQuantity: Number(v.stockQuantity || 0),
    attributes: (v.attributes as Record<string, string>) || {},
    images: (v as any).images || [],
    thumbnail: (v as any).thumbnail || "",
  }));

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

      {variantsList.length > 0 && (
        <VariantSelector
          variants={variantsList}
          basePrice={Number(product.price || 0)}
          onVariantChange={(res) => {
            if (res.selectedVariant) {
              const matched = product.variants?.find(
                (v) => (v.id || `variant-${product.variants?.indexOf(v)}`) === res.selectedVariant?.id
              );
              if (matched) onSelectVariant(matched);
            }
          }}
        />
      )}

      <Box className={styles.sellerBadge}>
        <VerifiedIcon style={{ color: "#2874f0", fontSize: 20 }} />
        <Typography variant="body2" style={{ fontWeight: 600 }}>
          Sold by: {vendorName}
        </Typography>
      </Box>

      <PdpActions
        product={product}
        selectedVariant={selectedVariant}
        effectiveStock={effectiveStock}
      />
    </Box>
  );
}
