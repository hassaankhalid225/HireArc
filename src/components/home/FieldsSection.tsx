import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/fade-in";
import { 
  Code2, Palette, Megaphone, Languages, Video, 
  Sparkles, Music, Briefcase, Users, Search 
} from "lucide-react";
import Link from "next/link";
import { TiltCard } from "@/components/ui/TiltCard";
import { Button } from "@/components/ui/button";

const FIELDS = [
  { name: "Programming & Tech", icon: <Code2 className="w-6 h-6" />, color: "bg-gradient-sky/20" },
  { name: "Graphics & Design", icon: <Palette className="w-6 h-6" />, color: "bg-gradient-rose/20" },
  { name: "Digital Marketing", icon: <Megaphone className="w-6 h-6" />, color: "bg-gradient-mint/20" },
  { name: "Writing & Translation", icon: <Languages className="w-6 h-6" />, color: "bg-gradient-lavender/20" },
  { name: "Video & Animation", icon: <Video className="w-6 h-6" />, color: "bg-gradient-peach/20" },
  { name: "AI Services", icon: <Sparkles className="w-6 h-6" />, color: "bg-gradient-sky/20" },
  { name: "Music & Audio", icon: <Music className="w-6 h-6" />, color: "bg-gradient-rose/20" },
  { name: "Business", icon: <Briefcase className="w-6 h-6" />, color: "bg-gradient-mint/20" },
  { name: "Consulting", icon: <Users className="w-6 h-6" />, color: "bg-gradient-lavender/20" },
];

export default function FieldsSection() {
  return (
    <section className="relative py-24 bg-canvas overflow-hidden">
      {/* Background Decorative Bloom */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-lavender/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-custom relative z-10">
        <FadeIn direction="up">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8 pb-8 border-b border-hairline">
            <div className="max-w-[600px] space-y-4">
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-pill bg-canvas-soft border border-hairline">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink">
                  Service Ecosystem
                </span>
              </div>
              <h2 className="text-5xl md:text-6xl font-headline tracking-tight text-ink leading-none">
                Popular Industries
              </h2>
              <p className="text-body text-xl font-medium leading-relaxed">Browse high-signal opportunities across the most innovative sectors.</p>
            </div>
            <Link href="/search">
              <Button variant="outline" className="h-12 px-8 rounded-pill border-hairline hover:bg-ink hover:text-canvas font-bold group transition-all duration-300">
                All Categories <Search className="w-4 h-4 ml-2 group-hover:scale-110 transition-transform" />
              </Button>
            </Link>
          </div>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {FIELDS.map((field) => (
            <StaggerItem key={field.name} className="h-full">
              <TiltCard className="h-full group" enableMagnetism={true}>
                <Link 
                  href={`/search?field=${field.name.toLowerCase()}`}
                  className="relative flex flex-col items-center justify-center gap-6 p-8 bg-white/70 dark:bg-white/10 backdrop-blur-md border border-hairline rounded-xl shadow-premium-sm hover:shadow-premium hover:border-hairline-strong transition-all duration-500 h-full text-center min-h-[170px] group/card overflow-hidden"
                >
                  {/* Atmospheric Hover Bloom */}
                  <div className={`absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 blur-[40px] -z-10 ${field.color}`} />
                  
                  <div className="text-muted group-hover/card:text-ink transition-all duration-500 group-hover/card:scale-110 group-hover/card:-translate-y-1">
                    {field.icon}
                  </div>
                  <h3 className="font-bold text-[11px] leading-snug text-muted uppercase tracking-[0.2em] group-hover/card:text-ink transition-all duration-500">
                    {field.name}
                  </h3>

                  {/* Corner Accent */}
                  <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-white/20 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity" />
                </Link>
              </TiltCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
