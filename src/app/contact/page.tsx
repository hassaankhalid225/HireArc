"use client";
import { FadeIn } from "@/components/ui/fade-in";
import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Twitter = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
);

const Linkedin = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
);

const Github = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
);

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        
        <div className="text-center mb-20">
          <FadeIn>
            <h1 className="text-4xl md:text-6xl font-extrabold font-headline text-[var(--text-primary)] mb-6">
              Get in <span className="text-[var(--primary)]">Touch</span>
            </h1>
            <p className="text-[var(--text-muted)] text-lg max-w-2xl mx-auto">
              Have questions, feedback, or just want to say hello? We're here to help you navigate your career journey.
            </p>
          </FadeIn>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* Contact Info */}
          <div className="space-y-8">
            <FadeIn direction="right">
              <div className="p-8 bg-white/50 dark:bg-white/5 border-2 border-[var(--border)] rounded-[40px] backdrop-blur-xl">
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-8">Contact Information</h2>
                
                <div className="space-y-6">
                  {[
                    { icon: <Mail />, label: "Email Us", value: "hello@hirearc.com" },
                    { icon: <Phone />, label: "Call Us", value: "+1 (555) 123-4567" },
                    { icon: <MapPin />, label: "Visit Us", value: "Silicon Valley, CA, USA" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-6 group">
                      <div className="w-12 h-12 rounded-2xl bg-[#678D63]/10 flex items-center justify-center text-[var(--primary)] group-hover:bg-[var(--primary)] group-hover:text-white transition-all duration-300">
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest mb-0.5">{item.label}</p>
                        <p className="text-lg font-bold text-[var(--text-primary)]">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-12 pt-8 border-t-2 border-[var(--border)]">
                  <p className="text-sm font-bold text-[var(--text-muted)] uppercase tracking-widest mb-6">Follow Our Journey</p>
                  <div className="flex gap-4">
                    {[
                      { icon: <Twitter />, key: "tw" },
                      { icon: <Linkedin />, key: "li" },
                      { icon: <Github />, key: "gh" },
                      { icon: <MessageSquare />, key: "ms" }
                    ].map((item) => (
                      <button key={item.key} className="w-10 h-10 rounded-full border-2 border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--primary)] hover:border-[var(--primary)] hover:bg-[#F0FDF4] transition-all">
                        {item.icon}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Contact Form */}
          <FadeIn direction="left" delay={0.2}>
            <div className="p-10 bg-[var(--primary)] rounded-[40px] shadow-2xl relative overflow-hidden">
              {/* Subtle background decoration */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full -ml-32 -mb-32 blur-3xl" />

              <h2 className="text-2xl font-bold text-white mb-8 relative z-10">Send us a Message</h2>
              <form className="space-y-5 relative z-10">
                <div className="grid md:grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    placeholder="First Name" 
                    className="w-full px-5 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:bg-white/20 transition-all"
                  />
                  <input 
                    type="text" 
                    placeholder="Last Name" 
                    className="w-full px-5 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:bg-white/20 transition-all"
                  />
                </div>
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="w-full px-5 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:bg-white/20 transition-all"
                />
                <Select>
                  <SelectTrigger className="w-full px-5 py-4 h-auto rounded-2xl bg-white/10 border border-white/20 text-white/60 focus:bg-white/20 transition-all shadow-none focus:ring-0">
                    <SelectValue placeholder="Select Subject" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#166534] border-white/20">
                    <SelectItem value="support" className="text-white focus:bg-white/10 focus:text-white">Technical Support</SelectItem>
                    <SelectItem value="business" className="text-white focus:bg-white/10 focus:text-white">Business Inquiries</SelectItem>
                    <SelectItem value="feedback" className="text-white focus:bg-white/10 focus:text-white">Feedback</SelectItem>
                    <SelectItem value="other" className="text-white focus:bg-white/10 focus:text-white">Other</SelectItem>
                  </SelectContent>
                </Select>
                <textarea 
                  rows={4} 
                  placeholder="Your Message" 
                  className="w-full px-5 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:bg-white/20 transition-all resize-none"
                />
                <button className="w-full bg-white text-[var(--primary)] py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#F0FDF4] hover:shadow-lg transition-all active:scale-[0.98]">
                  <Send className="w-5 h-5" />
                  Send Message
                </button>
              </form>
            </div>
          </FadeIn>

        </div>
      </div>
    </div>
  );
}
