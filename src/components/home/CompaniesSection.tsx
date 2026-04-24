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
    <section className="max-w-[1280px] mx-auto px-6 py-20">
      <FadeIn direction="up">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
          <div>
            <h2 className="text-[32px] md:text-[40px] font-bold font-headline mb-3">Top Companies Hiring Now</h2>
            <p className="text-[var(--text-secondary)] text-lg">Work at the world's most innovative tech companies.</p>
          </div>
          <Link href="/companies" className="btn btn-outline group">
            View all companies <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </FadeIn>

      <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {COMPANIES.map((company) => (
          <StaggerItem key={company.name}>
            <Link 
              href={`/company/${company.name.toLowerCase()}`}
              className="flex flex-col items-center justify-center p-8 bg-white dark:bg-[#233027] border-2 border-[var(--primary)] rounded-[var(--radius-xl)] hover:shadow-xl transition-all duration-300 group"
            >
              <div className="h-12 w-full flex items-center justify-center mb-6 grayscale group-hover:grayscale-0 transition-all">
                <img 
                  src={company.logo} 
                  alt={company.name} 
                  className="max-h-full max-w-[120px] object-contain"
                />
              </div>
              <div className="text-center">
                <h3 className="font-bold text-[var(--text-primary)] mb-2">{company.name}</h3>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F0FDF4] dark:bg-white/5 border border-[var(--primary)] text-[11px] font-bold text-[var(--primary)] dark:text-white/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]" />
                  {company.roles} open roles
                </div>
              </div>
            </Link>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
