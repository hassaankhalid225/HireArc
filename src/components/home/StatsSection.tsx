"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap,
  Target,
  Globe,
  Users,
  Briefcase,
  Building2,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { CountUp } from "@/components/ui/CountUp";
import { FadeIn } from "@/components/ui/fade-in";

// ── Feature Cards ──────────────────────────────────────────────────────────
const FEATURES = [
  {
    icon: <Zap className="w-5 h-5" />,
    title: "Lightning Fast Apply",
    desc: "One-click applications using your saved HireArc profile. No re-entering data, ever.",
    badge: "2× faster",
  },
  {
    icon: <Target className="w-5 h-5" />,
    title: "AI Smart Matching",
    desc: "Our model analyzes 40+ signals from your profile to surface the highest-fit roles in real time.",
    badge: "95% accuracy",
  },
  {
    icon: <Globe className="w-5 h-5" />,
    title: "Global Opportunities",
    desc: "Remote & on-site roles from 60+ countries across Greenhouse, Lever, Workday, and 10 more ATS.",
    badge: "60+ countries",
  },
];

// ── Testimonials ───────────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    quote: "Landed my dream role at Stripe in 3 weeks. The AI matching is genuinely uncanny.",
    name: "Sarah K.",
    role: "Senior Engineer",
    initials: "SK",
  },
  {
    quote: "I applied to 8 companies in one afternoon. The one-click apply changed everything for me.",
    name: "Ahmed R.",
    role: "Product Manager",
    initials: "AR",
  },
  {
    quote: "Finally a job board that doesn't waste my time with irrelevant listings. Zero noise.",
    name: "Priya M.",
    role: "Data Scientist",
    initials: "PM",
  },
  {
    quote: "The interface is so clean. It's the first time job hunting didn't feel like a chore.",
    name: "Alex L.",
    role: "UX Designer",
    initials: "AL",
  },
  {
    quote: "HireArc's recruiter signals helped me negotiate a 20% higher salary.",
    name: "James T.",
    role: "Fullstack Lead",
    initials: "JT",
  },
];

export default function StatsSection({ stats }: { stats?: any }) {
  const dynamicStats = [
    {
      value: stats?.total_jobs || 142000,
      suffix: "+",
      label: "Active Job Listings",
      icon: <Briefcase className="w-4 h-4" />,
    },
    {
      value: stats?.total_companies || 4800,
      suffix: "+",
      label: "Partner Companies",
      icon: <Building2 className="w-4 h-4" />,
    },
    {
      value: stats?.remote_jobs || 65000,
      suffix: "+",
      label: "Remote Opportunities",
      icon: <Globe className="w-4 h-4" />,
    },
    {
      value: stats?.total_countries || 60,
      suffix: "+",
      label: "Countries Covered",
      icon: <Globe className="w-4 h-4" />,
    },
  ];

  return (
    <section className="relative py-32 overflow-hidden bg-canvas text-ink">
      {/* ── Background Atmosphere ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[20%] left-[-10%] w-[50%] h-[50%] bg-gradient-peach/15 rounded-full blur-[140px] opacity-40 animate-pulse" style={{ animationDuration: '12s' }} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-gradient-mint/15 rounded-full blur-[140px] opacity-40 animate-pulse" style={{ animationDuration: '15s', animationDelay: '3s' }} />
      </div>

      <div className="container-custom relative z-10">
        {/* ── Stats Row ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 pb-32 border-b border-hairline">
          {dynamicStats.map((stat, idx) => (
            <FadeIn key={stat.label} delay={idx * 0.1}>
              <div className="group text-center space-y-2">
                <div className="text-5xl md:text-6xl font-headline text-ink leading-none">
                  <CountUp end={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-[10px] font-bold text-muted uppercase tracking-[0.2em]">
                  {stat.label}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* ── Feature Showcase ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center py-32">
          <FadeIn direction="left">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-pill bg-canvas-soft border border-hairline">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink">
                  Performance Metrics
                </span>
              </div>
              <h2 className="text-5xl md:text-7xl font-headline leading-[0.9] tracking-tight text-ink">
                Beyond just
                <br />
                <span className="bg-gradient-to-r from-ink via-primary to-body-strong bg-clip-text text-transparent block pb-4 -mb-4">
                  listings.
                </span>
              </h2>
              <p className="text-body text-xl leading-relaxed max-w-[500px] font-medium">
                We use proprietary AI to score job quality, detect ghost listings,
                and match you with roles that actually move the needle.
              </p>
              <div className="flex flex-col gap-6 pt-6">
                {[
                  "Direct-from-source data verified",
                  "AI-powered quality score on every role",
                  "Zero sponsored noise or fake listings",
                  "Real-time recruiter intent signals",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-xl bg-canvas-soft flex items-center justify-center shrink-0 text-ink border border-hairline/50">
                      <Target className="w-4 h-4" />
                    </div>
                    <span className="text-body font-bold text-base uppercase tracking-wider">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="right">
            <div className="space-y-6">
              {FEATURES.map((f, i) => (
                <div
                  key={i}
                  className="flex items-start gap-6 p-8 rounded-xl bg-surface-card border border-hairline hover:border-hairline-strong transition-all duration-300 shadow-premium-sm group"
                >
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 bg-canvas-soft text-ink border border-hairline/50 transition-transform group-hover:scale-110">
                    {f.icon}
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-4">
                      <p className="font-headline text-2xl text-ink leading-none">{f.title}</p>
                      <span className="text-[9px] font-bold text-ink bg-canvas-soft px-3 py-1 rounded-pill uppercase tracking-widest border border-hairline/50">
                        {f.badge}
                      </span>
                    </div>
                    <p className="text-base text-body font-medium leading-relaxed opacity-80">
                      {f.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>

        {/* ── Testimonials ── */}
        <div className="pt-32 border-t border-hairline">
          <div className="text-center mb-20 space-y-4">
             <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-pill bg-canvas-soft border border-hairline mx-auto">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink">
                  Community Feedback
                </span>
              </div>
            <h2 className="text-5xl md:text-6xl font-headline leading-none">
              <span className="bg-gradient-to-r from-ink via-primary to-body-strong bg-clip-text text-transparent block pb-4 -mb-4">
                The Innovator&apos;s Voice
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.slice(0, 3).map((t, idx) => (
              <FadeIn key={idx} delay={idx * 0.1}>
                <div className="bg-surface-card border border-hairline rounded-xl p-10 h-full flex flex-col shadow-premium-sm hover:border-hairline-strong transition-all duration-300">
                  <p className="text-lg text-body leading-relaxed flex-grow italic mb-10 font-medium">
                    &quot;{t.quote}&quot;
                  </p>
                  <div className="flex items-center gap-5 pt-8 border-t border-hairline/50">
                    <div className="w-12 h-12 rounded-xl bg-canvas-soft border border-hairline flex items-center justify-center text-ink font-bold text-base shadow-sm">
                      {t.initials}
                    </div>
                    <div className="space-y-1">
                      <p className="font-bold text-base text-ink uppercase tracking-wider">
                        {t.name}
                      </p>
                      <p className="text-[10px] font-bold text-muted uppercase tracking-[0.2em]">
                        {t.role}
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
