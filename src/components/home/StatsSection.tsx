"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Target, Globe, Users, Briefcase, Building2, TrendingUp, CheckCircle2, ArrowRight, Rocket } from "lucide-react";
import { CountUp } from "@/components/ui/CountUp";
import { FadeIn } from "@/components/ui/fade-in";
import Link from "next/link";

// ── Platform Statistics ────────────────────────────────────────────────────
const STATS = [
  {
    value: 142000,
    suffix: "+",
    label: "Active Job Listings",
    sublabel: "Updated every 6 hours",
    icon: <Briefcase className="w-5 h-5" />,
    color: "from-emerald-400 to-teal-500",
  },
  {
    value: 89000,
    suffix: "+",
    label: "Registered Users",
    sublabel: "Growing every day",
    icon: <Users className="w-5 h-5" />,
    color: "from-violet-400 to-purple-500",
  },
  {
    value: 4800,
    suffix: "+",
    label: "Partner Companies",
    sublabel: "From startups to Fortune 500",
    icon: <Building2 className="w-5 h-5" />,
    color: "from-amber-400 to-orange-500",
  },
  {
    value: 94,
    suffix: "%",
    label: "Placement Rate",
    sublabel: "Within 3 months",
    icon: <TrendingUp className="w-5 h-5" />,
    color: "from-rose-400 to-pink-500",
  },
];

// ── Feature Cards ──────────────────────────────────────────────────────────
const FEATURES = [
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Lightning Fast Apply",
    desc: "One-click applications using your saved HireArc profile. No re-entering data, ever.",
    badge: "2× faster",
    gradient: "from-amber-500/20 to-yellow-500/5",
    iconBg: "bg-amber-400/10 text-amber-400",
    border: "border-amber-500/15",
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: "AI Smart Matching",
    desc: "Our model analyzes 40+ signals from your profile to surface the highest-fit roles in real time.",
    badge: "95% accuracy",
    gradient: "from-[#678D63]/25 to-[#A8BA9A]/5",
    iconBg: "bg-[#678D63]/15 text-[#A8BA9A]",
    border: "border-[#678D63]/20",
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: "Global Opportunities",
    desc: "Remote & on-site roles from 60+ countries across Greenhouse, Lever, Workday, and 10 more ATS.",
    badge: "60+ countries",
    gradient: "from-sky-500/20 to-blue-500/5",
    iconBg: "bg-sky-400/10 text-sky-400",
    border: "border-sky-500/15",
  },
];

// ── Testimonials ───────────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    quote: "Landed my dream role at Stripe in 3 weeks. The AI matching is genuinely uncanny.",
    name: "Sarah K.",
    role: "Senior Engineer → Stripe",
    initials: "SK",
    color: "from-violet-400 to-purple-500",
  },
  {
    quote: "I applied to 8 companies in one afternoon. The one-click apply changed everything for me.",
    name: "Ahmed R.",
    role: "Product Manager → Google",
    initials: "AR",
    color: "from-emerald-400 to-teal-500",
  },
  {
    quote: "Finally a job board that doesn't waste my time with irrelevant listings. Zero noise.",
    name: "Priya M.",
    role: "Data Scientist → OpenAI",
    initials: "PM",
    color: "from-amber-400 to-orange-500",
  },
  {
    quote: "The interface is so clean. It's the first time job hunting didn't feel like a chore.",
    name: "Alex L.",
    role: "UX Designer → Airbnb",
    initials: "AL",
    color: "from-rose-400 to-pink-500",
  },
  {
    quote: "HireArc's recruiter signals helped me negotiate a 20% higher salary.",
    name: "James T.",
    role: "Fullstack Lead → Vercel",
    initials: "JT",
    color: "from-blue-400 to-indigo-500",
  },
  {
    quote: "I found a remote role at a London startup while living in Bali. Seamless.",
    name: "Elena G.",
    role: "Growth Marketer → Wise",
    initials: "EG",
    color: "from-orange-400 to-red-500",
  },
  {
    quote: "The daily alerts are actually relevant. I only applied to two jobs and got one.",
    name: "Kevin W.",
    role: "Security Analyst → Cloudflare",
    initials: "KW",
    color: "from-cyan-400 to-sky-500",
  },
  {
    quote: "Their data is much fresher than LinkedIn. I was first to apply to many roles.",
    name: "Maya H.",
    role: "Backend Dev → Supabase",
    initials: "MH",
    color: "from-lime-400 to-green-500",
  },
  {
    quote: "As a junior, the skill matching was a lifesaver. Showed me what I was missing.",
    name: "Tariq Z.",
    role: "Frontend Dev → Shopify",
    initials: "TZ",
    color: "from-yellow-400 to-amber-500",
  },
  {
    quote: "The best aggregator I've used. Periodic updates keep the quality high.",
    name: "Sophie R.",
    role: "DevOps Engineer → Datadog",
    initials: "SR",
    color: "from-fuchsia-400 to-pink-500",
  },
];

export default function StatsSection({ stats }: { stats?: any }) {
  const dynamicStats = [
    {
      value: stats?.total_jobs || 0,
      suffix: "+",
      label: "Active Job Listings",
      sublabel: "Updated in real-time",
      icon: <Briefcase className="w-5 h-5" />,
      color: "from-emerald-400 to-teal-500",
    },
    {
      value: stats?.total_companies || 0,
      suffix: "+",
      label: "Partner Companies",
      sublabel: "Hiring globally",
      icon: <Building2 className="w-5 h-5" />,
      color: "from-amber-400 to-orange-500",
    },
    {
      value: stats?.remote_jobs || 0,
      suffix: "+",
      label: "Remote Opportunities",
      sublabel: "Work from anywhere",
      icon: <Globe className="w-5 h-5" />,
      color: "from-sky-400 to-blue-500",
    },
    {
      value: stats?.total_countries || 0,
      suffix: "+",
      label: "Global Nodes",
      sublabel: "Geographic vectors",
      icon: <Globe className="w-5 h-5" />,
      color: "from-rose-400 to-pink-500",
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden bg-[var(--bg-dark)] text-white">
      {/* ── High-Fidelity Linear Grid ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute inset-0 opacity-[0.05]" 
          style={{ 
            backgroundImage: `
              linear-gradient(to right, white 1px, transparent 1px),
              linear-gradient(to bottom, white 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }} 
        />
        {/* Glow Effects */}
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[var(--primary-light)]/20 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-emerald-500/10 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 border-b border-white/5 pb-20">
          {dynamicStats.map((stat, idx) => (
            <FadeIn key={stat.label} delay={idx * 0.1}>
              <div className="group text-center">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} bg-opacity-10 mb-8 group-hover:scale-110 group-hover:shadow-[0_0_40px_rgba(255,255,255,0.1)] transition-all duration-500 ring-1 ring-white/10`}>
                  <span className="text-white">{stat.icon}</span>
                </div>
                <div className="text-5xl md:text-6xl font-extrabold font-headline mb-3 tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
                  <CountUp end={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-white/30 font-bold uppercase tracking-[0.2em] text-[10px]">
                  {stat.label}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* ── Featured Showcase: "Pro Max" Edition ── */}
        <div className="mt-32 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <FadeIn direction="left">
            <div className="space-y-10">
              <div className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-emerald-400 text-[10px] font-extrabold uppercase tracking-[0.25em]">
                Intelligence Engine
              </div>
              <h2 className="text-5xl md:text-7xl font-extrabold font-headline leading-[0.95] tracking-tight">
                Beyond just<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-200">
                  listings.
                </span>
              </h2>
              <p className="text-white/40 text-xl leading-relaxed max-w-[500px]">
                We use proprietary AI to score job quality, detect ghost listings, 
                and match you with roles that actually move the needle.
              </p>
              <div className="flex flex-col gap-6">
                {[
                  "Direct-from-source data verified",
                  "AI-powered quality score on every role",
                  "Zero sponsored noise or fake listings",
                  "Real-time recruiter intent signals"
                ].map(item => (
                  <div key={item} className="flex items-center gap-5 group">
                    <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                      <Zap className="w-4 h-4 text-emerald-400" />
                    </div>
                    <span className="text-white/70 font-bold text-lg group-hover:text-white transition-colors">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="right">
            <div className="relative group">
              {/* Outer Decorative Glow */}
              <div className="absolute -inset-8 bg-emerald-500/10 rounded-[60px] blur-[100px] opacity-40 group-hover:opacity-60 transition duration-1000" />
              
              <div className="relative bg-[#15221B] border border-white/5 rounded-[48px] p-12 overflow-hidden shadow-premium">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] -mr-32 -mt-32" />
                
                <div className="space-y-10">
                  {FEATURES.map((f, i) => (
                    <div key={i} className="flex items-start gap-6 p-8 rounded-3xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] transition-all duration-500">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${f.iconBg}`}>
                        {f.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <p className="font-extrabold text-xl text-white">{f.title}</p>
                          <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                            {f.badge}
                          </span>
                        </div>
                        <p className="text-sm text-white/40 leading-relaxed font-medium">{f.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* ── Testimonials: Premium Carousel ── */}
        <div className="mt-32 pt-24 border-t border-white/5">
          <div className="text-center mb-20">
            <div className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/40 text-[10px] font-extrabold uppercase tracking-[0.3em] mb-6">
              The Innovator's Voice
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold font-headline">What our users say</h2>
          </div>

          <TestimonialCarousel />
        </div>
      </div>
    </section>
  );
}

function TestimonialCarousel() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [direction, setDirection] = React.useState(0);

  const next = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };
  const prev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <div className="relative max-w-full overflow-hidden py-10 px-4">
      <div className="relative flex justify-center items-center h-[450px]">
        <AnimatePresence initial={false} mode="popLayout">
          {[-2, -1, 0, 1, 2].map((offset) => {
            const index = (activeIndex + offset + TESTIMONIALS.length) % TESTIMONIALS.length;
            const t = TESTIMONIALS[index];
            const isActive = offset === 0;
            const isNear = Math.abs(offset) === 1;

            return (
              <motion.div
                key={`${index}-${offset}`}
                initial={{ 
                  opacity: 0, 
                  scale: 0.8, 
                  x: direction > 0 ? (offset + 1) * 450 : (offset - 1) * 450,
                  filter: "blur(10px)"
                }}
                animate={{
                  opacity: isActive ? 1 : isNear ? 0.4 : 0,
                  scale: isActive ? 1 : isNear ? 0.85 : 0.7,
                  x: offset * (typeof window !== 'undefined' && window.innerWidth < 768 ? 320 : 420),
                  filter: isActive ? "blur(0px)" : "blur(4px)",
                  zIndex: isActive ? 30 : isNear ? 20 : 10,
                  display: Math.abs(offset) > 2 ? "none" : "block"
                }}
                exit={{ 
                  opacity: 0, 
                  scale: 0.8, 
                  x: direction > 0 ? (offset - 1) * 450 : (offset + 1) * 450,
                  filter: "blur(10px)"
                }}
                transition={{ 
                  type: "spring",
                  stiffness: 260,
                  damping: 25,
                  opacity: { duration: 0.3 }
                }}
                className={`absolute w-full max-w-[380px] bg-white/[0.03] border border-white/10 rounded-[40px] p-10 shadow-2xl backdrop-blur-xl ${isActive ? 'bg-white/[0.08] border-emerald-500/40' : ''}`}
              >
                {isActive && (
                  <div className="absolute -inset-0.5 bg-gradient-to-br from-emerald-500/30 to-transparent rounded-[40px] blur-xl opacity-60" />
                )}
                
                <div className="relative z-10">
                  <div className="flex gap-1.5 mb-8">
                    {[...Array(5)].map((_, s) => (
                      <div key={s} className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-emerald-400' : 'bg-white/20'}`} />
                    ))}
                  </div>
                  <p className={`text-lg md:text-xl font-medium italic leading-relaxed mb-12 ${isActive ? 'text-white' : 'text-white/40'}`}>
                    "{t.quote}"
                  </p>
                  <div className="flex items-center gap-5 mt-auto">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${t.color} flex items-center justify-center text-white font-black text-lg shadow-2xl`}>
                      {t.initials}
                    </div>
                    <div className="min-w-0">
                      <p className={`font-bold text-lg tracking-tight truncate ${isActive ? 'text-white' : 'text-white/30'}`}>{t.name}</p>
                      <p className={`text-sm font-semibold truncate ${isActive ? 'text-emerald-400/60' : 'text-white/10'}`}>{t.role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div className="flex justify-center gap-10 mt-16">
        <button 
          onClick={prev}
          className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-all hover:scale-110 active:scale-95 group backdrop-blur-md"
        >
          <ArrowRight className="w-6 h-6 rotate-180 text-white/40 group-hover:text-white transition-colors" />
        </button>
        <button 
          onClick={next}
          className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-all hover:scale-110 active:scale-95 group backdrop-blur-md"
        >
          <ArrowRight className="w-6 h-6 text-white/40 group-hover:text-white transition-colors" />
        </button>
      </div>
    </div>
  );
}


