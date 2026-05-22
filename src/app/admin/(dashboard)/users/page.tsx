"use client";
import React, { useEffect, useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Users, 
  Search, 
  Shield, 
  CheckCircle, 
  Filter,
  UserPlus,
  ShieldCheck,
  ShieldAlert,
  MoreVertical,
  ChevronRight,
  Eye,
  UserCheck,
  UserMinus,
  Mail,
  Zap
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { motion, AnimatePresence } from "framer-motion";
import { apiClient } from "@/services/api";
import { User } from "@/types";
import { cn } from "@/lib/utils";

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState("all");

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const data = await apiClient.get<User[]>("/admin/users");
      setUsers(data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user? This action cannot be undone.")) return;
    try {
      await apiClient.delete(`/admin/users/${userId}`);
      setUsers(users.filter(u => u.id !== userId));
    } catch (error) {
      alert("Failed to delete user");
    }
  };

  const updateRole = async (userId: string, role: string) => {
    try {
      await apiClient.patch(`/admin/users/${userId}/role?role=${role}`, {});
      setUsers(users.map(u => u.id === userId ? { ...u, role: role as any } : u));
    } catch (error) {
      alert("Failed to update role");
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filterRole === "all" || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="flex flex-col gap-12 pb-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 py-10 border-b border-hairline">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-ink/40 font-bold mb-1">
            <ShieldCheck size={12} className="fill-current animate-pulse text-indigo-500" />
            <span className="text-[9px] uppercase tracking-[0.3em]">Identity Service Protocol</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-headline tracking-tighter text-ink leading-none">Access Control</h1>
          <p className="text-body text-lg max-w-xl font-medium leading-relaxed opacity-70">Global system for managing user permissions, audit logs, and security clearance.</p>
        </div>
        <div className="shrink-0">
          <Button size="lg" className="rounded-pill font-bold text-[10px] uppercase tracking-widest bg-ink text-canvas hover:opacity-90 transition-all shadow-xl shadow-ink/10">
            <UserPlus className="mr-2 size-3.5" />
            Provision User
          </Button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col lg:flex-row gap-6 items-center justify-between bg-canvas-soft/30 p-8 rounded-2xl border border-hairline backdrop-blur-md">
        <div className="relative w-full lg:w-[500px] group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-muted size-5 group-focus-within:text-ink transition-colors" />
          <Input 
            placeholder="Search identity by name or digital address..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-14 h-14 rounded-xl bg-surface-card border-hairline focus-visible:ring-2 focus-visible:ring-ink/10 text-sm font-medium placeholder:text-muted/40 transition-all"
          />
        </div>
        <div className="flex items-center gap-3 w-full lg:w-auto overflow-x-auto no-scrollbar pb-2 lg:pb-0">
          <div className="flex items-center gap-1.5 bg-canvas-soft p-1.5 rounded-pill border border-hairline shadow-inner">
            {["all", "admin", "user", "company"].map(role => (
              <button
                key={role}
                onClick={() => setFilterRole(role)}
                className={cn(
                  "px-6 py-2.5 rounded-pill text-[10px] font-bold uppercase tracking-[0.2em] transition-all whitespace-nowrap",
                  filterRole === role 
                    ? "bg-ink text-canvas shadow-lg shadow-ink/10" 
                    : "text-muted hover:bg-surface-card hover:text-ink"
                )}
              >
                {role === "all" ? "All" : role === "user" ? "Seekers" : role === "company" ? "Employers" : "Admins"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Table Card */}
      <Card className="border border-hairline shadow-premium-sm rounded-xl bg-surface-card overflow-hidden transition-all duration-500 hover:border-hairline-strong">
        <CardContent className="p-0 overflow-x-auto no-scrollbar">
          <Table className="min-w-[1000px]">
            <TableHeader className="bg-canvas-soft/50 border-b border-hairline">
              <TableRow className="border-none hover:bg-transparent">
                <TableHead className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.3em] text-muted">Identity Cluster</TableHead>
                <TableHead className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.3em] text-muted">Authorization</TableHead>
                <TableHead className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.3em] text-muted">Auth State</TableHead>
                <TableHead className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.3em] text-muted">Registry Date</TableHead>
                <TableHead className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.3em] text-muted text-right">Overrides</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <AnimatePresence mode="popLayout">
                {isLoading ? (
                  Array.from({ length: 8 }).map((_, i) => (
                    <TableRow key={i} className="border-b border-hairline/50">
                      <TableCell className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <Skeleton className="size-12 rounded-xl" />
                          <div className="flex flex-col gap-2">
                            <Skeleton className="h-5 w-32" />
                            <Skeleton className="h-3 w-48" />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="px-8 py-6"><Skeleton className="h-7 w-20 rounded-pill" /></TableCell>
                      <TableCell className="px-8 py-6"><Skeleton className="h-7 w-24 rounded-pill" /></TableCell>
                      <TableCell className="px-8 py-6"><Skeleton className="h-4 w-28" /></TableCell>
                      <TableCell className="px-8 py-6 text-right"><Skeleton className="h-10 w-10 rounded-xl ml-auto" /></TableCell>
                    </TableRow>
                  ))
                ) : filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-96 text-center">
                      <div className="flex flex-col items-center justify-center gap-6 opacity-20 group">
                        <div className="size-20 rounded-full bg-canvas-soft flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                          <Users size={48} />
                        </div>
                        <p className="text-sm font-bold tracking-[0.25em] uppercase">No Identity Fragments Found</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user) => (
                    <motion.tr 
                      key={user.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="group border-b border-hairline hover:bg-canvas-soft/50 transition-all duration-300 cursor-pointer"
                    >
                      <TableCell className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <Avatar className="size-12 rounded-xl border border-hairline shadow-sm transition-transform group-hover:scale-110">
                            <AvatarImage src={user.avatarUrl} />
                            <AvatarFallback className="bg-ink text-canvas font-bold text-base uppercase tracking-widest">
                              {user.name[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <span className="text-base font-bold text-ink leading-tight group-hover:text-indigo-600 transition-colors">{user.name}</span>
                            <span className="text-xs text-muted font-medium mt-0.5">{user.email}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="px-8 py-6">
                        <Badge variant="outline" className={cn(
                          "text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-pill border transition-all",
                          user.role === "admin" ? "bg-amber-500/10 text-amber-600 border-amber-500/20" :
                          user.role === "company" ? "bg-ink/5 text-ink border-hairline" :
                          "bg-canvas-soft text-muted border-hairline"
                        )}>
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-8 py-6">
                        <div className="flex items-center gap-2 text-emerald-600 font-bold text-[9px] uppercase tracking-[0.2em] bg-emerald-500/5 w-fit px-3 py-1.5 rounded-pill border border-emerald-500/10 shadow-sm">
                          <CheckCircle size={12} className="text-emerald-500" />
                          Authorized
                        </div>
                      </TableCell>
                      <TableCell className="px-8 py-6 text-[11px] font-bold text-muted uppercase tracking-[0.15em] opacity-60">
                        Oct 12, 2023
                      </TableCell>
                      <TableCell className="px-8 py-6 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                          <Button 
                            variant="outline" 
                            size="icon"
                            onClick={(e) => {
                                e.stopPropagation();
                                updateRole(user.id, user.role === "admin" ? "user" : "admin");
                            }}
                            className="size-10 rounded-xl border-hairline hover:bg-ink hover:text-canvas transition-all shadow-sm"
                          >
                            <Shield className="size-4" />
                          </Button>
                          
                          <DropdownMenu>
                            <DropdownMenuTrigger 
                              render={
                                <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="size-10 rounded-xl hover:bg-canvas-soft text-muted hover:text-ink transition-colors"
                                    onClick={(e) => e.stopPropagation()} 
                                />
                              }
                            >
                              <MoreVertical size={18} />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-64 rounded-2xl p-2 border-hairline shadow-premium bg-surface-card animate-in fade-in zoom-in-95 duration-300">
                              <DropdownMenuLabel className="text-[10px] uppercase tracking-[0.25em] font-black text-muted/60 px-4 py-3">Identity Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator className="bg-hairline/50 mx-2" />
                              <DropdownMenuItem className="rounded-xl px-4 py-3 cursor-pointer focus:bg-canvas-soft focus:text-ink transition-colors group/item">
                                <Eye className="mr-3 size-4 text-muted group-hover/item:text-ink" />
                                <span className="font-bold text-[10px] uppercase tracking-[0.2em]">View Dossier</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="rounded-xl px-4 py-3 cursor-pointer focus:bg-canvas-soft focus:text-ink transition-colors group/item">
                                <Mail className="mr-3 size-4 text-muted group-hover/item:text-ink" />
                                <span className="font-bold text-[10px] uppercase tracking-[0.2em]">Direct Protocol</span>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator className="bg-hairline/50 mx-2" />
                              <DropdownMenuItem 
                                onClick={() => updateRole(user.id, "company")}
                                className="rounded-xl px-4 py-3 cursor-pointer focus:bg-canvas-soft focus:text-ink transition-colors group/item"
                              >
                                <UserCheck className="mr-3 size-4 text-muted group-hover/item:text-ink" />
                                <span className="font-bold text-[10px] uppercase tracking-[0.2em]">Escalate to Employer</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                className="rounded-xl px-4 py-3 cursor-pointer text-rose-600 focus:bg-rose-500/10 focus:text-rose-600 transition-colors group/item"
                                onClick={() => deleteUser(user.id)}
                              >
                                <UserMinus className="mr-3 size-4 transition-transform group-hover/item:-translate-x-0.5" />
                                <span className="font-bold text-[10px] uppercase tracking-[0.2em]">Terminate Node</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </motion.tr>
                  ))
                )}
              </AnimatePresence>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Access Queue Notification */}
      <div className="flex items-center justify-between p-8 bg-surface-card rounded-2xl border border-hairline shadow-premium-sm group cursor-pointer hover:border-hairline-strong transition-all duration-500 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-10 opacity-[0.03] group-hover:scale-125 transition-transform duration-700">
            <Zap size={100} />
        </div>
        <div className="flex items-center gap-8 relative z-10">
          <div className="size-16 rounded-2xl bg-canvas-soft flex items-center justify-center text-ink group-hover:bg-ink group-hover:text-canvas transition-all duration-500 shadow-sm">
            <ShieldAlert size={28} />
          </div>
          <div className="flex flex-col gap-1">
            <h4 className="text-2xl font-headline text-ink tracking-tight">Privilege Escalation Queue</h4>
            <p className="text-base font-medium text-muted opacity-80 italic leading-none">4 digital entities are requesting administrative clearance level overrides.</p>
          </div>
        </div>
        <Button variant="ghost" className="rounded-pill font-black uppercase tracking-[0.2em] text-[10px] text-ink hover:bg-canvas-soft flex items-center gap-3 px-8 h-12 relative z-10">
          Process Requests
          <ChevronRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
        </Button>
      </div>
    </div>
  );
}
