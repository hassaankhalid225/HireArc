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
import { 
  Briefcase, 
  Search, 
  Building2, 
  Calendar, 
  MapPin, 
  Power, 
  PowerOff, 
  ChevronLeft, 
  ChevronRight, 
  Trash2, 
  ExternalLink,
  Filter,
  ArrowUpRight,
  Plus,
  Zap,
  Clock,
  MoreVertical,
  Globe
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { apiClient } from "@/services/api";
import { Job } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function JobManagement() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [totalJobs, setTotalJobs] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(0);
  const limit = 20;

  useEffect(() => {
    fetchJobs();
  }, [page]);

  const fetchJobs = async () => {
    try {
      setIsLoading(true);
      const skip = page * limit;
      const response = await apiClient.get<any>(`/admin/jobs?skip=${skip}&limit=${limit}`);
      if (Array.isArray(response)) {
        setJobs(response);
      } else {
        setJobs(response.jobs);
        setTotalJobs(response.total);
      }
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleJobStatus = async (jobId: string, currentStatus: boolean) => {
    try {
      await apiClient.patch(`/jobs/${jobId}/status`, { is_active: !currentStatus });
      setJobs(jobs.map(j => j.job_id === jobId ? { ...j, is_active: !currentStatus } : j));
    } catch (error) {
      alert("Failed to update status");
    }
  };

  const deleteJob = async (jobId: string) => {
    if (!confirm("Are you sure? This is permanent.")) return;
    try {
      await apiClient.delete(`/jobs/${jobId}`);
      setJobs(jobs.filter(j => j.job_id !== jobId));
    } catch (error) {
      alert("Failed to delete job");
    }
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (job.company || "").toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || 
                          (statusFilter === "active" && job.is_active) || 
                          (statusFilter === "archived" && !job.is_active);
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex flex-col gap-12 pb-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 py-10 border-b border-hairline">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-ink/40 font-bold mb-1">
            <Briefcase size={12} className="fill-current animate-pulse text-indigo-500" />
            <span className="text-[9px] uppercase tracking-[0.3em]">Marketplace Core Protocol</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-headline tracking-tighter text-ink leading-none">Marketplace Index</h1>
          <p className="text-body text-lg max-w-xl font-medium leading-relaxed opacity-70">Central synchronization hub for all active job vectors and employment opportunities across the platform.</p>
        </div>
        <div className="shrink-0">
          <Button size="lg" className="rounded-pill font-bold text-[10px] uppercase tracking-widest bg-ink text-canvas hover:opacity-90 transition-all shadow-xl shadow-ink/10">
            <Plus className="mr-2 size-3.5" />
            Initialize Vector
          </Button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col lg:flex-row gap-6 items-center justify-between bg-canvas-soft/30 p-8 rounded-2xl border border-hairline backdrop-blur-md">
        <div className="relative w-full lg:w-[500px] group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-muted size-5 group-focus-within:text-ink transition-colors" />
          <Input 
            placeholder="Search vectors by title or corporate node..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-14 h-14 rounded-xl bg-surface-card border-hairline focus-visible:ring-2 focus-visible:ring-ink/10 text-sm font-medium placeholder:text-muted/40 transition-all"
          />
        </div>
        <div className="flex items-center gap-3 w-full lg:w-auto overflow-x-auto no-scrollbar pb-2 lg:pb-0">
          <div className="flex items-center gap-1.5 bg-canvas-soft p-1.5 rounded-pill border border-hairline shadow-inner">
            {["All", "Active", "Archived", "Flagged"].map(filter => (
              <button
                key={filter}
                onClick={() => setStatusFilter(filter.toLowerCase())}
                className={cn(
                  "px-6 py-2.5 rounded-pill text-[10px] font-bold uppercase tracking-[0.2em] transition-all whitespace-nowrap",
                  statusFilter === filter.toLowerCase() 
                    ? "bg-ink text-canvas shadow-lg shadow-ink/10" 
                    : "text-muted hover:bg-surface-card hover:text-ink"
                )}
              >
                {filter}
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
                <TableHead className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.3em] text-muted">Vector Identity</TableHead>
                <TableHead className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.3em] text-muted">Corporate Node</TableHead>
                <TableHead className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.3em] text-muted">Status</TableHead>
                <TableHead className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.3em] text-muted">Auth Date</TableHead>
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
                            <Skeleton className="h-5 w-48" />
                            <Skeleton className="h-3 w-32" />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="px-8 py-6"><Skeleton className="h-6 w-32" /></TableCell>
                      <TableCell className="px-8 py-6"><Skeleton className="h-7 w-20 rounded-pill" /></TableCell>
                      <TableCell className="px-8 py-6"><Skeleton className="h-4 w-28" /></TableCell>
                      <TableCell className="px-8 py-6 text-right"><Skeleton className="h-10 w-10 rounded-xl ml-auto" /></TableCell>
                    </TableRow>
                  ))
                ) : filteredJobs.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-96 text-center">
                      <div className="flex flex-col items-center justify-center gap-6 opacity-20 group">
                        <div className="size-20 rounded-full bg-canvas-soft flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                          <Briefcase size={48} />
                        </div>
                        <p className="text-sm font-bold tracking-[0.25em] uppercase">No Active Job Vectors Syncing</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredJobs.map((job) => (
                    <motion.tr 
                      key={job.job_id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="group border-b border-hairline hover:bg-canvas-soft/50 transition-all duration-300 cursor-pointer"
                    >
                      <TableCell className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="size-12 rounded-xl bg-canvas-soft flex items-center justify-center transition-transform group-hover:scale-110 group-hover:bg-ink group-hover:text-canvas shadow-sm">
                            <Briefcase size={20} />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-base font-bold text-ink leading-tight group-hover:text-indigo-600 transition-colors line-clamp-1">{job.title}</span>
                            <div className="flex items-center gap-3 mt-1.5">
                              <span className="text-[10px] text-muted font-bold flex items-center gap-1.5 uppercase tracking-wider">
                                <MapPin size={12} className="text-ink/40" />
                                {job.location}
                              </span>
                              <span className="text-[10px] text-muted font-bold flex items-center gap-1.5 uppercase tracking-wider">
                                <Zap size={12} className="text-ink/40" />
                                {job.job_type || "Full-time"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="px-8 py-6">
                        <div className="flex items-center gap-3">
                          <div className="size-8 rounded-lg bg-canvas-soft border border-hairline flex items-center justify-center text-[10px] font-black text-ink shadow-sm">
                            {(job.company || "?")[0]}
                          </div>
                          <span className="text-xs font-bold text-ink uppercase tracking-widest">{job.company}</span>
                        </div>
                      </TableCell>
                      <TableCell className="px-8 py-6">
                        <Badge variant="outline" className={cn(
                          "text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-pill border transition-all",
                          job.is_active 
                            ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" 
                            : "bg-rose-500/10 text-rose-600 border-rose-500/20"
                        )}>
                          {job.is_active ? "Propagating" : "Offline"}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-8 py-6 text-[11px] font-bold text-muted uppercase tracking-[0.15em] opacity-60">
                        <div className="flex items-center gap-2">
                          <Clock size={12} />
                          {job.posted_at ? new Date(job.posted_at).toLocaleDateString() : "Recent"}
                        </div>
                      </TableCell>
                      <TableCell className="px-8 py-6 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                          <Button 
                            variant="outline" 
                            size="icon"
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleJobStatus(job.job_id, job.is_active || false);
                            }}
                            className={cn(
                              "size-10 rounded-xl border-hairline transition-all shadow-sm",
                              job.is_active ? "text-rose-600 hover:bg-rose-500/10 hover:border-rose-500/30" : "text-emerald-600 hover:bg-emerald-500/10 hover:border-emerald-500/30"
                            )}
                          >
                            {job.is_active ? <PowerOff size={16} /> : <Power size={16} />}
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
                              <DropdownMenuLabel className="text-[10px] uppercase tracking-[0.25em] font-black text-muted/60 px-4 py-3">Vector Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator className="bg-hairline/50 mx-2" />
                              <DropdownMenuItem className="rounded-xl px-4 py-3 cursor-pointer focus:bg-canvas-soft focus:text-ink transition-colors group/item">
                                <ExternalLink className="mr-3 size-4 text-muted group-hover/item:text-ink" />
                                <span className="font-bold text-[10px] uppercase tracking-[0.2em]">Live View</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="rounded-xl px-4 py-3 cursor-pointer focus:bg-canvas-soft focus:text-ink transition-colors group/item">
                                <Building2 className="mr-3 size-4 text-muted group-hover/item:text-ink" />
                                <span className="font-bold text-[10px] uppercase tracking-[0.2em]">Corporate Profile</span>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator className="bg-hairline/50 mx-2" />
                              <DropdownMenuItem 
                                className="rounded-xl px-4 py-3 cursor-pointer text-rose-600 focus:bg-rose-500/10 focus:text-rose-600 transition-colors group/item"
                                onClick={() => deleteJob(job.job_id)}
                              >
                                <Trash2 className="mr-3 size-4 transition-transform group-hover/item:-translate-x-0.5" />
                                <span className="font-bold text-[10px] uppercase tracking-[0.2em]">Decommission</span>
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
      
      {/* Pagination Cluster */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-8 bg-surface-card rounded-2xl border border-hairline shadow-premium-sm transition-all hover:border-hairline-strong">
        <div className="flex flex-col gap-1">
            <p className="text-[10px] font-black text-muted uppercase tracking-[0.3em]">Registry Synchronization</p>
            <p className="text-xs font-bold text-ink uppercase tracking-widest leading-none">
                Showing <span className="text-indigo-500">{jobs.length}</span> of <span className="text-indigo-500">{totalJobs.toLocaleString()}</span> Marketplace Vectors
            </p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => setPage(p => Math.max(0, p - 1))}
            disabled={page === 0}
            className="size-11 rounded-xl border-hairline hover:bg-canvas-soft transition-all disabled:opacity-20 shadow-sm"
          >
            <ChevronLeft size={20} />
          </Button>
          <div className="flex items-center px-6 h-11 bg-canvas-soft rounded-pill border border-hairline font-black text-[10px] uppercase tracking-[0.25em] text-ink shadow-inner">
            Cluster <span className="ml-3 text-indigo-500">{page + 1}</span>
          </div>
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => setPage(p => p + 1)}
            disabled={(page + 1) * limit >= totalJobs}
            className="size-11 rounded-xl border-hairline hover:bg-canvas-soft transition-all disabled:opacity-20 shadow-sm"
          >
            <ChevronRight size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
}
