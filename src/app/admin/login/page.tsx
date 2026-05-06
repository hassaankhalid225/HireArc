"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Shield, Lock, Mail, ChevronRight, ChevronLeft, Zap, ShieldAlert } from "lucide-react";
import Link from "next/link";
import DotField from "@/components/ui/DotField";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

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
    }, 1200); // Increased slightly for higher-fidelity "authenticating" feel
  };

  return (
    <div className="min-h-screen bg-canvas flex items-center justify-center p-6 relative overflow-hidden transition-colors duration-500">
      {/* DotField Interactive Background - Optimized for Premium Look */}
      <DotField
        dotRadius={1.2}
        dotSpacing={18}
        bulgeStrength={80}
        glowRadius={250}
        sparkle={true}
        waveAmplitude={2}
        cursorRadius={400}
        cursorForce={0.2}
        bulgeOnly={false}
        gradientFrom="#6366f1"
        gradientTo="#818cf8"
        glowColor="rgba(99, 102, 241, 0.05)"
      />

      <Link 
        href="/" 
        className="absolute top-10 left-10 flex items-center gap-2.5 text-[10px] font-black text-muted uppercase tracking-[0.3em] hover:text-ink transition-all group z-20"
      >
        <ChevronLeft size={14} className="group-hover:-translate-x-1.5 transition-transform" /> 
        Back to Nexus
      </Link>

      <motion.div 
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[440px] relative z-10"
      >
        <Card className="border border-hairline shadow-premium-lg rounded-[2.5rem] bg-surface-card/80 backdrop-blur-2xl overflow-hidden relative">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
          
          <CardContent className="p-12">
            <div className="flex justify-center mb-10">
              <div className="size-20 rounded-[2rem] bg-canvas-soft flex items-center justify-center border border-hairline shadow-inner group overflow-hidden relative">
                <div className="absolute inset-0 bg-indigo-500/5 scale-0 group-hover:scale-100 transition-transform duration-700" />
                <Shield size={32} className="text-ink relative z-10 group-hover:scale-110 transition-transform duration-500" strokeWidth={1.5} />
              </div>
            </div>

            <div className="text-center mb-12">
                <div className="flex items-center justify-center gap-2 text-indigo-500 font-black text-[9px] uppercase tracking-[0.4em] mb-4">
                    <Zap size={10} className="fill-current" />
                    <span>Secure Protocol</span>
                </div>
                <h1 className="text-4xl font-headline text-ink tracking-tighter leading-none mb-3">System Access</h1>
                <p className="text-muted text-base font-medium italic opacity-70">Awaiting administrative clearance...</p>
            </div>

            <form onSubmit={handleLogin} className="flex flex-col gap-8">
              <div className="flex flex-col gap-3">
                <label className="text-[10px] font-black text-muted uppercase tracking-[0.25em] ml-1">Identity Token</label>
                <div className="relative group">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 size-4.5 text-muted transition-colors group-focus-within:text-ink" />
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-14 bg-canvas-soft/50 border-hairline rounded-2xl pl-14 text-sm font-bold text-ink placeholder:text-muted/40 transition-all focus-visible:ring-2 focus-visible:ring-ink/10"
                    placeholder="admin@jobsphere.pro"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <label className="text-[10px] font-black text-muted uppercase tracking-[0.25em] ml-1">Security Key</label>
                <div className="relative group">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 size-4.5 text-muted transition-colors group-focus-within:text-ink" />
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-14 bg-canvas-soft/50 border-hairline rounded-2xl pl-14 text-sm font-bold text-ink placeholder:text-muted/40 transition-all focus-visible:ring-2 focus-visible:ring-ink/10"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <AnimatePresence>
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-5 bg-rose-500/5 border border-rose-500/10 rounded-2xl flex items-center gap-4"
                  >
                    <ShieldAlert size={18} className="text-rose-500 shrink-0" />
                    <p className="text-xs text-rose-600 dark:text-rose-400 font-bold uppercase tracking-wider leading-relaxed">{error}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <Button
                type="submit"
                disabled={loading}
                className="h-14 w-full rounded-pill bg-ink text-canvas hover:opacity-90 transition-all shadow-xl shadow-ink/20 font-black text-[11px] uppercase tracking-[0.25em] relative group overflow-hidden"
              >
                {loading ? (
                  <div className="flex items-center gap-3">
                    <Loader2 size={18} className="animate-spin" />
                    <span>Synchronizing...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <span>Authorize Access</span>
                    <ChevronRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
                  </div>
                )}
              </Button>
            </form>

            <div className="mt-16 text-center pt-10 border-t border-hairline flex flex-col gap-4">
              <p className="text-[10px] text-muted font-black uppercase tracking-[0.3em] opacity-40 italic">JobSphere Administrative Node • v2.1.0-Release</p>
              <div className="flex items-center justify-center gap-3">
                <div className="size-2 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.5)] animate-pulse" />
                <span className="text-[10px] text-muted font-black uppercase tracking-[0.2em] opacity-60">Authentication Systems Live</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Subtle decorative shadow */}
        <div className="absolute -bottom-10 inset-x-10 h-20 bg-indigo-500/10 blur-[100px] -z-10 rounded-full" />
      </motion.div>
    </div>
  );
}
