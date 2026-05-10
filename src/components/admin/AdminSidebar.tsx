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
  LogOut,
  Activity,
  ChevronRight,
  Plus,
  Shield,
  Zap,
  HelpCircle,
  ChevronsUpDown,
  Home,
  Database,
  Search,
  Globe
} from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem, 
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  useSidebar
} from "@/components/ui/sidebar";

// HireArc Original Admin Data
const mainItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: Home },
  { name: "Users", href: "/admin/users", icon: Users, hasAction: true },
  { name: "Jobs", href: "/admin/jobs", icon: Briefcase },
  { name: "Companies", href: "/admin/companies", icon: Building2 },
];

const systemItems = [
  { name: "Scraping Logs", href: "/admin/scraping", icon: Activity },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];



export function AdminSidebar() {
  const pathname = usePathname();
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon" className="border-r border-zinc-200 bg-white dark:bg-zinc-950 transition-all duration-300">
      <SidebarHeader className="p-2 shrink-0 overflow-hidden transition-all duration-300">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" className="hover:bg-transparent cursor-default group-data-[state=collapsed]:justify-center">
              {collapsed ? (
                <div className="size-8 rounded-xl bg-zinc-900 dark:bg-zinc-100 flex items-center justify-center shadow-lg shrink-0">
                  <span className="text-xs font-black text-white dark:text-zinc-900 font-headline">H</span>
                </div>
              ) : (
                <span className="text-xl font-extrabold font-headline text-zinc-900 dark:text-zinc-100 tracking-tighter truncate">
                  HireArc
                </span>
              )}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="px-3 py-2 no-scrollbar">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {mainItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton
                      isActive={isActive}
                      tooltip={item.name}
                      render={
                        <Link 
                          href={item.href} 
                          className={cn(
                            "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group/link",
                            isActive 
                              ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-bold" 
                              : "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-100"
                          )} 
                        />
                      }
                    >
                      <item.icon className={cn(
                        "size-[18px] shrink-0 transition-colors",
                        isActive ? "text-zinc-900 dark:text-zinc-100" : "text-zinc-400 group-hover/link:text-zinc-900 dark:group-hover/link:text-zinc-100"
                      )} />
                      {!collapsed && (
                        <div className="flex items-center justify-between w-full">
                          <span className="text-[13px] tracking-tight">{item.name}</span>
                          {item.hasAction && (
                            <button className="p-1 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-700 opacity-0 group-hover/link:opacity-100 transition-opacity">
                              <Plus size={12} className="text-zinc-500" />
                            </button>
                          )}
                        </div>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-4">
          {!collapsed && (
            <SidebarGroupLabel className="px-4 text-[11px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-2">
              System
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {systemItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton
                      isActive={isActive}
                      tooltip={item.name}
                      render={
                        <Link 
                          href={item.href} 
                          className={cn(
                            "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group/link",
                            isActive 
                              ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-bold" 
                              : "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-100"
                          )} 
                        />
                      }
                    >
                      <item.icon className={cn(
                        "size-[18px] shrink-0 transition-colors",
                        isActive ? "text-zinc-900 dark:text-zinc-100" : "text-zinc-400 group-hover/link:text-zinc-900 dark:group-hover/link:text-zinc-100"
                      )} />
                      {!collapsed && (
                        <div className="flex items-center justify-between w-full">
                          <span className="text-[13px] tracking-tight">{item.name}</span>
                        </div>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>


      </SidebarContent>

      <SidebarFooter className="p-4 group-data-[state=collapsed]:p-2 mt-auto transition-all duration-300">
        <SidebarMenu>
          <SidebarMenuItem className="flex justify-center">
            <SidebarMenuButton
              tooltip="Terminate Session"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors"
              onClick={() => {
                localStorage.removeItem("HireArc_Admin_Token");
                window.location.href = "/admin/login";
              }}
            >
              <LogOut className="size-5 shrink-0" />
              {!collapsed && (
                <span className="text-[13px] font-bold tracking-tight">Sign out</span>
              )}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
