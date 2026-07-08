import { DashboardApi } from "../api/dashboard.api";

/**
 * Get Dashboard Statistics
 */
const getDashboardStats = async () => {
  const response = await DashboardApi.getDashboardStats();

  return response;
};

export const DashboardService = {
  getDashboardStats,
};
