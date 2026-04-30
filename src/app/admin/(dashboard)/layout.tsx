"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  Building2, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Bell,
  Search,
  ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AdminGuard from "@/components/AdminGuard";
import { cn } from "@/lib/utils";

const menuItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Jobs", href: "/admin/jobs", icon: Briefcase },
  { name: "Companies", href: "/admin/companies", icon: Building2 },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  return (
    <AdminGuard>
      <div className="flex h-screen bg-[#F8FAFC] dark:bg-[#0F172A] overflow-hidden">
        {/* Sidebar */}
        <motion.aside
          initial={false}
          animate={{ width: sidebarOpen ? 260 : 80 }}
          className="relative z-50 flex flex-col bg-white dark:bg-[#1E293B] border-r border-slate-200 dark:border-slate-800 transition-all duration-300 ease-in-out"
        >
          {/* Logo Section */}
          <div className="flex items-center h-16 px-4 border-b border-slate-200 dark:border-slate-800">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-white font-bold text-xl">J</span>
              </div>
              <AnimatePresence>
                {sidebarOpen && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="font-bold text-lg dark:text-white"
                  >
                    JobSphere <span className="text-xs font-medium text-primary bg-primary/10 px-1.5 py-0.5 rounded ml-1">ADMIN</span>
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto custom-scrollbar">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group relative",
                    isActive 
                      ? "bg-primary text-white shadow-lg shadow-primary/20" 
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50"
                  )}
                >
                  <item.icon className={cn("w-5 h-5 flex-shrink-0", isActive ? "text-white" : "group-hover:text-primary")} />
                  <AnimatePresence>
                    {sidebarOpen && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="font-medium whitespace-nowrap"
                      >
                        {item.name}
                      </motion.span>
                    )}
                  </AnimatePresence>
                  {!sidebarOpen && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
                      {item.name}
                    </div>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Footer Section (User Profile) */}
          <div className="p-4 border-t border-slate-200 dark:border-slate-800">
            <div className={cn("flex items-center gap-3", !sidebarOpen && "justify-center")}>
              <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex-shrink-0 flex items-center justify-center overflow-hidden border-2 border-primary/20">
                <span className="text-sm font-bold text-slate-600 dark:text-slate-300">
                  H
                </span>
              </div>
              {sidebarOpen && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">Hasan Khalid</p>
                  <p className="text-xs text-slate-500 truncate">hasankhalid@gmail.com</p>
                </div>
              )}
            </div>
            <button
              onClick={() => {
                localStorage.removeItem("JobSphere_Admin_Token");
                window.location.href = "/admin/login";
              }}
              className={cn(
                "mt-4 flex items-center gap-3 w-full px-3 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-colors",
                !sidebarOpen && "justify-center"
              )}
            >
              <LogOut className="w-5 h-5 flex-shrink-0" />
              {sidebarOpen && <span className="font-medium">Logout</span>}
            </button>
          </div>

          {/* Sidebar Toggle */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="absolute -right-3 top-20 w-6 h-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full flex items-center justify-center shadow-md text-slate-500 hover:text-primary transition-colors z-50"
          >
            {sidebarOpen ? <X size={14} /> : <ChevronRight size={14} />}
          </button>
        </motion.aside>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Header */}
          <header className="h-16 bg-white/80 dark:bg-[#1E293B]/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 sticky top-0 z-40">
            <div className="flex items-center gap-4">
              {!sidebarOpen && (
                <button onClick={() => setSidebarOpen(true)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500">
                  <Menu size={20} />
                </button>
              )}
              <h1 className="text-lg font-bold text-slate-900 dark:text-white hidden sm:block">
                {menuItems.find(item => pathname.startsWith(item.href))?.name || "Admin Panel"}
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search anything..."
                  className="pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800/50 border-none rounded-full text-sm focus:ring-2 focus:ring-primary/50 transition-all w-64"
                />
              </div>
              <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-500 relative">
                <Bell size={20} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full border-2 border-white dark:border-[#1E293B]"></span>
              </button>
            </div>
          </header>

          {/* Page Content */}
          <div className="flex-1 overflow-y-auto p-6 custom-scrollbar bg-slate-50 dark:bg-[#0F172A]">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {children}
            </motion.div>
          </div>
        </main>
      </div>
    </AdminGuard>
  );
}
