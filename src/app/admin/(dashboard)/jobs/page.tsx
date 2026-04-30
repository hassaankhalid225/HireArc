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
  Loader2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { apiClient } from "@/services/api";
import { Job } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export default function JobManagement() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);

  useEffect(() => {
    fetchJobs();
  }, [page]);

  const fetchJobs = async () => {
    try {
      setIsLoading(true);
      const data = await apiClient.get<Job[]>(`/admin/jobs?limit=50&skip=${page * 50}`);
      setJobs(data);
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteJob = async (jobId: string) => {
    if (!confirm("Are you sure you want to delete this job listing?")) return;
    try {
      await apiClient.delete(`/admin/jobs/${jobId}`);
      setJobs(jobs.filter(j => j.job_id !== jobId));
    } catch (error) {
      alert("Failed to delete job");
    }
  };

  const toggleStatus = async (jobId: string, currentStatus: boolean) => {
    try {
      await apiClient.patch(`/admin/jobs/${jobId}/status?is_active=${!currentStatus}`, {});
      setJobs(jobs.map(j => j.job_id === jobId ? { ...j, is_active: !currentStatus } : j));
    } catch (error) {
      alert("Failed to update status");
    }
  };

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    job.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Job Management</h1>
          <p className="text-muted-foreground mt-1">Audit and control all job listings across the platform.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search by title or company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-10 rounded-xl"
            />
          </div>
          <div className="flex items-center gap-2 bg-accent/50 p-1 rounded-xl border">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setPage(Math.max(0, page - 1))}
              disabled={page === 0}
              className="h-8 w-8"
            >
              <ChevronLeft size={16} />
            </Button>
            <span className="text-[10px] font-bold px-2 uppercase tracking-widest">Page {page + 1}</span>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setPage(page + 1)}
              className="h-8 w-8"
            >
              <ChevronRight size={16} />
            </Button>
          </div>
        </div>
      </div>

      <Card className="border-none shadow-xl overflow-hidden">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-accent/30">
              <TableRow>
                <TableHead className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">Job Details</TableHead>
                <TableHead className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">Company</TableHead>
                <TableHead className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">Location</TableHead>
                <TableHead className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">Source</TableHead>
                <TableHead className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">Status</TableHead>
                <TableHead className="px-6 py-4 font-bold uppercase tracking-wider text-[10px] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <AnimatePresence>
                {isLoading ? (
                  Array.from({ length: 8 }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell className="px-6 py-4"><Skeleton className="h-4 w-40" /></TableCell>
                      <TableCell className="px-6 py-4"><Skeleton className="h-4 w-24" /></TableCell>
                      <TableCell className="px-6 py-4"><Skeleton className="h-4 w-24" /></TableCell>
                      <TableCell className="px-6 py-4"><Skeleton className="h-4 w-16" /></TableCell>
                      <TableCell className="px-6 py-4"><Skeleton className="h-6 w-20 rounded-full" /></TableCell>
                      <TableCell className="px-6 py-4 text-right"><Skeleton className="h-8 w-16 ml-auto" /></TableCell>
                    </TableRow>
                  ))
                ) : filteredJobs.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-64 text-center">
                      <div className="flex flex-col items-center justify-center opacity-50">
                        <Briefcase className="w-12 h-12 mb-4" />
                        <p className="font-medium">No job listings found in node database.</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredJobs.map((job) => (
                    <motion.tr 
                      key={job.job_id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="group border-b hover:bg-accent/30 transition-colors"
                    >
                      <TableCell className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-bold text-sm truncate max-w-[250px]">{job.title}</span>
                          <span className="text-[10px] text-muted-foreground flex items-center gap-1 mt-1 font-medium">
                            <Calendar size={10} /> {job.posted_at || "Recently Synced"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center">
                            <Building2 size={14} className="text-primary" />
                          </div>
                          <span className="text-sm font-semibold">{job.company}</span>
                        </div>
                      </TableCell>
                      <TableCell className="px-6 py-4 text-sm font-medium text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <MapPin size={14} className="opacity-50" />
                          {job.location}
                        </div>
                      </TableCell>
                      <TableCell className="px-6 py-4">
                        <Badge variant="secondary" className="text-[9px] font-bold uppercase tracking-tight px-1.5 py-0">
                          {job.source}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-6 py-4">
                        <Button 
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleStatus(job.job_id, job.is_active ?? true)}
                          className={cn(
                            "h-7 px-2.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all",
                            (job.is_active ?? true) 
                              ? "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20" 
                              : "bg-rose-500/10 text-rose-500 hover:bg-rose-500/20"
                          )}
                        >
                          {(job.is_active ?? true) ? <Power size={10} /> : <PowerOff size={10} />}
                          {(job.is_active ?? true) ? "Active" : "Paused"}
                        </Button>
                      </TableCell>
                      <TableCell className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button variant="ghost" size="icon" asChild>
                            <a href={job.apply_link || "#"} target="_blank" rel="noopener noreferrer">
                              <ExternalLink size={16} className="text-primary" />
                            </a>
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => deleteJob(job.job_id)}
                            className="text-rose-500 hover:text-rose-600 hover:bg-rose-500/10"
                          >
                            <Trash2 size={16} />
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
