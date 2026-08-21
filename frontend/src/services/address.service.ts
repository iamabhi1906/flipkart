import { api } from "@/utils/api";

export interface AddressData {
  id?: string;
  fullName: string;
  mobileNumber: string;
  postalCode: string;
  addressLine1: string;
  addressLine2?: string;
  landmark?: string;
  city: string;
  state: string;
  country?: string;
  addressType?: "home" | "work" | "other";
  isDefault?: boolean;
}

export const getAddresses = async () => {
  const response = await api.get("/addresses");
  return response.data?.data || response.data;
};

export const createAddress = async (data: AddressData) => {
  const response = await api.post("/addresses", data);
  return response.data?.data || response.data;
};

export const updateAddress = async (id: string, data: Partial<AddressData>) => {
  const response = await api.patch(`/addresses/${id}`, data);
  return response.data?.data || response.data;
};

export const setDefaultAddress = async (id: string) => {
  const response = await api.patch(`/addresses/${id}/set-default`);
  return response.data?.data || response.data;
};

export const deleteAddress = async (id: string) => {
  const response = await api.delete(`/addresses/${id}`);
  return response.data?.data || response.data;
};
