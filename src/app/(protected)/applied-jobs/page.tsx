"use client";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/fade-in";
import { Zap, Clock, Search, ExternalLink, CheckCircle2, MapPin, Briefcase } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { useAppliedJobs } from "@/context";

// ─── Status badge config ───────────────────────────────────────────────────────
const STATUS_CONFIG: Record<
  string,
  { label: string; className: string }
> = {
  applied: {
    label: "Applied",
    className: "bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-800/40 dark:text-gray-300",
  },
  under_review: {
    label: "Under Review",
    className: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300",
  },
  shortlisted: {
    label: "Shortlisted",
    className: "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300",
  },
  rejected: {
    label: "Rejected",
    className: "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300",
  },
  offer: {
    label: "Offer Received 🎉",
    className: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300",
  },
};

export default function AppliedJobsPage() {
  const { appliedJobs, count } = useAppliedJobs();

  return (
    <div className="min-h-screen bg-[var(--bg-base)] pt-24 pb-20">
      <div className="container-custom">
        {/* Header */}
        <FadeIn direction="down">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-[#F0FDF4] dark:bg-white/5 border border-[var(--primary)] flex items-center justify-center text-[var(--primary)]">
                  <Zap className="w-6 h-6" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold font-headline">
                  Applied Jobs
                </h1>
              </div>
              <p className="text-[var(--text-secondary)] text-lg">
                Tracking{" "}
                <span className="font-bold text-[var(--text-primary)]">
                  {count}
                </span>{" "}
                application{count !== 1 ? "s" : ""} — all saved locally on your device.
              </p>
            </div>
            <Link href="/search" className="btn btn-primary">
              <Search className="w-4 h-4 mr-2" /> Find More Roles
            </Link>
          </div>
        </FadeIn>

        {appliedJobs.length > 0 ? (
          <StaggerContainer className="space-y-4">
            {appliedJobs.map((app) => {
              const statusCfg =
                STATUS_CONFIG[app.status] ?? STATUS_CONFIG.applied;

              return (
                <StaggerItem key={app.job_id}>
                  <div className="bg-white dark:bg-[var(--bg-card)] border-2 border-[var(--border)] rounded-2xl p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                      {/* Left: company logo + info */}
                      <div className="flex gap-4 flex-1 min-w-0">
                        <div className="w-14 h-14 rounded-xl bg-[#678D63]/10 dark:bg-white/5 border-2 border-[var(--border)] flex items-center justify-center flex-shrink-0 text-[var(--primary)] group-hover:border-[var(--primary)] transition-colors">
                          <span className="text-xl font-bold uppercase">
                            {app.company.charAt(0)}
                          </span>
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-lg font-bold group-hover:text-[var(--primary)] transition-colors line-clamp-1">
                            {app.title}
                          </h3>
                          <p className="text-sm text-[var(--text-secondary)] font-medium">
                            {app.company}
                            {app.location && (
                              <span className="text-[var(--text-muted)]">
                                {" "}
                                •{" "}
                                <span className="inline-flex items-center gap-0.5">
                                  <MapPin className="w-3 h-3" />
                                  {app.location}
                                </span>
                              </span>
                            )}
                          </p>
                          <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-[var(--text-muted)]">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" /> Applied{" "}
                              {new Date(app.appliedAt).toLocaleDateString(
                                undefined,
                                { year: "numeric", month: "short", day: "numeric" }
                              )}
                            </span>
                            {app.job_type && (
                              <span className="flex items-center gap-1 capitalize">
                                <Briefcase className="w-3 h-3" /> {app.job_type}
                              </span>
                            )}
                            <span className="text-[var(--primary)]/60 capitalize font-medium">
                              via {app.source}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right: status + actions */}
                      <div className="flex flex-row md:flex-col items-center md:items-end gap-3 w-full md:w-auto border-t md:border-t-0 pt-4 md:pt-0">
                        <Badge
                          className={`px-4 py-1.5 rounded-full text-xs font-bold border ${statusCfg.className}`}
                        >
                          {statusCfg.label}
                        </Badge>

                        <div className="flex items-center gap-2 ml-auto md:ml-0">
                          <Link
                            href={`/jobs/${app.job_id}`}
                            className="text-sm font-bold text-[var(--primary)] hover:underline"
                          >
                            View Details →
                          </Link>
                          {app.apply_link && (
                            <a
                              href={app.apply_link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors"
                              title="Open application portal"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        ) : (
          <FadeIn delay={0.2}>
            <div className="bg-white dark:bg-[var(--bg-card)] border-2 border-[var(--border)] rounded-3xl p-20 text-center">
              <div className="w-20 h-20 bg-gray-50 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-gray-300" />
              </div>
              <h2 className="text-2xl font-bold mb-2">No applications yet</h2>
              <p className="text-[var(--text-muted)] mb-8 max-w-md mx-auto">
                When you click <strong>Apply Now</strong> on any job, it will
                automatically appear here so you can track your progress.
              </p>
              <Link href="/search" className="btn btn-primary px-8">
                Start Exploring
              </Link>
            </div>
          </FadeIn>
        )}
      </div>
    </div>
  );
}
