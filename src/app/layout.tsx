import type { Metadata } from "next";
import { Sora, DM_Sans, DM_Mono, Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AppProviders } from "@/context";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });
const sora = Sora({ subsets: ["latin"], variable: "--font-headline" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-body" });
const dmMono = DM_Mono({ weight: "400", subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "JobSphere — Every Job. One Place.",
  description:
    "Aggregating 100,000+ jobs from top company job boards. Find your next career move with zero friction.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        sora.variable,
        dmSans.variable,
        dmMono.variable,
        geist.variable,
        "font-sans"
      )}
    >
      <body
        suppressHydrationWarning
        className="flex flex-col min-h-screen font-body transition-colors duration-300"
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AppProviders>
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </AppProviders>
        </ThemeProvider>
      </body>
    </html>
  );
}
