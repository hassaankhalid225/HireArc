"use client";
import { FadeIn } from "@/components/ui/fade-in";
import { Shield, Lock, Eye, FileText, Clock } from "lucide-react";

export default function PrivacyPage() {
  const sections = [
    {
      icon: <Eye className="w-6 h-6" />,
      title: "Data Collection",
      content: "We collect information you provide directly to us, such as when you create an account, complete your profile, or apply for a job. This includes your name, email address, resume details, and professional interests."
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Data Security",
      content: "We use industry-standard encryption and security measures to protect your personal data from unauthorized access, alteration, or disclosure. Your trust is our most valuable asset."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Your Choices",
      content: "You have the right to access, update, or delete your personal information at any time. You can also manage your communication preferences through your account settings."
    }
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        
        <div className="mb-16">
          <FadeIn>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[#678D63]/10 flex items-center justify-center text-[var(--primary)]">
                <Shield className="w-7 h-7" />
              </div>
              <h1 className="text-4xl font-extrabold font-headline text-[var(--text-primary)] tracking-tight">Privacy Policy</h1>
            </div>
            <div className="flex items-center gap-6 text-sm text-[var(--text-muted)] font-bold uppercase tracking-widest">
              <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> Last Updated: April 25, 2026</span>
              <span className="flex items-center gap-2"><FileText className="w-4 h-4" /> Version 2.1</span>
            </div>
          </FadeIn>
        </div>

        <div className="space-y-12">
          
          <FadeIn delay={0.2}>
            <div className="prose prose-emerald dark:prose-invert max-w-none">
              <p className="text-lg text-[var(--text-muted)] leading-relaxed mb-8">
                At HireArc, we are committed to protecting your privacy and ensuring you have a safe experience on our platform. 
                This Privacy Policy explains how we collect, use, and safeguard your personal information.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                {sections.map((sec, i) => (
                  <div key={i} className="p-6 bg-white/50 dark:bg-white/5 border-2 border-[var(--border)] rounded-2xl backdrop-blur-xl hover:border-[#678D63]/30 transition-all group">
                    <div className="text-[var(--primary)] mb-4 group-hover:scale-110 transition-transform">{sec.icon}</div>
                    <h3 className="font-bold text-[var(--text-primary)] mb-2">{sec.title}</h3>
                    <p className="text-sm text-[var(--text-muted)] leading-relaxed">{sec.content}</p>
                  </div>
                ))}
              </div>

              <h2 className="text-2xl font-bold text-[var(--text-primary)] mt-12 mb-6">1. Information We Collect</h2>
              <p className="text-[var(--text-muted)] leading-relaxed mb-6">
                When you use our services, we may collect information about you in the following categories:
              </p>
              <ul className="list-disc pl-6 space-y-3 text-[var(--text-muted)] mb-8">
                <li><strong>Account Information:</strong> Name, email address, password, and profile picture.</li>
                <li><strong>Professional Information:</strong> Resume/CV, work history, education, skills, and portfolio links.</li>
                <li><strong>Application Data:</strong> Information related to jobs you apply for and interactions with employers.</li>
                <li><strong>Usage Data:</strong> Information about how you interact with our platform, including IP address and device info.</li>
              </ul>

              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">2. How We Use Your Information</h2>
              <p className="text-[var(--text-muted)] leading-relaxed mb-6">
                We use the information we collect to provide, maintain, and improve our services, including:
              </p>
              <ul className="list-disc pl-6 space-y-3 text-[var(--text-muted)] mb-8">
                <li>Matching you with relevant job opportunities.</li>
                <li>Facilitating the application process between you and employers.</li>
                <li>Communicating with you about your account and platform updates.</li>
                <li>Enhancing the security and integrity of our platform.</li>
              </ul>

              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">3. Data Sharing and Disclosure</h2>
              <p className="text-[var(--text-muted)] leading-relaxed mb-8">
                We do not sell your personal information. We only share your data with employers when you apply for a job, 
                or with service providers who help us operate our platform under strict confidentiality agreements.
              </p>

              <div className="p-8 bg-[#F0FDF4] dark:bg-white/5 border border-[#678D63]/20 rounded-3xl mt-12">
                <h3 className="font-bold text-[#166534] dark:text-[#A8BA9A] mb-2">Have questions about your privacy?</h3>
                <p className="text-sm text-[#166534]/80 dark:text-[#A8BA9A]/80 mb-4">
                  If you have any concerns regarding how we handle your data, please contact our Data Protection Officer.
                </p>
                <button className="text-sm font-bold text-[var(--primary)] hover:underline">
                  privacy@hirearc.com &rarr;
                </button>
              </div>
            </div>
          </FadeIn>

        </div>
      </div>
    </div>
  );
}
