"use client";
import { Search, MapPin } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import JobSphereGlobe from "./JobSphereGlobe";

export default function Hero() {
  return (
    <section className="relative pt-24 pb-12 overflow-hidden bg-[var(--bg-dark)] dark:bg-[#0A110D]">
      {/* ── Premium Background Architecture ── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Architectural Grid */}
        <div 
          className="absolute inset-0 opacity-[0.1] dark:opacity-[0.05]" 
          style={{ 
            backgroundImage: `
              linear-gradient(to right, white 1px, transparent 1px),
              linear-gradient(to bottom, white 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }} 
        />
        
        {/* Dynamic Mesh Gradients */}
        <div className="absolute top-[-10%] left-[-5%] w-[50%] h-[50%] bg-emerald-500/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] bg-[var(--primary-light)]/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
        
        {/* Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-dark)]/50 via-transparent to-[var(--bg-dark)]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          {/* Left Content */}
          <div className="max-w-[800px] text-center lg:text-left">
            <FadeIn>
              <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-10 group hover:border-emerald-500/30 transition-all duration-500">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-white/60 group-hover:text-white transition-colors">
                  The Future of Career Finding
                </span>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <h1 className="text-5xl md:text-7xl lg:text-[92px] font-extrabold font-headline leading-[0.95] mb-8 tracking-[-0.04em]">
                The future of<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-emerald-100 to-white/40">
                  career finding.
                </span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p className="text-lg md:text-xl text-white/50 max-w-[620px] lg:mx-0 mx-auto leading-relaxed mb-12 font-medium">
                Aggregating the world's highest-signal job data into one unified, 
                AI-enhanced interface. No sponsored noise, just your next big move.
              </p>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="relative group max-w-[800px] lg:mx-0 mx-auto">
                {/* Outer Glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-sage-500/20 rounded-[40px] blur-xl opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                
                <div className="relative bg-white dark:bg-[#1A2E26] p-2 rounded-[32px] shadow-2xl flex flex-col md:flex-row gap-2 hover:translate-y-[-2px] transition-all duration-500 border border-[var(--border)] dark:border-white/10">
                  <div className="flex-1 flex items-center gap-3 px-6 py-4">
                    <Search className="w-5 h-5 text-gray-400" />
                    <input 
                      type="text" 
                      placeholder="Search by role or company..." 
                      className="w-full bg-transparent outline-none text-gray-900 dark:text-white text-base font-bold placeholder:text-gray-400"
                    />
                  </div>
                  <div className="hidden md:block w-[1px] h-8 self-center bg-gray-100 dark:bg-white/5" />
                  <div className="flex-1 flex items-center gap-3 px-6 py-4">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <input 
                      type="text" 
                      placeholder="Location or Remote" 
                      className="w-full bg-transparent outline-none text-gray-900 dark:text-white text-base font-bold placeholder:text-gray-400"
                    />
                  </div>
                  <button className="bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white font-extrabold px-10 py-4 rounded-[24px] shadow-lg shadow-emerald-950/20 transition-all active:scale-[0.98] text-sm uppercase tracking-wider">
                    Find Talent
                  </button>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right Side: 3D Model */}
          <div className="hidden lg:flex relative items-center justify-center" style={{ flexShrink: 0 }}>
            <FadeIn direction="left" delay={0.5}>
              <div className="relative">
                {/* Ambient Glow behind the globe */}
                <div className="absolute inset-0 bg-emerald-500/15 rounded-full blur-[80px] -z-10 scale-75" />
                <JobSphereGlobe size={480} />
              </div>
            </FadeIn>
          </div>
        </div>

        <FadeIn delay={0.6}>
          <div className="flex flex-wrap justify-center lg:justify-start items-center gap-6 mt-16">
            <span className="text-xs font-bold uppercase tracking-widest text-white/30">Trusted by innovators at:</span>
            <div className="flex gap-8 opacity-40 grayscale contrast-125">
              {['Stripe', 'Linear', 'OpenAI', 'Vercel'].map(brand => (
                <span key={brand} className="text-sm font-bold font-headline tracking-tighter text-white">{brand}</span>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
