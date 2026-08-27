import { api } from "@/utils/api";

export interface CheckoutPayload {
  addressId?: string;
  shippingAddress?: {
    fullName: string;
    mobileNumber: string;
    addressLine1: string;
    addressLine2?: string;
    landmark?: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };
  couponCode?: string;
  paymentMethod?: "cod" | "card" | "upi" | "net_banking" | "wallet";
}

export const processCheckout = async (payload: CheckoutPayload) => {
  const response = await api.post("/orders/checkout", payload);
  return response.data?.data || response.data;
};

export const getMyOrders = async () => {
  const response = await api.get("/orders/my-orders");
  return response.data?.data || response.data;
};

export const getOrderDetails = async (id: string) => {
  const response = await api.get(`/orders/${id}`);
  return response.data?.data || response.data;
};

export const cancelCustomerOrder = async (id: string) => {
  const response = await api.post(`/orders/${id}/cancel`);
  return response.data?.data || response.data;
};

export const getVendorOrderItems = async () => {
  const response = await api.get("/orders/vendor/items");
  return response.data?.data || response.data;
};

export const updateVendorOrderItemStatus = async (
  itemId: string,
  status: string,
  otp?: string,
) => {
  const response = await api.patch(`/orders/vendor/items/${itemId}/status`, {
    status,
    otp,
  });
  return response.data?.data || response.data;
};

export const resendVendorDeliveryOtp = async (itemId: string) => {
  const response = await api.post(`/orders/vendor/items/${itemId}/resend-otp`);
  return response.data?.data || response.data;
};

export const getAllAdminOrders = async () => {
  const response = await api.get("/orders/admin/all");
  return response.data?.data || response.data;
};

export const updateAdminOrderStatus = async (
  orderId: string,
  status: string,
) => {
  const response = await api.patch(`/orders/admin/${orderId}/status`, {
    status,
  });
  return response.data?.data || response.data;
};
