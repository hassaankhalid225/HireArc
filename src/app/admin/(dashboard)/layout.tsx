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
        <div className="flex min-h-screen bg-canvas w-full">
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
            <footer className="py-6 px-8 border-t border-hairline text-center text-[10px] font-bold uppercase tracking-widest text-muted bg-canvas-soft">
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
