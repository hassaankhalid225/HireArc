"use client";
import { ReactNode } from "react";
import { LanguageProvider } from "./LanguageContext";
import { SavedJobsProvider } from "./SavedJobsContext";
import { AuthProvider } from "./AuthContext";
import { AppliedJobsProvider } from "./AppliedJobsContext";
import { NotificationProvider } from "./NotificationContext";

/**
 * AppProviders — wraps all global context providers in one place.
 * Add new providers here; order matters (outer = higher priority).
 */
export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <NotificationProvider>
        <LanguageProvider>
          <SavedJobsProvider>
            <AppliedJobsProvider>
              {children}
            </AppliedJobsProvider>
          </SavedJobsProvider>
        </LanguageProvider>
      </NotificationProvider>
    </AuthProvider>
  );
}

export { useAuth } from "./AuthContext";
export { useSavedJobs } from "./SavedJobsContext";
export { useLanguage } from "./LanguageContext";
export { useAppliedJobs } from "./AppliedJobsContext";
export { useNotifications } from "./NotificationContext";
