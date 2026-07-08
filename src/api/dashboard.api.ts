import axiosInstance from "./axios";

export const DashboardApi = {
  /**
   * Get Dashboard Statistics
   * GET /dashboard
   */
  getDashboardStats: async () => {
    const response = await axiosInstance.get("/dashboard");

    return response.data;
  },
};
