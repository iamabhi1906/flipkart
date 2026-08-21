import { createSlice } from "@reduxjs/toolkit";
import {
  getAddressesThunk,
  createAddressThunk,
  updateAddressThunk,
  setDefaultAddressThunk,
  deleteAddressThunk,
} from "./address.action";
import { AddressData } from "@/services/address.service";

interface AddressState {
  addresses: AddressData[];
  loading: boolean;
  saving: boolean;
  error: string | null;
}

const initialState: AddressState = {
  addresses: [],
  loading: false,
  saving: false,
  error: null,
};

export const addressSlice = createSlice({
  name: "addresses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch addresses
      .addCase(getAddressesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAddressesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(getAddressesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Create address
      .addCase(createAddressThunk.pending, (state) => {
        state.saving = true;
        state.error = null;
      })
      .addCase(createAddressThunk.fulfilled, (state, action) => {
        state.saving = false;
        const newAddress = action.payload;
        if (newAddress.isDefault) {
          state.addresses = state.addresses.map((addr) => ({
            ...addr,
            isDefault: false,
          }));
        }
        state.addresses.unshift(newAddress);
      })
      .addCase(createAddressThunk.rejected, (state, action) => {
        state.saving = false;
        state.error = action.payload as string;
      })

      // Update address
      .addCase(updateAddressThunk.pending, (state) => {
        state.saving = true;
        state.error = null;
      })
      .addCase(updateAddressThunk.fulfilled, (state, action) => {
        state.saving = false;
        const updated = action.payload;
        if (updated.isDefault) {
          state.addresses = state.addresses.map((addr) => ({
            ...addr,
            isDefault: addr.id === updated.id,
          }));
        } else {
          const index = state.addresses.findIndex((a) => a.id === updated.id);
          if (index !== -1) {
            state.addresses[index] = updated;
          }
        }
      })
      .addCase(updateAddressThunk.rejected, (state, action) => {
        state.saving = false;
        state.error = action.payload as string;
      })

      // Set default address
      .addCase(setDefaultAddressThunk.fulfilled, (state, action) => {
        const updated = action.payload;
        state.addresses = state.addresses.map((addr) => ({
          ...addr,
          isDefault: addr.id === updated.id,
        }));
      })

      // Delete address
      .addCase(deleteAddressThunk.fulfilled, (state, action) => {
        const { id } = action.payload;
        state.addresses = state.addresses.filter((a) => a.id !== id);
      });
  },
});

export default addressSlice.reducer;
