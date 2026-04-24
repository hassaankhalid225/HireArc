"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import type { LanguageCode } from "@/types";
import { LANGUAGES, TRANSLATIONS } from "@/lib/i18n";

// ─── Types ────────────────────────────────────────────────────────────────────
interface LanguageContextValue {
  lang: LanguageCode;
  setLang: (lang: LanguageCode) => void;
  t: (key: string) => string;
  dir: "ltr" | "rtl";
  currentLanguage: (typeof LANGUAGES)[number];
}

// ─── Context ──────────────────────────────────────────────────────────────────
const LanguageContext = createContext<LanguageContextValue | null>(null);

// ─── Provider ────────────────────────────────────────────────────────────────
const STORAGE_KEY = "jobsphere_lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<LanguageCode>("en");

  // Rehydrate from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as LanguageCode | null;
    if (stored && LANGUAGES.find((l) => l.code === stored)) {
      setLangState(stored);
    }
  }, []);

  // Update <html> dir attribute + persist
  useEffect(() => {
    const language = LANGUAGES.find((l) => l.code === lang);
    if (language) {
      document.documentElement.dir = language.dir;
      document.documentElement.lang = lang;
    }
    localStorage.setItem(STORAGE_KEY, lang);
  }, [lang]);

  const setLang = useCallback((newLang: LanguageCode) => {
    setLangState(newLang);
  }, []);

  const t = useCallback(
    (key: string): string => {
      return TRANSLATIONS[lang]?.[key] ?? TRANSLATIONS["en"]?.[key] ?? key;
    },
    [lang]
  );

  const currentLanguage = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];

  return (
    <LanguageContext.Provider
      value={{ lang, setLang, t, dir: currentLanguage.dir, currentLanguage }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside <LanguageProvider>");
  return ctx;
}
