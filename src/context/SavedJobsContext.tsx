"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import type { Job } from "@/types";

// ─── Types ────────────────────────────────────────────────────────────────────
interface SavedJobsContextValue {
  savedIds: Set<string>;
  savedJobs: Job[];
  toggleSave: (job: Job) => void;
  isSaved: (job_id: string) => boolean;
  clearAll: () => void;
  count: number;
}

// ─── Context ──────────────────────────────────────────────────────────────────
const SavedJobsContext = createContext<SavedJobsContextValue | null>(null);

const STORAGE_KEY = "HireArc_saved_jobs";

// ─── Provider ─────────────────────────────────────────────────────────────────
export function SavedJobsProvider({ children }: { children: ReactNode }) {
  const [savedJobs, setSavedJobs] = useState<Job[]>([]);

  // Rehydrate from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setSavedJobs(JSON.parse(stored));
    } catch {
      // ignore parse errors
    }
  }, []);

  // Persist on every change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedJobs));
  }, [savedJobs]);

  const savedIds = new Set(savedJobs.map((j) => j.job_id));

  const toggleSave = useCallback((job: Job) => {
    setSavedJobs((prev) => {
      const exists = prev.some((j) => j.job_id === job.job_id);
      return exists ? prev.filter((j) => j.job_id !== job.job_id) : [...prev, job];
    });
  }, []);

  const isSaved = useCallback(
    (job_id: string) => savedIds.has(job_id),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [savedJobs]
  );

  const clearAll = useCallback(() => setSavedJobs([]), []);

  return (
    <SavedJobsContext.Provider
      value={{
        savedIds,
        savedJobs,
        toggleSave,
        isSaved,
        clearAll,
        count: savedJobs.length,
      }}
    >
      {children}
    </SavedJobsContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useSavedJobs(): SavedJobsContextValue {
  const ctx = useContext(SavedJobsContext);
  if (!ctx)
    throw new Error("useSavedJobs must be used inside <SavedJobsProvider>");
  return ctx;
}
