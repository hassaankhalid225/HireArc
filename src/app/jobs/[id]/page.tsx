"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Building, MapPin, Clock, Bookmark, Check, ExternalLink, Banknote, Briefcase, Loader2, ArrowRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { jobsService } from "@/services/jobs.service";
import { Job } from "@/types";
import { apiClient } from "@/services/api";

export default function JobDetailPage({ params }: { params: { id: string } }) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [job, setJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function loadJob() {
      try {
        const data = await jobsService.getJob(params.id);
        setJob(data);
      } catch (error) {
        console.error("Failed to load job:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadJob();
  }, [params.id]);

  const handleApply = () => {
    if (job?.apply_link) {
      window.open(job.apply_link, "_blank");
    }
  };

  const handleSaveJob = async () => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    try {
      setIsSaving(true);
      await apiClient.post(`/user/saved-jobs/${params.id}`, {});
      alert("Job saved successfully!");
    } catch (e) {
      console.error(e);
      alert("Error saving job");
    } finally {
      setIsSaving(false);
    }
  };

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
            <div className="flex-1 space-y-8">
              <div className="space-y-4">
                <Skeleton className="h-6 w-1/3" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-full" />
              </div>
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
        <p className="text-[var(--text-secondary)]">The job you are looking for does not exist or has been removed.</p>
        <Button onClick={() => router.push("/search")} className="bg-[var(--primary)] text-white">Back to Jobs</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-base)] pt-24 pb-20">
      {/* Breadcrumbs */}
      <div className="container-custom mb-6">
        <div className="text-sm text-[var(--text-secondary)] flex items-center gap-2">
          <Link href="/search" className="hover:text-[var(--primary)] transition-colors">Jobs</Link>
          <span>›</span>
          <span className="font-medium text-[var(--text-primary)]">{job.title} at {job.company}</span>
        </div>
      </div>

      <div className="container-custom max-w-5xl">
        {/* Main Header Card */}
        <Card className="mb-8 border-[var(--border)] overflow-hidden">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              
              <div className="flex gap-6 items-center">
                <div className="w-20 h-20 rounded-xl bg-[#678D63]/10 border-2 border-[var(--border)] flex items-center justify-center flex-shrink-0 shadow-premium-sm text-[#166534]">
                  <span className="text-3xl font-bold uppercase">{job.company.substring(0, 2)}</span>
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold font-headline mb-2">{job.title}</h1>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--text-secondary)] mb-4">
                    <span className="flex items-center gap-1 font-medium text-[var(--text-primary)]">
                      <Building className="w-4 h-4" /> {job.company}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {job.location}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> Posted {new Date(job.posted_at || Date.now()).toLocaleDateString()}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 uppercase text-xs font-bold rounded-sm">
                      {job.job_type || 'Full-time'}
                    </Badge>
                    {(job.salary_min || job.salary_max) && (
                      <Badge variant="secondary" className="bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300 uppercase text-xs font-bold rounded-sm">
                        ${job.salary_min ? Math.round(job.salary_min/1000) : ''}k - ${job.salary_max ? Math.round(job.salary_max/1000) : ''}k
                      </Badge>
                    )}
                    {job.is_remote && (
                      <Badge variant="secondary" className="bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300 uppercase text-xs font-bold rounded-sm">Remote</Badge>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 w-full md:w-auto">
                <Button onClick={handleSaveJob} disabled={isSaving} variant="outline" className="flex-1 md:flex-none border-[var(--primary)] text-[var(--primary)] hover:bg-[#678D63]/10 font-semibold h-11 px-6 gap-2">
                  <Bookmark className="w-4 h-4" /> {isSaving ? "Saving..." : "Save Job"}
                </Button>
                <Button onClick={handleApply} className="flex-1 md:flex-none bg-[var(--primary)] hover:bg-[var(--primary-dark)] font-semibold h-11 px-8 text-white">
                  Apply Now
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Two Column Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Content: Job Description */}
          <div className="flex-1 space-y-8">
            <section>
              <h2 className="text-xl font-bold font-headline mb-4">About the Role</h2>
              <div className="text-[var(--text-secondary)] space-y-4 text-[15px] leading-relaxed">
                {job.description ? (
                  <p className="whitespace-pre-wrap">{job.description}</p>
                ) : (
                  <p>
                    Full job description is hosted directly on the {job.company} careers portal.
                    Please click "Apply Now" to view the complete details and submit your application.
                  </p>
                )}
              </div>
            </section>

            {job.tags && job.tags.length > 0 && (
              <section>
                <h2 className="text-lg font-bold font-headline mb-4">Required Skills & Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {job.tags.map((skill) => (
                    <Badge key={skill} variant="secondary" className="bg-[var(--bg-base)] text-[var(--text-primary)] border-2 border-[var(--border)] font-medium px-4 py-1.5 rounded-md hover:bg-[var(--border)] transition-colors">
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
            <Card className="border-[var(--border)] shadow-sm bg-white dark:bg-[var(--bg-card)]">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 bg-[#678D63]/20 rounded flex items-center justify-center text-[#166534]"><Briefcase className="w-3 h-3" /></div>
                  <span className="text-sm font-semibold capitalize">Apply via {job.source || 'ATS'}</span>
                </div>
                <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed mb-6">
                  By clicking "Apply Now" you will be redirected to the official careers portal to complete your application.
                </p>
                <div className="space-y-3">
                  <Button onClick={handleApply} className="w-full bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white font-semibold h-11 flex justify-between px-4">
                    <span>Apply Now</span>
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Job Summary Card */}
            <Card className="border-[var(--border)] shadow-sm bg-white dark:bg-[var(--bg-card)]">
              <CardContent className="p-0">
                <div className="p-5 border-b-2 border-[var(--border)]">
                  <h3 className="font-semibold text-[var(--text-primary)]">Job Summary</h3>
                </div>
                <div className="p-5 space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2 text-[var(--text-muted)]">
                      <MapPin className="w-4 h-4" /> Location
                    </div>
                    <span className="font-medium text-right text-[var(--text-primary)]">{job.location}</span>
                  </div>
                  {(job.salary_max || job.salary_min) && (
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center gap-2 text-[var(--text-muted)]">
                        <Banknote className="w-4 h-4" /> Salary Range
                      </div>
                      <span className="font-medium text-right text-[var(--text-primary)]">
                        ${job.salary_min ? Math.round(job.salary_min/1000) : ''}k - ${job.salary_max ? Math.round(job.salary_max/1000) : ''}k
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2 text-[var(--text-muted)]">
                      <Briefcase className="w-4 h-4" /> Job Type
                    </div>
                    <span className="font-medium text-right text-[var(--text-primary)] capitalize">{job.job_type || 'Full-time'}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>

        {/* Similar Jobs Section placeholder */}
        <section className="mt-16 pt-10 border-t-2 border-[var(--border)]">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold font-headline">Explore More Jobs</h2>
            <Link href="/search" className="text-sm font-semibold text-[var(--primary)] hover:underline flex items-center gap-1">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
