"use client";
import { useEffect, useState } from "react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/fade-in";
import JobCard from "@/components/ui/JobCard";
import { Bookmark, Search, Loader2 } from "lucide-react";
import Link from "next/link";
import { apiClient } from "@/services/api";
import { Job } from "@/types";

export default function SavedJobsPage() {
  const [savedJobs, setSavedJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadSavedJobs() {
      try {
        const jobs = await apiClient.get<Job[]>("/user/saved-jobs");
        setSavedJobs(jobs || []);
      } catch (error) {
        console.error("Failed to load saved jobs:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadSavedJobs();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--bg-base)] pt-24 pb-20 flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-[var(--primary)]" />
        <p className="text-[var(--text-secondary)] font-medium animate-pulse">Loading saved jobs...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-base)] pt-24 pb-20">
      <div className="container-custom">
        <FadeIn direction="down">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-[#F0FDF4] dark:bg-white/5 border border-[var(--primary)] flex items-center justify-center text-[var(--primary)]">
                  <Bookmark className="w-6 h-6" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold font-headline">Saved Jobs</h1>
              </div>
              <p className="text-[var(--text-secondary)] text-lg">Manage the opportunities you've bookmarked for later.</p>
            </div>
            <Link href="/search" className="btn btn-primary">
              <Search className="w-4 h-4 mr-2" /> Browse More Jobs
            </Link>
          </div>
        </FadeIn>

        {savedJobs.length > 0 ? (
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedJobs.map((job) => (
              <StaggerItem key={job.job_id || job.id}>
                <JobCard job={job} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        ) : (
          <FadeIn delay={0.2}>
            <div className="bg-white dark:bg-[var(--bg-card)] border-2 border-[var(--border)] rounded-3xl p-20 text-center">
              <div className="w-20 h-20 bg-gray-50 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                <Bookmark className="w-10 h-10 text-gray-300" />
              </div>
              <h2 className="text-2xl font-bold mb-2">No saved jobs yet</h2>
              <p className="text-[var(--text-muted)] mb-8 max-w-md mx-auto">
                Explore thousands of jobs and save the ones that catch your eye.
              </p>
              <Link href="/search" className="btn btn-primary px-8">
                Start Searching
              </Link>
            </div>
          </FadeIn>
        )}
      </div>
    </div>
  );
}
