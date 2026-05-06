import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/fade-in";
import Link from "next/link";
import { TiltCard } from "@/components/ui/TiltCard";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CompaniesSection({ companies }: { companies: any[] }) {
  const featuredFallback = [
    { name: "OpenAI", logo: "https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg" },
    { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
    { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" },
    { name: "Meta", logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg" },
    { name: "Apple", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" },
    { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
    { name: "Netflix", logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" },
    { name: "Tesla", logo: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg" },
  ];

  const displayCompanies = companies.length > 0 ? companies : featuredFallback;
  return (
    <section className="relative py-24 overflow-hidden bg-canvas">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8 pb-8 border-b border-hairline">
          <FadeIn className="space-y-4">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-pill bg-canvas-soft border border-hairline">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink">
                Industry Leaders
              </span>
            </div>
            <h2 className="text-5xl md:text-7xl font-headline tracking-tight text-ink mb-4 leading-none">
              Work with the best.
            </h2>
            <p className="text-body max-w-[600px] text-xl font-medium leading-relaxed">
              We aggregate highest-signal opportunities from companies reshaping our world.
            </p>
          </FadeIn>
          <Link href="/companies">
            <Button variant="outline" className="h-12 px-8 rounded-pill border-hairline hover:bg-canvas-soft hover:text-ink font-bold group">
              View all companies <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {displayCompanies.map((company) => (
            <StaggerItem key={company.name} className="h-full">
              <TiltCard className="h-full group" enableMagnetism={true}>
                <Link
                  href={`/company/${company.name.toLowerCase()}`}
                  className="relative flex flex-col items-center justify-center p-10 bg-surface-card border border-hairline rounded-xl hover:border-hairline-strong hover:shadow-premium-sm transition-all duration-300 h-full"
                >
                  <div className="h-14 w-full flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-500 opacity-30 group-hover:opacity-100 group-hover:scale-110">
                    <img
                      src={company.logo}
                      alt={company.name}
                      className="max-h-full max-w-[140px] object-contain"
                    />
                  </div>
                  
                  <div className="mt-8 text-center">
                    <h3 className="font-bold text-xs text-muted uppercase tracking-[0.2em] group-hover:text-ink transition-colors">{company.name}</h3>
                  </div>
                </Link>
              </TiltCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
