// ─── Job Types ────────────────────────────────────────────────────────────────
export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  isRemote: boolean;
  posted: string;
  source: string;
  description?: string;
  tags?: string[];
  logoUrl?: string;
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

export interface JobApplication {
  jobId: number;
  appliedAt: string;
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
