import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-base)] flex items-center justify-center p-6 pt-24">
      <div className="w-full max-w-[440px] bg-[var(--bg-card)] rounded-[var(--radius-xl)] shadow-[var(--shadow-card)] overflow-hidden">
        
        {/* Header Section */}
        <div className="p-8 pb-6 border-b border-[var(--border)] text-center relative overflow-hidden">
          {/* Subtle gradient background for premium feel */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)]" />
          
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] mx-auto mb-4 flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-xl">JS</span>
          </div>
          <h1 className="text-2xl font-bold font-headline mb-2">Welcome Back</h1>
          <p className="text-[var(--text-secondary)] text-sm">Sign in to continue to JobSphere</p>
        </div>

        {/* Form Section */}
        <div className="p-8 pt-6">
          <form className="space-y-5" action="#">
            
            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-sm font-semibold text-[var(--text-primary)]">Email Address</label>
              <input 
                type="email" 
                id="email" 
                placeholder="you@company.com" 
                className="w-full h-12 px-4 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--bg-base)] outline-none focus:border-[var(--primary-dark)] focus:bg-white transition-colors text-sm"
                required
              />
            </div>
            
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="block text-sm font-semibold text-[var(--text-primary)]">Password</label>
                <Link href="/forgot-password" className="text-sm font-medium text-[var(--primary)] hover:underline">Forgot password?</Link>
              </div>
              <input 
                type="password" 
                id="password" 
                placeholder="••••••••" 
                className="w-full h-12 px-4 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--bg-base)] outline-none focus:border-[var(--primary-dark)] focus:bg-white transition-colors text-sm"
                required
              />
            </div>

            <Link href="/dashboard" className="btn btn-primary w-full mt-2 h-12 text-base flex items-center justify-center">
              Sign In
            </Link>
          </form>

          <div className="mt-8 relative flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[var(--border)]"></div>
            </div>
            <span className="relative bg-[var(--bg-card)] px-4 text-sm text-[var(--text-muted)] font-mono">OR CONTINUE WITH</span>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <button className="h-11 flex items-center justify-center gap-2 border border-[var(--border)] rounded-[var(--radius-md)] text-sm font-medium hover:bg-[var(--bg-base)] transition-colors">
              <Image src="/logo1.png" alt="Google" width={18} height={18} className="opacity-70" />
              Google
            </button>
            <button className="h-11 flex items-center justify-center gap-2 border border-[var(--border)] rounded-[var(--radius-md)] text-sm font-medium hover:bg-[var(--bg-base)] transition-colors">
              <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              GitHub
            </button>
          </div>
        </div>

        {/* Footer Section */}
        <div className="p-6 bg-[var(--bg-base)] text-center border-t border-[var(--border)]">
          <p className="text-sm text-[var(--text-secondary)]">
            Don't have an account? <Link href="/signup" className="font-semibold text-[var(--primary)] hover:underline">Sign up for free</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
