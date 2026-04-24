import type { Language, LanguageCode } from "@/types";

export const LANGUAGES: Language[] = [
  { code: "en", label: "English",  nativeLabel: "English",  flag: "🇺🇸", dir: "ltr" },
  { code: "ur", label: "Urdu",     nativeLabel: "اردو",     flag: "🇵🇰", dir: "rtl" },
  { code: "ar", label: "Arabic",   nativeLabel: "العربية",  flag: "🇸🇦", dir: "rtl" },
  { code: "fr", label: "French",   nativeLabel: "Français", flag: "🇫🇷", dir: "ltr" },
  { code: "de", label: "German",   nativeLabel: "Deutsch",  flag: "🇩🇪", dir: "ltr" },
];

// Simple i18n strings — replace with a full i18n library (next-intl / react-i18next) when scaling
export const TRANSLATIONS: Record<LanguageCode, Record<string, string>> = {
  en: {
    "nav.findJobs":    "Find Jobs",
    "nav.remote":      "Remote",
    "nav.companies":   "Companies",
    "nav.categories":  "Categories",
    "home.hero.title": "Every Job. One Place.",
    "home.hero.sub":   "Aggregating 100,000+ jobs from top company boards.",
    "savedJobs.title": "Saved Jobs",
    "profile.title":   "My Profile",
    "settings.title":  "Settings",
  },
  ur: {
    "nav.findJobs":    "نوکریاں ڈھونڈیں",
    "nav.remote":      "ریموٹ",
    "nav.companies":   "کمپنیاں",
    "nav.categories":  "زمرے",
    "home.hero.title": "ہر نوکری۔ ایک جگہ۔",
    "home.hero.sub":   "بڑی کمپنیوں سے 100,000+ نوکریاں یکجا۔",
    "savedJobs.title": "محفوظ نوکریاں",
    "profile.title":   "میری پروفائل",
    "settings.title":  "ترتیبات",
  },
  ar: {
    "nav.findJobs":    "ابحث عن وظائف",
    "nav.remote":      "عن بُعد",
    "nav.companies":   "الشركات",
    "nav.categories":  "الفئات",
    "home.hero.title": "كل وظيفة. في مكان واحد.",
    "home.hero.sub":   "أكثر من 100,000 وظيفة من أبرز الشركات.",
    "savedJobs.title": "الوظائف المحفوظة",
    "profile.title":   "ملفي الشخصي",
    "settings.title":  "الإعدادات",
  },
  fr: {
    "nav.findJobs":    "Trouver des emplois",
    "nav.remote":      "Télétravail",
    "nav.companies":   "Entreprises",
    "nav.categories":  "Catégories",
    "home.hero.title": "Tous les emplois. Un seul endroit.",
    "home.hero.sub":   "Plus de 100 000 offres des meilleures entreprises.",
    "savedJobs.title": "Emplois sauvegardés",
    "profile.title":   "Mon profil",
    "settings.title":  "Paramètres",
  },
  de: {
    "nav.findJobs":    "Jobs finden",
    "nav.remote":      "Remote",
    "nav.companies":   "Unternehmen",
    "nav.categories":  "Kategorien",
    "home.hero.title": "Jeder Job. Ein Ort.",
    "home.hero.sub":   "Über 100.000 Jobs von Top-Unternehmen aggregiert.",
    "savedJobs.title": "Gespeicherte Jobs",
    "profile.title":   "Mein Profil",
    "settings.title":  "Einstellungen",
  },
};
