import apiClient from "./apiClient";

export type Customer = {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  active: boolean;
};

export type CustomerRequest = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  active: boolean;
};

export const getCustomers = async (): Promise<Customer[]> => {
  const response = await apiClient.get<Customer[]>("/customers");
  return response.data;
};

export const createCustomer = async (
  customer: CustomerRequest
): Promise<Customer> => {
  const response = await apiClient.post<Customer>("/customers", customer);
  return response.data;
};