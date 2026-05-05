"use client";
import MagicBento from "@/components/ui/MagicBento";
import { FadeIn } from "@/components/ui/fade-in";

const featureData = [
  {
    color: 'var(--surface-card)',
    title: 'Real-time Scraping',
    description: 'We track company job boards directly to bring you roles minutes after they post.',
    label: 'Accuracy'
  },
  {
    color: 'var(--surface-card)',
    title: 'Smart Filtering',
    description: 'Advanced AI-powered filters to find roles that match your skill set perfectly.',
    label: 'Efficiency'
  },
  {
    color: 'var(--surface-card)',
    title: 'Premium Analytics',
    description: 'Get insights into application trends and salary ranges across industries.',
    label: 'Insights'
  },
  {
    color: 'var(--surface-card)',
    title: 'Direct Apply',
    description: 'Skip the middleman. We link you directly to the official company careers portal.',
    label: 'Direct'
  },
  {
    color: 'var(--surface-card)',
    title: 'Career Coaching',
    description: 'Access AI-driven resume reviews and interview preparation tailored to each role.',
    label: 'Growth'
  },
  {
    color: 'var(--surface-card)',
    title: 'Enterprise Security',
    description: 'Your data is encrypted and protected with industry-leading security standards.',
    label: 'Security'
  }
];

export default function BentoShowcase() {
  return (
    <section className="py-24 bg-canvas overflow-hidden">
      <div className="container-custom">
        <FadeIn direction="up">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-pill bg-canvas-soft border border-hairline mx-auto">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink">
                Platform Features
              </span>
            </div>
            <h2 className="text-5xl md:text-7xl font-headline tracking-tight text-ink mb-6">
              Modern Career <span className="text-muted">Intelligence</span>
            </h2>
            <p className="text-body text-xl max-w-2xl mx-auto font-medium leading-relaxed">
              HireArc isn't just a job board. It's a high-performance engine designed to accelerate your professional journey.
            </p>
          </div>
        </FadeIn>

        <div className="relative">
          {/* Editorial Atmospheric Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-canvas-soft rounded-full blur-[120px] opacity-20 pointer-events-none" />
          
          <MagicBento 
            data={featureData}
            textAutoHide={false}
            enableStars={false}
            enableSpotlight={true}
            enableBorderGlow={true}
            enableTilt={true}
            enableMagnetism={true}
            clickEffect={true}
            spotlightRadius={400}
            particleCount={0}
            glowColor="0, 0, 0" // High contrast neutral glow
            className="border-hairline"
          />
        </div>
      </div>
    </section>
  );
}
