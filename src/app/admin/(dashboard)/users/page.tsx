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
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Users, 
  Search, 
  Shield, 
  Trash2, 
  CheckCircle, 
  Loader2,
  Filter,
  UserPlus,
  ShieldCheck,
  ShieldAlert,
  MoreVertical,
  ChevronRight,
  Eye,
  UserCheck,
  UserMinus,
  Mail
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { motion, AnimatePresence } from "framer-motion";
import { apiClient } from "@/services/api";
import { User } from "@/types";
import { cn } from "@/lib/utils";

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState("all");

  useEffect(() => {
    fetchUsers();
  }, []);

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
    <div className="space-y-12 pb-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 py-8 border-b border-hairline">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-ink/40 font-bold mb-1">
            <ShieldCheck className="w-4 h-4 fill-current opacity-20" />
            <span className="text-[9px] uppercase tracking-[0.25em]">Identity Service</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-headline tracking-tighter text-ink leading-[0.9]">Access Control</h1>
          <p className="text-body text-base max-w-xl font-medium leading-relaxed opacity-70">Global system for managing user permissions, audit logs, and security clearance.</p>
        </div>
        <div>
          <Button className="h-11 px-8 rounded-pill font-bold text-[10px] uppercase tracking-widest bg-ink text-canvas hover:opacity-90 transition-all shadow-lg shadow-ink/10">
            <UserPlus className="mr-2 h-3.5 w-3.5" />
            Provision User
          </Button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-8 items-center justify-between bg-canvas-soft/30 p-6 rounded-xl border border-hairline">
        <div className="relative w-full md:w-[450px] group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-muted w-5 h-5 group-focus-within:text-ink transition-colors" />
          <Input 
            placeholder="Search identity by name or digital address..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-14 h-12 rounded-xl bg-surface-card border-hairline focus-visible:ring-2 focus-visible:ring-ink/10 text-sm font-medium"
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 bg-canvas-soft p-1.5 rounded-pill border border-hairline">
            {["all", "admin", "user", "company"].map(role => (
              <button
                key={role}
                onClick={() => setFilterRole(role)}
                className={cn(
                  "px-6 py-2 rounded-pill text-[11px] font-bold uppercase tracking-widest transition-all whitespace-nowrap",
                  filterRole === role 
                    ? "bg-ink text-canvas shadow-premium-sm" 
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
      <Card className="border border-hairline shadow-premium-sm rounded-xl bg-surface-card overflow-hidden">
        <CardContent className="p-0 overflow-x-auto no-scrollbar">
          <Table className="min-w-[1000px]">
            <TableHeader className="bg-canvas-soft/50 border-b border-hairline">
              <TableRow className="border-none hover:bg-transparent">
                <TableHead className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-muted">Identity Cluster</TableHead>
                <TableHead className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-muted">Authorization</TableHead>
                <TableHead className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-muted">Auth State</TableHead>
                <TableHead className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-muted">Registry Date</TableHead>
                <TableHead className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-muted text-right">Overrides</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <AnimatePresence mode="popLayout">
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-96 text-center">
                      <div className="flex flex-col items-center justify-center space-y-4">
                        <Loader2 className="w-10 h-10 animate-spin text-ink opacity-20" />
                        <p className="text-sm font-bold tracking-widest text-muted uppercase">Syncing Identity Matrix...</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-96 text-center">
                      <div className="flex flex-col items-center justify-center opacity-20 space-y-4">
                        <Users className="w-16 h-16" />
                        <p className="text-sm font-bold tracking-widest uppercase">No Identity Fragments Found</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user) => (
                    <motion.tr 
                      key={user.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="group border-b border-hairline hover:bg-canvas-soft/50 transition-all duration-300"
                    >
                      <TableCell className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-12 w-12 border border-hairline shadow-sm">
                            <AvatarImage src={user.avatarUrl} />
                            <AvatarFallback className="bg-canvas-soft text-ink font-bold text-base">
                              {user.name[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <span className="text-base font-bold text-ink leading-tight">{user.name}</span>
                            <span className="text-xs text-muted font-medium">{user.email}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="px-8 py-6">
                        <Badge variant="outline" className={cn(
                          "text-[9px] font-bold uppercase tracking-wider px-3 py-1 rounded-pill border transition-all",
                          user.role === "admin" ? "bg-amber-500/5 text-amber-600 border-amber-500/20" :
                          user.role === "company" ? "bg-ink/5 text-ink border-hairline" :
                          "bg-canvas-soft text-muted border-hairline"
                        )}>
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-8 py-6">
                        <div className="flex items-center gap-2 text-emerald-600 font-bold text-[10px] uppercase tracking-widest bg-emerald-500/5 w-fit px-3 py-1 rounded-pill border border-emerald-500/10">
                          <CheckCircle size={12} />
                          Active
                        </div>
                      </TableCell>
                      <TableCell className="px-8 py-6 text-[11px] font-bold text-muted uppercase tracking-wider opacity-60">
                        Oct 12, 2023
                      </TableCell>
                      <TableCell className="px-8 py-6 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                          <Button 
                            variant="outline" 
                            size="icon"
                            onClick={() => updateRole(user.id, user.role === "admin" ? "user" : "admin")}
                            className="h-10 w-10 rounded-xl border-hairline hover:bg-ink hover:text-canvas transition-all"
                          >
                            <Shield className="h-4 w-4" />
                          </Button>
                          
                          <DropdownMenu>
                            <DropdownMenuTrigger 
                              render={
                                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-canvas-soft text-muted hover:text-ink" />
                              }
                            >
                              <MoreVertical size={18} />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56 rounded-xl p-2 border-hairline shadow-premium bg-surface-card">
                              <DropdownMenuLabel className="text-[10px] uppercase tracking-widest font-bold text-muted px-3 py-2">Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="rounded-lg px-3 py-2.5 cursor-pointer focus:bg-canvas-soft focus:text-ink">
                                <Eye className="mr-2 h-4 w-4" />
                                <span className="font-bold text-xs uppercase tracking-wider">View Profile</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="rounded-lg px-3 py-2.5 cursor-pointer focus:bg-canvas-soft focus:text-ink">
                                <Mail className="mr-2 h-4 w-4" />
                                <span className="font-bold text-xs uppercase tracking-wider">Contact User</span>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                onClick={() => updateRole(user.id, "company")}
                                className="rounded-lg px-3 py-2.5 cursor-pointer focus:bg-canvas-soft focus:text-ink"
                              >
                                <UserCheck className="mr-2 h-4 w-4" />
                                <span className="font-bold text-xs uppercase tracking-wider">Convert to Employer</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                className="rounded-lg px-3 py-2.5 cursor-pointer text-rose-600 focus:bg-rose-500/10 focus:text-rose-600"
                                onClick={() => deleteUser(user.id)}
                              >
                                <UserMinus className="mr-2 h-4 w-4" />
                                <span className="font-bold text-xs uppercase tracking-wider">Terminate Session</span>
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
      <div className="flex items-center justify-between p-8 bg-surface-card rounded-xl border border-hairline shadow-premium-sm group cursor-pointer hover:border-hairline-strong transition-all">
        <div className="flex items-center gap-6">
          <div className="w-12 h-12 rounded-xl bg-canvas-soft flex items-center justify-center text-ink group-hover:scale-110 transition-transform">
            <ShieldAlert size={24} />
          </div>
          <div>
            <h4 className="text-lg font-headline text-ink">Privilege Escalation Queue</h4>
            <p className="text-sm font-medium text-body italic">4 accounts are requesting administrative clearance levels.</p>
          </div>
        </div>
        <Button variant="link" className="font-bold uppercase tracking-widest text-[11px] text-ink hover:no-underline flex items-center gap-2">
          Process Requests
          <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
}
