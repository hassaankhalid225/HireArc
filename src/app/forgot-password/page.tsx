import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-base)] flex items-center justify-center p-6 pt-24 pb-24">
      <div className="w-full max-w-[440px] bg-[var(--bg-card)] rounded-[var(--radius-xl)] shadow-[var(--shadow-card)] overflow-hidden">
        
        {/* Header Section */}
        <div className="p-8 pb-6 border-b-2 border-[var(--border)] text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)]" />
          
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] mx-auto mb-4 flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-xl">JS</span>
          </div>
          <h1 className="text-2xl font-bold font-headline mb-2">Reset Password</h1>
          <p className="text-[var(--text-secondary)] text-sm">Enter your email and we'll send you a link to reset your password.</p>
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
                className="w-full h-12 px-4 rounded-[var(--radius-md)] border-2 border-[var(--border)] bg-[var(--bg-base)] outline-none focus:border-[var(--primary-dark)] focus:bg-white transition-colors text-sm"
                required
              />
            </div>

            <button type="button" className="btn btn-primary w-full mt-2 h-12 text-base">
              Send Reset Link
            </button>
          </form>

        </div>

        {/* Footer Section */}
        <div className="p-6 bg-[var(--bg-base)] text-center border-t-2 border-[var(--border)]">
          <p className="text-sm text-[var(--text-secondary)]">
            Remembered your password? <Link href="/login" className="font-semibold text-[var(--primary)] hover:underline">Back to Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
