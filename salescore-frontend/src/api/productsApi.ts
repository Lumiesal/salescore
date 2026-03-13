import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

export type Product = {
  id: number;
  name: string;
  sku: string;
  description: string;
  price: number;
  stock: number;
  minStock: number;
  active: boolean;
  category: {
    id: number;
    name: string;
    description: string;
    active: boolean;
  };
};

export type ProductRequest = {
  name: string;
  sku: string;
  description: string;
  price: number;
  stock: number;
  minStock: number;
  active: boolean;
  categoryId: number;
};

export const getProducts = async (): Promise<Product[]> => {
  const response = await api.get<Product[]>("/products");
  return response.data;
};

export const createProduct = async (
  product: ProductRequest
): Promise<Product> => {
  const response = await api.post<Product>("/products", product);
  return response.data;
};