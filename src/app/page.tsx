import Hero from "@/components/home/Hero";
import CompaniesSection from "@/components/home/CompaniesSection";
import FieldsSection from "@/components/home/FieldsSection";
import JobCard from "@/components/ui/JobCard";
import { ArrowRight, Zap, Target, Globe } from "lucide-react";
import { jobs } from "@/data/jobs";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/fade-in";

export default function Home() {
  return (
    <div className="space-y-10 pb-20">
      <Hero />

      {/* Top Companies Section */}
      <CompaniesSection />

      {/* Fields / Industries Section */}
      <FieldsSection />

      {/* Jobs Feed Section */}
      <section className="max-w-[1280px] mx-auto px-6 overflow-hidden py-10">
        <FadeIn direction="up">
          <div className="bg-[var(--bg-card)] rounded-[var(--radius-xl)] p-8 md:p-12 border border-[var(--border)] shadow-sm">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
              <div>
                <h2 className="text-[32px] mb-2 font-headline">Latest Opportunities</h2>
                <p className="text-[var(--text-secondary)]">New roles added in the last 24 hours</p>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-[var(--bg-base)] rounded-full border border-[var(--border)]">
                <span className="text-[12px] font-mono text-[var(--text-muted)]">Sort by:</span>
                <select className="bg-transparent border-none font-semibold text-sm outline-none cursor-pointer">
                  <option>Newest</option>
                  <option>Salary</option>
                </select>
              </div>
            </div>

            <StaggerContainer className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {jobs.map((job) => (
                <StaggerItem key={job.id}>
                  <JobCard job={job} />
                </StaggerItem>
              ))}
            </StaggerContainer>

            <div className="text-center mt-12">
              <button className="btn btn-outline min-w-[200px]">
                Load More Jobs
              </button>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Value Props */}
      <section className="bg-[var(--bg-dark)] py-24 text-white overflow-hidden">
        <StaggerContainer className="max-w-[1280px] mx-auto px-6 grid md:grid-cols-3 gap-12 text-center">
          <StaggerItem>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center mb-6">
                <Zap className="w-8 h-8 text-yellow-500" />
              </div>
              <h3 className="font-bold mb-2">Lightning Fast Apply</h3>
              <p className="text-[var(--text-secondary)] text-sm">Apply to jobs in a single click with your saved JobSphere profile.</p>
            </div>
          </StaggerItem>
          <StaggerItem>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="font-bold mb-2">Smart Matching</h3>
              <p className="text-[var(--text-secondary)] text-sm">Our AI analyzes your skills to bring the most relevant roles to your feed.</p>
            </div>
          </StaggerItem>
          <StaggerItem>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-6">
                <Globe className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="font-bold mb-2">Global Opportunities</h3>
              <p className="text-[var(--text-secondary)] text-sm">Discover remote and on-site opportunities from startups to Fortune 500s.</p>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </section>
    </div>
  );
}
