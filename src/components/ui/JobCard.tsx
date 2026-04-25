"use client";
import { Job } from "@/data/jobs";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Bookmark, MapPin, Globe, DollarSign, ArrowRight } from "lucide-react";

export default function JobCard({ job }: { job: Job }) {
  return (
    <Link href={`/jobs/${job.id}`} className="block group">
      <div className="bg-white dark:bg-[#15221B] border border-[var(--border)] dark:border-white/5 rounded-[32px] p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-premium hover:border-[var(--primary)] h-full relative overflow-hidden">
        {/* Subtle Gradient Accent */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/0 to-[var(--primary)]/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="flex justify-between items-start mb-8 relative z-10">
          <div className="flex gap-5">
            <div className="w-14 h-14 rounded-2xl bg-gray-50 dark:bg-white/5 flex items-center justify-center overflow-hidden border border-[var(--border)] dark:border-white/10 group-hover:scale-110 transition-transform duration-500">
              <Image 
                src="/logo1.png" 
                alt={job.company} 
                width={48} 
                height={48} 
                className="object-contain p-2"
              />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-[var(--text-primary)] group-hover:text-[var(--primary)] transition-colors tracking-tight mb-1">
                {job.title}
              </h3>
              <p className="text-sm font-bold text-[var(--text-secondary)]">
                {job.company} <span className="mx-2 opacity-30">•</span> <span className="text-[var(--primary)]/70">via {job.source}</span>
              </p>
            </div>
          </div>
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className="text-gray-300 hover:text-[var(--primary)] transition-all relative z-20 p-2 hover:bg-[var(--primary)]/5 rounded-full"
          >
            <Bookmark className="w-6 h-6" />
          </button>
        </div>

        <div className="flex items-center gap-2 text-sm font-bold text-[var(--text-muted)] mb-6 relative z-10">
          <MapPin className="w-4 h-4 text-[var(--primary)]/60" /> {job.location}
        </div>

        <div className="flex flex-wrap gap-2.5 mb-8 relative z-10">
          <div className={`px-4 py-1.5 rounded-full text-[11px] font-extrabold uppercase tracking-widest ${job.type === 'Full-time' ? 'bg-blue-500/10 text-blue-600' : 'bg-amber-500/10 text-amber-600'}`}>
            {job.type}
          </div>
          {job.isRemote && (
            <div className="px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 text-[11px] font-extrabold uppercase tracking-widest flex items-center gap-2">
              <Globe className="w-3 h-3" /> Remote
            </div>
          )}
          <div className="px-4 py-1.5 rounded-full bg-gray-500/10 text-gray-600 dark:text-gray-400 text-[11px] font-extrabold uppercase tracking-widest flex items-center gap-2">
            <DollarSign className="w-3 h-3" /> {job.salary}
          </div>
        </div>

        <div className="pt-6 border-t border-[var(--border)] dark:border-white/5 flex justify-between items-center mt-auto relative z-10">
          <span className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-widest">
            {job.posted}
          </span>
          <div className="font-extrabold text-[var(--primary)] flex items-center gap-2 text-sm group-hover:translate-x-1 transition-transform">
            Apply Now <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </Link>
  );
}
