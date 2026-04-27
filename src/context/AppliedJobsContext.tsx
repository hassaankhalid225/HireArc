"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import type { AppliedJob, Job, ApplicationStatus } from "@/types";

// ─── Types ────────────────────────────────────────────────────────────────────
interface AppliedJobsContextValue {
  appliedJobs: AppliedJob[];
  /** Mark a job as applied — stores snapshot of the job */
  applyJob: (job: Job) => void;
  isApplied: (job_id: string) => boolean;
  getApplied: (job_id: string) => AppliedJob | undefined;
  clearAll: () => void;
  count: number;
}

// ─── Context ──────────────────────────────────────────────────────────────────
const AppliedJobsContext = createContext<AppliedJobsContextValue | null>(null);

const STORAGE_KEY = "HireArc_applied_jobs";

// ─── Provider ─────────────────────────────────────────────────────────────────
export function AppliedJobsProvider({ children }: { children: ReactNode }) {
  const [appliedJobs, setAppliedJobs] = useState<AppliedJob[]>([]);

  // Rehydrate from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setAppliedJobs(JSON.parse(stored));
    } catch {
      // ignore parse errors
    }
  }, []);

  // Persist to localStorage on every change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appliedJobs));
  }, [appliedJobs]);

  const isApplied = useCallback(
    (job_id: string) => appliedJobs.some((j) => j.job_id === job_id),
    [appliedJobs]
  );

  const getApplied = useCallback(
    (job_id: string) => appliedJobs.find((j) => j.job_id === job_id),
    [appliedJobs]
  );

  const applyJob = useCallback((job: Job) => {
    setAppliedJobs((prev) => {
      // Avoid duplicates
      if (prev.some((j) => j.job_id === job.job_id)) return prev;
      const entry: AppliedJob = {
        job_id: job.job_id,
        title: job.title,
        company: job.company,
        location: job.location ?? null,
        job_type: job.job_type ?? null,
        apply_link: job.apply_link ?? null,
        source: job.source,
        appliedAt: new Date().toISOString(),
        status: "applied",
      };
      return [entry, ...prev];
    });
  }, []);

  const clearAll = useCallback(() => setAppliedJobs([]), []);

  return (
    <AppliedJobsContext.Provider
      value={{
        appliedJobs,
        applyJob,
        isApplied,
        getApplied,
        clearAll,
        count: appliedJobs.length,
      }}
    >
      {children}
    </AppliedJobsContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useAppliedJobs(): AppliedJobsContextValue {
  const ctx = useContext(AppliedJobsContext);
  if (!ctx)
    throw new Error(
      "useAppliedJobs must be used inside <AppliedJobsProvider>"
    );
  return ctx;
}
