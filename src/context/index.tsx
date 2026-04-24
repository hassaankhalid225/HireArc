"use client";
import { ReactNode } from "react";
import { LanguageProvider } from "./LanguageContext";
import { SavedJobsProvider } from "./SavedJobsContext";
import { AuthProvider } from "./AuthContext";

/**
 * AppProviders — wraps all global context providers in one place.
 * Add new providers here; order matters (outer = higher priority).
 */
export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <LanguageProvider>
        <SavedJobsProvider>
          {children}
        </SavedJobsProvider>
      </LanguageProvider>
    </AuthProvider>
  );
}

export { useAuth } from "./AuthContext";
export { useSavedJobs } from "./SavedJobsContext";
export { useLanguage } from "./LanguageContext";
