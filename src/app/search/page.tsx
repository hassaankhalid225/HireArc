"use client";

import { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/fade-in";
import Link from "next/link";
import { Search, MapPin, Bookmark, Users, ChevronLeft, ChevronRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { jobsService, JobsFilter } from "@/services/jobs.service";
import { Job } from "@/types";
import { useSavedJobs } from "@/context";

export default function SearchPage() {
  const { toggleSave, isSaved } = useSavedJobs();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [totalJobs, setTotalJobs] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<JobsFilter>({ page: 1, pageSize: 20 });
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");

  const fetchJobs = useCallback(async (currentFilters: JobsFilter) => {
    setIsLoading(true);
    try {
      const response = await jobsService.getJobs(currentFilters);
      if (response.success) {
        setJobs(response.data);
        setTotalJobs(response.pagination?.total || 0);
      }
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJobs(filters);
  }, [filters, fetchJobs]);

  const handleSearch = () => {
    setFilters((prev) => ({
      ...prev,
      query: searchQuery || undefined,
      location: locationQuery || undefined,
      page: 1, // Reset page on new search
    }));
  };

  return (
    <div className="min-h-screen bg-[var(--canvas)] pt-24 pb-20">
      {/* Search Header */}
      <FadeIn direction="down" delay={0.1}>
        <div className="bg-[var(--canvas)] border-b border-[var(--hairline)] py-8">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row gap-4 max-w-5xl">
              <div className="flex-1 flex items-center gap-3 px-5 h-12 rounded-xl border border-[var(--hairline-strong)] bg-[var(--surface-card)] transition-all">
                <Search className="w-5 h-5 text-[var(--muted)]" />
                <input 
                  type="text" 
                  placeholder="Job title, keywords, or company"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="w-full h-full outline-none bg-transparent text-[15px] font-medium text-[var(--ink)] placeholder:text-[var(--muted-soft)]"
                />
              </div>
              <div className="flex-1 flex items-center gap-3 px-5 h-12 rounded-xl border border-[var(--hairline-strong)] bg-[var(--surface-card)] transition-all">
                <MapPin className="w-5 h-5 text-[var(--muted)]" />
                <input 
                  type="text" 
                  placeholder="City, state, or remote"
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="w-full h-full outline-none bg-transparent text-[15px] font-medium text-[var(--ink)] placeholder:text-[var(--muted-soft)]"
                />
              </div>
              <button onClick={handleSearch} className="btn btn-primary h-12 px-8 rounded-pill text-[15px] font-medium transition-all hover:translate-y-[-2px]">
                Find Jobs
              </button>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* Main Content Area */}
      <div className="container-custom mt-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Filters */}
          <FadeIn delay={0.2} direction="right" className="w-full lg:w-[280px] flex-shrink-0">
            <div className="sticky top-28 space-y-8">
              <div className="p-8 rounded-xl border border-[var(--hairline)] bg-[var(--surface-card)] space-y-6">
                <h4 className="text-[12px] font-semibold text-[var(--ink)] uppercase tracking-[0.08em]">Filter By Type</h4>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 group cursor-pointer">
                    <Checkbox id="type-full" className="border-[var(--hairline-strong)] data-[state=checked]:bg-[var(--ink)] data-[state=checked]:border-[var(--ink)]" 
                      onCheckedChange={(c) => setFilters(f => ({...f, type: c ? "full-time" : undefined}))}
                    />
                    <label htmlFor="type-full" className="text-[15px] font-medium text-[var(--body)] leading-none cursor-pointer group-hover:text-[var(--ink)] transition-colors">Full-time</label>
                  </div>
                  <div className="flex items-center space-x-3 group cursor-pointer">
                    <Checkbox id="type-remote" className="border-[var(--hairline-strong)] data-[state=checked]:bg-[var(--ink)] data-[state=checked]:border-[var(--ink)]" 
                      onCheckedChange={(c) => setFilters(f => ({...f, isRemote: !!c}))}
                    />
                    <label htmlFor="type-remote" className="text-[15px] font-medium text-[var(--body)] leading-none cursor-pointer group-hover:text-[var(--ink)] transition-colors">Remote Only</label>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Job Results */}
          <div className="flex-1">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <p className="text-[15px] text-[var(--body)]">
                Showing <span className="font-semibold text-[var(--ink)]">{totalJobs}</span> roles
                {searchQuery && <span> for <span className="font-semibold text-[var(--ink)]">{searchQuery}</span></span>}
              </p>
              <div className="flex items-center gap-3">
                <span className="text-[13px] font-semibold uppercase tracking-wider text-[var(--muted)]">Sort</span>
                <Select defaultValue="relevant">
                  <SelectTrigger className="w-[160px] h-10 border-[var(--hairline)] bg-[var(--surface-card)] rounded-pill text-[14px] font-medium focus:ring-0">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent className="bg-[var(--surface-card)] border-[var(--hairline-strong)]">
                    <SelectItem value="relevant">Most Relevant</SelectItem>
                    <SelectItem value="recent">Most Recent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-[var(--surface-card)] border border-[var(--hairline)] rounded-xl p-6 h-[200px]">
                    <div className="flex gap-6">
                      <Skeleton className="w-12 h-12 rounded-lg flex-shrink-0" />
                      <div className="flex-1 space-y-4">
                        <Skeleton className="h-6 w-1/2" />
                        <Skeleton className="h-4 w-1/4" />
                        <div className="space-y-2 mt-4">
                          <Skeleton className="h-4 w-full" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : jobs.length === 0 ? (
              <div className="flex flex-col items-center justify-center min-h-[50vh] gap-6 bg-[var(--surface-card)] border border-dashed border-[var(--hairline-strong)] rounded-xl p-12 text-center">
                <Search className="w-12 h-12 text-[var(--muted)]" />
                <div className="space-y-2">
                  <h3 className="text-2xl font-headline font-normal text-[var(--ink)]">No roles found</h3>
                  <p className="text-[var(--body)] max-w-md">We couldn't find any positions matching your criteria. Try adjusting your filters or search terms.</p>
                </div>
                <button onClick={() => { setSearchQuery(""); setLocationQuery(""); setFilters({ page: 1, pageSize: 20 }); }} className="btn btn-outline h-11 px-8 rounded-pill font-medium">Clear All Filters</button>
              </div>
            ) : (
              <StaggerContainer className="space-y-6">
                {jobs.map((job) => (
                  <StaggerItem key={job.job_id}>
                    <Link href={`/jobs/${job.job_id}`} className="block group">
                      <div className="bg-[var(--surface-card)] border border-[var(--hairline)] rounded-xl p-8 transition-all duration-300 hover:border-[var(--hairline-strong)] hover:shadow-premium-sm relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-[var(--gradient-mint)]/0 to-[var(--gradient-mint)]/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        
                        <div className="flex gap-6 relative z-10">
                          <div className="w-14 h-14 rounded-lg bg-[var(--surface-strong)] border border-[var(--hairline)] flex items-center justify-center flex-shrink-0 text-[var(--ink)] font-medium text-xl uppercase">
                            {job.company.substring(0, 2)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start mb-1">
                              <h3 className="text-xl font-headline font-normal text-[var(--ink)] group-hover:text-[var(--primary)] transition-colors line-clamp-1">{job.title}</h3>
                              <button 
                                onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleSave(job); }}
                                className={`relative z-20 p-2 transition-colors rounded-full ${
                                  isSaved(job.job_id)
                                    ? "text-[var(--primary)] bg-[var(--surface-strong)]"
                                    : "text-[var(--muted-soft)] hover:text-[var(--ink)] hover:bg-[var(--surface-strong)]"
                                }`}
                              >
                                <Bookmark className={`w-5 h-5 ${isSaved(job.job_id) ? "fill-current" : ""}`} />
                              </button>
                            </div>
                            <p className="text-[15px] text-[var(--body)] font-medium mb-4">{job.company} • {job.location}</p>
                            <p className="text-[15px] text-[var(--body)] mb-6 leading-relaxed line-clamp-2">
                              {job.description || "Apply directly via ATS to learn more about this role."}
                            </p>
                            
                            <div className="flex flex-wrap gap-2 mb-6">
                              <div className="px-3 py-1 rounded-pill bg-[var(--surface-strong)] text-[var(--ink)] text-[12px] font-semibold uppercase tracking-wider">
                                {job.job_type || 'Full-time'}
                              </div>
                              {(job.salary_max || job.salary_min) && (
                                <div className="px-3 py-1 rounded-pill bg-[var(--surface-strong)] text-[var(--ink)] text-[12px] font-semibold uppercase tracking-wider">
                                  ${job.salary_min ? Math.round(job.salary_min/1000) : ''}k - ${job.salary_max ? Math.round(job.salary_max/1000) : ''}k
                                </div>
                              )}
                              {job.tags?.slice(0, 3).map(tag => (
                                <div key={tag} className="px-3 py-1 rounded-pill border border-[var(--hairline)] text-[var(--muted)] text-[12px] font-semibold uppercase tracking-wider">
                                  {tag}
                                </div>
                              ))}
                            </div>
                            
                            <div className="flex justify-between items-center text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--muted)] pt-6 border-t border-[var(--hairline-soft)]">
                              <span>{job.posted_at ? new Date(job.posted_at).toLocaleDateString() : "Recent"}</span>
                              <div className="flex items-center gap-2 text-[var(--ink)] font-medium normal-case tracking-normal text-[14px] group-hover:gap-3 transition-all">
                                View Details <ChevronRight className="w-4 h-4" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </StaggerItem>
                ))}

                {/* Pagination */}
                {totalJobs > filters.pageSize! && (
                  <FadeIn delay={0.1}>
                    <div className="flex justify-center items-center gap-6 mt-12 pt-12 border-t border-[var(--hairline)]">
                      <button 
                        onClick={() => setFilters(f => ({ ...f, page: Math.max(1, (f.page || 1) - 1) }))}
                        disabled={filters.page === 1}
                        className="flex items-center gap-2 text-[14px] font-medium text-[var(--ink)] disabled:text-[var(--muted-soft)] hover:gap-3 transition-all"
                      >
                        <ChevronLeft className="w-4 h-4" /> Previous
                      </button>
                      <span className="text-[14px] font-semibold text-[var(--muted)]">
                        Page {filters.page}
                      </span>
                      <button 
                        onClick={() => setFilters(f => ({ ...f, page: (f.page || 1) + 1 }))}
                        disabled={jobs.length < filters.pageSize!}
                        className="flex items-center gap-2 text-[14px] font-medium text-[var(--ink)] disabled:text-[var(--muted-soft)] hover:gap-3 transition-all"
                      >
                        Next <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </FadeIn>
                )}
              </StaggerContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
