"use client";

import { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/fade-in";
import Link from "next/link";
import { Search, MapPin, Bookmark, Users } from "lucide-react";
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
    <div className="min-h-screen bg-[var(--bg-base)] pt-24 pb-20">
      {/* Search Header */}
      <FadeIn direction="down" delay={0.1}>
        <div className="bg-white dark:bg-[var(--bg-card)] border-b-2 border-[var(--border)] py-6">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row gap-4 max-w-5xl">
              <div className="flex-1 flex items-center gap-2 px-4 h-12 rounded-xl border-2 border-[var(--border)] bg-white dark:bg-black/20 focus-within:border-[var(--primary)] focus-within:ring-2 focus-within:ring-[var(--primary)]/20 transition-all">
                <Search className="w-5 h-5 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Job title, keywords, or company"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="w-full h-full outline-none bg-transparent text-sm font-medium"
                />
              </div>
              <div className="flex-1 flex items-center gap-2 px-4 h-12 rounded-xl border-2 border-[var(--border)] bg-white dark:bg-black/20 focus-within:border-[var(--primary)] focus-within:ring-2 focus-within:ring-[var(--primary)]/20 transition-all">
                <MapPin className="w-5 h-5 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="City, state, or remote"
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="w-full h-full outline-none bg-transparent text-sm font-medium"
                />
              </div>
              <Button onClick={handleSearch} className="h-12 px-8 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white rounded-xl font-bold transition-all hover:scale-105 active:scale-95">
                Find Jobs
              </Button>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* Main Content Area */}
      <FadeIn delay={0.2} direction="up">
        <div className="container-custom mt-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <p className="text-sm text-[var(--text-secondary)]">
              Showing <span className="font-bold text-[var(--text-primary)]">{totalJobs}</span> jobs
              {searchQuery && <span> for <span className="font-bold text-[var(--text-primary)]">{searchQuery}</span></span>}
              {locationQuery && <span> in <span className="font-bold text-[var(--text-primary)]">{locationQuery}</span></span>}
            </p>
            <div className="flex items-center gap-2 mt-4 md:mt-0">
              <span className="text-sm text-[var(--text-muted)]">Sort by:</span>
              <Select defaultValue="relevant">
                <SelectTrigger className="w-[140px] h-9 border-none bg-transparent shadow-none font-semibold text-sm">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevant">Most Relevant</SelectItem>
                  <SelectItem value="recent">Most Recent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </FadeIn>

      <div className="container-custom">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <FadeIn delay={0.3} direction="right" className="w-full lg:w-[260px] flex-shrink-0 space-y-8">
            {/* Job Type */}
            <div className="p-6 rounded-2xl border-2 border-[var(--border)] bg-white dark:bg-white/5 space-y-4">
              <h4 className="text-xs font-bold text-[var(--text-primary)] mb-1 uppercase tracking-wider">Job Type</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox id="type-full" className="border-2 border-[var(--border)] data-[state=checked]:bg-[var(--primary)] data-[state=checked]:border-[var(--primary)]" 
                    onCheckedChange={(c) => setFilters(f => ({...f, type: c ? "full-time" : undefined}))}
                  />
                  <label htmlFor="type-full" className="text-sm font-bold leading-none cursor-pointer">Full-time</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="type-remote" className="border-2 border-[var(--border)] data-[state=checked]:bg-[var(--primary)] data-[state=checked]:border-[var(--primary)]" 
                    onCheckedChange={(c) => setFilters(f => ({...f, isRemote: !!c}))}
                  />
                  <label htmlFor="type-remote" className="text-sm font-bold leading-none cursor-pointer">Remote Only</label>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Job Results */}
          <div className="flex-1">
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <Card key={i} className="bg-white dark:bg-white/5 border-2 border-[var(--border)] overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex gap-6">
                        <Skeleton className="w-14 h-14 rounded-xl flex-shrink-0" />
                        <div className="flex-1 space-y-4">
                          <Skeleton className="h-6 w-2/3" />
                          <Skeleton className="h-4 w-1/3" />
                          <div className="space-y-2 mt-4">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-5/6" />
                          </div>
                          <div className="flex gap-2 mt-4">
                            <Skeleton className="h-6 w-20 rounded-md" />
                            <Skeleton className="h-6 w-24 rounded-md" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : jobs.length === 0 ? (
              <div className="flex flex-col items-center justify-center min-h-[40vh] gap-4 bg-white dark:bg-white/5 border-2 border-dashed border-[var(--border)] rounded-2xl p-8">
                <Search className="w-12 h-12 text-[var(--text-muted)]" />
                <h3 className="text-xl font-bold font-headline">No jobs found</h3>
                <p className="text-[var(--text-secondary)] text-center max-w-md">We couldn't find any jobs matching your criteria. Try adjusting your filters or search terms.</p>
                <Button onClick={() => { setSearchQuery(""); setLocationQuery(""); setFilters({ page: 1, pageSize: 20 }); }} className="mt-4 bg-[var(--primary)] text-white">Clear All Filters</Button>
              </div>
            ) : (
              <StaggerContainer className="space-y-4">
                {jobs.map((job) => (
                  <StaggerItem key={job.job_id}>
                    <Link href={`/jobs/${job.job_id}`} className="block group">
                      <Card className="hover:shadow-premium transition-all hover:-translate-y-1 duration-300 overflow-hidden cursor-pointer relative bg-white dark:bg-white/5 border-2 border-[var(--border)]">
                        <CardContent className="p-6">
                          <div className="flex gap-6">
                            <div className="w-14 h-14 rounded-xl bg-[#678D63]/10 border-2 border-[var(--border)] flex items-center justify-center flex-shrink-0 text-[#166534] group-hover:border-[var(--primary)] group-hover:text-[var(--primary)] transition-colors">
                              <span className="text-xl font-bold uppercase">{job.company.substring(0, 2)}</span>
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between items-start mb-1">
                                <h3 className="text-xl font-bold group-hover:text-[var(--primary)] transition-colors line-clamp-1">{job.title}</h3>
                                <button 
                                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleSave(job); }}
                                  className={`relative z-20 p-1 transition-colors ${
                                    isSaved(job.job_id)
                                      ? "text-[var(--primary)]"
                                      : "text-gray-400 hover:text-[var(--primary)]"
                                  }`}
                                  title={isSaved(job.job_id) ? "Unsave job" : "Save job"}
                                >
                                  <Bookmark className={`w-5 h-5 ${isSaved(job.job_id) ? "fill-current" : ""}`} />
                                </button>
                              </div>
                              <p className="text-sm text-[var(--text-secondary)] font-medium mb-3">{job.company} • {job.location}</p>
                              <p className="text-sm text-[var(--text-muted)] mb-4 leading-relaxed font-medium line-clamp-2">
                                {job.description || "Apply directly via ATS to learn more about this role."}
                              </p>
                              
                              <div className="flex flex-wrap gap-2 mb-4">
                                <Badge variant="secondary" className="bg-[#678D63]/10 text-[#166534] dark:bg-green-900/30 dark:text-green-300 border-none font-bold py-1 px-3">
                                  {job.job_type || 'Full-time'}
                                </Badge>
                                {(job.salary_max || job.salary_min) && (
                                  <Badge variant="secondary" className="bg-[#678D63]/10 text-[#166534] dark:bg-green-900/30 dark:text-green-300 border-none font-bold py-1 px-3">
                                    ${job.salary_min ? Math.round(job.salary_min/1000) : ''}k - ${job.salary_max ? Math.round(job.salary_max/1000) : ''}k
                                  </Badge>
                                )}
                                {job.tags?.slice(0, 3).map(tag => (
                                  <Badge key={tag} variant="outline" className="rounded-lg border-2 border-[var(--border)] text-[var(--text-secondary)] font-bold">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                              
                              <div className="flex justify-between items-center text-xs text-[var(--text-muted)] pt-5 border-t-2 border-[var(--border)] font-bold uppercase tracking-wider">
                                <span>{job.posted_at ? new Date(job.posted_at).toLocaleDateString() : "Recent"}</span>
                                <span className="flex items-center gap-1.5"><Users className="w-4 h-4" /> Actively Hiring</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </StaggerItem>
                ))}

                {/* Simple Pagination */}
                {totalJobs > filters.pageSize! && (
                  <FadeIn delay={0.1}>
                    <div className="flex justify-center items-center gap-2 mt-10">
                      <Button 
                        variant="outline" 
                        onClick={() => setFilters(f => ({ ...f, page: Math.max(1, (f.page || 1) - 1) }))}
                        disabled={filters.page === 1}
                        className="font-bold border-2"
                      >
                        Previous
                      </Button>
                      <span className="text-sm font-bold text-[var(--text-secondary)]">
                        Page {filters.page}
                      </span>
                      <Button 
                        variant="outline" 
                        onClick={() => setFilters(f => ({ ...f, page: (f.page || 1) + 1 }))}
                        disabled={jobs.length < filters.pageSize!}
                        className="font-bold border-2"
                      >
                        Next
                      </Button>
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
