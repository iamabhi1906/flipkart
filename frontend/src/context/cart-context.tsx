"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
  CartSummaryData,
} from "@/services/cart.service";

interface CartContextType {
  cart: CartSummaryData | null;
  loading: boolean;
  drawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  refreshCart: () => Promise<void>;
  addItemToCart: (productId: string, variantId?: string, quantity?: number) => Promise<boolean>;
  updateItemQuantity: (itemId: string, quantity: number) => Promise<void>;
  removeItemFromCart: (itemId: string) => Promise<void>;
  clearUserCart: () => Promise<void>;
  errorMessage: string | null;
  clearError: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartSummaryData | null>(null);
  const [loading, setLoading] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const refreshCart = useCallback(async () => {
    try {
      const data = await getCart();
      setCart(data);
    } catch (err) {
    }
  }, []);

  useEffect(() => {
    refreshCart();
  }, [refreshCart]);

  const openDrawer = () => setDrawerOpen(true);
  const closeDrawer = () => setDrawerOpen(false);
  const clearError = () => setErrorMessage(null);

  const addItemToCart = async (productId: string, variantId?: string, quantity = 1) => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const updated = await addToCart({ productId, variantId, quantity });
      setCart(updated);
      setDrawerOpen(true);
      return true;
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || "Failed to add item to cart";
      setErrorMessage(Array.isArray(msg) ? msg[0] : msg);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateItemQuantity = async (itemId: string, quantity: number) => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const updated = await updateCartItem(itemId, quantity);
      setCart(updated);
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || "Failed to update item quantity";
      setErrorMessage(Array.isArray(msg) ? msg[0] : msg);
    } finally {
      setLoading(false);
    }
  };

  const removeItemFromCart = async (itemId: string) => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const updated = await removeCartItem(itemId);
      setCart(updated);
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || "Failed to remove item";
      setErrorMessage(Array.isArray(msg) ? msg[0] : msg);
    } finally {
      setLoading(false);
    }
  };

  const clearUserCart = async () => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const updated = await clearCart();
      setCart(updated);
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || "Failed to clear cart";
      setErrorMessage(Array.isArray(msg) ? msg[0] : msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        drawerOpen,
        openDrawer,
        closeDrawer,
        refreshCart,
        addItemToCart,
        updateItemQuantity,
        removeItemFromCart,
        clearUserCart,
        errorMessage,
        clearError,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
