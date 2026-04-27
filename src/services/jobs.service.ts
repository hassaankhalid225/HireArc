/**
 * Jobs Service
 * ─────────────
 * All job-related API calls.
 */
import { apiClient } from "./api";
import type { Job, ApiResponse } from "@/types";

export interface JobsFilter {
  query?: string;
  category?: string;
  type?: string;
  isRemote?: boolean;
  page?: number;
  pageSize?: number;
}

export const jobsService = {
  /** Fetch paginated job listings */
  async getJobs(filter: JobsFilter = {}): Promise<ApiResponse<Job[]>> {
    const params = new URLSearchParams();
    if (filter.query) params.append("query", filter.query);
    if (filter.type) params.append("type", filter.type);
    if (filter.isRemote !== undefined) params.append("is_remote", String(filter.isRemote));
    if (filter.page) params.append("page", String(filter.page));
    if (filter.pageSize) params.append("limit", String(filter.pageSize));

    const response = await apiClient.get<any>(`/search?${params.toString()}`);
    return {
      success: true,
      data: response.jobs,
      pagination: {
        page: response.page,
        pageSize: response.limit,
        total: response.total,
        totalPages: response.total_pages,
      },
    };
  },

  /** Fetch a single job by ID */
  async getJob(id: string): Promise<Job> {
    return apiClient.get<Job>(`/jobs/${id}`);
  },
};
