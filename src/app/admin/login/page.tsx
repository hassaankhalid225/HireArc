"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import HireArcGlobe from "@/components/home/HireArcGlobe";
import { 
  ChevronLeft, 
  Mail, 
  Lock, 
  ArrowRight, 
  AlertCircle,
  ShieldCheck,
  CheckCircle2,
  Loader2
} from "lucide-react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulate network delay for realistic feel
    setTimeout(() => {
      if (email === "hasankhalid@gmail.com" && password === "12345678") {
        setIsSuccess(true);
        localStorage.setItem("HireArc_Admin_Token", "super-secret-admin-token-123");
        setTimeout(() => {
          router.push("/admin/dashboard");
        }, 1500);
      } else {
        setError("Invalid credentials. Access denied.");
        setIsLoading(false);
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[var(--canvas)] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-[var(--gradient-mint)] rounded-full blur-[120px] opacity-20" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-[var(--gradient-peach)] rounded-full blur-[120px] opacity-20" />
        <div className="absolute top-[20%] left-[-5%] w-[30%] h-[30%] bg-indigo-500 rounded-full blur-[120px] opacity-10" />
      </div>

      <Link 
        href="/" 
        className="absolute top-8 left-8 flex items-center gap-2 text-[14px] font-medium text-[var(--body)] hover:text-[var(--ink)] transition-colors group z-20"
      >
        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Home
      </Link>

      <div className="w-full max-w-[440px] bg-[var(--surface-card)] border border-[var(--hairline-strong)] rounded-xxl shadow-premium-lg overflow-hidden relative z-10 transition-all duration-500">
        {isSuccess ? (
          <div className="p-16 text-center animate-in fade-in zoom-in duration-500">
            <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-8">
              <CheckCircle2 className="w-10 h-10 text-emerald-600" />
            </div>
            <h2 className="text-3xl font-headline font-normal text-[var(--ink)] mb-3">Identity Verified</h2>
            <p className="text-[var(--body)] mb-8">Accessing administrative terminal...</p>
            <div className="flex justify-center">
              <Loader2 className="w-6 h-6 animate-spin text-[var(--ink)]" />
            </div>
          </div>
        ) : (
          <>
            {/* Header Section */}
            <div className="p-10 pb-6 text-center">
              <div className="mx-auto mb-6 flex justify-center">
                <div className="relative">
                   <HireArcGlobe size={64} />
                   <div className="absolute -bottom-1 -right-1 size-6 rounded-full bg-zinc-900 border-2 border-white dark:border-zinc-900 flex items-center justify-center">
                      <ShieldCheck className="size-3.5 text-white" />
                   </div>
                </div>
              </div>
              <h1 className="text-3xl font-headline font-normal text-[var(--ink)] mb-2 tracking-tight">Admin Portal</h1>
              <p className="text-[var(--body)] text-[15px]">Secure gateway for system overrides</p>
            </div>

            {/* Form Section */}
            <form onSubmit={handleLogin} className="p-10 pt-4 pb-10 space-y-5">
              {error && (
                <div className="p-4 bg-rose-500/5 border border-rose-500/10 rounded-2xl flex items-center gap-3 text-rose-600 animate-in slide-in-from-top-2 duration-300">
                  <AlertCircle className="size-5 shrink-0" />
                  <p className="text-xs font-bold uppercase tracking-wider">{error}</p>
                </div>
              )}

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted ml-1">Admin Identity</label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted transition-colors group-focus-within:text-ink" />
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@hirearc.pro"
                      className="w-full h-14 pl-12 pr-4 bg-[var(--surface-strong)]/50 border border-[var(--hairline)] rounded-2xl text-[15px] text-[var(--ink)] focus:border-ink transition-all outline-none"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted ml-1">Secure Key</label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted transition-colors group-focus-within:text-ink" />
                    <input 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full h-14 pl-12 pr-4 bg-[var(--surface-strong)]/50 border border-[var(--hairline)] rounded-2xl text-[15px] text-[var(--ink)] focus:border-ink transition-all outline-none"
                      required
                    />
                  </div>
                </div>
              </div>

              <button 
                type="submit"
                disabled={isLoading}
                className="w-full h-14 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-2xl font-bold text-[14px] uppercase tracking-[0.15em] flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50 mt-4 shadow-xl shadow-zinc-900/10"
              >
                {isLoading ? (
                  <Loader2 className="size-5 animate-spin" />
                ) : (
                  <>
                    Authorize Access
                    <ArrowRight className="size-4" />
                  </>
                )}
              </button>
            </form>

            <div className="p-8 bg-[var(--surface-strong)] text-center border-t border-[var(--hairline)] flex flex-col gap-3">
               <div className="flex items-center justify-center gap-2 opacity-40">
                  <div className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[9px] font-black uppercase tracking-[0.2em]">Encrypted Connection Active</span>
               </div>
               <p className="text-[11px] text-muted font-medium uppercase tracking-[0.1em]">
                  HireArc Admin Node • v2.1.0-Release
               </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
