import Hero from "@/components/home/Hero";
import CompaniesSection from "@/components/home/CompaniesSection";
import FieldsSection from "@/components/home/FieldsSection";
import StatsSection from "@/components/home/StatsSection";
import JobCard from "@/components/ui/JobCard";
import { jobs } from "@/data/jobs";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/fade-in";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Home() {
  return (
    <div>
      <Hero />
      <div className="space-y-0 -mt-10">
        <CompaniesSection />
        <div className="-mt-8">
          <FieldsSection />
        </div>
      </div>

      {/* Latest Jobs Feed — UI/UX Pro Max Refinement */}
      <section className="relative py-14 bg-[var(--bg-base)]">
        {/* Architectural Background Lines */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
            style={{
              backgroundImage: `
                linear-gradient(to right, var(--primary) 1px, transparent 1px),
                linear-gradient(to bottom, var(--primary) 1px, transparent 1px)
              `,
              backgroundSize: "80px 80px",
            }}
          />
          {/* Transition Gradient to StatsSection */}
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-base)] via-transparent to-[var(--bg-dark)]/10" />
        </div>

        <div className="relative max-w-[1400px] mx-auto px-8">
          <FadeIn direction="up">
            <div className="bg-white/40 dark:bg-[#15221B]/40 backdrop-blur-xl rounded-[48px] p-10 md:p-16 border-2 border-[var(--border)] dark:border-white/5 shadow-premium">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10 mb-12">
                <div className="max-w-[600px]">
                  <div className="inline-block px-4 py-1.5 rounded-full bg-[var(--primary)]/5 border border-[var(--primary)]/10 text-[var(--primary)] text-[10px] font-extrabold uppercase tracking-[0.2em] mb-4">
                    Fresh Opportunities
                  </div>
                  <h2 className="text-4xl md:text-5xl font-extrabold font-headline tracking-tight mb-3">Latest Openings</h2>
                  <p className="text-[var(--text-secondary)] text-lg font-medium">Curated roles from top company job boards, updated in real-time.</p>
                </div>
                <div className="flex items-center gap-4 p-2 bg-[var(--bg-base)]/50 rounded-2xl border-2 border-[var(--border)]">
                  <span className="pl-4 text-[10px] font-extrabold uppercase tracking-widest text-[var(--text-muted)]">Sort:</span>
                  <Select defaultValue="newest">
                    <SelectTrigger className="bg-transparent border-none font-extrabold text-sm outline-none cursor-pointer pr-4 py-2 text-[var(--primary)] h-auto shadow-none focus:ring-0">
                      <SelectValue placeholder="Sort" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="salary">High Salary</SelectItem>
                      <SelectItem value="remote">Remote Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <StaggerContainer className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {jobs.slice(0, 4).map((job) => (
                  <StaggerItem key={job.id}>
                    <JobCard job={job} />
                  </StaggerItem>
                ))}
              </StaggerContainer>

              <div className="text-center mt-12">
                <button className="btn btn-primary h-14 px-10 text-base font-bold shadow-xl shadow-emerald-950/20 hover:scale-105 transition-transform">
                  Explore 100,000+ Jobs
                </button>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Premium Stats + Features + Testimonials */}
      <div className="-mt-4">
        <StatsSection />
      </div>
    </div>
  );
}
