import { useQuery } from "@tanstack/react-query";

import { DashboardService } from "../services/dashboard.service";

/**
 * Dashboard Statistics
 */
export const useDashboard = () => {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: DashboardService.getDashboardStats,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  });
};
