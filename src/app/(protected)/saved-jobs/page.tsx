"use client";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/fade-in";
import JobCard from "@/components/ui/JobCard";
import { Bookmark, Search } from "lucide-react";
import Link from "next/link";
import { useSavedJobs } from "@/context";

export default function SavedJobsPage() {
  const { savedJobs, count } = useSavedJobs();

  return (
    <div className="min-h-screen bg-[var(--bg-base)] pt-24 pb-20">
      <div className="container-custom">
        {/* Header */}
        <FadeIn direction="down">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-[#F0FDF4] dark:bg-white/5 border border-[var(--primary)] flex items-center justify-center text-[var(--primary)]">
                  <Bookmark className="w-6 h-6" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold font-headline">
                  Saved Jobs
                </h1>
              </div>
              <p className="text-[var(--text-secondary)] text-lg">
                {count > 0 ? (
                  <>
                    You have{" "}
                    <span className="font-bold text-[var(--text-primary)]">
                      {count}
                    </span>{" "}
                    saved job{count !== 1 ? "s" : ""} — all stored locally on your device.
                  </>
                ) : (
                  "Bookmark opportunities to revisit them later."
                )}
              </p>
            </div>
            <Link href="/search" className="btn btn-primary">
              <Search className="w-4 h-4 mr-2" /> Browse More Jobs
            </Link>
          </div>
        </FadeIn>

        {savedJobs.length > 0 ? (
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedJobs.map((job) => (
              <StaggerItem key={job.job_id}>
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
                Hit the{" "}
                <span className="inline-flex items-center gap-1 font-semibold">
                  <Bookmark className="w-4 h-4 inline" /> bookmark
                </span>{" "}
                icon on any job card to save it for later.
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
