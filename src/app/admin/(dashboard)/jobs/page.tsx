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
  Loader2,
  Filter,
  ArrowUpRight,
  Plus,
  Zap,
  Clock,
  MoreVertical
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { apiClient } from "@/services/api";
import { Job } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

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
    <div className="space-y-12 pb-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 py-8 border-b border-hairline">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-ink/40 font-bold mb-1">
            <Briefcase className="w-4 h-4 fill-current opacity-20" />
            <span className="text-[9px] uppercase tracking-[0.25em]">Marketplace Core</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-headline tracking-tighter text-ink leading-[0.9]">Marketplace Index</h1>
          <p className="text-body text-base max-w-xl font-medium leading-relaxed opacity-70">Central synchronization hub for all active job vectors and employment opportunities across the platform.</p>
        </div>
        <div>
          <Button className="h-11 px-8 rounded-pill font-bold text-[10px] uppercase tracking-widest bg-ink text-canvas hover:opacity-90 transition-all shadow-lg shadow-ink/10">
            <Plus className="mr-2 h-3.5 w-3.5" />
            Initialize Vector
          </Button>
        </div>
      </div>

      {/* Filters & Controls */}
      <div className="flex flex-col md:flex-row gap-8 items-center justify-between bg-canvas-soft/30 p-6 rounded-xl border border-hairline">
        <div className="relative w-full md:w-[450px] group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-muted w-5 h-5 group-focus-within:text-ink transition-colors" />
          <Input 
            placeholder="Search vectors by title or corporate node..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-14 h-12 rounded-xl bg-surface-card border-hairline focus-visible:ring-2 focus-visible:ring-ink/10 text-sm font-medium"
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 bg-canvas-soft p-1.5 rounded-pill border border-hairline">
            {["All", "Active", "Archived", "Flagged"].map(filter => (
              <button
                key={filter}
                onClick={() => setStatusFilter(filter.toLowerCase())}
                className={cn(
                  "px-6 py-2 rounded-pill text-[11px] font-bold uppercase tracking-widest transition-all whitespace-nowrap",
                  statusFilter === filter.toLowerCase() 
                    ? "bg-ink text-canvas shadow-premium-sm" 
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
      <Card className="border border-hairline shadow-premium-sm rounded-xl bg-surface-card overflow-hidden">
        <CardContent className="p-0 overflow-x-auto no-scrollbar">
          <Table>
            <TableHeader className="bg-canvas-soft/50 border-b border-hairline">
              <TableRow className="border-none hover:bg-transparent">
                <TableHead className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-muted">Vector Identity</TableHead>
                <TableHead className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-muted">Corporate Node</TableHead>
                <TableHead className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-muted">Status</TableHead>
                <TableHead className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-muted">Auth Date</TableHead>
                <TableHead className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-muted text-right">Overrides</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <AnimatePresence mode="popLayout">
                {isLoading ? (
                  Array.from({ length: 8 }).map((_, i) => (
                    <TableRow key={i} className="border-b border-hairline">
                      <TableCell className="px-8 py-6"><Skeleton className="h-10 w-64 rounded-lg opacity-20" /></TableCell>
                      <TableCell className="px-8 py-6"><Skeleton className="h-8 w-40 rounded-pill opacity-20" /></TableCell>
                      <TableCell className="px-8 py-6"><Skeleton className="h-6 w-24 rounded-pill opacity-20" /></TableCell>
                      <TableCell className="px-8 py-6"><Skeleton className="h-5 w-32 rounded opacity-20" /></TableCell>
                      <TableCell className="px-8 py-6 text-right"><Skeleton className="h-10 w-24 ml-auto rounded-lg opacity-20" /></TableCell>
                    </TableRow>
                  ))
                ) : filteredJobs.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-96 text-center">
                      <div className="flex flex-col items-center justify-center opacity-20 space-y-4">
                        <Zap className="w-16 h-16" />
                        <p className="text-sm font-bold tracking-widest uppercase">No Active Job Vectors Syncing</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredJobs.map((job) => (
                    <motion.tr 
                      key={job.job_id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="group border-b border-hairline hover:bg-canvas-soft/50 transition-all duration-300"
                    >
                      <TableCell className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-canvas-soft flex items-center justify-center transition-transform group-hover:scale-110">
                            <Briefcase className="w-4 h-4 text-ink" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-base font-bold text-ink leading-tight line-clamp-1">{job.title}</span>
                            <div className="flex items-center gap-3 mt-1">
                              <span className="text-[10px] text-muted font-bold flex items-center gap-1 uppercase tracking-wider">
                                <MapPin size={10} className="text-ink/40" />
                                {job.location}
                              </span>
                              <span className="text-[10px] text-muted font-bold flex items-center gap-1 uppercase tracking-wider">
                                <Zap size={10} className="text-ink/40" />
                                {job.job_type || "Full-time"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="px-8 py-6">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded bg-canvas-soft border border-hairline flex items-center justify-center text-[9px] font-bold">
                            {(job.company || "?")[0]}
                          </div>
                          <span className="text-xs font-bold text-body">{job.company}</span>
                        </div>
                      </TableCell>
                      <TableCell className="px-8 py-6">
                        <Badge variant="outline" className={cn(
                          "text-[9px] font-bold uppercase tracking-wider px-3 py-1 rounded-pill border transition-all",
                          job.is_active 
                            ? "bg-emerald-500/5 text-emerald-600 border-emerald-500/20" 
                            : "bg-rose-500/5 text-rose-600 border-rose-500/20"
                        )}>
                          {job.is_active ? "Propagating" : "Offline"}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-8 py-6 text-[11px] font-bold text-muted uppercase tracking-wider opacity-60">
                        <div className="flex items-center gap-2">
                          <Clock size={12} />
                          {job.posted_at ? new Date(job.posted_at).toLocaleDateString() : "Recent"}
                        </div>
                      </TableCell>
                      <TableCell className="px-8 py-6 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                          <Button 
                            variant="outline" 
                            size="icon"
                            onClick={() => toggleJobStatus(job.job_id, job.is_active || false)}
                            className={cn(
                              "h-10 w-10 rounded-xl border-hairline transition-all",
                              job.is_active ? "text-rose-600 hover:bg-rose-500/10" : "text-emerald-600 hover:bg-emerald-500/10"
                            )}
                          >
                            {job.is_active ? <PowerOff size={16} /> : <Power size={16} />}
                          </Button>
                          <Button 
                            variant="outline" 
                            size="icon" 
                            onClick={() => deleteJob(job.job_id)}
                            className="h-10 w-10 rounded-xl border-hairline hover:bg-rose-500/10 text-rose-600 transition-all"
                          >
                            <Trash2 size={16} />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-canvas-soft text-muted hover:text-ink">
                            <MoreVertical size={18} />
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
      
      {/* Pagination Cluster */}
      <div className="flex items-center justify-between p-8 bg-surface-card rounded-xl border border-hairline shadow-premium-sm">
        <p className="text-[11px] font-bold text-muted uppercase tracking-[0.2em]">
          Showing <span className="text-ink">{jobs.length}</span> of <span className="text-ink">{totalJobs.toLocaleString()}</span> Vectors
        </p>
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            onClick={() => setPage(p => Math.max(0, p - 1))}
            disabled={page === 0}
            className="h-10 w-10 rounded-xl border-hairline hover:bg-canvas-soft transition-all disabled:opacity-20"
          >
            <ChevronLeft size={18} />
          </Button>
          <div className="flex items-center px-4 h-10 bg-canvas-soft rounded-pill border border-hairline font-bold text-xs uppercase tracking-widest text-ink">
            Node <span className="ml-2 opacity-50">{page + 1}</span>
          </div>
          <Button 
            variant="outline" 
            onClick={() => setPage(p => p + 1)}
            disabled={(page + 1) * limit >= totalJobs}
            className="h-10 w-10 rounded-xl border-hairline hover:bg-canvas-soft transition-all disabled:opacity-20"
          >
            <ChevronRight size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
}
