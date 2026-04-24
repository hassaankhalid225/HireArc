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
    <section className="bg-white dark:bg-[var(--bg-base)] py-20 border-y border-[var(--border)]">
      <div className="max-w-[1400px] mx-auto px-6">
        <FadeIn direction="up">
          <div className="mb-12">
            <h2 className="text-[32px] font-bold font-headline text-gray-900 dark:text-white">Popular Services</h2>
          </div>
        </FadeIn>

        <div className="relative">
          <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-9 gap-4">
            {FIELDS.map((field) => (
              <StaggerItem key={field.name}>
                <Link 
                  href={`/search?field=${field.name.toLowerCase()}`}
                  className="group relative flex flex-col items-start gap-6 p-6 bg-white dark:bg-[#233027] border border-gray-100 dark:border-gray-800 rounded-xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden min-h-[160px]"
                >
                  {/* Hover Animation Background */}
                  <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
                    <div className="w-0 h-0 bg-[#F0FDF4] dark:bg-[#1C261F] rounded-full transition-all duration-500 ease-out group-hover:w-[300%] group-hover:h-[300%] opacity-0 group-hover:opacity-100" />
                  </div>

                  {/* Content - Icon and Text */}
                  <div className="relative z-10 w-full">
                    <div className="text-gray-700 dark:text-gray-300 group-hover:text-[var(--primary)] transition-colors duration-300 mb-6">
                      {field.icon}
                    </div>
                    <h3 className="font-bold text-[14px] sm:text-[15px] leading-tight text-gray-800 dark:text-gray-100 group-hover:text-[var(--primary)] transition-colors duration-300">
                      {field.name}
                    </h3>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
        
        <FadeIn direction="up" delay={0.4}>
          <div className="mt-12 flex items-center justify-between border-t border-gray-100 dark:border-gray-800 pt-8">
            <p className="text-gray-500 dark:text-gray-400 font-medium">Explore more industries and specialized fields</p>
            <Link href="/categories" className="flex items-center gap-2 text-[var(--primary)] font-bold hover:gap-3 transition-all">
              Browse all categories
              <Search className="w-4 h-4" />
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
