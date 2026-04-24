"use client";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { 
  Sun, Moon, ChevronDown, Monitor, BarChart, Palette, 
  Megaphone, Shield, Database, Layout, Briefcase, Rocket, 
  Zap, Target, Search, Users, Bookmark 
} from "lucide-react";

const COMPANIES = [
  { name: "Google", href: "/company/google" },
  { name: "Microsoft", href: "/company/microsoft" },
  { name: "Amazon", href: "/company/amazon" },
  { name: "Meta", href: "/company/meta" },
  { name: "Apple", href: "/company/apple" },
  { name: "Netflix", href: "/company/netflix" },
  { name: "Stripe", href: "/company/stripe" },
  { name: "Airbnb", href: "/company/airbnb" },
];

const CATEGORIES = [
  { name: "Engineering", icon: <Monitor className="w-4 h-4" />, href: "/search?cat=engineering" },
  { name: "Data Science", icon: <BarChart className="w-4 h-4" />, href: "/search?cat=data-science" },
  { name: "Design", icon: <Palette className="w-4 h-4" />, href: "/search?cat=design" },
  { name: "Marketing", icon: <Megaphone className="w-4 h-4" />, href: "/search?cat=marketing" },
  { name: "Security", icon: <Shield className="w-4 h-4" />, href: "/search?cat=security" },
  { name: "Cloud", icon: <Database className="w-4 h-4" />, href: "/search?cat=cloud" },
  { name: "Product", icon: <Layout className="w-4 h-4" />, href: "/search?cat=product" },
  { name: "Sales", icon: <Briefcase className="w-4 h-4" />, href: "/search?cat=sales" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  return (
    <nav 
      className={`sticky top-0 left-0 right-0 h-[72px] flex items-center z-[100] transition-all duration-300 ${
        scrolled 
          ? "bg-[#F0FDF4] dark:bg-[#1C261F] border-b border-[#DCFCE7] dark:border-white/10 shadow-sm" 
          : "bg-white/80 dark:bg-[var(--bg-card)]/80 backdrop-blur-md border-b border-[var(--border)]"
      }`}
      ref={navRef}
    >
      <div className="max-w-[1280px] mx-auto px-6 w-full flex justify-between items-center relative">
        <div className="flex items-center gap-12">
          <Link href="/" className="flex items-center gap-2 text-[22px] font-extrabold font-headline shrink-0">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)]" />
            <span className={scrolled ? "text-[#166534] dark:text-white" : "text-[var(--text-primary)]"}>JobSphere</span>
          </Link>
          
          <div className="hidden lg:flex items-center gap-8">
            <Link href="/search" className={`text-sm font-semibold transition-colors ${scrolled ? "text-[#166534] hover:text-[#15803d]" : "text-[var(--text-secondary)] hover:text-[var(--primary)]"}`}>
              Find Jobs
            </Link>
            <Link href="/search?type=remote" className={`text-sm font-semibold transition-colors ${scrolled ? "text-[#166534] hover:text-[#15803d]" : "text-[var(--text-secondary)] hover:text-[var(--primary)]"}`}>
              Remote
            </Link>

            {/* Companies Dropdown */}
            <div className="relative">
              <button 
                onClick={() => toggleDropdown("companies")}
                className={`flex items-center gap-1 text-sm font-semibold transition-colors ${
                  activeDropdown === "companies" 
                    ? "text-[var(--primary)]" 
                    : scrolled 
                      ? "text-[#166534] hover:text-[#15803d]" 
                      : "text-[var(--text-secondary)] hover:text-[var(--primary)]"
                }`}
              >
                Companies
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === "companies" ? 'rotate-180' : ''}`} />
              </button>
              
              {activeDropdown === "companies" && (
                <div className="absolute top-[calc(100%+20px)] left-0 w-64 bg-white dark:bg-[var(--bg-card)] border border-[var(--border)] rounded-xl shadow-xl p-4 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="grid grid-cols-1 gap-1">
                    {COMPANIES.map(company => (
                      <Link 
                        key={company.name} 
                        href={company.href} 
                        className="px-3 py-2 rounded-lg text-sm text-[var(--text-secondary)] hover:bg-[#F0FDF4] hover:text-[#166534] dark:hover:bg-white/5 dark:hover:text-white transition-colors"
                        onClick={() => setActiveDropdown(null)}
                      >
                        {company.name}
                      </Link>
                    ))}
                    <div className="border-t border-gray-100 dark:border-white/5 mt-2 pt-2">
                      <Link 
                        href="/companies" 
                        className="block px-3 py-2 rounded-lg text-sm font-bold text-[var(--primary)] hover:bg-[#F0FDF4] dark:hover:bg-white/5 transition-colors"
                        onClick={() => setActiveDropdown(null)}
                      >
                        Browse all companies &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Categories Dropdown */}
            <div className="relative">
              <button 
                onClick={() => toggleDropdown("categories")}
                className={`flex items-center gap-1 text-sm font-semibold transition-colors ${
                  activeDropdown === "categories" 
                    ? "text-[var(--primary)]" 
                    : scrolled 
                      ? "text-[#166534] hover:text-[#15803d]" 
                      : "text-[var(--text-secondary)] hover:text-[var(--primary)]"
                }`}
              >
                Categories
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === "categories" ? 'rotate-180' : ''}`} />
              </button>
              
              {activeDropdown === "categories" && (
                <div className="absolute top-[calc(100%+20px)] left-0 w-72 bg-white dark:bg-[var(--bg-card)] border border-[var(--border)] rounded-xl shadow-xl p-4 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="grid grid-cols-1 gap-1">
                    {CATEGORIES.map(cat => (
                      <Link 
                        key={cat.name} 
                        href={cat.href} 
                        className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-[var(--text-secondary)] hover:bg-[#F0FDF4] hover:text-[#166534] dark:hover:bg-white/5 dark:hover:text-white transition-colors"
                        onClick={() => setActiveDropdown(null)}
                      >
                        <span className="text-[#678D63]">{cat.icon}</span>
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 md:gap-6">
          {mounted && theme && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className={`p-2 rounded-full transition-colors ${
                scrolled 
                  ? "text-[#166534] hover:bg-[#DCFCE7] dark:text-gray-300 dark:hover:bg-white/10" 
                  : "text-[var(--text-secondary)] hover:bg-[var(--bg-base)] hover:text-[var(--primary)]"
              }`}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          )}

          {/* User Section (Simulated Login State) */}
          {mounted && (
            <div className="relative">
              <button 
                onClick={() => toggleDropdown("user")}
                className="flex items-center gap-2 group"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#678D63] to-[#A8BA9A] border-2 border-white dark:border-gray-800 shadow-sm flex items-center justify-center text-white font-bold overflow-hidden">
                  HK
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-xs font-bold text-[var(--text-primary)] leading-none mb-1">Hassaan</p>
                  <p className="text-[10px] text-[var(--text-muted)] leading-none">Premium Member</p>
                </div>
              </button>

              {activeDropdown === "user" && (
                <div className="absolute top-[calc(100%+12px)] right-0 w-56 bg-white dark:bg-[var(--bg-card)] border border-[var(--border)] rounded-xl shadow-2xl p-2 animate-in fade-in slide-in-from-top-2 duration-200 z-[110]">
                  <div className="px-3 py-3 border-b border-gray-100 dark:border-white/5 mb-1">
                    <p className="text-xs text-[var(--text-muted)] mb-1">Signed in as</p>
                    <p className="text-sm font-bold text-[var(--text-primary)] truncate">hassaankhalid@jobsphere.com</p>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    {[
                      { name: "My Profile", icon: <Users className="w-4 h-4" />, href: "/profile" },
                      { name: "Saved Jobs", icon: <Bookmark className="w-4 h-4" />, href: "/saved-jobs" },
                      { name: "Applied Jobs", icon: <Zap className="w-4 h-4" />, href: "/applied-jobs" },
                      { name: "Settings", icon: <Layout className="w-4 h-4" />, href: "/settings" },
                    ].map(item => (
                      <Link 
                        key={item.name} 
                        href={item.href}
                        className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-[var(--text-secondary)] hover:bg-[#F0FDF4] hover:text-[#166534] dark:hover:bg-white/5 dark:hover:text-white transition-colors"
                        onClick={() => setActiveDropdown(null)}
                      >
                        <span className="text-[#678D63]">{item.icon}</span>
                        {item.name}
                      </Link>
                    ))}
                    <div className="border-t border-gray-100 dark:border-white/5 mt-1 pt-1">
                      <button 
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                        onClick={() => setActiveDropdown(null)}
                      >
                        <Rocket className="w-4 h-4 rotate-180" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
