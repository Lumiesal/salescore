import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

export type SaleItemRequest = {
  productId: number;
  quantity: number;
};

export type SaleRequest = {
  customerId: number;
  items: SaleItemRequest[];
};

export type SaleDetail = {
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
};

export type Sale = {
  id: number;
  total: number;
  status: string;
  createdAt: string;
  customerId: number | null;
  customerName: string | null;
  items: SaleDetail[];
};

export const getSales = async (): Promise<Sale[]> => {
  const response = await api.get<Sale[]>("/sales");
  return response.data;
};

export const createSale = async (sale: SaleRequest): Promise<Sale> => {
  const response = await api.post<Sale>("/sales", sale);
  return response.data;
};