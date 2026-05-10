"use client";
import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DotField from "@/components/ui/DotField";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith("/admin");
  
  const isProtectedRoute = pathname?.startsWith("/dashboard") || 
                           pathname?.startsWith("/applied-jobs") || 
                           pathname?.startsWith("/saved-jobs") || 
                           pathname?.startsWith("/profile") || 
                           pathname?.startsWith("/settings") ||
                           pathname?.startsWith("/notifications");

  if (isAdminPage) {
    return <main className="flex-grow w-full h-full">{children}</main>;
  }

  return (
    <>
      {/* Full-page interactive dot field — fixed so it covers the entire scroll */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        <DotField
          dotRadius={1.2}
          dotSpacing={26}
          bulgeStrength={50}
          glowRadius={0}
          sparkle={false}
          waveAmplitude={0}
          cursorRadius={280}
          cursorForce={0.18}
          bulgeOnly
          gradientFrom="#3a3a3a"
          gradientTo="#5a5a5a"
          glowColor="#000000"
          className="opacity-[0.18] dark:opacity-[0.35]"
        />
      </div>

      <Navbar />
      <main className="flex-grow relative z-10">{children}</main>
      {!isProtectedRoute && <Footer />}
    </>
  );
}
