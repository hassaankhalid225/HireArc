"use client";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const { loginGoogle, loginGithub, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, isLoading, router]);

  return (
    <div className="min-h-screen bg-[var(--bg-base)] flex items-center justify-center p-6 pt-24">
      <div className="w-full max-w-[440px] bg-[var(--bg-card)] rounded-[var(--radius-xl)] shadow-[var(--shadow-card)] overflow-hidden">
        
        {/* Header Section */}
        <div className="p-8 pb-6 border-b-2 border-[var(--border)] text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)]" />
          
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] mx-auto mb-4 flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-xl">JS</span>
          </div>
          <h1 className="text-2xl font-bold font-headline mb-2">Welcome Back</h1>
          <p className="text-[var(--text-secondary)] text-sm">Sign in to continue to HireArc</p>
        </div>

        {/* Form Section */}
        <div className="p-8 pt-8 pb-10">
          <div className="space-y-4">
            <button 
              onClick={loginGoogle}
              className="w-full h-14 flex items-center justify-center gap-3 border-2 border-[var(--border)] rounded-[var(--radius-md)] text-base font-semibold hover:bg-[var(--bg-base)] transition-colors text-[var(--text-primary)] shadow-sm"
            >
              <Image src="/logo1.png" alt="Google" width={22} height={22} />
              Continue with Google
            </button>
            <button 
              onClick={loginGithub}
              className="w-full h-14 flex items-center justify-center gap-3 border-2 border-[var(--border)] rounded-[var(--radius-md)] text-base font-semibold hover:bg-[var(--bg-base)] transition-colors text-[var(--text-primary)] shadow-sm"
            >
              <svg className="w-6 h-6 text-black dark:text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              Continue with GitHub
            </button>
          </div>
        </div>

        {/* Footer Section */}
        <div className="p-6 bg-[var(--bg-base)] text-center border-t-2 border-[var(--border)]">
          <p className="text-sm text-[var(--text-secondary)]">
            Don't have an account? <Link href="/signup" className="font-semibold text-[var(--primary)] hover:underline">Sign up for free</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
