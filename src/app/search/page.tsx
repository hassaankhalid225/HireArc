"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/fade-in";
import Link from "next/link";
import Image from "next/image";
import { Search, MapPin, Bookmark, Users } from "lucide-react";

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-base)] pt-24 pb-20">
      
      {/* Search Header */}
      <FadeIn direction="down" delay={0.1}>
        <div className="bg-white dark:bg-[var(--bg-card)] border-b border-[var(--border)] py-6">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row gap-4 max-w-5xl">
              <div className="flex-1 flex items-center gap-2 px-4 h-12 rounded-md border border-[var(--border)] bg-white dark:bg-black/20 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
                <Search className="w-5 h-5 text-gray-400" />
                <input 
                  type="text" 
                  defaultValue="Product Designer"
                  className="w-full h-full outline-none bg-transparent text-sm"
                />
              </div>
              <div className="flex-1 flex items-center gap-2 px-4 h-12 rounded-md border border-[var(--border)] bg-white dark:bg-black/20 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
                <MapPin className="w-5 h-5 text-gray-400" />
                <input 
                  type="text" 
                  defaultValue="Remote"
                  className="w-full h-full outline-none bg-transparent text-sm"
                />
              </div>
              <Button className="h-12 px-8 bg-blue-600 hover:bg-blue-700 hover:scale-105 active:scale-95 transition-transform">Find Jobs</Button>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* Main Content Area */}
      <FadeIn delay={0.2} direction="up">
        <div className="container-custom mt-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <p className="text-sm text-[var(--text-secondary)]">
              Showing <span className="font-bold text-[var(--text-primary)]">1,240</span> jobs for <span className="font-bold text-[var(--text-primary)]">Product Designer</span> in <span className="font-bold text-[var(--text-primary)]">Remote</span>
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
                  <SelectItem value="salary">Highest Salary</SelectItem>
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
            
            {/* Active Filters */}
            <div>
              <h4 className="text-xs font-bold text-[var(--text-primary)] mb-3 uppercase tracking-wider">Active Filters</h4>
              <div className="flex flex-wrap gap-2 items-center">
                <Badge variant="secondary" className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 rounded-sm hover:bg-blue-100 flex items-center gap-1">
                  Remote <span className="text-xs cursor-pointer ml-1">×</span>
                </Badge>
                <Badge variant="secondary" className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 rounded-sm hover:bg-blue-100 flex items-center gap-1">
                  $100k+ <span className="text-xs cursor-pointer ml-1">×</span>
                </Badge>
                <button className="text-xs text-[var(--text-muted)] hover:text-[var(--primary)] ml-2">Clear all</button>
              </div>
            </div>

            {/* Job Type */}
            <div>
              <h4 className="text-xs font-bold text-[var(--text-primary)] mb-3 uppercase tracking-wider">Job Type</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox id="type-full" defaultChecked />
                  <label htmlFor="type-full" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Full-time</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="type-contract" />
                  <label htmlFor="type-contract" className="text-sm font-medium leading-none text-[var(--text-secondary)]">Contract</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="type-part" />
                  <label htmlFor="type-part" className="text-sm font-medium leading-none text-[var(--text-secondary)]">Part-time</label>
                </div>
              </div>
            </div>

            {/* Experience Level */}
            <div>
              <h4 className="text-xs font-bold text-[var(--text-primary)] mb-3 uppercase tracking-wider">Experience Level</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox id="exp-entry" />
                  <label htmlFor="exp-entry" className="text-sm font-medium leading-none text-[var(--text-secondary)]">Entry Level</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="exp-senior" defaultChecked />
                  <label htmlFor="exp-senior" className="text-sm font-medium leading-none">Senior</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="exp-lead" />
                  <label htmlFor="exp-lead" className="text-sm font-medium leading-none text-[var(--text-secondary)]">Lead / Director</label>
                </div>
              </div>
            </div>

            {/* Salary Range */}
            <div>
              <h4 className="text-xs font-bold text-[var(--text-primary)] mb-3 uppercase tracking-wider">Salary Range</h4>
              <RadioGroup defaultValue="120">
                <div className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value="50" id="sal-50" />
                  <label htmlFor="sal-50" className="text-sm text-[var(--text-secondary)]">$50k - $80k</label>
                </div>
                <div className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value="80" id="sal-80" />
                  <label htmlFor="sal-80" className="text-sm text-[var(--text-secondary)]">$80k - $120k</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="120" id="sal-120" />
                  <label htmlFor="sal-120" className="text-sm font-medium">$120k+</label>
                </div>
              </RadioGroup>
            </div>

            {/* Date Posted */}
            <div>
              <h4 className="text-xs font-bold text-[var(--text-primary)] mb-3 uppercase tracking-wider">Date Posted</h4>
              <Select defaultValue="any">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any Time</SelectItem>
                  <SelectItem value="past_24">Past 24 Hours</SelectItem>
                  <SelectItem value="past_week">Past Week</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </FadeIn>

          {/* Job Results */}
          <StaggerContainer className="flex-1 space-y-4">
            
            {/* Job Card 1 */}
            <StaggerItem>
              <Link href="/jobs/1" className="block group">
                <Card className="hover:shadow-lg transition-all hover:-translate-y-1 duration-300 border-[var(--border)] overflow-hidden cursor-pointer relative">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-lg bg-[var(--bg-base)] border border-[var(--border)] flex items-center justify-center flex-shrink-0">
                        <span className="text-xl font-bold">SF</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="text-lg font-bold group-hover:text-blue-600 transition-colors">Senior Product Designer</h3>
                          <button 
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                            }}
                            className="text-gray-400 hover:text-blue-600 relative z-20 p-1"
                          >
                            <Bookmark className="w-5 h-5" />
                          </button>
                        </div>
                        <p className="text-sm text-[var(--text-secondary)] mb-3">Streamline Flow • California, US (Remote)</p>
                        <p className="text-sm text-[var(--text-muted)] mb-4 leading-relaxed">We are looking for a Senior Product Designer to join our core team and help shape the future of visual collaboration tools. You will lead design systems and complex user journeys...</p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          <Badge variant="secondary" className="bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300 hover:bg-green-100 rounded-sm">Full-time</Badge>
                          <Badge variant="secondary" className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 hover:bg-blue-100 rounded-sm">$140k - $180k</Badge>
                          <Badge variant="outline" className="rounded-sm border-[var(--border)] text-[var(--text-secondary)]">Design System</Badge>
                          <Badge variant="outline" className="rounded-sm border-[var(--border)] text-[var(--text-secondary)]">Figma</Badge>
                        </div>
                        
                        <div className="flex justify-between items-center text-xs text-[var(--text-muted)] pt-4 border-t border-[var(--border)]">
                          <span>Posted 2 hours ago</span>
                          <span className="flex items-center gap-1"><Users className="w-4 h-4" /> 12 Applicants</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </StaggerItem>

            {/* Job Card 2 */}
            <StaggerItem>
              <Link href="/jobs/2" className="block group">
                <Card className="hover:shadow-lg transition-all hover:-translate-y-1 duration-300 border-[var(--border)] overflow-hidden cursor-pointer relative">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-lg bg-blue-50 border border-[var(--border)] flex items-center justify-center flex-shrink-0 text-blue-600">
                        <span className="text-xl font-bold">UX</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="text-lg font-bold group-hover:text-blue-600 transition-colors">UX Designer (Fintech)</h3>
                          <button 
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                            }}
                            className="text-blue-600 relative z-20 p-1"
                          >
                            <Bookmark className="w-5 h-5 fill-current" />
                          </button>
                        </div>
                        <p className="text-sm text-[var(--text-secondary)] mb-3">NeoBank Systems • London, UK (Hybrid)</p>
                        <p className="text-sm text-[var(--text-muted)] mb-4 leading-relaxed">Help us revolutionize the way people manage their finances. We need a UX expert who understands data visualization and complex transaction flows...</p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          <Badge variant="secondary" className="bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300 hover:bg-green-100 rounded-sm">Full-time</Badge>
                          <Badge variant="secondary" className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 hover:bg-blue-100 rounded-sm">$90k - $130k</Badge>
                          <Badge variant="outline" className="rounded-sm border-[var(--border)] text-[var(--text-secondary)]">Fintech</Badge>
                        </div>
                        
                        <div className="flex justify-between items-center text-xs text-[var(--text-muted)] pt-4 border-t border-[var(--border)]">
                          <span>Posted 5 hours ago</span>
                          <span className="flex items-center gap-1"><Users className="w-4 h-4" /> 45 Applicants</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </StaggerItem>

            {/* Pagination */}
            <FadeIn delay={0.6}>
              <div className="flex justify-center items-center gap-1 mt-10">
              <Button variant="outline" size="icon" className="w-8 h-8 rounded-full border-none text-[var(--text-muted)]">&lt;</Button>
              <Button variant="default" size="icon" className="w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-700">1</Button>
              <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full">2</Button>
              <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full">3</Button>
              <span className="px-2 text-[var(--text-muted)]">...</span>
              <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full">12</Button>
              <Button variant="outline" size="icon" className="w-8 h-8 rounded-full border-none text-[var(--text-primary)] hover:bg-blue-50 hover:text-blue-600 transition-colors">&gt;</Button>
              </div>
            </FadeIn>

          </StaggerContainer>
        </div>
      </div>
    </div>
  );
}
