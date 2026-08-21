import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAddresses,
  createAddress,
  updateAddress,
  setDefaultAddress,
  deleteAddress,
  AddressData,
} from "@/services/address.service";

export const getAddressesThunk = createAsyncThunk(
  "addresses/getAddresses",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getAddresses();
      return res;
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || error;
      return rejectWithValue(message);
    }
  },
);

export const createAddressThunk = createAsyncThunk(
  "addresses/createAddress",
  async (data: AddressData, { rejectWithValue }) => {
    try {
      const res = await createAddress(data);
      return res;
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || error;
      return rejectWithValue(message);
    }
  },
);

export const updateAddressThunk = createAsyncThunk(
  "addresses/updateAddress",
  async (
    { id, data }: { id: string; data: Partial<AddressData> },
    { rejectWithValue },
  ) => {
    try {
      const res = await updateAddress(id, data);
      return res;
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || error;
      return rejectWithValue(message);
    }
  },
);

export const setDefaultAddressThunk = createAsyncThunk(
  "addresses/setDefaultAddress",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await setDefaultAddress(id);
      return res;
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || error;
      return rejectWithValue(message);
    }
  },
);

export const deleteAddressThunk = createAsyncThunk(
  "addresses/deleteAddress",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await deleteAddress(id);
      return { id, res };
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || error;
      return rejectWithValue(message);
    }
  },
);
