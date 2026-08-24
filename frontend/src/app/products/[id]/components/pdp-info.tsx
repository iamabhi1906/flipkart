"use client";

import React from "react";
import { Box, Typography, Button, Chip } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import VerifiedIcon from "@mui/icons-material/Verified";
import { ProductData, ProductVariantData } from "@/services/product.service";
import { useCart } from "@/context/cart-context";
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
  const { cart, addItemToCart, updateItemQuantity, loading: cartLoading } = useCart();

  const comparePrice = Number(product.compareAtPrice || 0);
  const discountPercent =
    comparePrice > displayPrice
      ? Math.round(((comparePrice - displayPrice) / comparePrice) * 100)
      : 0;

  const vendorName =
    product.vendor?.vendorProfile?.businessName ||
    product.vendor?.email ||
    "Flipkart Verified Seller";

  const existingCartItem = cart?.items.find((item) => {
    if (item.productId !== product.id) return false;
    if (selectedVariant) {
      return item.variantId === selectedVariant.id;
    }
    return !item.variantId;
  });

  const handleAdd = () => {
    if (!product.id) return;
    addItemToCart(product.id, selectedVariant?.id, 1);
  };

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
        <Typography variant="body2" style={{ fontWeight: 600 }}>
          Sold by: {vendorName}
        </Typography>
      </Box>

      <Box className={styles.actionsRow}>
        {existingCartItem ? (
          <Box style={{ display: "flex", alignItems: "center", gap: 12, backgroundColor: "#fff3e0", padding: "6px 16px", borderRadius: 8, border: "1px solid #ffb74d" }}>
            <Typography variant="body2" style={{ fontWeight: 700, color: "#e65100" }}>
              IN CART:
            </Typography>
            <Button
              variant="outlined"
              size="small"
              style={{ minWidth: 36, fontWeight: 800, fontSize: 16 }}
              onClick={() => updateItemQuantity(existingCartItem.id, existingCartItem.quantity - 1)}
              disabled={cartLoading}
            >
              -
            </Button>
            <Typography variant="subtitle1" style={{ fontWeight: 800, minWidth: 28, textAlign: "center" }}>
              {existingCartItem.quantity}
            </Typography>
            <Button
              variant="outlined"
              size="small"
              style={{ minWidth: 36, fontWeight: 800, fontSize: 16 }}
              onClick={() => updateItemQuantity(existingCartItem.id, existingCartItem.quantity + 1)}
              disabled={cartLoading}
            >
              +
            </Button>
          </Box>
        ) : (
          <Button
            variant="contained"
            className={styles.cartBtn}
            startIcon={<ShoppingCartIcon />}
            disabled={effectiveStock <= 0 || cartLoading}
            onClick={handleAdd}
          >
            {cartLoading ? "ADDING..." : "ADD TO CART"}
          </Button>
        )}

        <Button
          variant="contained"
          className={styles.buyBtn}
          startIcon={<FlashOnIcon />}
          disabled={effectiveStock <= 0 || cartLoading}
          onClick={handleAdd}
        >
          BUY NOW
        </Button>
      </Box>
    </Box>
  );
}
