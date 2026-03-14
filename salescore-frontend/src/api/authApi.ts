import apiClient from "./apiClient";

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  id: number;
  fullName: string;
  email: string;
  role: string;
  token: string;
  message: string;
};

export const loginRequest = async (
  payload: LoginRequest
): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>("/auth/login", payload);
  return response.data;
};