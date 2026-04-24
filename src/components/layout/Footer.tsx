"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  return (
    <footer className="bg-[var(--bg-dark)] text-white pt-20 pb-10">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2 text-2xl font-extrabold font-headline">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)]" />
              <span>JobSphere</span>
            </Link>
            <p className="text-[var(--text-muted)] text-base max-w-[280px]">
              Aggregating the world's best jobs in one simple interface. No noise, just opportunities.
            </p>
          </div>

          <div>
            <h4 className="text-base font-semibold mb-6">Explore</h4>
            <div className="flex flex-col gap-3">
              {["Find Jobs", "Remote Jobs", "Browse Categories", "Browse Locations"].map(link => (
                <Link key={link} href="#" className="text-sm text-[var(--text-muted)] hover:text-white transition-colors">
                  {link}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-base font-semibold mb-6">Company</h4>
            <div className="flex flex-col gap-3">
              {["About Us", "FAQ", "Contact", "Privacy Policy"].map(link => (
                <Link key={link} href="#" className="text-sm text-[var(--text-muted)] hover:text-white transition-colors">
                  {link}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-base font-semibold mb-6">Source Data</h4>
            <div className="flex flex-col gap-3">
              {["Greenhouse", "Lever", "Arbeitnow", "Remotive"].map(link => (
                <span key={link} className="text-sm text-[var(--text-muted)]">{link}</span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
