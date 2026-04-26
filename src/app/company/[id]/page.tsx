"use client";
import { useParams } from "next/navigation";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/fade-in";
import Link from "next/link";
import { 
  MapPin, Building2, ExternalLink, Users, Calendar, 
  CheckCircle2, ArrowRight, Share2, Link as LinkIcon, Globe,
  Briefcase, ShieldCheck, Zap
} from "lucide-react";
import JobCard from "@/components/ui/JobCard";
import { jobs } from "@/data/jobs";

const COMPANIES_DB: Record<string, any> = {
  google: {
    name: "Google",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    roles: 420,
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
    roles: 156,
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
  }
};

export default function CompanyProfile() {
  const params = useParams();
  const id = params.id as string;
  
  // Fallback to Google if company not found for demo purposes
  const company = COMPANIES_DB[id] || COMPANIES_DB.google;

  // Filter jobs for this company
  const companyJobs = jobs.filter(j => j.company.toLowerCase().includes(company.name.toLowerCase()));

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
                  <div className="flex items-center gap-2"><Globe className="w-4 h-4" /> <Link href={company.website} target="_blank" className="hover:text-white underline">{company.website.replace("https://", "")}</Link></div>
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
                <h2 className="text-2xl font-bold">Open Positions ({company.roles})</h2>
                <Link href="/search" className="text-[var(--primary)] font-bold text-sm flex items-center gap-1 hover:underline">
                  View all <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <StaggerContainer className="space-y-4">
                {companyJobs.length > 0 ? (
                  companyJobs.map((job) => (
                    <StaggerItem key={job.id}>
                      <JobCard job={job} />
                    </StaggerItem>
                  ))
                ) : (
                  <div className="p-8 rounded-2xl bg-gray-50 dark:bg-white/5 border border-dashed border-[var(--border)] text-center">
                    <p className="text-[var(--text-secondary)]">No active positions currently listed on HireArc.</p>
                  </div>
                )}
              </StaggerContainer>
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
