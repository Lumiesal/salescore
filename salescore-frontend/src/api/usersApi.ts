import apiClient from "./apiClient";

export type User = {
  id: number;
  fullName: string;
  email: string;
  role: string;
  active: boolean;
};

export type UserRequest = {
  fullName: string;
  email: string;
  password: string;
  role: string;
  active: boolean;
};

export const getUsers = async (): Promise<User[]> => {
  const response = await apiClient.get<User[]>("/users");
  return response.data;
};

export const createUser = async (user: UserRequest): Promise<User> => {
  const response = await apiClient.post<User>("/users", user);
  return response.data;
};