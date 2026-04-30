"use client";
import MagicBento from "@/components/ui/MagicBento";
import { FadeIn } from "@/components/ui/fade-in";

const featureData = [
  {
    color: '#0B1110',
    title: 'Real-time Scraping',
    description: 'We track company job boards directly to bring you roles minutes after they post.',
    label: 'Accuracy'
  },
  {
    color: '#0B1110',
    title: 'Smart Filtering',
    description: 'Advanced AI-powered filters to find roles that match your skill set perfectly.',
    label: 'Efficiency'
  },
  {
    color: '#0B1110',
    title: 'Premium Analytics',
    description: 'Get insights into application trends and salary ranges across industries.',
    label: 'Insights'
  },
  {
    color: '#0B1110',
    title: 'Direct Apply',
    description: 'Skip the middleman. We link you directly to the official company careers portal.',
    label: 'Direct'
  },
  {
    color: '#0B1110',
    title: 'Career Coaching',
    description: 'Access AI-driven resume reviews and interview preparation tailored to each role.',
    label: 'Growth'
  },
  {
    color: '#0B1110',
    title: 'Enterprise Security',
    description: 'Your data is encrypted and protected with industry-leading security standards.',
    label: 'Security'
  }
];

export default function BentoShowcase() {
  return (
    <section className="py-24 bg-[var(--bg-dark)] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-8">
        <FadeIn direction="up">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-extrabold uppercase tracking-[0.2em] mb-4">
              Platform Features
            </div>
            <h2 className="text-4xl md:text-6xl font-extrabold font-headline tracking-tight text-white mb-6">
              Modern Career <span className="text-emerald-500">Intelligence</span>
            </h2>
            <p className="text-slate-400 text-lg font-medium max-w-2xl mx-auto">
              JobSphere isn't just a job board. It's a high-performance engine designed to accelerate your professional journey.
            </p>
          </div>
        </FadeIn>

        <div className="relative">
          {/* Decorative glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />
          
          <MagicBento 
            data={featureData}
            textAutoHide={false}
            enableStars={true}
            enableSpotlight={true}
            enableBorderGlow={true}
            enableTilt={true}
            enableMagnetism={true}
            clickEffect={true}
            spotlightRadius={400}
            particleCount={15}
            glowColor="16, 185, 129" // Emerald-500
          />
        </div>
      </div>
    </section>
  );
}
