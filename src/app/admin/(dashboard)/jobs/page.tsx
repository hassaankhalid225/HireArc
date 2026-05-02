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
    <div className="space-y-10 pb-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-accent/20 p-10 rounded-[3rem] border border-accent/30 shadow-inner">
        <div>
          <div className="flex items-center gap-2 text-primary font-bold mb-3">
            <Briefcase className="w-5 h-5 fill-primary/20" />
            <span className="text-[11px] uppercase tracking-[0.3em] font-black">Marketplace Core</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground">Vector Listings</h1>
          <p className="text-muted-foreground font-medium mt-2 text-lg max-w-xl">Central synchronization hub for all active job vectors and employment opportunities across the platform.</p>
        </div>
        <div className="flex items-center gap-4">
          <Button className="h-16 px-10 rounded-[2rem] font-black shadow-xl shadow-primary/20 hover:scale-105 transition-all active:scale-95 bg-primary text-primary-foreground">
            <Plus className="mr-3 h-6 w-6" />
            Initialize Vector
          </Button>
        </div>
      </div>

      {/* Filters & Controls */}
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between bg-card/20 p-6 rounded-[2rem] border border-border/40 backdrop-blur-sm">
        <div className="relative w-full md:w-[450px] group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5 group-focus-within:text-primary transition-colors" />
          <Input 
            placeholder="Search vectors by title or corporate node..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-14 h-14 rounded-2xl bg-background/50 border-none focus-visible:ring-2 focus-visible:ring-primary/10 text-base font-medium"
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2 bg-accent/10 p-1.5 rounded-2xl border border-accent/20 overflow-x-auto no-scrollbar">
            {["All", "Active", "Archived", "Flagged"].map(filter => (
              <button
                key={filter}
                onClick={() => setStatusFilter(filter.toLowerCase())}
                className={cn(
                  "px-6 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all whitespace-nowrap",
                  statusFilter === filter.toLowerCase() 
                    ? "bg-primary text-white shadow-lg shadow-primary/20 scale-105" 
                    : "text-muted-foreground hover:bg-accent/40 hover:text-foreground"
                )}
              >
                {filter}
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
                <TableHead className="px-10 py-7 text-[11px] font-black uppercase tracking-[0.3em] text-muted-foreground">Vector Identity</TableHead>
                <TableHead className="px-10 py-7 text-[11px] font-black uppercase tracking-[0.3em] text-muted-foreground">Corporate Node</TableHead>
                <TableHead className="px-10 py-7 text-[11px] font-black uppercase tracking-[0.3em] text-muted-foreground">Status</TableHead>
                <TableHead className="px-10 py-7 text-[11px] font-black uppercase tracking-[0.3em] text-muted-foreground">Auth Date</TableHead>
                <TableHead className="px-10 py-7 text-[11px] font-black uppercase tracking-[0.3em] text-muted-foreground text-right">Overrides</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <AnimatePresence mode="popLayout">
                {isLoading ? (
                  Array.from({ length: 8 }).map((_, i) => (
                    <TableRow key={i} className="border-b border-border/30">
                      <TableCell className="px-10 py-8"><Skeleton className="h-14 w-64 rounded-xl" /></TableCell>
                      <TableCell className="px-10 py-8"><Skeleton className="h-10 w-40 rounded-full" /></TableCell>
                      <TableCell className="px-10 py-8"><Skeleton className="h-8 w-24 rounded-full" /></TableCell>
                      <TableCell className="px-10 py-8"><Skeleton className="h-6 w-32 rounded-md" /></TableCell>
                      <TableCell className="px-10 py-8 text-right"><Skeleton className="h-10 w-24 ml-auto rounded-xl" /></TableCell>
                    </TableRow>
                  ))
                ) : filteredJobs.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-96 text-center">
                      <div className="flex flex-col items-center justify-center opacity-30 space-y-4">
                        <Zap className="w-20 h-20" />
                        <p className="text-2xl font-black tracking-tighter uppercase">No Active Job Vectors Syncing</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredJobs.map((job) => (
                    <motion.tr 
                      key={job.job_id}
                      layout
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="group border-b border-border/30 hover:bg-primary/5 transition-all duration-500"
                    >
                      <TableCell className="px-10 py-8">
                        <div className="flex items-center gap-5">
                          <div className="w-14 h-14 rounded-2xl bg-accent/40 flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-2">
                            <Briefcase className="w-6 h-6 text-primary" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xl font-black text-foreground tracking-tight group-hover:text-primary transition-colors line-clamp-1">{job.title}</span>
                            <div className="flex items-center gap-3 mt-1">
                              <span className="text-xs text-muted-foreground font-bold flex items-center gap-1">
                                <MapPin size={12} className="text-rose-500" />
                                {job.location}
                              </span>
                              <span className="text-xs text-muted-foreground font-bold flex items-center gap-1">
                                <Zap size={12} className="text-amber-500" />
                                {job.job_type || "Full-time"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="px-10 py-8">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-card border flex items-center justify-center text-[10px] font-black">
                            {(job.company || "?")[0]}
                          </div>
                          <span className="text-sm font-bold text-foreground opacity-80">{job.company}</span>
                        </div>
                      </TableCell>
                      <TableCell className="px-10 py-8">
                        <Badge variant="outline" className={cn(
                          "text-[9px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full border-2 transition-all",
                          job.is_active 
                            ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/30" 
                            : "bg-rose-500/10 text-rose-500 border-rose-500/30"
                        )}>
                          {job.is_active ? "Propagating" : "Offline"}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-10 py-8 text-[11px] font-black text-muted-foreground uppercase tracking-wider opacity-60">
                        <div className="flex items-center gap-2">
                          <Clock size={14} />
                          {job.posted_at ? new Date(job.posted_at).toLocaleDateString() : "Recent"}
                        </div>
                      </TableCell>
                      <TableCell className="px-10 py-8 text-right">
                        <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0">
                          <Button 
                            variant="outline" 
                            size="icon"
                            onClick={() => toggleJobStatus(job.job_id, job.is_active || false)}
                            className={cn(
                              "h-11 w-11 rounded-xl border-2 transition-all",
                              job.is_active ? "text-rose-500 hover:bg-rose-500 hover:text-white hover:border-rose-500" : "text-emerald-500 hover:bg-emerald-500 hover:text-white hover:border-emerald-500"
                            )}
                          >
                            {job.is_active ? <PowerOff size={18} /> : <Power size={18} />}
                          </Button>
                          <Button 
                            variant="outline" 
                            size="icon" 
                            onClick={() => deleteJob(job.job_id)}
                            className="h-11 w-11 rounded-xl border-2 hover:bg-rose-600 hover:text-white hover:border-rose-600 transition-all text-rose-600"
                          >
                            <Trash2 size={18} />
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
      
      {/* Pagination Cluster */}
      <div className="flex items-center justify-between p-8 bg-card/40 backdrop-blur-xl rounded-[2.5rem] border border-border/30">
        <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
          Showing <span className="text-foreground">{jobs.length}</span> of <span className="text-foreground">{totalJobs.toLocaleString()}</span> Vectors
        </p>
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            onClick={() => setPage(p => Math.max(0, p - 1))}
            disabled={page === 0}
            className="h-12 w-12 rounded-xl border-2 hover:bg-primary hover:text-white transition-all disabled:opacity-30"
          >
            <ChevronLeft size={20} />
          </Button>
          <div className="flex items-center gap-2 px-4 h-12 bg-accent/20 rounded-xl border border-accent/30 font-black text-sm">
            Node <span className="text-primary">{page + 1}</span>
          </div>
          <Button 
            variant="outline" 
            onClick={() => setPage(p => p + 1)}
            disabled={(page + 1) * limit >= totalJobs}
            className="h-12 w-12 rounded-xl border-2 hover:bg-primary hover:text-white transition-all disabled:opacity-30"
          >
            <ChevronRight size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
}
