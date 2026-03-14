import apiClient from "./apiClient";

export type DashboardSummary = {
  totalCustomers: number;
  totalProducts: number;
  lowStockProducts: number;
  totalSales: number;
  totalRevenue: number;
};

export const getDashboardSummary = async (): Promise<DashboardSummary> => {
  const response = await apiClient.get<DashboardSummary>("/dashboard/summary");
  return response.data;
};