"use client";
import React from "react";
import AdminGuard from "@/components/AdminGuard";
import { AdminSidebar, SidebarProvider, useSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { cn } from "@/lib/utils";

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { isCollapsed } = useSidebar();

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <AdminSidebar />
      
      {/* Main Content Area */}
      <div className={cn(
        "flex-1 flex flex-col transition-all duration-500 ease-in-out min-w-0 overflow-x-hidden",
        isCollapsed ? "lg:pl-20" : "lg:pl-72"
      )}>
        {/* Top Header */}
        <AdminHeader />
        
        {/* Page Content */}
        <main className="flex-1 p-4 md:p-8 animate-in fade-in duration-700 slide-in-from-bottom-4">
          <div className="max-w-[1600px] mx-auto space-y-8">
            {children}
          </div>
        </main>
        
        {/* Footer inside admin */}
        <footer className="py-6 px-8 border-t text-center text-[10px] font-bold uppercase tracking-widest text-muted-foreground bg-card/30 backdrop-blur-sm">
          &copy; 2024 HireArc Enterprise Solutions • Secure Administrative Environment • Node v2.1.0-Release
        </footer>
      </div>
    </div>
  );
}

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminGuard>
      <SidebarProvider>
        <LayoutContent>{children}</LayoutContent>
      </SidebarProvider>
    </AdminGuard>
  );
}
