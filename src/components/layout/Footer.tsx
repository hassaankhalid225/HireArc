"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/Logo";

export default function Footer() {
  const pathname = usePathname();

  return (
    <footer className="bg-[var(--canvas)] text-[var(--ink)] pt-24 pb-12 border-t border-[var(--hairline)]">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="space-y-8">
            <div className="flex items-center gap-3 mb-8 group cursor-pointer">
              <Logo className="w-8 h-8" />
              <span className="text-xl font-headline font-normal tracking-tight text-[var(--ink)]">
                HireArc
              </span>
            </div>
            <p className="text-[var(--body)] text-[15px] leading-relaxed max-w-[300px]">
              Aggregating 100,000+ jobs from the world's most innovative company job boards. No noise, just your next big move.
            </p>
          </div>

          <div>
            <h4 className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--muted)] mb-8">Explore</h4>
            <div className="flex flex-col gap-4">
              {[
                { name: "Find Jobs", href: "/search" },
                { name: "Remote Jobs", href: "/search?type=remote" },
                { name: "Browse Companies", href: "/companies" },
                { name: "Browse Categories", href: "/search" }
              ].map(link => (
                <Link key={link.name} href={link.href} className="text-[15px] font-medium text-[var(--body)] hover:text-[var(--ink)] transition-colors">
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--muted)] mb-8">Company</h4>
            <div className="flex flex-col gap-4">
              {[
                { name: "About Us", href: "/about" },
                { name: "FAQ", href: "/faq" },
                { name: "Contact", href: "/contact" },
                { name: "Privacy Policy", href: "/privacy" }
              ].map(link => (
                <Link key={link.name} href={link.href} className="text-[15px] font-medium text-[var(--body)] hover:text-[var(--ink)] transition-colors">
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--muted)] mb-8">Source Data</h4>
            <div className="flex flex-col gap-4">
              {["Greenhouse", "Lever", "Arbeitnow", "Remotive"].map(link => (
                <span key={link} className="text-[15px] font-medium text-[var(--muted)]">{link}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-[var(--hairline-soft)] flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[12px] font-medium text-[var(--muted)]">
            &copy; {new Date().getFullYear()} HireArc. All rights reserved.
          </p>
          <div className="flex gap-8">
            {["Twitter", "LinkedIn", "GitHub"].map(social => (
              <Link key={social} href="#" className="text-[12px] font-medium text-[var(--muted)] hover:text-[var(--ink)] transition-colors uppercase tracking-widest">
                {social}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
