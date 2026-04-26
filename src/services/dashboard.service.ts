import { apiClient } from "./api";

export interface DashboardStats {
  total_applications: number;
  interviews: number;
  saved_jobs: number;
  profile_views: number;
  recent_applications: any[];
}

export const dashboardService = {
  async getStats(): Promise<DashboardStats> {
    return apiClient.get<DashboardStats>("/user/dashboard-stats");
  },
};
