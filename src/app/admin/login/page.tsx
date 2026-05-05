"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Shield, Lock, Mail, ChevronRight, ChevronLeft } from "lucide-react";
import Link from "next/link";
import DotField from "@/components/ui/DotField";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Simulate network delay for realistic feel
    setTimeout(() => {
      if (email === "hasankhalid@gmail.com" && password === "12345678") {
        localStorage.setItem("JobSphere_Admin_Token", "super-secret-admin-token-123");
        router.push("/admin/dashboard");
      } else {
        setError("Invalid credentials. Access denied.");
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#0d0b10] flex items-center justify-center p-6 relative overflow-hidden">
      {/* DotField Interactive Background */}
      <DotField
        dotRadius={1.5}
        dotSpacing={14}
        bulgeStrength={67}
        glowRadius={160}
        sparkle={false}
        waveAmplitude={0}
        cursorRadius={500}
        cursorForce={0.1}
        bulgeOnly
        gradientFrom="#A855F7"
        gradientTo="#B497CF"
        glowColor="#120F17"
      />

      <Link 
        href="/" 
        className="absolute top-8 left-8 flex items-center gap-2 text-[14px] font-medium text-[var(--body)] hover:text-[var(--ink)] transition-colors group"
      >
        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Home
      </Link>

      <div className="w-full max-w-[420px] bg-[var(--surface-card)] border border-[var(--hairline-strong)] rounded-xxl shadow-premium-sm overflow-hidden relative z-10">
        <div className="p-10">
          <div className="flex justify-center mb-8">
            <div className="w-14 h-14 rounded-full bg-[var(--surface-strong)] flex items-center justify-center border border-[var(--hairline)]">
              <Shield className="w-7 h-7 text-[var(--ink)]" strokeWidth={1.5} />
            </div>
          </div>

          <div className="text-center mb-10">
            <h1 className="text-3xl font-headline font-normal text-[var(--ink)] mb-2 tracking-tight">System Access</h1>
            <p className="text-[var(--body)] text-[15px]">Secure administrative authorization</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[12px] font-semibold text-[var(--muted)] uppercase tracking-[0.08em] ml-1">Admin Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-[var(--muted-soft)]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border border-[var(--hairline-strong)] rounded-xl py-3 pl-12 pr-4 text-[15px] text-[var(--ink)] placeholder:text-[var(--muted-soft)] focus:outline-none focus:border-[var(--ink)] transition-all"
                  placeholder="admin@jobsphere.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[12px] font-semibold text-[var(--muted)] uppercase tracking-[0.08em] ml-1">Security Key</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-[var(--muted-soft)]" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent border border-[var(--hairline-strong)] rounded-xl py-3 pl-12 pr-4 text-[15px] text-[var(--ink)] placeholder:text-[var(--muted-soft)] focus:outline-none focus:border-[var(--ink)] transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
                <p className="text-[14px] text-red-600 font-medium">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 flex items-center justify-center gap-3 bg-[var(--ink)] hover:translate-y-[-1px] text-white rounded-pill text-[15px] font-medium transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Authorize Access</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-12 text-center border-t border-[var(--hairline-soft)] pt-8">
            <p className="text-[11px] text-[var(--muted)] font-mono uppercase tracking-widest">JobSphere Admin Node • v2.1.0</p>
            <div className="flex items-center justify-center gap-2 mt-3">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] text-[var(--muted)] font-medium">Core Systems Online</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
