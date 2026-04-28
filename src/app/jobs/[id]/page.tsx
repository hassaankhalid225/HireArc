"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  Building,
  MapPin,
  Clock,
  Bookmark,
  ExternalLink,
  Banknote,
  Briefcase,
  Loader2,
  ArrowRight,
  CheckCircle2,
  Globe,
  X,
  Zap,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { jobsService } from "@/services/jobs.service";
import { Job } from "@/types";
import { useAppliedJobs } from "@/context";
import { formatDescription } from "@/lib/utils";

// ─── Return-visit popup component ─────────────────────────────────────────────
function DidYouApplyPopup({
  jobTitle,
  company,
  onYes,
  onNo,
}: {
  jobTitle: string;
  company: string;
  onYes: () => void;
  onNo: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white dark:bg-[#0f1a14] border-2 border-[var(--border)] rounded-3xl p-8 max-w-md w-full shadow-2xl animate-in slide-in-from-bottom-4 duration-300">
        {/* Icon */}
        <div className="w-16 h-16 rounded-2xl bg-[var(--primary)]/10 border-2 border-[var(--primary)]/20 flex items-center justify-center mx-auto mb-5">
          <Zap className="w-8 h-8 text-[var(--primary)]" />
        </div>

        <h2 className="text-xl font-bold font-headline text-center mb-2">
          Welcome back! 👋
        </h2>
        <p className="text-[var(--text-secondary)] text-center text-sm leading-relaxed mb-8">
          You previously visited{" "}
          <span className="font-bold text-[var(--text-primary)]">
            {jobTitle}
          </span>{" "}
          at{" "}
          <span className="font-bold text-[var(--text-primary)]">{company}</span>
          . Did you apply for this position?
        </p>

        <div className="flex gap-3">
          <Button
            onClick={onNo}
            variant="outline"
            className="flex-1 h-11 font-semibold border-2 border-[var(--border)] hover:border-[var(--primary)]/40 rounded-xl"
          >
            <X className="w-4 h-4 mr-2" /> Not yet
          </Button>
          <Button
            onClick={onYes}
            className="flex-1 h-11 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white font-semibold rounded-xl gap-2"
          >
            <CheckCircle2 className="w-4 h-4" /> Yes, I applied!
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Applied confirmation banner ───────────────────────────────────────────────
function AppliedBanner({ company }: { company: string }) {
  return (
    <div className="bg-emerald-50 dark:bg-emerald-900/20 border-2 border-emerald-200 dark:border-emerald-700/50 rounded-2xl p-4 flex items-center gap-3">
      <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
      <div>
        <p className="text-sm font-bold text-emerald-700 dark:text-emerald-400">
          Application tracked!
        </p>
        <p className="text-xs text-emerald-600/80 dark:text-emerald-500">
          Your application to {company} is saved in{" "}
          <Link
            href="/applied-jobs"
            className="underline font-bold hover:text-emerald-800"
          >
            Applied Jobs
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

import React from "react";

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function JobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = React.use(params);
  const id = resolvedParams.id;
  const router = useRouter();

  const { applyJob, isApplied } = useAppliedJobs();

  const [job, setJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [justApplied, setJustApplied] = useState(false);

  useEffect(() => {
    async function loadJob() {
      try {
        const data = await jobsService.getJob(id);
        setJob(data);
      } catch (error) {
        console.error("Failed to load job:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadJob();
  }, [id]);

  // Triggered when user returns to tab after applying
  const handleApply = () => {
    if (!job?.apply_link) return;
    // 1. Open external site in new tab
    window.open(job.apply_link, "_blank", "noopener,noreferrer");
    
    // 2. Immediately show the "Did you apply?" popup in the current tab
    // giving them a chance to confirm once they're done with the external site
    setShowPopup(true);
  };

  const handlePopupYes = () => {
    if (job) {
      applyJob(job);
      setJustApplied(true);
    }
    setShowPopup(false);
  };

  const handlePopupNo = () => {
    setShowPopup(false);
  };

  // ── Loading skeleton ────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--bg-base)] pt-24 pb-20">
        <div className="container-custom mb-6">
          <Skeleton className="h-4 w-1/4" />
        </div>
        <div className="container-custom max-w-5xl">
          <Card className="mb-8 border-[var(--border)] overflow-hidden">
            <CardContent className="p-8">
              <div className="flex gap-6 items-center">
                <Skeleton className="w-20 h-20 rounded-xl" />
                <div className="flex-1 space-y-3">
                  <Skeleton className="h-8 w-1/2" />
                  <Skeleton className="h-4 w-3/4" />
                  <div className="flex gap-2">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-24" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1 space-y-4">
              <Skeleton className="h-6 w-1/3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-full" />
            </div>
            <aside className="w-full lg:w-[320px] space-y-6">
              <Skeleton className="h-48 w-full rounded-xl" />
              <Skeleton className="h-64 w-full rounded-xl" />
            </aside>
          </div>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-[var(--bg-base)] pt-24 pb-20 flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold font-headline">Job Not Found</h1>
        <p className="text-[var(--text-secondary)]">
          The job you are looking for does not exist or has been removed.
        </p>
        <Button
          onClick={() => router.push("/search")}
          className="bg-[var(--primary)] text-white"
        >
          Back to Jobs
        </Button>
      </div>
    );
  }

  const alreadyApplied = isApplied(job.job_id) || justApplied;

  // Derived: salary label (only if at least one value exists)
  const salaryLabel =
    job.salary_min || job.salary_max
      ? `$${job.salary_min ? Math.round(job.salary_min / 1000) : "?"}k – $${job.salary_max ? Math.round(job.salary_max / 1000) : "?"}k`
      : null;

  return (
    <>
      {/* Return-visit popup */}
      {showPopup && (
        <DidYouApplyPopup
          jobTitle={job.title}
          company={job.company}
          onYes={handlePopupYes}
          onNo={handlePopupNo}
        />
      )}

      <div className="min-h-screen bg-[var(--bg-base)] pt-24 pb-20">
        {/* Breadcrumbs */}
        <div className="container-custom mb-6">
          <div className="text-sm text-[var(--text-secondary)] flex items-center gap-2">
            <Link
              href="/search"
              className="hover:text-[var(--primary)] transition-colors"
            >
              Jobs
            </Link>
            <span>›</span>
            <span className="font-medium text-[var(--text-primary)] line-clamp-1">
              {job.title} at {job.company}
            </span>
          </div>
        </div>

        <div className="container-custom max-w-5xl">
          {/* ── Main Header Card ── */}
          <Card className="mb-8 border-[var(--border)] overflow-hidden">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                {/* Company + title */}
                <div className="flex gap-6 items-center">
                  <div className="w-20 h-20 rounded-xl bg-[#678D63]/10 border-2 border-[var(--border)] flex items-center justify-center flex-shrink-0 shadow-sm text-[#166534]">
                    <span className="text-3xl font-bold uppercase">
                      {job.company.substring(0, 2)}
                    </span>
                  </div>
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold font-headline mb-2">
                      {job.title}
                    </h1>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--text-secondary)] mb-4">
                      <span className="flex items-center gap-1 font-medium text-[var(--text-primary)]">
                        <Building className="w-4 h-4" /> {job.company}
                      </span>
                      {job.location && (
                        <>
                          <span className="opacity-40">•</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" /> {job.location}
                          </span>
                        </>
                      )}
                      {job.posted_at && (
                        <>
                          <span className="opacity-40">•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" /> Posted{" "}
                            {new Date(job.posted_at).toLocaleDateString()}
                          </span>
                        </>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {job.job_type && (
                        <Badge
                          variant="secondary"
                          className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 uppercase text-xs font-bold rounded-sm"
                        >
                          {job.job_type}
                        </Badge>
                      )}
                      {salaryLabel && (
                        <Badge
                          variant="secondary"
                          className="bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300 uppercase text-xs font-bold rounded-sm"
                        >
                          {salaryLabel}
                        </Badge>
                      )}
                      {job.is_remote && (
                        <Badge
                          variant="secondary"
                          className="bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300 uppercase text-xs font-bold rounded-sm flex items-center gap-1"
                        >
                          <Globe className="w-3 h-3" /> Remote
                        </Badge>
                      )}
                      {job.experience_level && (
                        <Badge
                          variant="secondary"
                          className="bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 uppercase text-xs font-bold rounded-sm capitalize"
                        >
                          {job.experience_level}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex gap-3 w-full md:w-auto">
                  {alreadyApplied ? (
                    <div className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border-2 border-emerald-200 dark:border-emerald-700/50 text-emerald-700 dark:text-emerald-400 font-semibold text-sm">
                      <CheckCircle2 className="w-4 h-4" /> Applied
                    </div>
                  ) : (
                    job.apply_link && (
                      <Button
                        onClick={handleApply}
                        className="flex-1 md:flex-none bg-[var(--primary)] hover:bg-[var(--primary-dark)] font-semibold h-11 px-8 text-white gap-2"
                      >
                        Apply Now <ExternalLink className="w-4 h-4" />
                      </Button>
                    )
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* ── Two Column Layout ── */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left: Description + Tags */}
            <div className="flex-1 space-y-8">
              {/* Applied banner */}
              {alreadyApplied && (
                <AppliedBanner company={job.company} />
              )}

              {/* Description */}
              <section>
                <h2 className="text-xl font-bold font-headline mb-4">
                  About the Role
                </h2>
                <div className="text-[var(--text-secondary)] space-y-4 text-[15px] leading-relaxed prose prose-slate dark:prose-invert max-w-none">
                  {job.description ? (
                    <div 
                      className="whitespace-pre-wrap break-words"
                      dangerouslySetInnerHTML={{ __html: formatDescription(job.description) }}
                    />
                  ) : (
                    <p>
                      Full job description is hosted directly on the{" "}
                      <strong>{job.company}</strong> careers portal. Click{" "}
                      <strong>Apply Now</strong> to view complete details and
                      submit your application.
                    </p>
                  )}
                </div>
              </section>

              {/* Tags / Skills */}
              {job.tags && job.tags.length > 0 && (
                <section>
                  <h2 className="text-lg font-bold font-headline mb-4">
                    Required Skills &amp; Tags
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {job.tags.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="bg-[var(--bg-base)] text-[var(--text-primary)] border-2 border-[var(--border)] font-medium px-4 py-1.5 rounded-md hover:bg-[var(--border)] transition-colors"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Right Sidebar */}
            <aside className="w-full lg:w-[320px] flex-shrink-0 space-y-6">
              {/* Apply Card */}
              {job.apply_link && (
                <Card className="border-[var(--border)] shadow-sm bg-white dark:bg-[var(--bg-card)]">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-6 h-6 bg-[#678D63]/20 rounded flex items-center justify-center text-[#166534]">
                        <Briefcase className="w-3 h-3" />
                      </div>
                      <span className="text-sm font-semibold capitalize">
                        Apply via {job.source || "ATS"}
                      </span>
                    </div>
                    <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed mb-6">
                      You will be redirected to the official{" "}
                      <strong>{job.company}</strong> careers portal to complete
                      your application.
                    </p>
                    {alreadyApplied ? (
                      <div className="flex items-center gap-2 justify-center text-emerald-600 font-bold text-sm py-2">
                        <CheckCircle2 className="w-5 h-5" /> Application
                        Tracked
                      </div>
                    ) : (
                      <Button
                        onClick={handleApply}
                        className="w-full bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white font-semibold h-11 flex justify-between px-4"
                      >
                        <span>Apply Now</span>
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Job Summary Card */}
              <Card className="border-[var(--border)] shadow-sm bg-white dark:bg-[var(--bg-card)]">
                <CardContent className="p-0">
                  <div className="p-5 border-b-2 border-[var(--border)]">
                    <h3 className="font-semibold text-[var(--text-primary)]">
                      Job Summary
                    </h3>
                  </div>
                  <div className="p-5 space-y-4">
                    {/* Location — always show */}
                    {job.location && (
                      <div className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-2 text-[var(--text-muted)]">
                          <MapPin className="w-4 h-4" /> Location
                        </div>
                        <span className="font-medium text-right text-[var(--text-primary)]">
                          {job.location}
                        </span>
                      </div>
                    )}
                    {/* Salary — only if available */}
                    {salaryLabel && (
                      <div className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-2 text-[var(--text-muted)]">
                          <Banknote className="w-4 h-4" /> Salary Range
                        </div>
                        <span className="font-medium text-right text-[var(--text-primary)]">
                          {salaryLabel}
                        </span>
                      </div>
                    )}
                    {/* Job type — only if available */}
                    {job.job_type && (
                      <div className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-2 text-[var(--text-muted)]">
                          <Briefcase className="w-4 h-4" /> Job Type
                        </div>
                        <span className="font-medium text-right text-[var(--text-primary)] capitalize">
                          {job.job_type}
                        </span>
                      </div>
                    )}
                    {/* Experience level — only if available */}
                    {job.experience_level && (
                      <div className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-2 text-[var(--text-muted)]">
                          <Zap className="w-4 h-4" /> Level
                        </div>
                        <span className="font-medium text-right text-[var(--text-primary)] capitalize">
                          {job.experience_level}
                        </span>
                      </div>
                    )}
                    {/* Source */}
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center gap-2 text-[var(--text-muted)]">
                        <Globe className="w-4 h-4" /> Source
                      </div>
                      <span className="font-medium text-right text-[var(--text-primary)] capitalize">
                        {job.source}
                      </span>
                    </div>
                    {/* Posted date — only if available */}
                    {job.posted_at && (
                      <div className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-2 text-[var(--text-muted)]">
                          <Clock className="w-4 h-4" /> Posted
                        </div>
                        <span className="font-medium text-right text-[var(--text-primary)]">
                          {new Date(job.posted_at).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </aside>
          </div>

          {/* Explore More */}
          <section className="mt-16 pt-10 border-t-2 border-[var(--border)]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold font-headline">
                Explore More Jobs
              </h2>
              <Link
                href="/search"
                className="text-sm font-semibold text-[var(--primary)] hover:underline flex items-center gap-1"
              >
                View all <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
