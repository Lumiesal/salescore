import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

export type DashboardSummary = {
  totalCustomers: number;
  totalProducts: number;
  lowStockProducts: number;
  totalSales: number;
  totalRevenue: number;
};

export const getDashboardSummary = async (): Promise<DashboardSummary> => {
  const response = await api.get<DashboardSummary>("/dashboard/summary");
  return response.data;
};