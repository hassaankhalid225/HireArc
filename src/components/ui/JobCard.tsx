"use client";
import { Job } from "@/data/jobs";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Bookmark, MapPin, Globe, DollarSign, ArrowRight } from "lucide-react";

export default function JobCard({ job }: { job: Job }) {
  return (
    <Link href={`/jobs/${job.id}`} className="block group">
      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-lg)] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-hover)] hover:border-[var(--primary)] h-full relative">
        <div className="flex justify-between items-start mb-6">
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-[var(--radius-md)] bg-[var(--bg-base)] flex items-center justify-center overflow-hidden border border-[var(--border)]">
              <Image 
                src="/logo1.png" 
                alt={job.company} 
                width={40} 
                height={40} 
                className="object-contain p-1"
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[var(--text-primary)] group-hover:text-[var(--primary)] transition-colors">
                {job.title}
              </h3>
              <p className="text-sm text-[var(--text-secondary)]">
                {job.company} • via {job.source}
              </p>
            </div>
          </div>
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              // Add bookmark logic here
            }}
            className="text-[var(--text-muted)] hover:text-blue-600 transition-colors relative z-20 p-1"
          >
            <Bookmark className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center gap-1.5 text-sm text-[var(--text-secondary)] mb-4">
          <MapPin className="w-4 h-4" /> {job.location}
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          <Badge variant="secondary" className={`${job.type === 'Full-time' ? 'bg-blue-50 text-blue-700' : 'bg-yellow-50 text-yellow-700'} rounded-sm`}>
            {job.type}
          </Badge>
          {job.isRemote && (
            <Badge variant="secondary" className="bg-green-50 text-green-700 flex items-center gap-1.5 rounded-sm">
              <Globe className="w-3 h-3" /> Remote
            </Badge>
          )}
          <Badge variant="secondary" className="bg-orange-50 text-orange-800 flex items-center gap-1.5 rounded-sm">
            <DollarSign className="w-3 h-3" /> {job.salary}
          </Badge>
        </div>

        <div className="pt-4 border-t border-[var(--border)] flex justify-between items-center mt-auto">
          <span className="text-[12px] font-mono text-[var(--text-muted)]">
            Posted {job.posted}
          </span>
          <div className="font-semibold text-blue-600 group-hover:text-blue-700 group-hover:underline flex items-center gap-1 text-sm">
            Apply Now <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </Link>
  );
}
