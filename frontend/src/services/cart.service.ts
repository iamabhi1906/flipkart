import { api } from "@/utils/api";

export interface CartItemData {
  id: string;
  productId: string;
  variantId?: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  product: {
    id: string;
    name: string;
    slug?: string;
    price: number;
    images?: any[];
  };
  variant?: {
    id: string;
    name: string;
    price?: number;
    stockQuantity: number;
    attributes?: Record<string, any>;
  };
}

export interface CartSummaryData {
  id: string;
  userId: string;
  items: CartItemData[];
  totalAmount: number;
  totalItems: number;
}

export const getCart = async (): Promise<CartSummaryData> => {
  const response = await api.get("/cart");
  return response.data?.data || response.data;
};

export const addToCart = async (payload: {
  productId: string;
  variantId?: string;
  quantity?: number;
}): Promise<CartSummaryData> => {
  const response = await api.post("/cart/items", payload);
  return response.data?.data || response.data;
};

export const updateCartItem = async (
  itemId: string,
  quantity: number,
): Promise<CartSummaryData> => {
  const response = await api.patch(`/cart/items/${itemId}`, { quantity });
  return response.data?.data || response.data;
};

export const removeCartItem = async (
  itemId: string,
): Promise<CartSummaryData> => {
  const response = await api.delete(`/cart/items/${itemId}`);
  return response.data?.data || response.data;
};

export const clearCart = async (): Promise<CartSummaryData> => {
  const response = await api.delete("/cart");
  return response.data?.data || response.data;
};
