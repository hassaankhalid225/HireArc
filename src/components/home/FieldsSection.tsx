import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/fade-in";
import { 
  Code2, Palette, Megaphone, Languages, Video, 
  Sparkles, Music, Briefcase, Users, Search 
} from "lucide-react";
import Link from "next/link";

const FIELDS = [
  { name: "Programming & Tech", icon: <Code2 className="w-8 h-8" /> },
  { name: "Graphics & Design", icon: <Palette className="w-8 h-8" /> },
  { name: "Digital Marketing", icon: <Megaphone className="w-8 h-8" /> },
  { name: "Writing & Translation", icon: <Languages className="w-8 h-8" /> },
  { name: "Video & Animation", icon: <Video className="w-8 h-8" /> },
  { name: "AI Services", icon: <Sparkles className="w-8 h-8" /> },
  { name: "Music & Audio", icon: <Music className="w-8 h-8" /> },
  { name: "Business", icon: <Briefcase className="w-8 h-8" /> },
  { name: "Consulting", icon: <Users className="w-8 h-8" /> },
];

export default function FieldsSection() {
  return (
    <section className="relative py-14 bg-[var(--bg-base)] overflow-hidden">
      {/* ── Architectural Grid Background ── */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]">
        <div 
          className="absolute inset-0" 
          style={{ 
            backgroundImage: `linear-gradient(to right, var(--primary) 1px, transparent 1px), linear-gradient(to bottom, var(--primary) 1px, transparent 1px)`,
            backgroundSize: '100px 100px',
          }} 
        />
      </div>

      <div className="max-w-[1400px] mx-auto px-8 relative z-10">
        <FadeIn direction="up">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div className="max-w-[600px]">
              <div className="inline-block px-4 py-1.5 rounded-full bg-[var(--primary)]/5 border border-[var(--primary)]/10 text-[var(--primary)] text-[10px] font-extrabold uppercase tracking-[0.2em] mb-6">
                Service Ecosystem
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold font-headline tracking-tight mb-4">Popular Industries</h2>
              <p className="text-[var(--text-secondary)] text-lg font-medium">Browse high-signal opportunities across the most innovative sectors.</p>
            </div>
            <Link href="/categories" className="btn btn-outline h-14 px-8 group border-2">
              All Categories <Search className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform" />
            </Link>
          </div>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-9 gap-4">
          {FIELDS.map((field) => (
            <StaggerItem key={field.name}>
              <Link 
                href={`/search?field=${field.name.toLowerCase()}`}
                className="group relative flex flex-col items-center justify-center gap-6 p-6 bg-white dark:bg-[#15221B] border border-[var(--border)] dark:border-white/5 rounded-[24px] hover:shadow-premium hover:-translate-y-1.5 transition-all duration-500 overflow-hidden min-h-[160px] text-center"
              >
                {/* Refined Glass Highlight */}
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/0 to-[var(--primary)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className="text-gray-400 group-hover:text-[var(--primary)] dark:group-hover:text-emerald-400 transition-all duration-500 mb-4 transform group-hover:scale-110">
                    {field.icon}
                  </div>
                  <h3 className="font-bold text-[13px] leading-snug text-gray-800 dark:text-gray-200 group-hover:text-[var(--primary)] dark:group-hover:text-white transition-colors">
                    {field.name}
                  </h3>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
