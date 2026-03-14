import apiClient from "./apiClient";

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
  const response = await apiClient.get<Sale[]>("/sales");
  return response.data;
};

export const createSale = async (sale: SaleRequest): Promise<Sale> => {
  const response = await apiClient.post<Sale>("/sales", sale);
  return response.data;
};