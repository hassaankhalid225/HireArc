import Hero from "@/components/home/Hero";
import CompaniesSection from "@/components/home/CompaniesSection";
import FieldsSection from "@/components/home/FieldsSection";
import StatsSection from "@/components/home/StatsSection";
import JobCard from "@/components/ui/JobCard";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/fade-in";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { jobsService } from "@/services/jobs.service";
import { apiClient } from "@/services/api";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Server Component
export default async function Home() {
  // Fetch real jobs, stats, and companies from backend
  const [jobsRes, statsData, companiesRes] = await Promise.all([
    jobsService.getJobs({ pageSize: 4 }).catch(() => null),
    apiClient.get<any>("/stats").catch(() => null),
    apiClient.get<any>("/companies").catch(() => ({ companies: [] }))
  ]);
  
  const latestJobs = jobsRes?.data || [];
  const realStats = statsData || { total_jobs: 0, total_companies: 0, remote_jobs: 0 };
  const realCompanies = companiesRes.companies?.slice(0, 8) || [];

  return (
    <div className="bg-canvas">
      <Hero />
      <div className="space-y-0 -mt-10">
        <CompaniesSection companies={realCompanies} />
        <div className="-mt-8">
          <FieldsSection />
        </div>
      </div>

      {/* Latest Jobs Feed — ElevenLabs Editorial Refinement */}
      <section className="relative py-24 bg-canvas">
        <div className="container-custom">
          <FadeIn direction="up">
            <div className="bg-surface-card rounded-xl p-8 md:p-20 border border-hairline shadow-premium-sm">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10 mb-20 pb-10 border-b border-hairline">
                <div className="max-w-[600px] space-y-4">
                  <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-pill bg-canvas-soft border border-hairline text-ink text-[10px] font-bold uppercase tracking-[0.2em]">
                    Fresh Opportunities
                  </div>
                  <h2 className="text-5xl md:text-7xl font-headline tracking-tight text-ink leading-none">
                    Latest Openings
                  </h2>
                  <p className="text-body text-xl font-medium leading-relaxed">
                    Curated roles from top company job boards, updated in real-time.
                  </p>
                </div>
                
                <div className="flex items-center gap-4 p-2 bg-canvas-soft rounded-pill border border-hairline shadow-sm">
                  <span className="pl-6 text-[10px] font-bold uppercase tracking-[0.2em] text-muted">Sort</span>
                  <Select defaultValue="newest">
                    <SelectTrigger className="bg-transparent border-none font-bold text-xs outline-none cursor-pointer pr-6 py-2 text-ink h-auto shadow-none focus:ring-0 uppercase tracking-widest">
                      <SelectValue placeholder="Sort" />
                    </SelectTrigger>
                    <SelectContent className="bg-surface-card border-hairline rounded-xl">
                      <SelectItem value="newest" className="text-xs font-bold uppercase tracking-widest">Newest First</SelectItem>
                      <SelectItem value="salary" className="text-xs font-bold uppercase tracking-widest">High Salary</SelectItem>
                      <SelectItem value="remote" className="text-xs font-bold uppercase tracking-widest">Remote Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {latestJobs.length > 0 ? (
                <StaggerContainer className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                  {latestJobs.map((job) => (
                    <StaggerItem key={job.job_id}>
                      <JobCard job={job} />
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              ) : (
                <div className="text-center py-32 border border-dashed border-hairline rounded-xl bg-canvas-soft/30">
                  <p className="text-muted font-bold uppercase tracking-[0.2em] text-xs">Checking for new jobs...</p>
                </div>
              )}

              <div className="text-center mt-20">
                <Link href="/search">
                  <Button className="h-14 px-12 rounded-pill bg-ink text-canvas text-base font-bold shadow-premium-sm hover:opacity-90 transition-all">
                    Explore {realStats.total_jobs?.toLocaleString() || "1,000"}+ Jobs
                  </Button>
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Premium Stats + Testimonials */}
      <div className="space-y-0">
        <StatsSection stats={realStats} />
      </div>
    </div>
  );
}
