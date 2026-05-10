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
  ChevronLeft,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { jobsService } from "@/services/jobs.service";
import { Job } from "@/types";
import { useAppliedJobs, useAuth } from "@/context";
import { formatDescription } from "@/lib/utils";
import React from "react";

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
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-[var(--surface-card)] border border-[var(--hairline-strong)] rounded-xxl p-8 max-w-md w-full shadow-premium animate-in slide-in-from-bottom-4 duration-300">
        <div className="w-16 h-16 rounded-full bg-[var(--surface-strong)] flex items-center justify-center mx-auto mb-6">
          <Zap className="w-8 h-8 text-[var(--ink)]" />
        </div>

        <h2 className="text-2xl font-headline font-normal text-center text-[var(--ink)] mb-3">
          Welcome back
        </h2>
        <p className="text-[var(--body)] text-center text-[15px] leading-relaxed mb-8">
          You previously visited <span className="font-semibold text-[var(--ink)]">{jobTitle}</span> at <span className="font-semibold text-[var(--ink)]">{company}</span>. Did you apply for this position?
        </p>

        <div className="flex gap-3">
          <button
            onClick={onNo}
            className="flex-1 h-11 px-6 rounded-pill border border-[var(--hairline-strong)] text-[14px] font-medium text-[var(--ink)] hover:bg-[var(--surface-strong)] transition-colors"
          >
            Not yet
          </button>
          <button
            onClick={onYes}
            className="flex-1 h-11 px-6 rounded-pill bg-[var(--ink)] text-white text-[14px] font-medium hover:translate-y-[-1px] transition-all"
          >
            Yes, I applied
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Applied confirmation banner ───────────────────────────────────────────────
function AppliedBanner({ company }: { company: string }) {
  return (
    <div className="bg-[var(--surface-strong)] border border-[var(--hairline-strong)] rounded-xl p-5 flex items-center gap-4">
      <div className="w-10 h-10 rounded-full bg-[var(--ink)] flex items-center justify-center shrink-0">
        <CheckCircle2 className="w-5 h-5 text-white" />
      </div>
      <div>
        <p className="text-[15px] font-semibold text-[var(--ink)]">
          Application tracked
        </p>
        <p className="text-[14px] text-[var(--body)]">
          Your application to {company} is saved in{" "}
          <Link
            href="/applied-jobs"
            className="underline font-medium hover:text-[var(--ink)]"
          >
            Applied Jobs
          </Link>.
        </p>
      </div>
    </div>
  );
}

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
  const { isAuthenticated } = useAuth();

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

  const handleApply = () => {
    if (!isAuthenticated) {
      router.push(`/login?redirect=${encodeURIComponent(`/jobs/${id}`)}`);
      return;
    }
    if (!job?.apply_link) return;
    window.open(job.apply_link, "_blank", "noopener,noreferrer");
    
    // Wait for the user to return to the tab before showing the popup
    const handleFocus = () => {
      setShowPopup(true);
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        handleFocus();
      }
    };

    setTimeout(() => {
      window.addEventListener('focus', handleFocus);
      document.addEventListener('visibilitychange', handleVisibilityChange);
    }, 1500);
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--canvas)] pt-32 pb-20">
        <div className="container-custom max-w-5xl">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="flex-1 space-y-8">
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-6 w-1/4" />
              <div className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            </div>
            <aside className="w-full lg:w-[320px] space-y-6">
              <Skeleton className="h-48 w-full rounded-xl" />
            </aside>
          </div>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-[var(--canvas)] pt-32 pb-20 flex flex-col items-center justify-center gap-6 text-center">
        <h1 className="text-3xl font-headline font-normal text-[var(--ink)]">Job Not Found</h1>
        <p className="text-[var(--body)] max-w-sm">
          The job you are looking for does not exist or has been removed.
        </p>
        <button
          onClick={() => router.push("/search")}
          className="btn btn-primary h-11 px-8 rounded-pill font-medium"
        >
          Back to Jobs
        </button>
      </div>
    );
  }

  const alreadyApplied = isApplied(job.job_id) || justApplied;
  const salaryLabel =
    job.salary_min || job.salary_max
      ? `$${job.salary_min ? Math.round(job.salary_min / 1000) : "?"}k – $${job.salary_max ? Math.round(job.salary_max / 1000) : "?"}k`
      : null;

  return (
    <>
      {showPopup && (
        <DidYouApplyPopup
          jobTitle={job.title}
          company={job.company}
          onYes={handlePopupYes}
          onNo={handlePopupNo}
        />
      )}

      <div className="min-h-screen bg-[var(--canvas)] pt-32 pb-20 text-[var(--ink)]">
        <div className="container-custom max-w-6xl">
          {/* Breadcrumbs */}
          <div className="mb-12">
            <Link
              href="/search"
              className="inline-flex items-center gap-2 text-[14px] font-medium text-[var(--muted)] hover:text-[var(--ink)] transition-colors group"
            >
              <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Search
            </Link>
          </div>

          <div className="flex flex-col lg:flex-row gap-16">
            {/* Main Content */}
            <div className="flex-1 min-w-0">
              <div className="mb-12">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 rounded-xl bg-[var(--surface-strong)] border border-[var(--hairline)] flex items-center justify-center text-[var(--ink)] font-medium text-2xl uppercase shrink-0">
                    {job.company.substring(0, 2)}
                  </div>
                  <div>
                    <p className="text-[16px] font-medium text-[var(--body)] mb-1">{job.company}</p>
                    <h1 className="text-3xl md:text-[44px] font-headline font-normal leading-tight tracking-tight">
                      {job.title}
                    </h1>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-[14px] font-medium text-[var(--body)] mb-8">
                  {job.location && (
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-[var(--muted)]" /> {job.location}
                    </div>
                  )}
                  {job.posted_at && (
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-[var(--muted)]" /> {new Date(job.posted_at).toLocaleDateString("en-US", { timeZone: "UTC", month: "short", day: "numeric", year: "numeric" })}
                    </div>
                  )}
                  <div className="flex items-center gap-1.5">
                    <Globe className="w-4 h-4 text-[var(--muted)]" /> {job.source || "Direct ATS"}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {job.job_type && (
                    <div className="px-4 py-1.5 rounded-pill bg-[var(--surface-strong)] text-[var(--ink)] text-[12px] font-semibold uppercase tracking-wider">
                      {job.job_type}
                    </div>
                  )}
                  {salaryLabel && (
                    <div className="px-4 py-1.5 rounded-pill bg-[var(--surface-strong)] text-[var(--ink)] text-[12px] font-semibold uppercase tracking-wider">
                      {salaryLabel}
                    </div>
                  )}
                  {job.is_remote && (
                    <div className="px-4 py-1.5 rounded-pill bg-[var(--surface-strong)] text-[var(--ink)] text-[12px] font-semibold uppercase tracking-wider flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5" /> Remote
                    </div>
                  )}
                </div>
              </div>

              {alreadyApplied && (
                <div className="mb-12">
                  <AppliedBanner company={job.company} />
                </div>
              )}

              <section className="mb-16">
                <h2 className="text-2xl font-headline font-normal mb-8 border-b border-[var(--hairline)] pb-4">
                  About the Role
                </h2>
                <div className="text-[var(--body)] space-y-6 text-[17px] leading-[1.7] prose-premium max-w-none">
                  {job.description ? (
                    <div 
                      className="whitespace-pre-wrap break-words font-body"
                      dangerouslySetInnerHTML={{ __html: formatDescription(job.description) }}
                    />
                  ) : (
                    <p>
                      The full job description for this position is available on the official <span className="font-semibold text-[var(--ink)]">{job.company}</span> careers portal.
                    </p>
                  )}
                </div>
              </section>

              {job.tags && job.tags.length > 0 && (
                <section>
                  <h2 className="text-[12px] font-semibold uppercase tracking-[0.1em] text-[var(--muted)] mb-6">
                    Core Competencies
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {job.tags.map((skill) => (
                      <div
                        key={skill}
                        className="px-5 py-2 rounded-pill bg-[var(--canvas)] border border-[var(--hairline-strong)] text-[var(--body-strong)] font-medium text-[14px]"
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Sticky Sidebar */}
            <aside className="w-full lg:w-[360px] flex-shrink-0">
              <div className="sticky top-32 space-y-8">
                <Card className="border-[var(--hairline-strong)] bg-[var(--surface-card)] rounded-xl shadow-premium-sm overflow-hidden">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-8 h-8 rounded-full bg-[var(--surface-strong)] flex items-center justify-center">
                        <Zap className="w-4 h-4 text-[var(--ink)]" />
                      </div>
                      <span className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[var(--muted)]">
                        Hiring Signal
                      </span>
                    </div>
                    
                    <p className="text-[15px] text-[var(--body)] leading-relaxed mb-8">
                      Applications for this role are handled directly by <span className="font-semibold text-[var(--ink)]">{job.company}</span>.
                    </p>

                    {alreadyApplied ? (
                      <div className="w-full flex items-center gap-3 justify-center text-[var(--ink)] font-semibold text-[15px] py-4 rounded-pill border border-[var(--hairline-strong)] bg-[var(--surface-strong)]">
                        <CheckCircle2 className="w-5 h-5" /> Application Tracked
                      </div>
                    ) : (
                      <button
                        onClick={handleApply}
                        className="btn btn-primary w-full h-12 flex justify-between px-6 items-center"
                      >
                        <span className="text-[15px] font-medium">Apply Now</span>
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    )}
                    
                    <button className="w-full mt-3 flex items-center justify-center gap-2 text-[14px] font-medium text-[var(--body)] hover:text-[var(--ink)] transition-colors py-2">
                      <Bookmark className="w-4 h-4" /> Save for later
                    </button>
                  </CardContent>
                </Card>

                <div className="p-8 rounded-xl border border-[var(--hairline)] bg-[var(--surface-card)]">
                  <h3 className="text-[12px] font-semibold uppercase tracking-[0.1em] text-[var(--muted)] mb-8">
                    Job Details
                  </h3>
                  <div className="space-y-6">
                    {[
                      { icon: <MapPin className="w-4 h-4" />, label: "Location", value: job.location },
                      { icon: <Banknote className="w-4 h-4" />, label: "Salary", value: salaryLabel },
                      { icon: <Briefcase className="w-4 h-4" />, label: "Type", value: job.job_type },
                      { icon: <Zap className="w-4 h-4" />, label: "Level", value: job.experience_level },
                      { icon: <Globe className="w-4 h-4" />, label: "Portal", value: job.source }
                    ].map((item, i) => item.value ? (
                      <div key={i} className="flex justify-between items-start gap-4">
                        <div className="flex items-center gap-3 text-[var(--muted)] text-[14px]">
                          {item.icon}
                          <span>{item.label}</span>
                        </div>
                        <span className="text-[14px] font-medium text-[var(--ink)] text-right capitalize">
                          {item.value}
                        </span>
                      </div>
                    ) : null)}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
