"use client";
import { FadeIn } from "@/components/ui/fade-in";
import { Users, Target, Rocket, Shield, Globe, Zap } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Hero Section */}
        <div className="text-center mb-20">
          <FadeIn>
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#F0FDF4] dark:bg-white/5 border border-[#678D63]/20 text-[#166534] dark:text-[#A8BA9A] text-xs font-bold uppercase tracking-widest mb-6">
              Our Story
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold font-headline text-[var(--text-primary)] mb-6 tracking-tight">
              We're redefining <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#678D63] to-[#A8BA9A]">
                career growth.
              </span>
            </h1>
            <p className="text-lg text-[var(--text-muted)] max-w-2xl mx-auto leading-relaxed">
              HireArc is more than just a job board. We're a global ecosystem designed to connect the world's most ambitious talent with industry-leading companies.
            </p>
          </FadeIn>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24">
          {[
            { label: "Jobs Aggregated", value: "100K+" },
            { label: "Active Users", value: "500K+" },
            { label: "Company Partners", value: "10K+" },
            { label: "Countries", value: "50+" },
          ].map((stat, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="text-center p-8 bg-white/50 dark:bg-white/5 border-2 border-[var(--border)] rounded-3xl backdrop-blur-xl">
                <div className="text-3xl font-extrabold text-[var(--primary)] mb-2">{stat.value}</div>
                <div className="text-sm font-bold text-[var(--text-muted)] uppercase tracking-wide">{stat.label}</div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Mission & Vision */}
        <div className="grid lg:grid-cols-2 gap-12 mb-24">
          <FadeIn direction="right">
            <div className="h-full p-10 bg-gradient-to-br from-[#678D63] to-[#4A6347] rounded-[40px] text-white">
              <Target className="w-12 h-12 mb-6 opacity-80" />
              <h2 className="text-3xl font-extrabold mb-4">Our Mission</h2>
              <p className="text-white/80 leading-relaxed text-lg">
                To eliminate friction in the global job market by providing transparent, high-signal data and AI-driven matching that prioritizes human potential over traditional resumes.
              </p>
            </div>
          </FadeIn>
          <FadeIn direction="left" delay={0.2}>
            <div className="h-full p-10 bg-white/80 dark:bg-[#1C261F]/80 border-2 border-[var(--border)] rounded-[40px] backdrop-blur-xl">
              <Rocket className="w-12 h-12 text-[var(--primary)] mb-6" />
              <h2 className="text-3xl font-extrabold text-[var(--text-primary)] mb-4">Our Vision</h2>
              <p className="text-[var(--text-muted)] leading-relaxed text-lg">
                A world where every individual can find their perfect career move within seconds, empowered by data that reflects their true skills and aspirations.
              </p>
            </div>
          </FadeIn>
        </div>

        {/* Core Values */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-[var(--text-primary)]">Our Core Values</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Shield />, title: "Trust First", desc: "We maintain the highest standards of data privacy and platform integrity." },
              { icon: <Zap />, title: "Speed Matters", desc: "Our infrastructure is built for zero-latency career discovery." },
              { icon: <Globe />, title: "Global Reach", desc: "Opportunities know no borders; neither does our platform." },
            ].map((value, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="p-8 group hover:bg-[#F0FDF4] dark:hover:bg-white/5 transition-all duration-300 rounded-3xl border border-transparent hover:border-[#678D63]/20">
                  <div className="w-12 h-12 rounded-2xl bg-[#678D63]/10 flex items-center justify-center text-[var(--primary)] mb-6 group-hover:scale-110 transition-transform">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3">{value.title}</h3>
                  <p className="text-[var(--text-muted)] text-sm leading-relaxed">{value.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
