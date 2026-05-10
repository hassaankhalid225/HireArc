"use client";
import React from "react";
import AdminGuard from "@/components/AdminGuard";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

function LayoutContent({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <TooltipProvider>
        <div className="flex min-h-screen bg-white dark:bg-zinc-950 w-full transition-colors duration-500">
          {/* Sidebar */}
          <AdminSidebar />
          
          {/* Main Content Area */}
          <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
            {/* Top Header */}
            <AdminHeader />
            
            {/* Page Content */}
            <main className="flex-1 p-4 md:p-8 animate-in fade-in duration-700 slide-in-from-bottom-4">
              <div className="max-w-[1600px] mx-auto space-y-8">
                {children}
              </div>
            </main>
            
            {/* Footer inside admin */}
            <footer className="py-6 px-8 border-t border-zinc-200 dark:border-zinc-800 text-center text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 bg-zinc-50 dark:bg-zinc-900/50">
              &copy; 2024 HireArc Enterprise Solutions • Secure Administrative Environment • Node v2.1.0-Release
            </footer>
          </div>
        </div>
      </TooltipProvider>
    </SidebarProvider>
  );
}

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminGuard>
      <LayoutContent>{children}</LayoutContent>
    </AdminGuard>
  );
}
