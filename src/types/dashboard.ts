import type { IProduct } from "./product";

export interface IDashboardStats {
  totalProducts: number;
  totalSales: number;
  totalRevenue: number;
  lowStockProducts: IProduct[];
}

export interface IDashboardResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: IDashboardStats;
}
