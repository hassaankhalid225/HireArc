"use client";
import { useState, useEffect } from "react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/fade-in";
import Link from "next/link";
import { Search, MapPin, Building2, ExternalLink, Filter, TrendingUp } from "lucide-react";

const ALL_COMPANIES = [
  { id: 1, name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg", roles: 420, category: "Tech Giant", location: "Mountain View, CA", website: "google.com", color: "#4285F4" },
  { id: 2, name: "Meta", logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg", roles: 156, category: "Social Media", location: "Menlo Park, CA", website: "meta.com", color: "#0668E1" },
  { id: 3, name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg", roles: 890, category: "E-commerce", location: "Seattle, WA", website: "amazon.com", color: "#FF9900" },
  { id: 4, name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", roles: 345, category: "Software", location: "Redmond, WA", website: "microsoft.com", color: "#737373" },
  { id: 5, name: "Netflix", logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg", roles: 82, category: "Entertainment", location: "Los Gatos, CA", website: "netflix.com", color: "#E50914" },
  { id: 6, name: "Apple", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg", roles: 210, category: "Consumer Tech", location: "Cupertino, CA", website: "apple.com", color: "#000000" },
  { id: 7, name: "Stripe", logo: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg", roles: 64, category: "Fintech", location: "San Francisco, CA", website: "stripe.com", color: "#635BFF" },
  { id: 8, name: "Airbnb", logo: "https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_Bélo.svg", roles: 112, category: "Travel", location: "San Francisco, CA", website: "airbnb.com", color: "#FF5A5F" },
  { id: 9, name: "Tesla", logo: "https://upload.wikimedia.org/wikipedia/commons/b/bb/Tesla_T_Symbol.svg", roles: 145, category: "Automotive", location: "Austin, TX", website: "tesla.com", color: "#CC0000" },
  { id: 10, name: "Spotify", logo: "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_with_text.svg", roles: 88, category: "Music", location: "Stockholm, SE", website: "spotify.com", color: "#1DB954" },
  { id: 11, name: "Slack", logo: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg", roles: 42, category: "Communication", location: "San Francisco, CA", website: "slack.com", color: "#4A154B" },
  { id: 12, name: "Adobe", logo: "https://upload.wikimedia.org/wikipedia/commons/8/8d/Adobe_Corporate_Logo.png", roles: 176, category: "Software", location: "San Jose, CA", website: "adobe.com", color: "#FF0000" },
];

const CATEGORIES = ["All", "Tech Giant", "Software", "Fintech", "E-commerce", "Entertainment", "Social Media", "Travel", "Automotive", "Music", "Communication"];

export default function CompaniesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredCompanies = ALL_COMPANIES.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          company.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || company.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredCompanies.length / itemsPerPage);
  const paginatedCompanies = filteredCompanies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset to page 1 when search or category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen">

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-[var(--primary)] text-white">
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent pointer-events-none" />
        <div className="max-w-[1280px] mx-auto px-6 relative z-10">
          <FadeIn direction="up">
            <div className="max-w-[800px]">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm font-semibold mb-6">
                <TrendingUp className="w-4 h-4 text-green-400" />
                <span>Over 5,000+ top companies are hiring</span>
              </div>
              <h1 className="text-[48px] md:text-[64px] font-bold font-headline leading-tight mb-6">
                Discover the best <br />
                <span className="text-green-400">places to work</span>
              </h1>
              <p className="text-white/70 text-xl mb-10 max-w-[600px]">
                Search through thousands of companies and find the one that fits your career goals and values.
              </p>

              {/* Search Bar */}
              <div className="relative max-w-[500px]">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 w-5 h-5" />
                <input 
                  type="text" 
                  placeholder="Search company name or industry..."
                  className="w-full h-14 pl-12 pr-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-green-400/50 transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-[1280px] mx-auto px-6 py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Filters Sidebar */}
          <aside className="w-full lg:w-64 shrink-0">
            <div className="sticky top-24 space-y-8">
              <div>
                <h3 className="flex items-center gap-2 font-bold text-lg mb-6">
                  <Filter className="w-5 h-5" />
                  Industries
                </h3>
                <div className="flex flex-wrap lg:flex-col gap-2">
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all text-left ${
                        selectedCategory === cat 
                          ? "bg-[var(--primary)] text-white" 
                          : "bg-white dark:bg-[#233027] text-[var(--text-secondary)] hover:bg-gray-100 dark:hover:bg-white/5 border-2 border-[var(--border)]"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[var(--primary)]/5 border border-[var(--primary)]/10">
                <h4 className="font-bold mb-2">Want to list your company?</h4>
                <p className="text-sm text-[var(--text-secondary)] mb-4">Reach thousands of top-tier talent every day.</p>
                <button className="text-[var(--primary)] font-bold text-sm hover:underline">Register now &rarr;</button>
              </div>
            </div>
          </aside>

          {/* Companies Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-bold text-2xl">{filteredCompanies.length} Companies Found</h2>
              <div className="text-sm text-[var(--text-muted)]">Sort by: <span className="text-[var(--text-primary)] font-semibold cursor-pointer">Most Popular</span></div>
            </div>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {paginatedCompanies.map((company) => (
                <StaggerItem key={company.id}>
                  <div className="group relative flex flex-col p-6 bg-white dark:bg-[#233027] border-2 border-[var(--primary)] rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-16 h-16 rounded-xl bg-gray-50 dark:bg-white/5 p-3 flex items-center justify-center grayscale group-hover:grayscale-0 transition-all">
                        <img 
                          src={company.logo} 
                          alt={company.name} 
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                      <a 
                        href={company.website.startsWith('http') ? company.website : `https://${company.website}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-gray-50 dark:bg-white/5 text-[var(--text-muted)] hover:text-[var(--primary)] transition-all"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-bold text-[var(--text-primary)]">{company.name}</h3>
                        <span className="px-2 py-0.5 rounded bg-[var(--primary)]/10 text-[var(--primary)] text-[10px] font-bold uppercase tracking-wider border border-[var(--primary)]/20">Top Tier</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-[var(--text-secondary)] mb-6">
                        <div className="flex items-center gap-1.5">
                          <Building2 className="w-4 h-4" />
                          {company.category}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-4 h-4" />
                          {company.location}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t-2 border-[var(--border)] dark:border-white/5">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-[var(--text-primary)]">{company.roles}</span>
                        <span className="text-sm text-[var(--text-muted)]">Open Roles</span>
                      </div>
                      <Link 
                        href={`/company/${company.name.toLowerCase()}`}
                        className="px-4 py-2 rounded-lg border-2 border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white text-sm font-bold transition-all"
                      >
                        View Profile
                      </Link>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-12">
                <button
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-6 py-2 rounded-xl border-2 border-[var(--border)] font-bold text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:border-[var(--primary)] transition-all"
                >
                  Previous
                </button>
                <span className="font-bold text-[var(--text-secondary)]">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-6 py-2 rounded-xl bg-[var(--primary)] text-white font-bold text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-all shadow-lg shadow-[var(--primary)]/20"
                >
                  Next
                </button>
              </div>
            )}

            {filteredCompanies.length === 0 && (
              <div className="text-center py-20 bg-white dark:bg-[#233027] rounded-3xl border border-dashed border-[var(--border)]">
                <div className="w-16 h-16 rounded-full bg-gray-50 dark:bg-white/5 flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-[var(--text-muted)]" />
                </div>
                <h3 className="text-xl font-bold mb-2">No companies found</h3>
                <p className="text-[var(--text-secondary)]">Try adjusting your search or category filters.</p>
                <button 
                  onClick={() => {setSearchQuery(""); setSelectedCategory("All");}}
                  className="mt-6 text-[var(--primary)] font-bold underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

    </div>
  );
}
