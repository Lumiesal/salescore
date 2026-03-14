import apiClient from "./apiClient";

export type Category = {
  id: number;
  name: string;
  description: string;
  active: boolean;
};

export const getCategories = async (): Promise<Category[]> => {
  const response = await apiClient.get<Category[]>("/categories");
  return response.data;
};