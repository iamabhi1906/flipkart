import { api } from "@/utils/api";

export interface ProductVariantData {
  id?: string;
  productId?: string;
  name: string;
  sku?: string;
  price?: number;
  stockQuantity: number;
  attributes?: Record<string, any>;
  images?: string[];
  thumbnail?: string;
}

export interface ProductData {
  id?: string;
  name: string;
  slug?: string;
  categoryId: string;
  description?: string;
  sku?: string;
  price: number;
  compareAtPrice?: number;
  costPrice?: number;
  stockQuantity?: number;
  effectiveStockQuantity?: number;
  status?: "active" | "draft" | "archived";
  imageUrls?: string[];
  category?: any;
  images?: any[];
  variants?: ProductVariantData[];
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

export const createProductVariant = async (
  productId: string,
  data: ProductVariantData,
) => {
  const response = await api.post(`/products/${productId}/variants`, data);
  return response.data?.data || response.data;
};

export const updateProductVariant = async (
  productId: string,
  variantId: string,
  data: Partial<ProductVariantData>,
) => {
  const response = await api.patch(`/products/${productId}/variants/${variantId}`, data);
  return response.data?.data || response.data;
};

export const deleteProductVariant = async (
  productId: string,
  variantId: string,
) => {
  const response = await api.delete(`/products/${productId}/variants/${variantId}`);
  return response.data?.data || response.data;
};

export const getCategories = async (params?: any) => {
  const response = await api.get("/categories", { params });
  return response.data?.data || response.data;
};

export const uploadProductImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  const response = await api.post("/products/upload-image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  const resData = response.data;
  return (
    resData?.data?.url ||
    resData?.url ||
    (typeof resData === "string" ? resData : "")
  );
};
