import { api } from "@/utils/api";

export interface VendorData {
  id?: string;
  businessName: string;
  businessDescription?: string;
  businessEmail?: string;
  businessPhone?: string;
  taxNumber?: string;
  registrationNumber?: string;
  businessLogoUrl?: string;
  isVerified?: boolean;
  user?: {
    id: string;
    email: string;
    role: string;
    status: "active" | "disabled" | "suspended";
    createdAt?: string;
  };
}

export const becomeVendor = async (data: VendorData) => {
  const response = await api.post("/vendors/become-vendor", data);
  return response.data?.data || response.data;
};

export const getMyVendorProfile = async () => {
  const response = await api.get("/vendors/me");
  return response.data?.data || response.data;
};

export const updateMyVendorProfile = async (data: Partial<VendorData>) => {
  const response = await api.patch("/vendors/me", data);
  return response.data?.data || response.data;
};

export const getAllVendors = async () => {
  const response = await api.get("/vendors");
  return response.data?.data || response.data;
};

export const getVendorById = async (id: string) => {
  const response = await api.get(`/vendors/${id}`);
  return response.data?.data || response.data;
};

export const updateVendorStatus = async (
  id: string,
  status: "active" | "disabled" | "suspended",
) => {
  const response = await api.patch(`/vendors/${id}/status`, { status });
  return response.data?.data || response.data;
};
