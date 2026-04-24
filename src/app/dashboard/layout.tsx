import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, FileText, Bookmark, MessageSquare, Sparkles, HelpCircle, LogOut, Search, Bell, Settings } from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-[var(--bg-base)] font-body">
      
      {/* Sidebar */}
      <aside className="w-[260px] bg-white dark:bg-[var(--bg-card)] border-r border-[var(--border)] flex flex-col justify-between">
        <div>
          <div className="h-[72px] flex items-center px-6 border-b border-[var(--border)]">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center text-white font-bold shadow-md">JS</div>
              <div className="leading-tight">
                <span className="text-[17px] font-extrabold text-[var(--text-primary)] block">JobSphere</span>
                <span className="text-[10px] font-bold text-[var(--text-muted)] tracking-wider uppercase block">Career Portal</span>
              </div>
            </Link>
          </div>
          <nav className="p-4 space-y-1">
            <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 text-[var(--text-secondary)] hover:bg-[var(--bg-base)] hover:text-[var(--text-primary)] font-medium rounded-r-lg border-l-4 border-transparent transition-colors focus:bg-blue-50 focus:text-blue-700 focus:border-blue-600">
              <LayoutDashboard className="w-5 h-5" />
              Dashboard
            </Link>
            <Link href="/dashboard/applications" className="flex items-center gap-3 px-4 py-3 text-[var(--text-secondary)] hover:bg-[var(--bg-base)] hover:text-[var(--text-primary)] font-medium rounded-r-lg border-l-4 border-transparent transition-colors focus:bg-blue-50 focus:text-blue-700 focus:border-blue-600">
              <FileText className="w-5 h-5" />
              My Applications
            </Link>
            <Link href="/dashboard/saved" className="flex items-center gap-3 px-4 py-3 text-[var(--text-secondary)] hover:bg-[var(--bg-base)] hover:text-[var(--text-primary)] font-medium rounded-r-lg border-l-4 border-transparent transition-colors focus:bg-blue-50 focus:text-blue-700 focus:border-blue-600">
              <Bookmark className="w-5 h-5" />
              Saved Jobs
            </Link>
            <Link href="/dashboard/messages" className="flex items-center gap-3 px-4 py-3 text-[var(--text-secondary)] hover:bg-[var(--bg-base)] hover:text-[var(--text-primary)] font-medium rounded-r-lg border-l-4 border-transparent transition-colors focus:bg-blue-50 focus:text-blue-700 focus:border-blue-600">
              <MessageSquare className="w-5 h-5" />
              Messages
            </Link>
            <Link href="/dashboard/recommended" className="flex items-center gap-3 px-4 py-3 text-[var(--text-secondary)] hover:bg-[var(--bg-base)] hover:text-[var(--text-primary)] font-medium rounded-r-lg border-l-4 border-transparent transition-colors focus:bg-blue-50 focus:text-blue-700 focus:border-blue-600">
              <Sparkles className="w-5 h-5" />
              Recommended
            </Link>
          </nav>
        </div>
        
        <div className="p-6">
          <Button className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold shadow-md mb-8 py-6">
            Post a Resume
          </Button>
          
          <div className="space-y-4">
            <Link href="/help" className="flex items-center gap-3 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-medium transition-colors">
              <HelpCircle className="w-5 h-5" /> Help Center
            </Link>
            <Link href="/login" className="flex items-center gap-3 text-sm text-[var(--text-secondary)] hover:text-red-500 font-medium transition-colors">
              <LogOut className="w-5 h-5" /> Logout
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        
        {/* Topbar */}
        <header className="h-[72px] bg-white dark:bg-[var(--bg-card)] border-b border-[var(--border)] px-8 flex items-center justify-between flex-shrink-0">
          <div className="w-[400px] h-10 bg-[var(--bg-base)] border border-[var(--border)] rounded-md flex items-center px-4">
            <Search className="w-4 h-4 text-gray-400 mr-2" />
            <input type="text" placeholder="Search for jobs, companies..." className="bg-transparent border-none outline-none w-full text-sm text-[var(--text-primary)]" />
          </div>
          
          <div className="flex items-center gap-6">
            <button className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-[var(--bg-card)]"></span>
            </button>
            <button className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
              <Settings className="w-5 h-5" />
            </button>
            <div className="w-px h-6 bg-[var(--border)] mx-2"></div>
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="text-right hidden md:block">
                <div className="text-sm font-bold text-[var(--text-primary)]">Alex Johnson</div>
                <div className="text-xs text-[var(--text-muted)] font-medium">Product Designer</div>
              </div>
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-200 to-yellow-400 border-2 border-white shadow-sm flex items-center justify-center overflow-hidden">
                <span className="text-xs font-bold text-black">AJ</span>
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-6xl mx-auto space-y-8">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
