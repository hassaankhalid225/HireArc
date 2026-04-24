"use client";
import Image from "next/image";
import Link from "next/link";
import { Search, MapPin, Globe } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative bg-[var(--bg-dark)] text-white pt-32 pb-24 overflow-hidden text-center">
      {/* Premium Background Effect */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Animated Mesh Gradient Blobs */}
        <motion.div 
          animate={{ 
            x: [0, 40, -20, 0],
            y: [0, -50, 30, 0],
            scale: [1, 1.1, 0.9, 1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#3E5F43] rounded-full blur-[120px] opacity-60" 
        />
        <motion.div 
          animate={{ 
            x: [0, -30, 50, 0],
            y: [0, 40, -40, 0],
            scale: [1, 0.9, 1.2, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-[#678D63] rounded-full blur-[120px] opacity-40" 
        />
        <motion.div 
          animate={{ 
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-[#A8BA9A] rounded-full blur-[100px]" 
        />
        
        {/* Noise Texture Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" 
          style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} 
        />
        
        {/* Dark Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--bg-dark)]/40 to-[var(--bg-dark)]" />
      </div>

      <div className="max-w-[1280px] mx-auto px-6 relative z-10">
        <div className="max-w-[800px] mx-auto space-y-8">
          <FadeIn delay={0.1}>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-medium text-[var(--text-secondary)]">
              <span className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-[var(--primary)]" /> Aggregating 100,000+ jobs from top companies
              </span>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold font-headline leading-[1.1]">
              Find Your Next Career Move.
            </h1>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className="text-lg md:text-xl text-[var(--text-muted)] max-w-[600px] mx-auto">
              Every job. One place. Sourced directly from Greenhouse, Lever, and 10+ platforms.
            </p>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="bg-[var(--bg-card)] p-4 rounded-[var(--radius-xl)] shadow-[var(--shadow-modal)] flex flex-col md:flex-row gap-4 max-w-[760px] mx-auto hover:shadow-xl transition-shadow duration-500">
              <div className="flex-1 flex items-center gap-2 px-3 border-b md:border-b-0 md:border-r border-[var(--border)]">
                <Search className="w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                <input 
                  type="text" 
                  placeholder="Job title, keyword, or company" 
                  className="w-full h-12 outline-none text-[var(--text-primary)] text-sm bg-transparent"
                />
              </div>
              <div className="flex-1 flex items-center gap-2 px-3">
                <MapPin className="w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                <input 
                  type="text" 
                  placeholder="Location or Remote" 
                  className="w-full h-12 outline-none text-[var(--text-primary)] text-sm bg-transparent"
                />
              </div>
              <button className="btn btn-primary h-12 md:h-14 px-8 whitespace-nowrap hover:scale-105 active:scale-95 transition-transform">
                Search Jobs
              </button>
            </div>
          </FadeIn>

          <FadeIn delay={0.5}>
            <div className="flex flex-wrap justify-center items-center gap-3 pt-6">
              <span className="text-[12px] font-mono text-[var(--text-muted)]">Popular:</span>
              {["Software Engineer", "Product Manager", "Remote", "Data Analyst"].map(tag => (
                <Link key={tag} href="/search" className="chip chip-primary hover:bg-blue-100 transition-colors">
                  {tag}
                </Link>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
