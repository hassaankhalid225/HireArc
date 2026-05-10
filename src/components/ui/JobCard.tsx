"use client";
import { Job } from "@/types";
import Link from "next/link";
import { Bookmark, MapPin, Globe, DollarSign, ArrowRight } from "lucide-react";
import { useSavedJobs } from "@/context";
import { cn } from "@/lib/utils";

export default function JobCard({ job }: { job: Job }) {
  const { toggleSave, isSaved } = useSavedJobs();
  const saved = isSaved(job.job_id);

  // Salary label — only render if at least one value is non-null
  const salaryLabel =
    job.salary_min || job.salary_max
      ? `$${job.salary_min ? Math.round(job.salary_min / 1000) : "?"}k – $${job.salary_max ? Math.round(job.salary_max / 1000) : "?"}k`
      : null;

  return (
    <Link href={`/jobs/${job.job_id}`} className="block group h-full">
      <div className="bg-surface-card border border-hairline rounded-xl p-8 transition-all duration-300 hover:border-hairline-strong hover:shadow-premium-sm h-full flex flex-col relative overflow-hidden group">
        
        <div className="flex justify-between items-start mb-8 relative z-10">
          <div className="flex gap-5">
            <div className="w-14 h-14 rounded-xl bg-canvas-soft flex items-center justify-center overflow-hidden border border-hairline group-hover:scale-105 transition-transform duration-500 font-bold text-xl uppercase text-ink">
              {job.company ? job.company.substring(0, 2) : "C"}
            </div>
            <div className="min-w-0 space-y-1">
              <h3 className="text-2xl font-headline font-normal text-ink leading-tight line-clamp-1 group-hover:text-ink transition-colors">
                {job.title}
              </h3>
              <p className="text-sm text-body font-bold uppercase tracking-wider flex items-center gap-2">
                {job.company}
                <span className="w-1 h-1 rounded-full bg-hairline" />
                <span className="text-muted font-bold text-[10px] uppercase tracking-[0.1em]">
                  via {job.source || "ATS"}
                </span>
              </p>
            </div>
          </div>

          {/* Bookmark button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleSave(job);
            }}
            title={saved ? "Remove from saved" : "Save job"}
            className={cn(
              "transition-all relative z-20 p-2.5 rounded-xl border border-hairline hover:bg-canvas-soft group/btn",
              saved ? "text-ink bg-canvas-soft border-hairline-strong shadow-inner" : "text-muted hover:text-ink"
            )}
          >
            <Bookmark className={cn("w-5 h-5 transition-all group-hover/btn:scale-110", saved && "fill-current")} />
          </button>
        </div>

        {/* Metadata Grid */}
        <div className="space-y-4 mb-8 relative z-10">
          {job.location && (
            <div className="flex items-center gap-3 text-sm text-body font-medium">
              <MapPin className="w-4 h-4 text-muted shrink-0" /> {job.location}
            </div>
          )}
          
          <div className="flex flex-wrap gap-2">
            {job.job_type && (
              <div className="px-3 py-1 rounded-pill bg-canvas-soft border border-hairline text-ink text-[10px] font-bold uppercase tracking-widest">
                {job.job_type}
              </div>
            )}
            {job.is_remote && (
              <div className="px-3 py-1 rounded-pill bg-canvas-soft border border-hairline text-ink text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                <Globe className="w-3.5 h-3.5" /> Remote
              </div>
            )}
            {salaryLabel && (
              <div className="px-3 py-1 rounded-pill bg-canvas-soft border border-hairline text-ink text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                <DollarSign className="w-3.5 h-3.5" /> {salaryLabel}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-8 border-t border-hairline flex justify-between items-center mt-auto relative z-10">
          <span className="text-[10px] font-bold text-muted uppercase tracking-[0.2em]">
            {job.posted_at
              ? new Date(job.posted_at).toLocaleDateString()
              : "Recent Entry"}
          </span>
          <div className="font-bold text-ink flex items-center gap-2 text-xs uppercase tracking-[0.15em] group-hover:gap-4 transition-all">
            Open File <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </Link>
  );
}

import { Skeleton } from "./skeleton";

export function JobCardSkeleton() {
  return (
    <div className="bg-surface-card border border-hairline rounded-xl p-8 h-[340px] flex flex-col space-y-8">
      <div className="flex justify-between items-start">
        <div className="flex gap-5">
          <Skeleton className="w-14 h-14 rounded-xl opacity-20" />
          <div className="space-y-3">
            <Skeleton className="h-6 w-48 rounded opacity-20" />
            <Skeleton className="h-4 w-32 rounded opacity-20" />
          </div>
        </div>
        <Skeleton className="w-10 h-10 rounded-xl opacity-20" />
      </div>
      <div className="space-y-4">
        <Skeleton className="h-4 w-40 rounded opacity-20" />
        <div className="flex gap-2">
          <Skeleton className="h-6 w-24 rounded-pill opacity-20" />
          <Skeleton className="h-6 w-24 rounded-pill opacity-20" />
        </div>
      </div>
      <div className="pt-8 border-t border-hairline flex justify-between items-center mt-auto">
        <Skeleton className="h-4 w-24 rounded opacity-20" />
        <Skeleton className="h-4 w-32 rounded opacity-20" />
      </div>
    </div>
  );
}
