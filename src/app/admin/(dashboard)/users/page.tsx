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
  ChevronRight
} from "lucide-react";
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
    <div className="space-y-10 pb-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-accent/20 p-10 rounded-[3rem] border border-accent/30 shadow-inner">
        <div>
          <div className="flex items-center gap-2 text-primary font-bold mb-3">
            <ShieldCheck className="w-5 h-5 fill-primary/20" />
            <span className="text-[11px] uppercase tracking-[0.3em] font-black">Identity Service</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground">Personnel Matrix</h1>
          <p className="text-muted-foreground font-medium mt-2 text-lg max-w-xl">Global access control system for managing user permissions, audit logs, and security clearance.</p>
        </div>
        <div className="flex items-center gap-4">
          <Button className="h-16 px-10 rounded-[2rem] font-black shadow-xl shadow-primary/20 hover:scale-105 transition-all active:scale-95 bg-primary text-primary-foreground">
            <UserPlus className="mr-3 h-6 w-6" />
            Provision User
          </Button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between bg-card/20 p-6 rounded-[2rem] border border-border/40 backdrop-blur-sm">
        <div className="relative w-full md:w-[450px] group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5 group-focus-within:text-primary transition-colors" />
          <Input 
            placeholder="Search identity by name or digital address..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-14 h-14 rounded-2xl bg-background/50 border-none focus-visible:ring-2 focus-visible:ring-primary/10 text-base font-medium"
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 bg-accent/10 p-1.5 rounded-2xl border border-accent/20">
            {["all", "admin", "user", "company"].map(role => (
              <button
                key={role}
                onClick={() => setFilterRole(role)}
                className={cn(
                  "px-6 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all whitespace-nowrap",
                  filterRole === role 
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-105" 
                    : "text-muted-foreground hover:bg-accent/40 hover:text-foreground"
                )}
              >
                {role === "all" ? "All Identities" : role === "user" ? "Seekers" : role === "company" ? "Employers" : "Admins"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Table Card */}
      <Card className="border-none shadow-2xl rounded-[3rem] bg-card/30 backdrop-blur-2xl overflow-hidden border border-white/5">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-accent/20 border-b border-border/50">
              <TableRow className="border-none hover:bg-transparent">
                <TableHead className="px-10 py-7 text-[11px] font-black uppercase tracking-[0.3em] text-muted-foreground">Identity Cluster</TableHead>
                <TableHead className="px-10 py-7 text-[11px] font-black uppercase tracking-[0.3em] text-muted-foreground">Authorization Level</TableHead>
                <TableHead className="px-10 py-7 text-[11px] font-black uppercase tracking-[0.3em] text-muted-foreground">Auth State</TableHead>
                <TableHead className="px-10 py-7 text-[11px] font-black uppercase tracking-[0.3em] text-muted-foreground">Registry Date</TableHead>
                <TableHead className="px-10 py-7 text-[11px] font-black uppercase tracking-[0.3em] text-muted-foreground text-right">Overrides</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <AnimatePresence mode="popLayout">
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-96 text-center">
                      <div className="flex flex-col items-center justify-center space-y-4">
                        <div className="relative">
                          <Loader2 className="w-12 h-12 animate-spin text-primary" />
                          <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse" />
                        </div>
                        <p className="text-xl font-black tracking-tighter text-foreground uppercase opacity-50">Syncing Identity Matrix...</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-96 text-center">
                      <div className="flex flex-col items-center justify-center opacity-30 space-y-4">
                        <Users className="w-20 h-20" />
                        <p className="text-2xl font-black tracking-tighter uppercase">No Identity Fragments Found</p>
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
                      className="group border-b border-border/30 hover:bg-primary/5 transition-all duration-500 ease-out"
                    >
                      <TableCell className="px-10 py-8">
                        <div className="flex items-center gap-5">
                          <div className="relative group/avatar">
                            <Avatar className="h-14 w-14 border-4 border-card shadow-lg transition-transform group-hover/avatar:scale-110 duration-500">
                              <AvatarImage src={user.avatarUrl} />
                              <AvatarFallback className="bg-primary/10 text-primary font-black text-lg">
                                {user.name[0]}
                              </AvatarFallback>
                            </Avatar>
                            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-card" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xl font-black text-foreground tracking-tight group-hover:text-primary transition-colors">{user.name}</span>
                            <span className="text-xs text-muted-foreground font-bold italic opacity-70">{user.email}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="px-10 py-8">
                        <Badge variant="outline" className={cn(
                          "text-[10px] font-black uppercase tracking-[0.15em] px-4 py-1.5 rounded-full border-2 transition-all",
                          user.role === "admin" ? "bg-amber-500/10 text-amber-500 border-amber-500/30 shadow-lg shadow-amber-500/10" :
                          user.role === "company" ? "bg-blue-500/10 text-blue-500 border-blue-500/30 shadow-lg shadow-blue-500/10" :
                          "bg-slate-500/10 text-slate-500 border-slate-500/30 shadow-lg shadow-slate-500/10"
                        )}>
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-10 py-8">
                        <div className="flex items-center gap-2.5 text-emerald-500 font-black text-[10px] uppercase tracking-widest bg-emerald-500/5 w-fit px-4 py-1.5 rounded-full border border-emerald-500/10">
                          <CheckCircle size={14} className="fill-emerald-500/10" />
                          Active
                        </div>
                      </TableCell>
                      <TableCell className="px-10 py-8 text-[11px] font-black text-muted-foreground uppercase tracking-wider opacity-60">
                        October 12, 2023
                      </TableCell>
                      <TableCell className="px-10 py-8 text-right">
                        <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0">
                          <Button 
                            variant="outline" 
                            size="icon"
                            onClick={() => updateRole(user.id, user.role === "admin" ? "user" : "admin")}
                            className="h-11 w-11 rounded-xl border-2 hover:bg-amber-500 hover:text-white hover:border-amber-500 transition-all text-amber-500"
                          >
                            <Shield className="h-5 w-5" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="icon" 
                            onClick={() => deleteUser(user.id)}
                            className="h-11 w-11 rounded-xl border-2 hover:bg-rose-500 hover:text-white hover:border-rose-500 transition-all text-rose-500"
                          >
                            <Trash2 className="h-5 w-5" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-11 w-11 rounded-xl hover:bg-accent/40 text-muted-foreground hover:text-foreground">
                            <MoreVertical size={20} />
                          </Button>
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
      <div className="flex items-center justify-between p-8 bg-card/40 backdrop-blur-xl rounded-[2.5rem] border border-border/30 group cursor-pointer hover:border-primary/30 transition-all">
        <div className="flex items-center gap-6">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:rotate-3 transition-transform">
            <ShieldAlert size={28} />
          </div>
          <div>
            <h4 className="text-lg font-black text-foreground">Privilege Escalation Queue</h4>
            <p className="text-sm font-bold text-muted-foreground italic">4 accounts are requesting administrative clearance levels.</p>
          </div>
        </div>
        <Button variant="link" className="font-black uppercase tracking-widest text-[11px] text-primary hover:no-underline flex items-center gap-2">
          Process Requests
          <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
}
