import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

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
  const response = await api.get<Customer[]>("/customers");
  return response.data;
};

export const createCustomer = async (
  customer: CustomerRequest
): Promise<Customer> => {
  const response = await api.post<Customer>("/customers", customer);
  return response.data;
};