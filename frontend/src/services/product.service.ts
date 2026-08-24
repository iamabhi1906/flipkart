import { api } from "@/utils/api";

export interface ProductData {
  id?: string;
  name: string;
  categoryId: string;
  description?: string;
  sku?: string;
  price: number;
  compareAtPrice?: number;
  costPrice?: number;
  stockQuantity?: number;
  status?: "active" | "draft" | "archived";
  imageUrls?: string[];
  category?: any;
  images?: any[];
  vendor?: any;
}

export const getProducts = async (params?: any) => {
  const response = await api.get("/products", { params });
  return response.data?.data || response.data;
};

export const getProduct = async (id: string) => {
  const response = await api.get(`/products/${id}`);
  return response.data?.data || response.data;
};

export const getMyVendorProducts = async () => {
  const response = await api.get("/products/vendor/my-products");
  return response.data?.data || response.data;
};

export const createProduct = async (data: ProductData) => {
  const response = await api.post("/products", data);
  return response.data?.data || response.data;
};

export const updateProduct = async (id: string, data: Partial<ProductData>) => {
  const response = await api.patch(`/products/${id}`, data);
  return response.data?.data || response.data;
};

export const deleteProduct = async (id: string) => {
  const response = await api.delete(`/products/${id}`);
  return response.data?.data || response.data;
};

export const getCategories = async (params?: any) => {
  const response = await api.get("/categories", { params });
  return response.data?.data || response.data;
};
