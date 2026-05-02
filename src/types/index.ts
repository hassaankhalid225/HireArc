// ─── Job Types ────────────────────────────────────────────────────────────────
export interface Job {
  job_id: string;
  title: string;
  company: string;
  location: string;
  job_type?: string | null;
  salary_min?: number | null;
  salary_max?: number | null;
  is_remote?: boolean;
  posted_at?: string | null;
  source: string;
  description?: string | null;
  tags?: string[] | null;
  apply_link?: string | null;
  experience_level?: string | null;
  country?: string | null;
  is_active?: boolean;
}

// ─── User Types ───────────────────────────────────────────────────────────────
export interface User {
  id: string;
  name: string;
  email: string;
  avatarInitials: string;
  avatarUrl?: string;
  title?: string;
  location?: string;
  bio?: string;
  isPremium: boolean;
  role: "user" | "admin" | "company";
}

// ─── Notification Types ───────────────────────────────────────────────────────
export type NotificationType =
  | "job_match"
  | "application"
  | "profile_view"
  | "saved"
  | "system";

export interface Notification {
  id: number;
  type: NotificationType;
  title: string;
  description: string;
  time: string;
  unread: boolean;
}

// ─── Language Types ───────────────────────────────────────────────────────────
export type LanguageCode = "en" | "ur" | "ar" | "fr" | "de";

export interface Language {
  code: LanguageCode;
  label: string;
  nativeLabel: string;
  flag: string;
  dir: "ltr" | "rtl";
}

// ─── Application Types ────────────────────────────────────────────────────────
export type ApplicationStatus =
  | "applied"
  | "under_review"
  | "shortlisted"
  | "rejected"
  | "offer";

export interface AppliedJob {
  job_id: string;
  title: string;
  company: string;
  location?: string | null;
  job_type?: string | null;
  apply_link?: string | null;
  source: string;
  appliedAt: string; // ISO string
  status: ApplicationStatus;
}

// ─── API Response Types ───────────────────────────────────────────────────────
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  pagination?: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiError {
  message: string;
  code: string;
  status: number;
}
