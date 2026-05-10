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
    { name: "Find Jobs", href: "/search", icon: Search },
    { name: "Applied Job", href: "/applied-jobs", icon: FileText },
    { name: "Saved Jobs", href: "/saved-jobs", icon: Bookmark },
  ];

  return (
    <div className="flex h-screen bg-[var(--bg-base)] font-body pt-[64px]">
      
      {/* Sidebar */}
      <aside className="w-[280px] bg-white dark:bg-[var(--bg-card)] border-r border-[var(--border)] flex flex-col justify-between overflow-y-auto">
        <div>
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
          <Link href="/profile/edit" className="block mb-8">
            <Button className="w-full bg-[#1C261F] hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 text-white font-bold shadow-lg h-12 rounded-xl transition-colors">
              Update Profile
            </Button>
          </Link>
          
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

