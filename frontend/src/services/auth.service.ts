import { loginFormData, signupFormData } from "@/features/users/user.type";
import { api } from "@/utils/api";

export const requestOtp = async (email: string) => {
  const response = await api.post(`/auth/request-otp`, { email });
  return response.data?.data || response.data;
};

export const verifyOtp = async (email: string, otp: string) => {
  const response = await api.post(`/auth/verify-otp`, { email, otp });
  return response.data?.data || response.data;
};

export const resendOtp = async (email: string) => {
  const response = await api.post(`/auth/resend-otp`, { email });
  return response.data?.data || response.data;
};

export const login = async (user: loginFormData) => {
  const response = await api.post(`/auth/login`, {
    email: user.email,
    password: user.password,
  });
  return response.data?.data || response.data;
};

export const register = async (user: signupFormData) => {
  const response = await api.post(`/auth/register`, {
    email: user.email,
    username: user.username,
    password: user.password,
  });
  return response.data?.data || response.data;
};

export const logout = async () => {
  const response = await api.post(`/auth/logout`);
  return response.data?.data || response.data;
};

export const getUser = async () => {
  const response = await api.get(`/auth/me`);
  return response.data?.data || response.data;
};

export const updateUserProfile = async (userId: string, data: any) => {
  const response = await api.patch(`/users/${userId}`, data);
  return response.data?.data || response.data;
};
