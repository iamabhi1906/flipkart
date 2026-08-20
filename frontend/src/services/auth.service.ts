import axios from 'axios';
import { loginFormData, signupFormData } from '@/features/users/user.type';

axios.defaults.withCredentials = true;

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5050';

export const requestOtp = async (email: string) => {
  const response = await axios.post(`${API_BASE_URL}/auth/request-otp`, { email });
  return response.data;
};

export const verifyOtp = async (email: string, otp: string) => {
  const response = await axios.post(`${API_BASE_URL}/auth/verify-otp`, { email, otp });
  return response.data;
};

export const resendOtp = async (email: string) => {
  const response = await axios.post(`${API_BASE_URL}/auth/resend-otp`, { email });
  return response.data;
};

export const login = async (user: loginFormData) => {
  const response = await axios.post(`${API_BASE_URL}/auth/login`, {
    email: user.email,
    password: user.password,
  });
  return response.data;
};

export const register = async (user: signupFormData) => {
  const response = await axios.post(`${API_BASE_URL}/auth/register`, {
    email: user.email,
    username: user.username,
    password: user.password,
  });
  return response.data;
};

export const logout = async () => {
  const response = await axios.post(`${API_BASE_URL}/auth/logout`);
  return response.data;
};

export const getUser = async () => {
  const response = await axios.get(`${API_BASE_URL}/auth/user`);
  return response.data;
};

export const updateUserProfile = async (userId: string, data: any) => {
  const response = await axios.patch(`${API_BASE_URL}/users/${userId}`, data);
  return response.data;
};
