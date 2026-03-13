import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

export type Category = {
  id: number;
  name: string;
  description: string;
  active: boolean;
};

export const getCategories = async (): Promise<Category[]> => {
  const response = await api.get<Category[]>("/categories");
  return response.data;
};