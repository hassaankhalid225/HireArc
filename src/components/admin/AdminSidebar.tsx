"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
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
  Menu,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
  PanelLeftClose,
  PanelLeft,
  Activity
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "@/components/ui/Logo";

const menuItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "User Management", href: "/admin/users", icon: Users },
  { name: "Job Listings", href: "/admin/jobs", icon: Briefcase },
  { name: "Company Profiles", href: "/admin/companies", icon: Building2 },
  { name: "Scraping Logs", href: "/admin/scraping", icon: Activity },
  { name: "Platform Settings", href: "/admin/settings", icon: Settings },
];

// Sidebar Context for state sharing
const SidebarContext = createContext({
  isCollapsed: false,
  toggle: () => {},
});

export const useSidebar = () => useContext(SidebarContext);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const toggle = () => setIsCollapsed(!isCollapsed);

  return (
    <SidebarContext.Provider value={{ isCollapsed, toggle }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function SidebarContent({ collapsed = false }: { collapsed?: boolean }) {
  const pathname = usePathname();
  
  return (
    <div className={cn(
      "flex flex-col h-full bg-canvas border-r border-hairline transition-all duration-300",
      collapsed ? "w-20" : "w-72"
    )}>
      {/* Brand Header */}
      <div className="flex h-20 items-center px-6 border-b border-hairline shrink-0 overflow-hidden">
        <Link href="/admin/dashboard" className="flex items-center gap-4">
          <Logo className="w-9 h-9 shrink-0" />
          {!collapsed && (
            <span className="text-xl font-headline font-normal tracking-tight whitespace-nowrap animate-in fade-in slide-in-from-left-2 duration-300 text-ink">
              HireArc <span className="text-[9px] bg-ink text-canvas px-1.5 py-0.5 rounded-pill ml-1 font-bold uppercase tracking-widest border border-hairline/20">Admin</span>
            </span>
          )}
        </Link>
      </div>

      {/* Navigation menu */}
      <ScrollArea className="flex-1 py-8 px-4">
        <div className="space-y-1.5">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <span className={cn(
                  "group flex items-center gap-3.5 px-4 py-3 rounded-xl text-[11px] font-bold transition-all duration-300 relative uppercase tracking-[0.15em] outline-none",
                  isActive 
                    ? "bg-ink text-canvas shadow-xl shadow-ink/10" 
                    : "text-muted hover:bg-canvas-soft hover:text-ink"
                )}>
                  <item.icon className={cn(
                    "h-[18px] w-[18px] shrink-0 transition-all duration-300 group-hover:scale-110",
                    isActive ? "text-canvas" : "text-muted group-hover:text-ink"
                  )} />
                  {!collapsed && (
                    <span className="truncate animate-in fade-in slide-in-from-left-2 duration-500">
                      {item.name}
                    </span>
                  )}
                  {isActive && !collapsed && (
                    <div className="ml-auto w-1 h-1 rounded-full bg-canvas/40" />
                  )}
                </span>
              </Link>
            );
          })}
        </div>
      </ScrollArea>

      {/* System Footer */}
      <div className="p-6 border-t border-hairline mt-auto space-y-6">
        {!collapsed && (
          <div className="p-6 rounded-2xl bg-canvas-soft border border-hairline animate-in fade-in zoom-in-95 duration-300">
            <p className="text-[10px] font-bold text-muted uppercase tracking-[0.2em] mb-2">System Pulse</p>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-sm font-bold text-ink uppercase tracking-wider">US-EAST-ALPHA</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest">Active Link</span>
                </div>
              </div>
              <Activity className="w-8 h-8 text-ink/5" />
            </div>
          </div>
        )}
        
        <Button 
          variant="ghost" 
          size="lg"
          className={cn(
            "w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-500/10",
            collapsed && "justify-center px-0"
          )}
          onClick={() => {
            localStorage.removeItem("JobSphere_Admin_Token");
            window.location.href = "/admin/login";
          }}
        >
          <LogOut className={cn("h-5 w-5", !collapsed && "mr-3")} />
          {!collapsed && <span className="font-bold uppercase text-[10px] tracking-[0.2em]">Terminate Session</span>}
        </Button>
      </div>
    </div>
  );
}

export function AdminSidebar() {
  const { isCollapsed, toggle } = useSidebar();
  
  return (
    <aside className={cn(
      "hidden lg:flex flex-col fixed inset-y-0 z-[100] transition-all duration-500 ease-in-out",
      isCollapsed ? "w-20" : "w-72"
    )}>
      <SidebarContent collapsed={isCollapsed} />
      
      {/* Collapse Toggle Button */}
      <Button
        variant="outline"
        size="icon"
        className="absolute -right-4 top-6 h-8 w-8 rounded-full border border-hairline shadow-premium-sm bg-canvas z-50 hover:bg-ink hover:text-canvas transition-all duration-300 group-hover:scale-110"
        onClick={toggle}
      >
        {isCollapsed ? <ChevronRightIcon size={14} /> : <PanelLeftClose size={14} />}
      </Button>
    </aside>
  );
}

export function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger 
        render={
          <Button variant="ghost" size="icon" className="lg:hidden" />
        }
      >
        <Menu className="h-6 w-6 text-foreground" />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-72 border-none">
        <SidebarContent />
      </SheetContent>
    </Sheet>
  );
}
