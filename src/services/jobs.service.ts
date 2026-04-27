/**
 * Jobs Service
 * ─────────────
 * All job-related API calls.
 * Handles serialization/normalization from all 3 backend sources
 * (Greenhouse, Lever, Arbeitnow) into a consistent Job shape.
 * Null / missing fields are set to null — never undefined — so
 * consumers can safely check `if (job.salary_min)` etc.
 */
import { apiClient } from "./api";
import type { Job, ApiResponse } from "@/types";

export interface JobsFilter {
  query?: string;
  location?: string;
  type?: string;
  experience?: string;
  isRemote?: boolean;
  page?: number;
  pageSize?: number;
}

/**
 * Normalize a raw API record (any source) into a typed Job.
 * All optional fields default to null when absent.
 */
function normalizeJob(raw: Record<string, unknown>): Job {
  return {
    job_id: String(raw.job_id ?? raw._id ?? ""),
    title: String(raw.title ?? "Untitled Position"),
    company: String(raw.company ?? "Unknown Company"),
    location: String(raw.location ?? ""),
    source: String(raw.source ?? ""),
    // Optional — null when not provided
    job_type: (raw.job_type as string | null) ?? null,
    salary_min:
      raw.salary_min != null && !Number.isNaN(Number(raw.salary_min))
        ? Number(raw.salary_min)
        : null,
    salary_max:
      raw.salary_max != null && !Number.isNaN(Number(raw.salary_max))
        ? Number(raw.salary_max)
        : null,
    is_remote: Boolean(raw.is_remote ?? false),
    posted_at: raw.posted_at != null ? String(raw.posted_at) : null,
    description: raw.description != null ? String(raw.description) : null,
    tags: Array.isArray(raw.tags) && raw.tags.length > 0
      ? (raw.tags as string[])
      : null,
    apply_link: raw.apply_link != null ? String(raw.apply_link) : null,
    experience_level: raw.experience_level != null
      ? String(raw.experience_level)
      : null,
    country: raw.country != null ? String(raw.country) : null,
  };
}

export const jobsService = {
  /** Fetch paginated job listings, normalized from the backend */
  async getJobs(filter: JobsFilter = {}): Promise<ApiResponse<Job[]>> {
    const params = new URLSearchParams();
    if (filter.query)    params.append("q", filter.query);
    if (filter.location) params.append("location", filter.location);
    if (filter.type)     params.append("job_type", filter.type);
    if (filter.experience) params.append("experience", filter.experience);
    if (filter.isRemote !== undefined)
      params.append("remote", String(filter.isRemote));
    if (filter.page)     params.append("page", String(filter.page));
    if (filter.pageSize) params.append("limit", String(filter.pageSize));

    const response = await apiClient.get<Record<string, unknown>>(
      `/search?${params.toString()}`
    );

    const rawJobs = Array.isArray(response.jobs) ? response.jobs : [];

    return {
      success: true,
      data: (rawJobs as Record<string, unknown>[]).map(normalizeJob),
      pagination: {
        page: Number(response.page ?? 1),
        pageSize: Number(response.limit ?? 20),
        total: Number(response.total ?? 0),
        totalPages: Number(response.total_pages ?? 1),
      },
    };
  },

  /** Fetch a single job by ID, normalized */
  async getJob(id: string): Promise<Job> {
    const raw = await apiClient.get<Record<string, unknown>>(
      `/jobs/${id}`
    );
    return normalizeJob(raw);
  },
};
