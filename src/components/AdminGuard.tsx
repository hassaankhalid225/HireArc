"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

interface AdminGuardProps {
  children: React.ReactNode;
}

export default function AdminGuard({ children }: AdminGuardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check local storage for the admin token
    const token = localStorage.getItem("HireArc_Admin_Token");
    if (token === "super-secret-admin-token-123") {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      router.push("/admin/login");
    }
  }, [router]);

  if (isAuthenticated === null) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-canvas gap-8">
        <div className="relative">
          <div className="size-20 rounded-3xl bg-indigo-500/5 border border-indigo-500/10 flex items-center justify-center animate-pulse">
            <ShieldCheck size={32} className="text-indigo-500" />
          </div>
          <div className="absolute inset-0 size-20 rounded-3xl border border-indigo-500/20 animate-ping opacity-20" />
        </div>
        <div className="flex flex-col items-center gap-3">
          <p className="text-[10px] font-black text-ink uppercase tracking-[0.4em] animate-pulse">Establishing Secure Node Connection</p>
          <div className="flex items-center gap-1.5 h-1 w-32 bg-hairline rounded-full overflow-hidden">
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="h-full w-full bg-indigo-500"
            />
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
