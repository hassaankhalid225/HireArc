"use client";
import { FadeIn } from "@/components/ui/fade-in";
import { Mail, Phone, MapPin, Send, MessageSquare, Twitter, Linkedin, Github } from "lucide-react";

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
              <div className="p-8 bg-white/50 dark:bg-white/5 border border-[var(--border)] rounded-[40px] backdrop-blur-xl">
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

                <div className="mt-12 pt-8 border-t border-[var(--border)]">
                  <p className="text-sm font-bold text-[var(--text-muted)] uppercase tracking-widest mb-6">Follow Our Journey</p>
                  <div className="flex gap-4">
                    {[<Twitter />, <Linkedin />, <Github />, <MessageSquare />].map((icon, i) => (
                      <button key={i} className="w-10 h-10 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--primary)] hover:border-[var(--primary)] hover:bg-[#F0FDF4] transition-all">
                        {icon}
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
                <select className="w-full px-5 py-4 rounded-2xl bg-white/10 border border-white/20 text-white/60 focus:outline-none focus:bg-white/20 transition-all">
                  <option value="" disabled selected>Select Subject</option>
                  <option value="support">Technical Support</option>
                  <option value="business">Business Inquiries</option>
                  <option value="feedback">Feedback</option>
                  <option value="other">Other</option>
                </select>
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
