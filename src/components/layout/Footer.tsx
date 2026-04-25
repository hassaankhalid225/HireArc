"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/Logo";

export default function Footer() {
  const pathname = usePathname();

  return (
    <footer className="bg-[var(--bg-dark)] text-white pt-24 pb-12">
      <div className="max-w-[1400px] mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="space-y-8">
            <div className="flex items-center gap-3 mb-8 group cursor-pointer">
              <Logo className="w-10 h-10" />
              <span className="text-2xl font-extrabold font-headline tracking-tighter text-white">
                HireArc
              </span>
            </div>
            <p className="text-white/40 text-[15px] leading-relaxed max-w-[300px] font-medium">
              Aggregating 100,000+ jobs from the world's most innovative company job boards. No noise, just your next big move.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-extrabold uppercase tracking-[0.2em] text-[var(--primary-light)] mb-8">Explore</h4>
            <div className="flex flex-col gap-4">
              {[
                { name: "Find Jobs", href: "/search" },
                { name: "Remote Jobs", href: "/search?type=remote" },
                { name: "Browse Companies", href: "/companies" },
                { name: "Browse Categories", href: "/categories" }
              ].map(link => (
                <Link key={link.name} href={link.href} className="text-[15px] font-bold text-white/50 hover:text-white transition-colors">
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-extrabold uppercase tracking-[0.2em] text-[var(--primary-light)] mb-8">Company</h4>
            <div className="flex flex-col gap-4">
              {[
                { name: "About Us", href: "/about" },
                { name: "FAQ", href: "/faq" },
                { name: "Contact", href: "/contact" },
                { name: "Privacy Policy", href: "/privacy" }
              ].map(link => (
                <Link key={link.name} href={link.href} className="text-[15px] font-bold text-white/50 hover:text-white transition-colors">
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-extrabold uppercase tracking-[0.2em] text-[var(--primary-light)] mb-8">Source Data</h4>
            <div className="flex flex-col gap-4">
              {["Greenhouse", "Lever", "Arbeitnow", "Remotive"].map(link => (
                <span key={link} className="text-[15px] font-bold text-white/30">{link}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs font-bold text-white/20 uppercase tracking-widest">
            &copy; {new Date().getFullYear()} HireArc Premium. All rights reserved.
          </p>
          <div className="flex gap-8">
            {["Twitter", "LinkedIn", "GitHub"].map(social => (
              <Link key={social} href="#" className="text-xs font-bold text-white/20 hover:text-white transition-colors uppercase tracking-widest">
                {social}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
