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
  Loader2 
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
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">User Management</h1>
          <p className="text-muted-foreground mt-1">Manage user access control, roles, and security permissions.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-10 rounded-xl"
            />
          </div>
          <select 
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-4 h-10 bg-accent/50 border border-input rounded-xl text-sm focus:ring-1 focus:ring-primary outline-none font-medium"
          >
            <option value="all">All Roles</option>
            <option value="admin">Admins</option>
            <option value="user">Job Seekers</option>
            <option value="company">Employers</option>
          </select>
        </div>
      </div>

      <Card className="border-none shadow-xl overflow-hidden">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-accent/30">
              <TableRow>
                <TableHead className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">Identity</TableHead>
                <TableHead className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">Permission Level</TableHead>
                <TableHead className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">Auth Status</TableHead>
                <TableHead className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">Registration</TableHead>
                <TableHead className="px-6 py-4 font-bold uppercase tracking-wider text-[10px] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <AnimatePresence>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-64 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
                        <p className="text-muted-foreground font-medium">Syncing user database...</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-64 text-center">
                      <div className="flex flex-col items-center justify-center opacity-50">
                        <Users className="w-12 h-12 mb-4" />
                        <p className="font-medium">No users found matching filters.</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user) => (
                    <motion.tr 
                      key={user.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="group border-b hover:bg-accent/30 transition-colors"
                    >
                      <TableCell className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10 border-2 border-accent">
                            <AvatarImage src={user.avatarUrl} />
                            <AvatarFallback className="bg-primary/10 text-primary font-bold">
                              {user.name[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <span className="text-sm font-bold">{user.name}</span>
                            <span className="text-xs text-muted-foreground">{user.email}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="px-6 py-4">
                        <Badge variant="secondary" className={cn(
                          "text-[9px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full",
                          user.role === "admin" ? "bg-amber-500/10 text-amber-500 border-amber-500/20" :
                          user.role === "company" ? "bg-blue-500/10 text-blue-500 border-blue-500/20" :
                          "bg-slate-500/10 text-slate-500 border-slate-500/20"
                        )}>
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-emerald-500 font-bold text-[10px] uppercase tracking-wider">
                          <CheckCircle size={14} />
                          Verified
                        </div>
                      </TableCell>
                      <TableCell className="px-6 py-4 text-[11px] font-semibold text-muted-foreground uppercase">
                        Oct 12, 2023
                      </TableCell>
                      <TableCell className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => updateRole(user.id, user.role === "admin" ? "user" : "admin")}
                            title={user.role === "admin" ? "Demote to User" : "Promote to Admin"}
                            className="text-amber-500 hover:text-amber-600 hover:bg-amber-500/10"
                          >
                            <Shield size={18} />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => deleteUser(user.id)}
                            className="text-rose-500 hover:text-rose-600 hover:bg-rose-500/10"
                          >
                            <Trash2 size={18} />
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
    </div>
  );
}
