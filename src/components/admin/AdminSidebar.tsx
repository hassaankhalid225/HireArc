"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  Building2, 
  Settings, 
  ChevronRight,
  LogOut,
  ShieldCheck,
  Menu
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const menuItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "User Management", href: "/admin/users", icon: Users },
  { name: "Job Listings", href: "/admin/jobs", icon: Briefcase },
  { name: "Company Profiles", href: "/admin/companies", icon: Building2 },
  { name: "Platform Settings", href: "/admin/settings", icon: Settings },
];

export function SidebarContent() {
  const pathname = usePathname();
  
  return (
    <div className="flex flex-col h-full bg-card">
      <div className="flex h-16 items-center px-6 border-b shrink-0">
        <Link href="/admin/dashboard" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
            <ShieldCheck size={20} />
          </div>
          <span className="text-lg font-bold tracking-tight">HireArc <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded ml-1">ADMIN</span></span>
        </Link>
      </div>

      <ScrollArea className="flex-1 py-6 px-4">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <span className={cn(
                  "group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                  isActive 
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20" 
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}>
                  <item.icon className={cn("h-5 w-5", isActive ? "text-primary-foreground" : "group-hover:text-primary")} />
                  {item.name}
                  {isActive && <ChevronRight className="ml-auto h-4 w-4" />}
                </span>
              </Link>
            );
          })}
        </div>
      </ScrollArea>

      <div className="p-4 border-t mt-auto">
        <div className="p-4 rounded-xl bg-accent/50 mb-4">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Current Node</p>
          <p className="text-sm font-semibold">Production Alpha</p>
          <div className="flex items-center gap-1.5 mt-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-medium text-emerald-600">Stable v2.1.0</span>
          </div>
        </div>
        <Button 
          variant="ghost" 
          className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
          onClick={() => {
            localStorage.removeItem("JobSphere_Admin_Token");
            window.location.href = "/admin/login";
          }}
        >
          <LogOut className="mr-2 h-5 w-5" />
          Logout System
        </Button>
      </div>
    </div>
  );
}

export function AdminSidebar() {
  return (
    <aside className="hidden lg:flex w-72 flex-col fixed inset-y-0 z-50 border-r">
      <SidebarContent />
    </aside>
  );
}

export function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-72">
        <SidebarContent />
      </SheetContent>
    </Sheet>
  );
}
