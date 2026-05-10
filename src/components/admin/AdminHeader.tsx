"use client";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { 
  Sun, 
  Moon, 
  Bell, 
  Search, 
  User as UserIcon,
  Settings,
  LogOut,
  HelpCircle,
  Command
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function AdminHeader() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="h-20 border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl sticky top-0 z-40 px-6 md:px-8 flex items-center justify-between transition-colors duration-500">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="h-10 w-10 rounded-xl hover:bg-canvas-soft hover:text-ink text-muted transition-all" />
        
        <div className="relative hidden md:flex items-center w-80 group">
          <Search className="absolute left-4 text-muted/40 size-3.5 transition-colors group-focus-within:text-ink shrink-0" />
          <input 
            placeholder="Search terminal..." 
            className="w-full pl-10 pr-12 h-10 bg-canvas-soft/50 border border-hairline rounded-pill outline-none focus:border-ink/20 focus:bg-canvas-soft transition-all text-[11px] font-bold text-ink placeholder:text-muted/50 placeholder:font-normal uppercase tracking-widest"
          />
          <div className="absolute right-4 flex items-center gap-1 px-1.5 py-0.5 rounded border border-hairline bg-canvas text-[8px] font-bold text-muted/60 uppercase tracking-widest shadow-sm">
            <Command size={8} />
            <span>K</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Theme Toggle — Restored & Styled */}
        {mounted && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="rounded-xl text-muted hover:text-ink hover:bg-canvas-soft transition-all size-9"
          >
            {resolvedTheme === "dark" ? <Sun size={17} className="animate-in spin-in-90 duration-500" /> : <Moon size={17} className="animate-in spin-in-90 duration-500" />}
          </Button>
        )}

        <Button variant="ghost" size="icon" className="rounded-xl text-muted hover:text-ink hover:bg-canvas-soft relative group size-9">
          <Bell size={17} className="group-hover:rotate-12 transition-transform" />
          <span className="absolute top-2.5 right-2.5 size-1.5 rounded-full bg-ink border border-canvas shadow-[0_0_8px_rgba(0,0,0,0.3)]" />
        </Button>

        <div className="w-px h-6 bg-hairline mx-2 hidden sm:block" />

        <DropdownMenu>
          <DropdownMenuTrigger 
            render={
              <Button variant="ghost" className="relative flex items-center gap-4 px-2 h-12 rounded-xl hover:bg-canvas-soft transition-all group" />
            }
          >
            <Avatar className="size-9 border border-hairline group-hover:border-ink/30 transition-all shadow-sm">
              <AvatarFallback className="bg-ink text-canvas font-bold text-xs uppercase tracking-widest">HK</AvatarFallback>
            </Avatar>
            <div className="hidden lg:flex flex-col items-start text-left">
              <span className="text-xs font-bold text-ink uppercase tracking-widest">Hasan Khalid</span>
              <span className="text-[9px] text-muted font-bold uppercase tracking-[0.2em]">Super Admin</span>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-72 rounded-2xl p-3 mt-4 border-hairline bg-surface-card shadow-premium animate-in fade-in zoom-in-95 duration-300" align="end">
            <DropdownMenuLabel className="font-normal p-6 border-b border-hairline mb-2">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-xl bg-ink flex items-center justify-center text-canvas font-bold text-sm tracking-widest">HK</div>
                  <div>
                    <p className="text-sm font-bold leading-none text-ink uppercase tracking-wider">Hasan Khalid</p>
                    <p className="text-[10px] leading-none text-muted mt-1 uppercase tracking-widest">hasankhalid@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 pt-2">
                  <span className="px-3 py-1 rounded-pill bg-canvas-soft text-ink text-[9px] font-bold uppercase tracking-widest border border-hairline/50">Production Node</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <div className="p-1 flex flex-col gap-1">
              <DropdownMenuItem 
                render={
                  <Link href="/admin/settings" className="flex items-center w-full cursor-pointer rounded-xl p-3 focus:bg-canvas-soft focus:text-ink transition-colors group" />
                }
              >
                <UserIcon className="mr-4 size-4 text-muted group-hover:text-ink transition-colors" />
                <span className="font-bold text-[10px] uppercase tracking-[0.2em]">Account Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                render={
                  <Link href="/admin/settings" className="flex items-center w-full cursor-pointer rounded-xl p-3 focus:bg-canvas-soft focus:text-ink transition-colors group" />
                }
              >
                <Settings className="mr-4 size-4 text-muted group-hover:text-ink transition-colors" />
                <span className="font-bold text-[10px] uppercase tracking-[0.2em]">System Config</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer rounded-xl p-3 focus:bg-canvas-soft focus:text-ink transition-colors group">
                <HelpCircle className="mr-4 size-4 text-muted group-hover:text-ink transition-colors" />
                <span className="font-bold text-[10px] uppercase tracking-[0.2em]">Support Center</span>
              </DropdownMenuItem>
            </div>
            <DropdownMenuSeparator className="mx-2 bg-hairline h-px my-2" />
            <DropdownMenuItem 
              className="text-red-500 cursor-pointer focus:text-red-600 focus:bg-red-500/5 rounded-xl p-3 mt-1 group"
              onClick={() => {
                localStorage.removeItem("HireArc_Admin_Token");
                window.location.href = "/admin/login";
              }}
            >
              <LogOut className="mr-4 size-4 transition-transform group-hover:translate-x-1" />
              <span className="font-bold uppercase text-[10px] tracking-[0.2em]">Terminate Session</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
