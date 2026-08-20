import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  login,
  register,
  logout,
  getUser,
  requestOtp,
  verifyOtp,
  resendOtp,
  updateUserProfile,
} from '@/services/auth.service';
import { loginFormData, signupFormData } from './user.type';

export const requestOtpThunk = createAsyncThunk(
  'auth/requestOtp',
  async (email: string, { rejectWithValue }) => {
    try {
      const res = await requestOtp(email);
      return res;
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || error;
      return rejectWithValue(message);
    }
  },
);

export const verifyOtpThunk = createAsyncThunk(
  'auth/verifyOtp',
  async (
    { email, otp }: { email: string; otp: string },
    { rejectWithValue },
  ) => {
    try {
      const res = await verifyOtp(email, otp);
      return res;
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || error;
      return rejectWithValue(message);
    }
  },
);

export const resendOtpThunk = createAsyncThunk(
  'auth/resendOtp',
  async (email: string, { rejectWithValue }) => {
    try {
      const res = await resendOtp(email);
      return res;
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || error;
      return rejectWithValue(message);
    }
  },
);

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (user: loginFormData, { rejectWithValue }) => {
    try {
      const res = await login(user);
      if (res?.error) {
        return rejectWithValue(res.error);
      }
      return res;
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || error;
      return rejectWithValue(message);
    }
  },
);

export const registerThunk = createAsyncThunk(
  'auth/register',
  async (user: signupFormData, { rejectWithValue }) => {
    try {
      const res = await register(user);
      if (res?.error) {
        return rejectWithValue(res.error);
      }
      return res;
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || error;
      return rejectWithValue(message);
    }
  },
);

export const logoutThunk = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      const res = await logout();
      if (res?.error) {
        return rejectWithValue(res.error);
      }
      return res;
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || error;
      return rejectWithValue(message);
    }
  },
);

export const getUserThunk = createAsyncThunk(
  'auth/getUser',
  async (_, { rejectWithValue }) => {
    try {
      const res = await getUser();
      return res;
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || error;
      return rejectWithValue(message);
    }
  },
);

export const updateUserProfileThunk = createAsyncThunk(
  'auth/updateUserProfile',
  async (
    { userId, data }: { userId: string; data: any },
    { rejectWithValue },
  ) => {
    try {
      const res = await updateUserProfile(userId, data);
      return res;
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || error;
      return rejectWithValue(message);
    }
  },
);