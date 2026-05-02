import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/fade-in";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CompaniesSection({ companies }: { companies: any[] }) {
  const displayCompanies = companies.length > 0 ? companies : [];
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
          {displayCompanies.map((company) => (
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
                  <h3 className="font-bold text-xl text-[var(--text-primary)]">{company.name}</h3>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
