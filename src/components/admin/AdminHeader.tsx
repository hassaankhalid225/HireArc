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
import { MobileSidebar } from "./AdminSidebar";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function AdminHeader() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="h-16 border-b bg-card/50 backdrop-blur-xl sticky top-0 z-40 px-4 md:px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <MobileSidebar />
        <div className="relative hidden md:flex items-center w-80 group">
          <Search className="absolute left-3.5 text-muted-foreground h-4 w-4 transition-colors group-focus-within:text-primary" />
          <Input 
            placeholder="Search administrative tools..." 
            className="pl-10 h-10 bg-accent/40 border-none rounded-2xl focus-visible:ring-2 focus-visible:ring-primary/20 transition-all text-sm"
          />
          <div className="absolute right-3 flex items-center gap-1 px-1.5 py-0.5 rounded border bg-background/50 text-[10px] font-bold text-muted-foreground">
            <Command size={10} />
            <span>K</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-3">
        {/* Theme Toggle */}
        {mounted && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full text-foreground hover:bg-accent/50 transition-colors"
          >
            {theme === "dark" ? <Sun size={20} className="text-amber-500" /> : <Moon size={20} className="text-blue-600" />}
          </Button>
        )}

        <Button variant="ghost" size="icon" className="rounded-full text-foreground hover:bg-accent/50 relative">
          <Bell size={20} />
        </Button>

        <div className="w-[1px] h-6 bg-border mx-1 md:mx-2 hidden sm:block" />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative flex items-center gap-2 px-1.5 h-10 rounded-full hover:bg-accent/50 transition-all group">
              <Avatar className="h-8 w-8 border-2 border-primary/20 group-hover:border-primary/50 transition-colors">
                <AvatarFallback className="bg-primary/10 text-primary font-bold text-xs uppercase">HK</AvatarFallback>
              </Avatar>
              <div className="hidden lg:flex flex-col items-start pr-2">
                <span className="text-xs font-bold text-foreground">Hasan Khalid</span>
                <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-tight">Super Admin</span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64 rounded-2xl p-2 mt-2" align="end">
            <DropdownMenuLabel className="font-normal p-4">
              <div className="flex flex-col space-y-2">
                <p className="text-sm font-bold leading-none text-foreground">Hasan Khalid</p>
                <p className="text-xs leading-none text-muted-foreground italic">hasankhalid@gmail.com</p>
                <div className="flex items-center gap-1.5 mt-2">
                  <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[9px] font-extrabold uppercase">Production Node</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="mx-2" />
            <DropdownMenuItem asChild className="cursor-pointer rounded-xl py-2.5">
              <Link href="/admin/settings" className="flex items-center w-full">
                <UserIcon className="mr-3 h-4 w-4 text-primary" />
                <span className="font-medium">Account Settings</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="cursor-pointer rounded-xl py-2.5">
              <Link href="/admin/settings" className="flex items-center w-full">
                <Settings className="mr-3 h-4 w-4 text-primary" />
                <span className="font-medium">System Config</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer rounded-xl py-2.5">
              <HelpCircle className="mr-3 h-4 w-4 text-primary" />
              <span className="font-medium">Support Center</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="mx-2" />
            <DropdownMenuItem 
              className="text-rose-500 cursor-pointer focus:text-rose-600 focus:bg-rose-50 dark:focus:bg-rose-950/30 rounded-xl py-2.5 mt-1"
              onClick={() => {
                localStorage.removeItem("JobSphere_Admin_Token");
                window.location.href = "/admin/login";
              }}
            >
              <LogOut className="mr-3 h-4 w-4" />
              <span className="font-bold uppercase text-xs tracking-wider">Terminate Session</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
