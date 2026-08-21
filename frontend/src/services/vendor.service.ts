import { api } from "@/utils/api";

export interface VendorData {
  businessName: string;
  businessDescription?: string;
  businessEmail?: string;
  businessPhone?: string;
  taxNumber?: string;
  registrationNumber?: string;
  businessLogoUrl?: string;
}

export const becomeVendor = async (data: VendorData) => {
  const response = await api.post("/vendors/become-vendor", data);
  return response.data?.data || response.data;
};

export const getMyVendorProfile = async () => {
  const response = await api.get("/vendors/me");
  return response.data?.data || response.data;
};
