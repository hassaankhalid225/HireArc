/**
 * Jobs Service
 * ─────────────
 * All job-related API calls.
 * Currently using static mock data; swap apiClient calls when backend is ready.
 */
import { apiClient } from "./api";
import { jobs as mockJobs } from "@/data/jobs";
import type { Job, ApiResponse } from "@/types";

export interface JobsFilter {
  query?: string;
  category?: string;
  type?: string;
  isRemote?: boolean;
  page?: number;
  pageSize?: number;
}

// ─── Mock ──────────────────────────────────────────────────────────────────────
const USE_MOCK = true; // ← flip to false once real API is ready

export const jobsService = {
  /** Fetch paginated job listings */
  async getJobs(filter: JobsFilter = {}): Promise<ApiResponse<Job[]>> {
    if (USE_MOCK) {
      let data = [...mockJobs];
      if (filter.query) {
        const q = filter.query.toLowerCase();
        data = data.filter(
          (j) =>
            j.title.toLowerCase().includes(q) ||
            j.company.toLowerCase().includes(q)
        );
      }
      if (filter.isRemote !== undefined) {
        data = data.filter((j) => j.isRemote === filter.isRemote);
      }
      return {
        success: true,
        data,
        pagination: { page: 1, pageSize: data.length, total: data.length, totalPages: 1 },
      };
    }
    return apiClient.get<ApiResponse<Job[]>>(
      `/jobs?${new URLSearchParams(filter as Record<string, string>)}`
    );
  },

  /** Fetch a single job by ID */
  async getJob(id: number): Promise<Job> {
    if (USE_MOCK) {
      const job = mockJobs.find((j) => j.id === id);
      if (!job) throw new Error(`Job ${id} not found`);
      return job;
    }
    return apiClient.get<Job>(`/jobs/${id}`);
  },
};
