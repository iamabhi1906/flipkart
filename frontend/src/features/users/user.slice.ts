import { createSlice } from "@reduxjs/toolkit";
import {
  loginThunk,
  logoutThunk,
  getUserThunk,
  verifyOtpThunk,
  updateUserProfileThunk,
} from "./user.action";
import { userState } from "./user.type";

const extractUser = (payload: any) => {
  if (!payload) return null;
  return payload.data || payload.user || payload;
};

export const userSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
  } as userState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = extractUser(action.payload);
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(verifyOtpThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtpThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = extractUser(action.payload);
      })
      .addCase(verifyOtpThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getUserThunk.fulfilled, (state, action) => {
        state.user = extractUser(action.payload);
      })
      .addCase(updateUserProfileThunk.fulfilled, (state, action) => {
        state.user = extractUser(action.payload);
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export default userSlice.reducer;
