"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Drawer, Box, Typography, IconButton, Button, Snackbar, Alert } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { useCart } from "@/context/cart-context";
import CheckoutModal from "./checkout-modal";
import styles from "./cart.module.css";

export default function CartDrawer() {
  const { cart, drawerOpen, closeDrawer, updateItemQuantity, removeItemFromCart, clearUserCart, errorMessage, clearError } = useCart();
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const items = cart?.items || [];
  const totalAmount = cart?.totalAmount || 0;
  const totalItems = cart?.totalItems || 0;

  const handleProceedCheckout = () => {
    closeDrawer();
    setCheckoutOpen(true);
  };

  return (
    <>
      <Drawer anchor="right" open={drawerOpen} onClose={closeDrawer} slotProps={{ paper: { className: styles.drawerPaper } }}>
        <Box className={styles.headerBar}>
          <Box style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <ShoppingBagIcon />
            <Typography className={styles.headerTitle}>My Shopping Cart ({totalItems})</Typography>
          </Box>
          <IconButton onClick={closeDrawer} size="small" style={{ color: "#fff" }}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Box className={styles.contentArea}>
          {items.length === 0 ? (
            <Box className={styles.emptyBox}>
              <ShoppingBagIcon style={{ fontSize: 64, color: "#cbd5e1" }} />
              <Typography variant="h6" style={{ fontWeight: 700 }}>Your cart is empty</Typography>
              <Typography variant="body2" style={{ color: "#64748b" }}>Browse products and add items to your cart!</Typography>
              <Button variant="contained" onClick={closeDrawer} style={{ marginTop: 12 }}>CONTINUE SHOPPING</Button>
            </Box>
          ) : (
            items.map((item) => {
              const imgUrl = item.product?.images && item.product.images.length > 0 ? item.product.images[0].imageUrl || item.product.images[0] : "/placeholder.png";
              return (
                <Box key={item.id} className={styles.cartItemCard}>
                  <Box className={styles.itemImageFrame}>
                    <Image src={imgUrl} alt={item.product.name} width={60} height={60} className={styles.itemImage} unoptimized />
                  </Box>
                  <Box className={styles.itemInfo}>
                    <Typography className={styles.itemTitle}>{item.product.name}</Typography>
                    {item.variant && <Typography className={styles.variantTag}>Option: {item.variant.name}</Typography>}
                    <Typography className={styles.priceText}>₹{item.unitPrice.toLocaleString("en-IN")}</Typography>
                    <Box className={styles.qtyRow}>
                      <Button className={styles.qtyBtn} onClick={() => updateItemQuantity(item.id, item.quantity - 1)}>-</Button>
                      <Typography className={styles.qtyValue}>{item.quantity}</Typography>
                      <Button className={styles.qtyBtn} onClick={() => updateItemQuantity(item.id, item.quantity + 1)}>+</Button>
                    </Box>
                  </Box>
                  <IconButton size="small" color="error" style={{ position: "absolute", top: 8, right: 8 }} onClick={() => removeItemFromCart(item.id)}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              );
            })
          )}
        </Box>

        {items.length > 0 && (
          <Box className={styles.footerArea}>
            <Box className={styles.summaryRow}>
              <Typography variant="body2" style={{ color: "#64748b", fontWeight: 600 }}>Total Items:</Typography>
              <Typography variant="body2" style={{ fontWeight: 700 }}>{totalItems}</Typography>
            </Box>
            <Box className={styles.summaryRow}>
              <Typography variant="subtitle1" style={{ fontWeight: 700 }}>Total Amount:</Typography>
              <Typography variant="h6" style={{ fontWeight: 800, color: "#2874f0" }}>₹{totalAmount.toLocaleString("en-IN")}</Typography>
            </Box>
            <Button variant="contained" className={styles.checkoutBtn} onClick={handleProceedCheckout} fullWidth>PROCEED TO CHECKOUT</Button>
            <Button variant="text" color="error" size="small" onClick={clearUserCart} style={{ alignSelf: "center", marginTop: 4 }}>Clear Cart</Button>
          </Box>
        )}
      </Drawer>

      <CheckoutModal open={checkoutOpen} onClose={() => setCheckoutOpen(false)} />
      <Snackbar open={Boolean(errorMessage)} autoHideDuration={4000} onClose={clearError} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert onClose={clearError} severity="error" variant="filled">{errorMessage}</Alert>
      </Snackbar>
    </>
  );
}
