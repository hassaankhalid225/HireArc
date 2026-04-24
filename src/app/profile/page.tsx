"use client";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/fade-in";
import { 
  Users, Mail, MapPin, Building, Calendar, Edit2, Shield, 
  Link as LinkIcon, Globe, Twitter, Award, Briefcase, GraduationCap, Share2 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-[var(--bg-base)] pt-24 pb-20">
      <div className="container-custom max-w-5xl">
        
        {/* Header Section */}
        <FadeIn direction="down">
          <div className="bg-white dark:bg-[var(--bg-card)] border border-[var(--border)] rounded-[40px] overflow-hidden mb-8 shadow-sm">
            <div className="h-48 bg-gradient-to-r from-[#2E4633] via-[#446644] to-[#678D63] relative">
              <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
            </div>
            
            <div className="px-10 pb-10 relative">
              <div className="absolute -top-20 left-10">
                <div className="w-40 h-40 rounded-[32px] bg-white dark:bg-gray-800 p-2 shadow-2xl">
                  <div className="w-full h-full rounded-[24px] bg-gradient-to-tr from-[#678D63] to-[#A8BA9A] flex items-center justify-center text-5xl font-bold text-white shadow-inner">
                    HK
                  </div>
                </div>
              </div>

              <div className="pt-24 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-4xl font-extrabold font-headline text-[var(--text-primary)]">Hassaan Khalid</h1>
                    <Badge className="bg-[#F0FDF4] text-[#166534] border-[#DCFCE7] rounded-full px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider">Premium</Badge>
                  </div>
                  <p className="text-lg text-[var(--text-secondary)] font-medium flex items-center gap-2 mb-4">
                    <Briefcase className="w-5 h-5 text-[var(--primary)]" /> Senior Product Designer at <span className="text-[var(--primary)] font-bold">CreativeLabs</span>
                  </p>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-[var(--text-muted)] font-medium">
                    <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> Lahore, Pakistan</span>
                    <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> Joined April 2026</span>
                    <span className="flex items-center gap-1.5"><Users className="w-4 h-4" /> 500+ Connections</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3 w-full md:w-auto">
                  <Button variant="outline" className="rounded-2xl border-2 hover:bg-gray-50 dark:hover:bg-white/5 px-6">
                    <Globe className="w-4 h-4 mr-2" /> Portfolio
                  </Button>
                  <Button className="bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white rounded-2xl px-8 font-bold shadow-lg shadow-[var(--primary)]/20 transition-all hover:scale-105 active:scale-95">
                    <Edit2 className="w-4 h-4 mr-2" /> Edit Profile
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Details */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* About Section */}
            <FadeIn delay={0.1} direction="up">
              <div className="bg-white dark:bg-[var(--bg-card)] border border-[var(--border)] rounded-[32px] p-8 shadow-sm">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Shield className="w-6 h-6 text-[var(--primary)]" /> About Me
                </h2>
                <p className="text-[var(--text-secondary)] leading-relaxed text-lg">
                  Creative and detail-oriented Product Designer with over 5 years of experience in the tech industry. I specialize in building complex design systems and intuitive user interfaces for SaaS and Fintech platforms. My goal is to bridge the gap between user needs and business objectives through elegant, functional design.
                </p>
                <div className="mt-8 flex flex-wrap gap-2">
                  {['Product Design', 'UI/UX', 'Design Systems', 'Figma', 'React', 'User Research'].map(skill => (
                    <Badge key={skill} variant="secondary" className="bg-[#F8FAFC] dark:bg-white/5 text-[var(--text-secondary)] px-4 py-1.5 rounded-xl border border-[var(--border)]">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Experience Section */}
            <FadeIn delay={0.2} direction="up">
              <div className="bg-white dark:bg-[var(--bg-card)] border border-[var(--border)] rounded-[32px] p-8 shadow-sm">
                <h2 className="text-xl font-bold mb-8 flex items-center gap-2">
                  <Briefcase className="w-6 h-6 text-[var(--primary)]" /> Experience
                </h2>
                <div className="space-y-10">
                  <div className="flex gap-6 relative">
                    <div className="absolute left-6 top-14 bottom-0 w-0.5 bg-gray-100 dark:bg-white/5" />
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 flex items-center justify-center flex-shrink-0 z-10">
                      <span className="font-bold text-blue-600">CL</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold">Senior Product Designer</h4>
                      <p className="text-[var(--text-primary)] font-medium">CreativeLabs • Full-time</p>
                      <p className="text-sm text-[var(--text-muted)] mb-3">Jan 2023 - Present • 3 yrs 4 mos</p>
                      <p className="text-[var(--text-secondary)]">Leading the redesign of the core dashboard and implementing a cross-platform design system that reduced dev time by 30%.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-6">
                    <div className="w-12 h-12 rounded-2xl bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 flex items-center justify-center flex-shrink-0">
                      <span className="font-bold text-green-600">JS</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold">UI Designer</h4>
                      <p className="text-[var(--text-primary)] font-medium">JumpStart Studio • Full-time</p>
                      <p className="text-sm text-[var(--text-muted)] mb-3">June 2020 - Dec 2022 • 2 yrs 6 mos</p>
                      <p className="text-[var(--text-secondary)]">Focused on mobile-first design for various client projects in the e-commerce and education sectors.</p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right Column: Sidebar */}
          <div className="space-y-8">
            
            {/* Contact Info */}
            <FadeIn delay={0.3} direction="left">
              <div className="bg-white dark:bg-[var(--bg-card)] border border-[var(--border)] rounded-[32px] p-8 shadow-sm">
                <h3 className="text-lg font-bold mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-50 dark:bg-white/5 flex items-center justify-center text-[var(--primary)]">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-[var(--text-muted)] font-bold uppercase tracking-wider">Email</p>
                      <p className="text-sm font-bold truncate">hassaankhalid@jobsphere.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-50 dark:bg-white/5 flex items-center justify-center text-blue-600">
                      <Share2 className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-[var(--text-muted)] font-bold uppercase tracking-wider">LinkedIn</p>
                      <p className="text-sm font-bold">linkedin.com/in/hassaankhalid</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-50 dark:bg-white/5 flex items-center justify-center text-gray-900 dark:text-white">
                      <LinkIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-[var(--text-muted)] font-bold uppercase tracking-wider">GitHub</p>
                      <p className="text-sm font-bold">github.com/hassaankhalid</p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Certifications */}
            <FadeIn delay={0.4} direction="left">
              <div className="bg-white dark:bg-[var(--bg-card)] border border-[var(--border)] rounded-[32px] p-8 shadow-sm">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <Award className="w-5 h-5 text-yellow-500" /> Certifications
                </h3>
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl border border-gray-100 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer">
                    <p className="font-bold text-sm">Google UX Design Certificate</p>
                    <p className="text-xs text-[var(--text-muted)]">Issued March 2025</p>
                  </div>
                  <div className="p-4 rounded-2xl border border-gray-100 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer">
                    <p className="font-bold text-sm">Design System Specialist</p>
                    <p className="text-xs text-[var(--text-muted)]">Issued Nov 2024</p>
                  </div>
                </div>
              </div>
            </FadeIn>

          </div>
        </div>
      </div>
    </div>
  );
}
