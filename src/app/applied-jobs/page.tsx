"use client";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/fade-in";
import { jobs } from "@/data/jobs";
import { Zap, Clock, Search } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function AppliedJobsPage() {
  // Simulating applied jobs
  const appliedJobs = [
    { ...jobs[4], status: "Interviewing", date: "2 days ago" },
    { ...jobs[1], status: "Applied", date: "5 days ago" },
    { ...jobs[0], status: "Under Review", date: "1 week ago" },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-base)] pt-24 pb-20">
      <div className="container-custom">
        <FadeIn direction="down">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-[#F0FDF4] dark:bg-white/5 border border-[var(--primary)] flex items-center justify-center text-[var(--primary)]">
                  <Zap className="w-6 h-6" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold font-headline">Applied Jobs</h1>
              </div>
              <p className="text-[var(--text-secondary)] text-lg">Track your applications and stay updated on your progress.</p>
            </div>
            <Link href="/search" className="btn btn-primary">
              <Search className="w-4 h-4 mr-2" /> Find More Roles
            </Link>
          </div>
        </FadeIn>

        <StaggerContainer className="space-y-4">
          {appliedJobs.map((app) => (
            <StaggerItem key={app.id}>
              <div className="bg-white dark:bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-6 hover:shadow-lg transition-all group">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  <div className="flex gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gray-50 dark:bg-white/5 border border-[var(--border)] flex items-center justify-center flex-shrink-0">
                      <span className="text-xl font-bold text-[var(--primary)]">{app.company.charAt(0)}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold group-hover:text-[var(--primary)] transition-colors">{app.title}</h3>
                      <p className="text-sm text-[var(--text-secondary)]">{app.company} • {app.location}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-[var(--text-muted)]">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Applied {app.date}</span>
                        <span className="flex items-center gap-1"><Zap className="w-3 h-3" /> {app.type}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-row md:flex-col items-center md:items-end gap-3 w-full md:w-auto border-t md:border-t-0 pt-4 md:pt-0">
                    <Badge className={`
                      ${app.status === 'Interviewing' ? 'bg-blue-50 text-blue-700 border-blue-200' : 
                        app.status === 'Applied' ? 'bg-gray-50 text-gray-700 border-gray-200' : 
                        'bg-yellow-50 text-yellow-700 border-yellow-200'}
                      px-4 py-1 rounded-full text-xs font-bold border
                    `}>
                      {app.status}
                    </Badge>
                    <Link href={`/jobs/${app.id}`} className="text-sm font-bold text-[var(--primary)] hover:underline ml-auto md:ml-0">
                      View Details &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </div>
  );
}
