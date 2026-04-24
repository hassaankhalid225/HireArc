"use client";
import { ReactNode } from "react";
import { LanguageProvider } from "./LanguageContext";
import { SavedJobsProvider } from "./SavedJobsContext";

/**
 * AppProviders — wraps all global context providers in one place.
 * Add new providers here; order matters (outer = higher priority).
 */
export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <SavedJobsProvider>
        {children}
      </SavedJobsProvider>
    </LanguageProvider>
  );
}
