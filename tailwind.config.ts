import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1A56DB",
        "primary-dark": "#1240A8",
        "primary-light": "#EEF2FF",
        accent: "#0EA5E9",
        success: "#10B981",
        warning: "#F59E0B",
        "bg-base": "#F8FAFC",
        "bg-card": "#FFFFFF",
        "bg-dark": "#0F172A",
        "text-primary": "#0F172A",
        "text-secondary": "#475569",
        "text-muted": "#94A3B8",
        border: "#E2E8F0",
      },
      fontFamily: {
        headline: ["var(--font-headline)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      borderRadius: {
        sm: "6px",
        md: "10px",
        lg: "16px",
        xl: "24px",
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)",
        hover: "0 4px 12px rgba(26,86,219,0.12), 0 8px 32px rgba(0,0,0,0.08)",
        modal: "0 24px 64px rgba(0,0,0,0.18)",
      },
    },
  },
  plugins: [],
};
export default config;
