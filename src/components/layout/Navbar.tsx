"use client";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Logo } from "@/components/ui/Logo";
import { 
  Sun, Moon, ChevronDown, Monitor, BarChart, Palette, 
  Megaphone, Shield, Database, Layout, Briefcase, Rocket, 
  Zap, Target, Users, Bookmark, Bell, Globe, Check
} from "lucide-react";
import { useLanguage, useAuth } from "@/hooks";
import { LANGUAGES } from "@/lib/i18n";

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

const NOTIFICATIONS = [
  { id: 1, title: "New job match!", desc: "Senior React Developer at Google", time: "2m ago", unread: true },
  { id: 2, title: "Application update", desc: "Your application at Meta is under review", time: "1h ago", unread: true },
  { id: 3, title: "Profile viewed", desc: "A recruiter viewed your profile", time: "3h ago", unread: false },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { lang, setLang, currentLanguage } = useLanguage();
  const { user, logout, isAuthenticated, login } = useAuth();

  // Only the home page has a dark hero — every other page needs a solid navbar
  const isHome = pathname === "/";
  // Treat as "dark background" when on home AND not yet scrolled
  const isDark = isHome && !scrolled;

  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Update scrolled state for background color
      setScrolled(currentScrollY > 50);

      // Smart Hide/Show logic
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down
        setVisible(false);
      } else {
        // Scrolling up
        setVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [lastScrollY]);

  const toggleDropdown = (name: string) =>
    setActiveDropdown(activeDropdown === name ? null : name);

  const unreadCount = NOTIFICATIONS.filter((n) => n.unread).length;

  // Shared icon button style
  const iconBtn = `p-2 rounded-xl transition-all duration-300 ${
    isDark
      ? "text-white/70 hover:bg-white/10 hover:text-white"
      : "text-[var(--text-secondary)] hover:bg-gray-100 dark:hover:bg-white/5 hover:text-[var(--primary)]"
  }`;

  // Dropdown container style - UI/UX Pro Max Glassmorphism
  const dropdownCls =
    "absolute top-[calc(100%+16px)] right-0 bg-white/95 dark:bg-[#15221B]/95 backdrop-blur-2xl border border-[var(--border)] dark:border-white/10 rounded-2xl shadow-premium overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300 z-[110]";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 h-[88px] flex items-center z-[100] transition-all duration-500 transform ${
        visible ? "translate-y-0" : "-translate-y-full"
      } ${
        isDark
          ? "bg-transparent border-transparent"
          : "bg-white/80 dark:bg-[#0F1713]/80 backdrop-blur-xl border-b border-[var(--border)] dark:border-white/5 shadow-sm"
      }`}
      ref={navRef}
    >
      <div className="max-w-[1400px] mx-auto px-8 w-full flex justify-between items-center relative">
        {/* ── Left: Logo + Nav Links ── */}
        <div className="flex items-center gap-16">
          <Link href="/" className="flex items-center gap-3 group cursor-pointer">
            <Logo className="w-10 h-10" isDark={isDark} />
            <span className={`text-xl font-extrabold font-headline tracking-tighter ${isDark ? 'text-white' : 'text-[var(--text-primary)]'}`}>
              JobSphere
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            <Link
              href="/search"
              className={`text-sm font-bold transition-all ${
                isDark
                  ? "text-white/80 hover:text-white"
                  : "text-[var(--text-secondary)] hover:text-[var(--primary)]"
              }`}
            >
              Find Jobs
            </Link>
            <Link
              href="/search?type=remote"
              className={`text-sm font-bold transition-all ${
                isDark
                  ? "text-white/80 hover:text-white"
                  : "text-[var(--text-secondary)] hover:text-[var(--primary)]"
              }`}
            >
              Remote
            </Link>

            {/* Companies */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown("companies")}
                className={`flex items-center gap-1 text-sm font-bold transition-all ${
                  activeDropdown === "companies"
                    ? isDark ? "text-white" : "text-[var(--primary)]"
                    : isDark
                    ? "text-white/80 hover:text-white"
                    : "text-[var(--text-secondary)] hover:text-[var(--primary)]"
                }`}
              >
                Companies
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === "companies" ? "rotate-180" : ""}`} />
              </button>
              {activeDropdown === "companies" && (
                <div className="absolute top-[calc(100%+20px)] left-0 w-64 bg-white dark:bg-[#1C261F] border border-[var(--border)] dark:border-white/10 rounded-xl shadow-xl p-4 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="grid grid-cols-1 gap-1">
                    {COMPANIES.map((c) => (
                      <Link
                        key={c.name}
                        href={c.href}
                        className="px-3 py-2 rounded-lg text-sm text-[var(--text-secondary)] hover:bg-[#F0FDF4] hover:text-[#166534] dark:hover:bg-white/5 dark:hover:text-white transition-colors"
                        onClick={() => setActiveDropdown(null)}
                      >
                        {c.name}
                      </Link>
                    ))}
                    <div className="border-t border-[var(--border)] dark:border-white/5 mt-2 pt-2">
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

            {/* Categories */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown("categories")}
                className={`flex items-center gap-1 text-sm font-bold transition-all ${
                  activeDropdown === "categories"
                    ? isDark ? "text-white" : "text-[var(--primary)]"
                    : isDark
                    ? "text-white/80 hover:text-white"
                    : "text-[var(--text-secondary)] hover:text-[var(--primary)]"
                }`}
              >
                Categories
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === "categories" ? "rotate-180" : ""}`} />
              </button>
              {activeDropdown === "categories" && (
                <div className="absolute top-[calc(100%+20px)] left-0 w-72 bg-white dark:bg-[#1C261F] border border-[var(--border)] dark:border-white/10 rounded-xl shadow-xl p-4 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="grid grid-cols-1 gap-1">
                    {CATEGORIES.map((cat) => (
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

        {/* ── Right: Language → Notifications → Theme → Profile ── */}
        <div className="flex items-center gap-1.5">

          {/* ── Language Switcher ── */}
          {mounted && (
            <div className="relative">
              <button
                onClick={() => toggleDropdown("language")}
                className={`${iconBtn} flex items-center gap-1.5`}
                aria-label="Change language"
                title={`Language: ${currentLanguage.nativeLabel}`}
              >
                <Globe className="w-5 h-5" />
                <span className="hidden sm:inline text-xs font-bold uppercase tracking-wide">
                  {lang}
                </span>
              </button>

              {activeDropdown === "language" && (
                <div className={`${dropdownCls} w-52 right-0`}>
                  <div className="px-4 py-3 border-b border-[var(--border)] dark:border-white/5">
                    <p className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                      Select Language
                    </p>
                  </div>
                  <div className="py-1.5 px-2">
                    {LANGUAGES.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => {
                          setLang(l.code);
                          setActiveDropdown(null);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-colors ${
                          lang === l.code
                            ? "bg-[#F0FDF4] text-[#166534] dark:bg-white/10 dark:text-white font-semibold"
                            : "text-[var(--text-secondary)] hover:bg-gray-50 dark:hover:bg-white/5"
                        }`}
                      >
                        <span className="flex items-center gap-2.5">
                          <span className="text-base">{l.flag}</span>
                          <span>{l.nativeLabel}</span>
                        </span>
                        {lang === l.code && (
                          <Check className="w-3.5 h-3.5 text-[#678D63]" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── Notifications ── */}
          {mounted && (
            <div className="relative">
              <button
                onClick={() => toggleDropdown("notifications")}
                className={`${iconBtn} relative`}
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-[#1C261F] animate-pulse" />
                )}
              </button>

              {activeDropdown === "notifications" && (
                <div className={`${dropdownCls} w-80`}>
                  <div className="px-4 py-3 border-b border-[var(--border)] dark:border-white/5 flex items-center justify-between">
                    <p className="text-sm font-bold text-[var(--text-primary)]">Notifications</p>
                    <span className="text-xs font-medium text-[var(--primary)] bg-[#F0FDF4] dark:bg-white/10 px-2 py-0.5 rounded-full">
                      {unreadCount} new
                    </span>
                  </div>
                  <div className="flex flex-col">
                    {NOTIFICATIONS.map((n) => (
                      <button
                        key={n.id}
                        className={`flex items-start gap-3 px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-white/5 transition-colors ${n.unread ? "bg-[#F0FDF4]/60 dark:bg-white/[0.03]" : ""}`}
                      >
                        <span className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${n.unread ? "bg-[#678D63]" : "bg-gray-200 dark:bg-white/10"}`} />
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-[var(--text-primary)] truncate">{n.title}</p>
                          <p className="text-xs text-[var(--text-muted)] truncate">{n.desc}</p>
                          <p className="text-[10px] text-[var(--text-muted)] mt-0.5">{n.time}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className="px-4 py-2.5 border-t border-[var(--border)] dark:border-white/5">
                    <Link
                      href="/notifications"
                      className="text-xs font-bold text-[var(--primary)] hover:underline"
                      onClick={() => setActiveDropdown(null)}
                    >
                      View all notifications &rarr;
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── Theme Toggle ── */}
          {mounted && theme && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className={iconBtn}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          )}

          {/* ── Profile (icon only) ── */}
          {mounted && isAuthenticated ? (
            <div className="relative ml-1">
              <button
                onClick={() => toggleDropdown("user")}
                className="group cursor-pointer"
                aria-label="User menu"
              >
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#678D63] to-[#A8BA9A] border-2 border-white/50 dark:border-[#3E5F43] shadow-md flex items-center justify-center text-white text-sm font-bold overflow-hidden transition-all duration-200 group-hover:scale-110 group-hover:shadow-lg group-hover:ring-2 group-hover:ring-[#678D63]/40">
                  {user?.name?.split(" ").map(n => n[0]).join("") || "HK"}
                </div>
              </button>

              {activeDropdown === "user" && (
                <div className={`${dropdownCls} w-60`}>
                  {/* User info */}
                  <div className="px-4 py-3.5 border-b border-[var(--border)] dark:border-white/5 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#678D63] to-[#A8BA9A] flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                      {user?.name?.split(" ").map(n => n[0]).join("") || "HK"}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-[var(--text-primary)] truncate">{user?.name || "User"}</p>
                      <p className="text-[11px] text-[var(--text-muted)] truncate">{user?.email || "user@example.com"}</p>
                    </div>
                  </div>

                  {/* Notifications mini */}
                  <div className="px-4 py-2.5 border-b border-[var(--border)] dark:border-white/5">
                    <div className="flex items-center justify-between mb-1.5">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">Notifications</p>
                      {unreadCount > 0 && (
                        <span className="text-[10px] font-bold text-[var(--primary)] bg-[#F0FDF4] dark:bg-white/10 px-1.5 py-0.5 rounded-full">
                          {unreadCount} new
                        </span>
                      )}
                    </div>
                    {NOTIFICATIONS.slice(0, 2).map((n) => (
                      <div key={n.id} className="flex items-center gap-2 py-1">
                        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${n.unread ? "bg-[#678D63]" : "bg-gray-300 dark:bg-white/20"}`} />
                        <p className="text-xs text-[var(--text-secondary)] truncate">{n.title}</p>
                      </div>
                    ))}
                    <Link
                      href="/notifications"
                      className="text-[11px] font-semibold text-[var(--primary)] hover:underline mt-1 inline-block"
                      onClick={() => setActiveDropdown(null)}
                    >
                      See all &rarr;
                    </Link>
                  </div>

                  {/* Nav links */}
                  <div className="py-1.5 px-2">
                    {[
                      { name: "My Profile",    icon: <Users className="w-4 h-4" />,    href: "/profile" },
                      { name: "Edit Profile",  icon: <Target className="w-4 h-4" />,   href: "/profile/edit" },
                      { name: "Saved Jobs",    icon: <Bookmark className="w-4 h-4" />, href: "/saved-jobs" },
                      { name: "Applied Jobs",  icon: <Zap className="w-4 h-4" />,      href: "/applied-jobs" },
                      { name: "Settings",      icon: <Layout className="w-4 h-4" />,   href: "/settings" },
                    ].map((item) => (
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
                  </div>

                  {/* Sign out */}
                  <div className="border-t border-[var(--border)] dark:border-white/5 px-2 pb-2 pt-1">
                    <button
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                      onClick={() => {
                        setActiveDropdown(null);
                        logout();
                      }}
                    >
                      <Rocket className="w-4 h-4 rotate-180" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3 ml-2">
              <Link 
                href="/login" 
                className={`text-sm font-bold transition-all ${isDark ? "text-white/80 hover:text-white" : "text-[var(--text-secondary)] hover:text-[var(--primary)]"}`}
              >
                Log In
              </Link>
              <Link 
                href="/signup" 
                className="btn btn-primary h-10 px-5 text-sm"
              >
                Join Now
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
