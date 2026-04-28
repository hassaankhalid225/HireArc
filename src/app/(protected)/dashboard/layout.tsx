"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, FileText, Bookmark, MessageSquare, 
  Sparkles, HelpCircle, LogOut, Search, Bell, Settings 
} from "lucide-react";
import { useAuth } from "@/context";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Applied Job", href: "/dashboard/applications", icon: FileText },
    { name: "Saved Jobs", href: "/dashboard/saved", icon: Bookmark },
  ];

  return (
    <div className="flex h-screen bg-[var(--bg-base)] font-body">
      
      {/* Sidebar */}
      <aside className="w-[280px] bg-white dark:bg-[var(--bg-card)] border-r border-[var(--border)] flex flex-col justify-between">
        <div>
          <div className="h-[88px] flex items-center px-8 border-b-2 border-[var(--border)]">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[var(--primary)] flex items-center justify-center text-white font-bold shadow-premium-sm">HA</div>
              <div className="leading-tight">
                <span className="text-[18px] font-extrabold text-[var(--text-primary)] block font-headline tracking-tight">HireArc</span>
                <span className="text-[10px] font-bold text-[var(--text-muted)] tracking-wider uppercase block">Career Portal</span>
              </div>
            </Link>
          </div>
          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              
              return (
                <Link 
                  key={item.name}
                  href={item.href} 
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold transition-all duration-300 group ${
                    isActive 
                      ? "bg-[var(--primary)]/10 text-[var(--primary)] border-l-4 border-[var(--primary)] shadow-sm" 
                      : "text-[var(--text-secondary)] hover:bg-gray-50 dark:hover:bg-white/5 hover:text-[var(--text-primary)] border-l-4 border-transparent"
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? "text-[var(--primary)]" : "text-gray-400 group-hover:text-[var(--text-primary)]"}`} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
        
        <div className="p-6">
          <Button className="w-full bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white font-bold shadow-lg mb-8 h-12 rounded-xl">
            Update Profile
          </Button>
          
          <div className="space-y-4 px-2">
            <Link href="/help" className="flex items-center gap-3 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-bold transition-colors">
              <HelpCircle className="w-5 h-5" /> Help Center
            </Link>
            <button 
              onClick={logout}
              className="w-full flex items-center gap-3 text-sm text-[var(--text-secondary)] hover:text-red-500 font-bold transition-colors"
            >
              <LogOut className="w-5 h-5" /> Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        
        {/* Topbar */}
        <header className="h-[88px] bg-white dark:bg-[var(--bg-card)] border-b-2 border-[var(--border)] px-8 flex items-center justify-between flex-shrink-0">
          <div className="w-[450px] h-12 bg-[var(--bg-base)] border-2 border-[var(--border)] rounded-xl flex items-center px-4 focus-within:border-[var(--primary)] transition-all">
            <Search className="w-4 h-4 text-gray-400 mr-3" />
            <input type="text" placeholder="Search for jobs, companies..." className="bg-transparent border-none outline-none w-full text-sm font-medium text-[var(--text-primary)]" />
          </div>
          
          <div className="flex items-center gap-6">
            <button className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] relative p-2 hover:bg-gray-50 dark:hover:bg-white/5 rounded-lg transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-[var(--bg-card)]"></span>
            </button>
            <button className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] p-2 hover:bg-gray-50 dark:hover:bg-white/5 rounded-lg transition-colors">
              <Settings className="w-5 h-5" />
            </button>
            <div className="w-px h-8 bg-[var(--border)] mx-1"></div>
            <div className="flex items-center gap-4 pl-2 cursor-pointer group">
              <div className="text-right hidden xl:block">
                <div className="text-sm font-bold text-[var(--text-primary)] group-hover:text-[var(--primary)] transition-colors">{user?.name || 'User'}</div>
                <div className="text-[10px] text-[var(--text-muted)] font-extrabold uppercase tracking-widest">{user?.role || 'Job Seeker'}</div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#678D63] to-[#A8BA9A] border-2 border-white dark:border-white/10 shadow-premium-sm flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform">
                <span className="text-xs font-bold text-white uppercase">{user?.name?.substring(0, 2) || 'U'}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-auto bg-[var(--bg-base)]">
          <div className="p-8 lg:p-12 max-w-[1400px] mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}

