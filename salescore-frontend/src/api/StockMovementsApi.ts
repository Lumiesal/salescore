import apiClient from "./apiClient";

export type StockMovement = {
  id: number;
  type: string;
  quantity: number;
  note: string;
  createdAt: string;
  productId: number;
  productName: string;
};

export type StockMovementRequest = {
  type: string;
  quantity: number;
  note: string;
  productId: number;
};

export const getStockMovements = async (): Promise<StockMovement[]> => {
  const response = await apiClient.get<StockMovement[]>("/stock-movements");
  return response.data;
};

export const createStockMovement = async (
  movement: StockMovementRequest
): Promise<StockMovement> => {
  const response = await apiClient.post<StockMovement>(
    "/stock-movements",
    movement
  );
  return response.data;
};