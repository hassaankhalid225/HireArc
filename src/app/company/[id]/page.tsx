"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/fade-in";
import Link from "next/link";
import { 
  MapPin, Building2, ExternalLink, Users, Calendar, 
  CheckCircle2, ArrowRight, Share2, Link as LinkIcon, Globe,
  Briefcase, ShieldCheck, Zap, Loader2, Sparkles
} from "lucide-react";
import JobCard, { JobCardSkeleton } from "@/components/ui/JobCard";
import { jobsService } from "@/services/jobs.service";
import { Job } from "@/types";
import { Button } from "@/components/ui/button";

const COMPANIES_DB: Record<string, any> = {
  google: {
    name: "Google",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    roles: 0,
    category: "Tech Giant",
    location: "Mountain View, CA",
    founded: "1998",
    employees: "100,000+",
    website: "https://google.com",
    description: "Google is a global leader in technology, focusing on improving the ways people connect with information. From search to cloud computing, software, and hardware, Google's mission is to organize the world's information.",
    benefits: [
      { title: "Health & Wellness", desc: "Comprehensive health insurance and onsite wellness centers.", icon: <ShieldCheck className="w-5 h-5" /> },
      { title: "Learning & Growth", desc: "Generous tuition reimbursement and internal learning programs.", icon: <Zap className="w-5 h-5" /> },
      { title: "Work-Life Balance", desc: "Flexible work hours and generous parental leave policies.", icon: <Users className="w-5 h-5" /> }
    ]
  },
  meta: {
    name: "Meta",
    logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg",
    roles: 0,
    category: "Social Media",
    location: "Menlo Park, CA",
    founded: "2004",
    employees: "70,000+",
    website: "https://meta.com",
    description: "Meta builds technologies that help people connect, find communities, and grow businesses. We are moving beyond 2D screens toward immersive experiences like the metaverse.",
    benefits: [
      { title: "Remote First", desc: "Work from anywhere in the world with full support.", icon: <Globe className="w-5 h-5" /> },
      { title: "High Impact", desc: "Build tools used by billions of people daily.", icon: <Zap className="w-5 h-5" /> },
      { title: "Innovation", desc: "Join the team building the future of social connection.", icon: <Briefcase className="w-5 h-5" /> }
    ]
  },
  stripe: {
    name: "Stripe",
    logo: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg",
    category: "Fintech",
    location: "San Francisco, CA",
    founded: "2010",
    employees: "8,000+",
    website: "https://stripe.com",
    description: "Stripe is a financial infrastructure platform for businesses. Millions of companies—from the world’s largest enterprises to the most ambitious startups—use Stripe to accept payments, grow their revenue, and accelerate new business opportunities.",
    benefits: [
      { title: "Financial Growth", desc: "Competitive equity and financial planning tools.", icon: <ShieldCheck className="w-5 h-5" /> },
      { title: "Global Scale", desc: "Solve complex problems at a global scale.", icon: <Globe className="w-5 h-5" /> }
    ]
  },
  coursera: {
    name: "Coursera",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/97/Coursera-Logo_600x600.svg",
    category: "EdTech",
    location: "Mountain View, CA",
    founded: "2012",
    employees: "2,000+",
    website: "https://coursera.org",
    description: "Coursera is the global online learning platform that offers anyone, anywhere, access to online courses and degrees from world-class universities and companies.",
    benefits: [
      { title: "Free Learning", desc: "Unlimited access to all Coursera courses and degrees.", icon: <Zap className="w-5 h-5" /> },
      { title: "Social Impact", desc: "Help provide education to millions worldwide.", icon: <Users className="w-5 h-5" /> }
    ]
  },
  figma: {
    name: "Figma",
    logo: "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg",
    category: "Design Software",
    location: "San Francisco, CA",
    founded: "2012",
    employees: "1,300+",
    website: "https://figma.com",
    description: "Figma is the leading collaborative design tool for teams. We believe that distance shouldn't be a barrier to collaborative work.",
    benefits: [
      { title: "Creative Culture", desc: "A workplace built by designers, for designers.", icon: <Sparkles className="w-5 h-5" /> },
      { title: "Collaboration", desc: "Work on the tool that defines the future of design.", icon: <Users className="w-5 h-5" /> }
    ]
  },
  airbnb: {
    name: "Airbnb",
    logo: "https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_Bélo.svg",
    category: "Travel",
    location: "San Francisco, CA",
    founded: "2008",
    employees: "6,000+",
    website: "https://airbnb.com",
    description: "Airbnb is a community based on connection and belonging—a community that was born in 2008 when two hosts welcomed three guests to their San Francisco home.",
    benefits: [
      { title: "Travel Credits", desc: "Annual credits to explore the world with Airbnb.", icon: <Globe className="w-5 h-5" /> },
      { title: "Belonging", desc: "A mission-driven culture focused on global connection.", icon: <Users className="w-5 h-5" /> }
    ]
  },
  netflix: {
    name: "Netflix",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
    category: "Entertainment",
    location: "Los Gatos, CA",
    founded: "1997",
    employees: "12,000+",
    website: "https://netflix.com",
    description: "Netflix is the world's leading streaming entertainment service with 230 million paid memberships in over 190 countries enjoying TV series, documentaries, feature films and mobile games across a wide variety of genres and languages.",
    benefits: [
      { title: "Freedom & Responsibility", desc: "A unique culture focused on high performance and trust.", icon: <Zap className="w-5 h-5" /> },
      { title: "Innovation", desc: "Shape the future of global entertainment.", icon: <Sparkles className="w-5 h-5" /> }
    ]
  }
};

export default function CompanyProfile() {
  const [mounted, setMounted] = useState(false);
  const params = useParams();
  const id = params.id as string;

  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Dynamic company data: use DB if exists, otherwise generate basic one from ID
  const company = COMPANIES_DB[id] || {
    name: id.charAt(0).toUpperCase() + id.slice(1),
    logo: `https://ui-avatars.com/api/?name=${id}&background=2D4A3E&color=fff&size=128`,
    roles: 0,
    category: "Organization",
    location: "Global",
    founded: "N/A",
    employees: "1000+",
    website: `https://${id}.com`,
    description: `${id.charAt(0).toUpperCase() + id.slice(1)} is a leading organization in its field, focused on delivering excellence and innovation to its global customer base.`,
    benefits: [
      { title: "Global Impact", desc: "Work on projects that matter to millions.", icon: <Zap className="w-5 h-5" /> },
      { title: "Flexibility", desc: "Modern work culture with remote options.", icon: <Globe className="w-5 h-5" /> }
    ]
  };

  const [companyJobs, setCompanyJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  async function fetchCompanyJobs(page: number) {
    setIsLoading(true);
    try {
      const res = await jobsService.getJobs({ 
        company: company.name, 
        page: page,
        pageSize: itemsPerPage 
      });
      setCompanyJobs(res.data || []);
      setTotalPages(res.pagination?.totalPages || 1);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchCompanyJobs(currentPage);
  }, [company.name, currentPage]);

  return (
    <div className="min-h-screen bg-[var(--bg-base)]">
      {/* Premium Header */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-[var(--primary)] text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/20" />
        <div className="max-w-[1280px] mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-8">
            <FadeIn direction="none">
              <div className="w-32 h-32 rounded-3xl bg-white p-6 shadow-2xl flex items-center justify-center">
                <img src={company.logo} alt={company.name} className="max-h-full max-w-full object-contain" />
              </div>
            </FadeIn>
            
            <div className="flex-1 text-center md:text-left space-y-4">
              <FadeIn direction="up">
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-2">
                  <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-bold uppercase tracking-widest text-green-400">Verified Employer</span>
                  <div className="flex items-center gap-1 text-yellow-400">
                    {"★★★★★".split("").map((s, i) => <span key={i}>{s}</span>)}
                    <span className="text-white/60 text-xs ml-1">(4.8/5)</span>
                  </div>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold font-headline mb-2">{company.name}</h1>
                <div className="flex flex-wrap justify-center md:justify-start gap-6 text-white/70 text-sm">
                  <div className="flex items-center gap-2"><Building2 className="w-4 h-4" /> {company.category}</div>
                  <div className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {company.location}</div>
                  <div className="flex items-center gap-2"><Globe className="w-4 h-4" /> <a href={company.website} target="_blank" rel="noopener noreferrer" className="hover:text-white underline">{company.website.replace("https://", "").replace("http://", "")}</a></div>
                </div>
              </FadeIn>
            </div>

            <FadeIn direction="left">
              <div className="flex gap-3">
                <button className="p-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 transition-all"><Share2 className="w-5 h-5" /></button>
                <button className="p-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 transition-all"><LinkIcon className="w-5 h-5" /></button>
                <Link href="#jobs" className="px-8 py-4 rounded-xl bg-green-500 hover:bg-green-600 text-white font-bold transition-all shadow-lg shadow-green-500/20">
                  Open Positions
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-[1280px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column: About & Benefits */}
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                About {company.name}
              </h2>
              <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
                {company.description}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-8">Why work with us?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {company.benefits.map((benefit: any, idx: number) => (
                  <div key={idx} className="p-6 rounded-2xl bg-white dark:bg-[#233027] border-2 border-[var(--border)] hover:border-[var(--primary)] transition-all group">
                    <div className="w-12 h-12 rounded-xl bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      {benefit.icon}
                    </div>
                    <h3 className="font-bold mb-2">{benefit.title}</h3>
                    <p className="text-sm text-[var(--text-secondary)]">{benefit.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Open Jobs Section */}
            <section id="jobs" className="pt-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold">Open Positions</h2>
                <Link href="/search" className="text-[var(--primary)] font-bold text-sm flex items-center gap-1 hover:underline">
                  View all <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="space-y-4">
                {!mounted || isLoading ? (
                  <div className="grid grid-cols-1 gap-6">
                    {[1, 2, 3].map(i => <JobCardSkeleton key={i} />)}
                  </div>
                ) : companyJobs && companyJobs.length > 0 ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 gap-6">
                      {companyJobs.map((job) => (
                        <JobCard key={job.job_id} job={job} />
                      ))}
                    </div>
                    
                    {/* Pagination for Jobs */}
                    {totalPages > 1 && (
                      <div className="flex items-center justify-center gap-4 pt-8">
                        <Button
                          variant="outline"
                          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                          disabled={currentPage === 1 || isLoading}
                          className="font-bold border-2"
                        >
                          Previous
                        </Button>
                        <span className="text-sm font-bold text-[var(--text-secondary)]">
                          Page {currentPage} of {totalPages}
                        </span>
                        <Button
                          variant="outline"
                          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                          disabled={currentPage === totalPages || isLoading}
                          className="font-bold border-2"
                        >
                          Next
                        </Button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-12 rounded-[32px] bg-white dark:bg-white/5 border-2 border-dashed border-[var(--border)] text-center space-y-4">
                    <div className="w-16 h-16 bg-[var(--bg-base)] rounded-full flex items-center justify-center mx-auto">
                      <Briefcase className="w-8 h-8 text-[var(--text-muted)]" />
                    </div>
                    <div>
                      <p className="text-lg font-bold">No active positions found</p>
                      <p className="text-[var(--text-secondary)] max-w-xs mx-auto mb-4">
                        We couldn't find any current openings for {company.name} in our database.
                      </p>
                      <p className="text-xs text-[var(--primary)] font-bold bg-[var(--primary)]/5 p-3 rounded-xl border border-[var(--primary)]/10">
                        TIP: Try companies like "Airbnb", "Stripe", or "Netflix" which currently have data.
                      </p>
                    </div>
                    <Link href="/search" className="inline-block px-6 py-2 rounded-xl bg-[var(--primary)] text-white font-bold text-sm hover:scale-105 transition-transform">
                      Browse All Jobs
                    </Link>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Right Column: Sidebar Stats */}
          <div className="space-y-8">
            <div className="p-8 rounded-3xl bg-white dark:bg-[#233027] border-2 border-[var(--border)] shadow-sm space-y-6">
              <h3 className="font-bold text-lg mb-2">Company Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[var(--text-secondary)] text-sm flex items-center gap-2"><Calendar className="w-4 h-4" /> Founded</span>
                  <span className="font-bold text-sm">{company.founded}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[var(--text-secondary)] text-sm flex items-center gap-2"><Users className="w-4 h-4" /> Employees</span>
                  <span className="font-bold text-sm">{company.employees}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[var(--text-secondary)] text-sm flex items-center gap-2"><Building2 className="w-4 h-4" /> Headquarter</span>
                  <span className="font-bold text-sm">{company.location.split(",")[0]}</span>
                </div>
              </div>

              <hr className="border-[var(--border)]" />

              <div>
                <h4 className="text-sm font-bold mb-4 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Hiring Process</h4>
                <div className="space-y-3">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center text-[10px] font-bold shrink-0">{i}</div>
                      <p className="text-xs text-[var(--text-secondary)]">
                        {i === 1 && "Initial Screening & Portfolio Review"}
                        {i === 2 && "Technical Interview & Case Study"}
                        {i === 3 && "Final On-site Cultural Fit Round"}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] text-white">
              <h3 className="font-bold text-lg mb-2">Grow with {company.name}</h3>
              <p className="text-white/70 text-sm mb-6">Join a team that values innovation, diversity, and professional growth.</p>
              <Link href="/signup" className="block w-full py-3 rounded-xl bg-white text-[var(--primary)] font-bold text-center text-sm hover:scale-[1.02] transition-transform">
                Apply to join
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
