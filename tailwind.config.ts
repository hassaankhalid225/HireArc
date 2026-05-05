import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /* ElevenLabs colors */
        primary: "var(--primary)",
        "primary-active": "var(--primary-active)",
        ink: "var(--ink)",
        body: "var(--body)",
        muted: "var(--muted)",
        "muted-soft": "var(--muted-soft)",
        
        hairline: "var(--hairline)",
        "hairline-soft": "var(--hairline-soft)",
        "hairline-strong": "var(--hairline-strong)",
        
        canvas: "var(--canvas)",
        "canvas-soft": "var(--canvas-soft)",
        "canvas-deep": "var(--canvas-deep)",
        
        "surface-card": "var(--surface-card)",
        "surface-strong": "var(--surface-strong)",
        "surface-dark": "var(--surface-dark)",
        "surface-dark-elevated": "var(--surface-dark-elevated)",
        
        /* Gradients as colors to allow bg-gradient-mint, etc. */
        "gradient-mint": "var(--gradient-mint)",
        "gradient-peach": "var(--gradient-peach)",
        "gradient-lavender": "var(--gradient-lavender)",
        "gradient-sky": "var(--gradient-sky)",
        "gradient-rose": "var(--gradient-rose)",
        
        /* Semantic */
        success: "var(--semantic-success)",
        error: "var(--semantic-error)",

        /* Legacy mappings (so existing components don't break immediately) */
        "bg-base": "var(--canvas)",
        "bg-card": "var(--surface-card)",
        "bg-dark": "var(--surface-dark)",
        "text-primary": "var(--ink)",
        "text-secondary": "var(--body)",
        "text-muted": "var(--muted)",
        border: "var(--hairline)",
      },
      fontFamily: {
        headline: ["var(--font-headline)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["monospace"],
      },
      borderRadius: {
        none: "0px",
        xs: "4px",
        sm: "6px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        xxl: "24px",
        pill: "9999px",
      },
      boxShadow: {
        premium: "0 12px 32px rgba(0, 0, 0, 0.06)",
        "premium-sm": "0 4px 16px rgba(0, 0, 0, 0.04)",
      },
    },
  },
  plugins: [],
};
export default config;
