"use client";
import React, { useEffect, useState } from "react";
import { 
  Briefcase, 
  Search, 
  MapPin, 
  ExternalLink, 
  Trash2, 
  Power,
  PowerOff,
  Building2,
  Calendar,
  Loader2,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { apiClient } from "@/services/api";
import { Job } from "@/types";
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
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Job Management</h1>
          <p className="text-slate-500 dark:text-slate-400">Control all job listings published on the platform.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search jobs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:ring-2 focus:ring-primary/50 transition-all w-full md:w-64"
            />
          </div>
          <div className="flex items-center gap-2 border border-slate-200 dark:border-slate-800 rounded-xl p-1 bg-white dark:bg-[#1E293B]">
            <button 
              onClick={() => setPage(Math.max(0, page - 1))}
              className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg disabled:opacity-50"
              disabled={page === 0}
            >
              <ChevronLeft size={18} />
            </button>
            <span className="text-xs font-bold px-2">Page {page + 1}</span>
            <button 
              onClick={() => setPage(page + 1)}
              className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-[#1E293B] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
                <th className="px-6 py-4">Job Title</th>
                <th className="px-6 py-4">Company</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Source</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              <AnimatePresence>
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-20 text-center">
                      <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
                      <p className="text-slate-500">Loading jobs...</p>
                    </td>
                  </tr>
                ) : filteredJobs.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-20 text-center">
                      <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                      <p className="text-slate-500 font-medium">No jobs found</p>
                    </td>
                  </tr>
                ) : (
                  filteredJobs.map((job) => (
                    <motion.tr 
                      key={job.job_id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-bold text-slate-900 dark:text-white truncate max-w-[200px]">{job.title}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Calendar size={12} className="text-slate-400" />
                            <span className="text-[10px] text-slate-500">{job.posted_at || "Recent"}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Building2 size={14} className="text-slate-400" />
                          <span className="text-sm text-slate-700 dark:text-slate-300 font-medium">{job.company}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <MapPin size={14} className="text-slate-400" />
                          <span className="text-sm text-slate-500 truncate max-w-[120px]">{job.location}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 uppercase tracking-tight">
                          {job.source}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button 
                          onClick={() => toggleStatus(job.job_id, job.is_active ?? true)}
                          className={cn(
                            "flex items-center gap-1.5 font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full",
                            (job.is_active ?? true) ? "bg-emerald-100 text-emerald-600" : "bg-rose-100 text-rose-600"
                          )}
                        >
                          {(job.is_active ?? true) ? <Power size={12} /> : <PowerOff size={12} />}
                          {(job.is_active ?? true) ? "Active" : "Paused"}
                        </button>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <a 
                            href={job.apply_link || "#"} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="p-2 hover:bg-blue-50 text-blue-500 rounded-lg transition-colors"
                          >
                            <ExternalLink size={18} />
                          </a>
                          <button 
                            onClick={() => deleteJob(job.job_id)}
                            className="p-2 hover:bg-rose-50 text-rose-500 rounded-lg transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
