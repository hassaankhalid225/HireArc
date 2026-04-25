"use client";
import { FadeIn } from "@/components/ui/fade-in";
import { useState } from "react";
import { ChevronDown, Search, HelpCircle } from "lucide-react";

const FAQS = [
  {
    question: "How does HireArc aggregate jobs?",
    answer: "We use advanced AI-driven crawlers that scan official company career pages and verified job boards in real-time, ensuring you get the most accurate and up-to-date listings directly from the source."
  },
  {
    question: "Is HireArc free for job seekers?",
    answer: "Yes! Our core platform is completely free for job seekers. You can search, save, and apply to jobs without any cost. We also offer premium features for enhanced visibility and advanced tools."
  },
  {
    question: "How can I improve my application visibility?",
    answer: "Complete your profile 100%, add relevant skills, and upload a clean, ATS-friendly resume. Our AI matching engine prioritizes complete profiles that closely match job requirements."
  },
  {
    question: "Does HireArc share my data with third parties?",
    answer: "Your privacy is our priority. We only share your profile data with employers you explicitly apply to. We never sell your personal information to third-party advertisers."
  },
  {
    question: "Can I track my job applications?",
    answer: "Absolutely! Your dashboard provides a centralized view of all your 'Applied Jobs', where you can track the status and manage follow-ups."
  },
  {
    question: "How do I set up job alerts?",
    answer: "You can create custom search filters and click the 'Save Search' button. You'll receive email notifications whenever new jobs matching your criteria are posted."
  }
];

export default function FAQPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-3xl mx-auto">
        
        <div className="text-center mb-16">
          <FadeIn>
            <h1 className="text-4xl md:text-6xl font-extrabold font-headline text-[var(--text-primary)] mb-6">
              Frequently Asked <span className="text-[var(--primary)]">Questions</span>
            </h1>
            <p className="text-[var(--text-muted)] text-lg">
              Everything you need to know about HireArc and how it works.
            </p>
          </FadeIn>
        </div>

        {/* Search Bar (Static for UI) */}
        <FadeIn delay={0.2}>
          <div className="relative mb-12">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
            <input 
              type="text" 
              placeholder="Search questions..." 
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-[var(--border)] bg-white/50 dark:bg-white/5 backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-[#678D63]/20 focus:border-[#678D63] transition-all"
            />
          </div>
        </FadeIn>

        {/* FAQ List */}
        <div className="space-y-4">
          {FAQS.map((faq, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="border border-[var(--border)] rounded-2xl bg-white/50 dark:bg-white/5 backdrop-blur-xl overflow-hidden transition-all duration-300">
                <button 
                  onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-[#F0FDF4]/30 dark:hover:bg-white/5 transition-colors"
                >
                  <span className="font-bold text-[var(--text-primary)] text-lg">{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-[var(--primary)] transition-transform duration-300 ${activeIndex === i ? "rotate-180" : ""}`} />
                </button>
                <div className={`px-6 overflow-hidden transition-all duration-300 ${activeIndex === i ? "max-h-96 pb-6" : "max-h-0"}`}>
                  <p className="text-[var(--text-muted)] leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Still have questions? */}
        <FadeIn delay={0.8}>
          <div className="mt-16 p-8 bg-gradient-to-tr from-[#678D63]/10 to-[#A8BA9A]/10 border border-[#678D63]/20 rounded-3xl text-center">
            <HelpCircle className="w-10 h-10 text-[var(--primary)] mx-auto mb-4" />
            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">Still have questions?</h3>
            <p className="text-[var(--text-muted)] mb-6">If you can't find the answer you're looking for, feel free to reach out to our team.</p>
            <button className="bg-[var(--primary)] text-white px-8 py-3 rounded-xl font-bold hover:shadow-lg transition-all active:scale-95">
              Contact Support
            </button>
          </div>
        </FadeIn>

      </div>
    </div>
  );
}
