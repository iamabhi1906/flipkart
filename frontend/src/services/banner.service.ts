import { api } from "@/utils/api";

export interface BannerData {
  id?: string;
  title?: string;
  subtitle?: string;
  imageUrl: string;
  linkUrl?: string;
  sortOrder?: number;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export const getPublicBanners = async (): Promise<BannerData[]> => {
  const response = await api.get("/banners");
  return response.data?.data || response.data || [];
};

export const getAdminBanners = async (): Promise<BannerData[]> => {
  const response = await api.get("/banners/admin");
  return response.data?.data || response.data || [];
};

export const createBanner = async (data: Partial<BannerData>): Promise<BannerData> => {
  const response = await api.post("/banners", data);
  return response.data?.data || response.data;
};

export const updateBanner = async (
  id: string,
  data: Partial<BannerData>,
): Promise<BannerData> => {
  const response = await api.patch(`/banners/${id}`, data);
  return response.data?.data || response.data;
};

export const deleteBanner = async (id: string): Promise<{ success: boolean }> => {
  const response = await api.delete(`/banners/${id}`);
  return response.data?.data || response.data;
};

export const uploadBannerImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  const response = await api.post("/banners/upload-image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data?.url || response.data?.data?.url;
};
