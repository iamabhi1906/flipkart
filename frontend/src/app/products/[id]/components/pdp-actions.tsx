"use client";

import React from "react";
import { Box, Typography, Button } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import { ProductData, ProductVariantData } from "@/services/product.service";
import { useCart } from "@/context/cart-context";
import styles from "./pdp-actions.module.css";

interface PdpActionsProps {
  product: ProductData;
  selectedVariant: ProductVariantData | null;
  effectiveStock: number;
}

export default function PdpActions({
  product,
  selectedVariant,
  effectiveStock,
}: PdpActionsProps) {
  const { cart, addItemToCart, updateItemQuantity, loading } = useCart();

  const existingCartItem = cart?.items.find((item) => {
    if (item.productId !== product.id) return false;
    if (selectedVariant) return item.variantId === selectedVariant.id;
    return !item.variantId;
  });

  const handleAdd = () => {
    if (!product.id) return;
    addItemToCart(product.id, selectedVariant?.id, 1);
  };

  return (
    <Box className={styles.actionsRow}>
      {existingCartItem ? (
        <Box className={styles.qtyBox}>
          <Typography variant="body2" style={{ fontWeight: 700, color: "#e65100" }}>
            IN CART:
          </Typography>
          <Button
            variant="outlined"
            size="small"
            style={{ minWidth: 36, fontWeight: 800, fontSize: 16 }}
            onClick={() =>
              updateItemQuantity(existingCartItem.id, existingCartItem.quantity - 1)
            }
            disabled={loading}
          >
            -
          </Button>
          <Typography
            variant="subtitle1"
            style={{ fontWeight: 800, minWidth: 28, textAlign: "center" }}
          >
            {existingCartItem.quantity}
          </Typography>
          <Button
            variant="outlined"
            size="small"
            style={{ minWidth: 36, fontWeight: 800, fontSize: 16 }}
            onClick={() =>
              updateItemQuantity(existingCartItem.id, existingCartItem.quantity + 1)
            }
            disabled={loading}
          >
            +
          </Button>
        </Box>
      ) : (
        <Button
          variant="contained"
          className={styles.cartBtn}
          startIcon={<ShoppingCartIcon />}
          disabled={effectiveStock <= 0 || loading}
          onClick={handleAdd}
        >
          {loading ? "ADDING..." : "ADD TO CART"}
        </Button>
      )}

      <Button
        variant="contained"
        className={styles.buyBtn}
        startIcon={<FlashOnIcon />}
        disabled={effectiveStock <= 0 || loading}
        onClick={handleAdd}
      >
        BUY NOW
      </Button>
    </Box>
  );
}
