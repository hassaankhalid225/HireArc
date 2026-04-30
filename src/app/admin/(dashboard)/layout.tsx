"use client";
import React from "react";
import AdminGuard from "@/components/AdminGuard";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminGuard>
      <div className="flex min-h-screen bg-background">
        {/* Sidebar */}
        <AdminSidebar />
        
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col lg:pl-72 transition-all duration-300">
          {/* Top Header */}
          <AdminHeader />
          
          {/* Page Content */}
          <main className="flex-1 p-6 md:p-8 animate-in fade-in duration-500">
            <div className="max-w-[1400px] mx-auto space-y-8">
              {children}
            </div>
          </main>
          
          {/* Footer inside admin */}
          <footer className="py-6 px-8 border-t text-center text-xs text-muted-foreground bg-card/50">
            &copy; 2024 HireArc Enterprise Solutions. All rights reserved. System Node: US-EAST-1
          </footer>
        </div>
      </div>
    </AdminGuard>
  );
}
