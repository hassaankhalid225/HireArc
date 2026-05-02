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
  PanelLeft
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
      "flex flex-col h-full bg-card border-r transition-all duration-300",
      collapsed ? "w-20" : "w-72"
    )}>
      {/* Brand Header */}
      <div className="flex h-16 items-center px-4 border-b shrink-0 overflow-hidden">
        <Link href="/admin/dashboard" className="flex items-center gap-3">
          <Logo className="w-8 h-8 shrink-0" />
          {!collapsed && (
            <span className="text-lg font-bold tracking-tight whitespace-nowrap animate-in fade-in slide-in-from-left-2 duration-300">
              HireArc <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded ml-1 font-extrabold uppercase">Admin</span>
            </span>
          )}
        </Link>
      </div>

      {/* Navigation menu */}
      <ScrollArea className="flex-1 py-6 px-3">
        <div className="space-y-4">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <span className={cn(
                  "group flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 relative",
                  isActive 
                    ? "bg-primary text-white shadow-lg shadow-primary/20" 
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                )}>
                  <item.icon className={cn(
                    "h-5 w-5 shrink-0 transition-transform duration-200 group-hover:scale-110",
                    isActive ? "text-primary-foreground" : "group-hover:text-primary"
                  )} />
                  {!collapsed && (
                    <span className="truncate animate-in fade-in slide-in-from-left-2 duration-300">
                      {item.name}
                    </span>
                  )}
                  {isActive && !collapsed && (
                    <ChevronRight className="ml-auto h-4 w-4 opacity-50" />
                  )}
                  {collapsed && isActive && (
                    <div className="absolute right-0 w-1 h-6 bg-primary-foreground rounded-l-full" />
                  )}
                </span>
              </Link>
            );
          })}
        </div>
      </ScrollArea>

      {/* System Footer */}
      <div className="p-4 border-t mt-auto">
        {!collapsed && (
          <div className="p-4 rounded-2xl bg-accent/30 mb-4 animate-in fade-in zoom-in-95 duration-300">
            <p className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-widest mb-1">System Node</p>
            <p className="text-sm font-bold text-foreground">US-EAST-ALPHA</p>
            <div className="flex items-center gap-1.5 mt-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-tighter">Connected</span>
            </div>
          </div>
        )}
        
        <Button 
          variant="ghost" 
          className={cn(
            "w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-500/10 rounded-xl",
            collapsed && "justify-center px-0"
          )}
          onClick={() => {
            localStorage.removeItem("JobSphere_Admin_Token");
            window.location.href = "/admin/login";
          }}
        >
          <LogOut className={cn("h-5 w-5", !collapsed && "mr-3")} />
          {!collapsed && <span className="font-bold uppercase text-xs tracking-wider">Logout Session</span>}
        </Button>
      </div>
    </div>
  );
}

export function AdminSidebar() {
  const { isCollapsed, toggle } = useSidebar();
  
  return (
    <aside className={cn(
      "hidden lg:flex flex-col fixed inset-y-0 z-50 transition-all duration-300 ease-in-out",
      isCollapsed ? "w-20" : "w-72"
    )}>
      <SidebarContent collapsed={isCollapsed} />
      
      {/* Collapse Toggle Button */}
      <Button
        variant="outline"
        size="icon"
        className="absolute -right-4 top-4 h-8 w-8 rounded-full border shadow-md bg-background z-50 hover:bg-primary hover:text-primary-foreground transition-all duration-300 group-hover:scale-110"
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
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-6 w-6 text-foreground" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-72 border-none">
        <SidebarContent />
      </SheetContent>
    </Sheet>
  );
}
