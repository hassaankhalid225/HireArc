"use client";
import { Search, MapPin } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import HireArcGlobe from "./HireArcGlobe";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-canvas flex flex-col justify-center pt-24 pb-24">
      {/* ── Editorial Atmospheric Background ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Layered Gradient Orbs */}
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-gradient-sky/20 dark:bg-gradient-sky/30 rounded-full blur-[160px] animate-pulse" style={{ animationDuration: '15s' }} />
        <div className="absolute top-[10%] right-[-15%] w-[60%] h-[60%] bg-gradient-lavender/15 dark:bg-gradient-lavender/25 rounded-full blur-[140px] animate-pulse" style={{ animationDuration: '18s', animationDelay: '2s' }} />
        <div className="absolute bottom-[-20%] left-[10%] w-[50%] h-[50%] bg-gradient-mint/15 dark:bg-gradient-mint/25 rounded-full blur-[150px]" />
        <div className="absolute bottom-[10%] right-[10%] w-[40%] h-[40%] bg-gradient-rose/10 dark:bg-gradient-rose/20 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '20s', animationDelay: '5s' }} />
        
        {/* Subtle Grain Overlay */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      <div className="container-custom relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left Content */}
          <div className="max-w-[750px] text-center lg:text-left">
            <FadeIn>
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-pill bg-canvas-soft border border-hairline mb-10">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink">
                  Next-Gen Career Intelligence
                </span>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <h1 className="text-6xl md:text-8xl lg:text-[110px] font-headline font-normal leading-[0.82] mb-10 tracking-[-0.055em] text-ink">
                The future of
                <br />
                <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-rose-500 dark:from-indigo-400 dark:via-violet-400 dark:to-rose-400 bg-clip-text text-transparent block pb-6 -mb-6 drop-shadow-[0_2px_10px_rgba(99,102,241,0.15)]">
                  career finding.
                </span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p className="text-lg md:text-xl text-body max-w-[620px] lg:mx-0 mx-auto leading-relaxed mb-12 font-medium">
                Aggregating the world&apos;s highest-signal job data into one unified,
                AI-enhanced interface. No sponsored noise, just your next big move.
              </p>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="relative group max-w-[850px] lg:mx-0 mx-auto">
                <div className="relative bg-white/60 dark:bg-white/5 backdrop-blur-xl p-2 rounded-pill shadow-premium border border-white/40 dark:border-white/10 flex flex-col md:flex-row items-center transition-all duration-700 hover:shadow-2xl hover:bg-white/80 dark:hover:bg-white/10 focus-within:border-ink/10 dark:focus-within:border-white/20 focus-within:ring-4 focus-within:ring-ink/5 dark:focus-within:ring-white/5">
                  <div className="flex-[1.4] flex items-center gap-4 px-7 py-3 w-full group/input">
                    <Search className="w-5 h-5 text-muted dark:text-muted/80 group-focus-within/input:text-ink dark:group-focus-within/input:text-white transition-colors shrink-0" />
                    <input
                      type="text"
                      placeholder="Search by role or company..."
                      className="w-full bg-transparent outline-none text-ink text-base font-medium placeholder:text-muted/50 dark:placeholder:text-muted/70"
                    />
                  </div>
                  
                  <div className="hidden md:block w-px h-10 bg-hairline/60 dark:bg-white/10 mx-2" />
                  
                  <div className="flex-1 flex items-center gap-4 px-7 py-3 w-full group/input">
                    <MapPin className="w-5 h-5 text-muted dark:text-muted/80 group-focus-within/input:text-ink dark:group-focus-within/input:text-white transition-colors shrink-0" />
                    <input
                      type="text"
                      placeholder="Location or Remote"
                      className="w-full bg-transparent outline-none text-ink text-base font-medium placeholder:text-muted/50 dark:placeholder:text-muted/70"
                    />
                  </div>

                  <button className="h-14 px-12 rounded-pill bg-ink dark:bg-white dark:text-canvas text-canvas text-[15px] font-bold w-full md:w-auto hover:bg-ink/90 dark:hover:bg-white/90 active:scale-[0.97] transition-all shadow-xl shadow-ink/10 dark:shadow-white/5 shrink-0">
                    Find Jobs
                  </button>
                </div>
              </div>
            </FadeIn>

            {/* Trusted by — below search bar */}
            <FadeIn delay={0.5}>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 mt-16">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted">
                  Trusted by
                </span>
                <div className="flex gap-8 items-center">
                  {["Stripe", "Linear", "OpenAI", "Vercel"].map((brand) => (
                    <span
                      key={brand}
                      className="text-lg font-headline font-medium tracking-tight text-muted hover:text-ink transition-colors cursor-default"
                    >
                      {brand}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right Side: 3D Globe */}
          <div
            className="hidden lg:flex relative items-center justify-center lg:-mr-16"
            style={{ flexShrink: 0 }}
          >
            <FadeIn direction="left" delay={0.5}>
              <div className="relative">
                {/* Subtle Glow behind the globe */}
                <div className="absolute inset-0 bg-canvas-soft rounded-full blur-[100px] -z-10 scale-90 opacity-50" />
                <div className="opacity-90 mix-blend-multiply dark:mix-blend-normal">
                  <HireArcGlobe size={580} />
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
