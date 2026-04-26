import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/fade-in";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const COMPANIES = [
  { name: "Google", logo: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png", roles: 420 },
  { name: "Meta", logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg", roles: 156 },
  { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg", roles: 890 },
  { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", roles: 345 },
  { name: "Netflix", logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg", roles: 82 },
  { name: "Apple", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg", roles: 210 },
  { name: "Stripe", logo: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg", roles: 64 },
  { name: "Airbnb", logo: "https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_Bélo.svg", roles: 112 },
];

export default function CompaniesSection() {
  return (
    <section className="relative py-12 overflow-hidden bg-[var(--bg-base)]">
      {/* ── Premium Architectural Grid Background ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Diagonal Cross-hatch Grid */}
        <div 
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07]" 
          style={{ 
            backgroundImage: `
              linear-gradient(45deg, var(--primary) 1px, transparent 1px),
              linear-gradient(-45deg, var(--primary) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }} 
        />
        {/* Glow & Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-base)] via-transparent to-[var(--bg-base)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[var(--primary)]/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
          <FadeIn>
            <div className="inline-block px-4 py-1.5 rounded-full bg-[var(--primary)]/5 border border-[var(--primary)]/10 text-[var(--primary)] text-xs font-extrabold uppercase tracking-widest mb-4">
              Industry Leaders
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold font-headline mb-4 tracking-tight">
              Work with the best.
            </h2>
            <p className="text-[var(--text-secondary)] max-w-[600px] text-lg leading-relaxed font-medium">
              We aggregate highest-signal opportunities from companies reshaping our world.
            </p>
          </FadeIn>
          <Link href="/companies" className="btn btn-outline h-14 px-8 group border-2">
            View all companies <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {COMPANIES.map((company) => (
            <StaggerItem key={company.name}>
              <Link
                href={`/company/${company.name.toLowerCase()}`}
                className="group relative flex flex-col items-center justify-center p-10 bg-white dark:bg-[#15221B] border-2 border-[var(--border)] dark:border-white/5 rounded-[32px] hover:shadow-premium hover:-translate-y-2 transition-all duration-500 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/0 to-[var(--primary)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="h-16 w-full flex items-center justify-center mb-8 grayscale group-hover:grayscale-0 transition-all duration-500 opacity-60 group-hover:opacity-100">
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="max-h-full max-w-[140px] object-contain"
                  />
                </div>
                
                <div className="text-center relative z-10">
                  <h3 className="font-bold text-xl text-[var(--text-primary)] mb-3">{company.name}</h3>
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--mint)] dark:bg-white/5 text-[12px] font-extrabold text-[var(--primary)] dark:text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-[var(--primary)] dark:bg-emerald-400 animate-pulse" />
                    {company.roles} open roles
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
