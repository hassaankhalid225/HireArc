"use client";
import React, { useState, useEffect } from "react";
import { 
  Building2, 
  Search, 
  ExternalLink, 
  MoreVertical, 
  MapPin, 
  Globe, 
  Plus,
  Filter,
  ArrowUpRight,
  ShieldCheck,
  Building,
  ChevronRight,
  Zap,
  Activity
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { apiClient } from "@/services/api";
import { cn } from "@/lib/utils";

export default function CompanyManagement() {
  const [companies, setCompanies] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");

  useEffect(() => {
    async function fetchCompanies() {
      try {
        const response = await apiClient.get<any>("/companies");
        setCompanies(response.companies);
      } catch (error) {
        console.error("Failed to fetch companies:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCompanies();
  }, []);

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = (company.name || "").toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (company.location || "").toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === "All" || company.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ["All", ...Array.from(new Set(companies.map(c => c.category).filter(Boolean)))];

  return (
    <div className="flex flex-col gap-12 pb-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 py-10 border-b border-hairline">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-ink/40 font-bold mb-1">
            <Building size={12} className="fill-current animate-pulse text-indigo-500" />
            <span className="text-[9px] uppercase tracking-[0.3em]">Enterprise Cluster Protocol</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-headline tracking-tighter text-ink leading-none">Entity Directory</h1>
          <p className="text-body text-lg max-w-xl font-medium leading-relaxed opacity-70">Centralized authorization center for managing corporate entities and their workforce vectors.</p>
        </div>
        <div className="shrink-0">
          <Button size="lg" className="rounded-pill font-bold text-[10px] uppercase tracking-widest bg-ink text-canvas hover:opacity-90 transition-all shadow-xl shadow-ink/10">
            <Plus className="mr-2 size-3.5" />
            Onboard Entity
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Active Partners", value: companies.length, icon: Building2, trend: "+2 Nodes" },
          { label: "Verified Nodes", value: "100%", icon: ShieldCheck, trend: "SECURE" },
          { label: "Aggregate Roles", value: companies.reduce((acc, c) => acc + (c.roles || 0), 0), icon: ArrowUpRight, trend: "GROWING" }
        ].map((stat, idx) => (
          <Card key={idx} className="overflow-hidden border border-hairline shadow-premium-sm bg-surface-card hover:border-hairline-strong transition-all duration-500 rounded-xl group">
            <CardContent className="p-8 flex items-center gap-6">
              <div className="size-14 rounded-2xl bg-canvas-soft text-ink flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:bg-ink group-hover:text-canvas shadow-sm">
                <stat.icon size={28} />
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                    <p className="text-[10px] font-bold text-muted uppercase tracking-[0.2em]">{stat.label}</p>
                    <span className="text-[8px] font-black text-indigo-500 bg-indigo-500/5 px-1.5 py-0.5 rounded border border-indigo-500/10 uppercase tracking-widest">{stat.trend}</span>
                </div>
                <h3 className="text-3xl font-headline text-ink leading-none">
                  {isLoading ? <Skeleton className="h-8 w-16" /> : stat.value}
                </h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col lg:flex-row gap-6 items-center justify-between bg-canvas-soft/30 p-8 rounded-2xl border border-hairline backdrop-blur-md">
        <div className="relative w-full lg:w-[500px] group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-muted size-5 group-focus-within:text-ink transition-colors" />
          <Input 
            placeholder="Filter entities by identifier or geographic node..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-14 h-14 rounded-xl bg-surface-card border-hairline focus-visible:ring-2 focus-visible:ring-ink/10 text-sm font-medium placeholder:text-muted/40 transition-all"
          />
        </div>
        <div className="flex items-center gap-3 w-full lg:w-auto overflow-x-auto no-scrollbar pb-2 lg:pb-0">
          <div className="flex items-center gap-1.5 bg-canvas-soft p-1.5 rounded-pill border border-hairline shadow-inner">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={cn(
                  "px-6 py-2.5 rounded-pill text-[10px] font-bold uppercase tracking-[0.2em] transition-all whitespace-nowrap",
                  filterCategory === cat 
                    ? "bg-ink text-canvas shadow-lg shadow-ink/10" 
                    : "text-muted hover:bg-surface-card hover:text-ink"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Table Card */}
      <Card className="border border-hairline shadow-premium-sm rounded-xl bg-surface-card overflow-hidden transition-all duration-500 hover:border-hairline-strong">
        <CardContent className="p-0 overflow-x-auto no-scrollbar">
          <Table className="min-w-[1000px]">
            <TableHeader className="bg-canvas-soft/50 border-b border-hairline">
              <TableRow className="border-none hover:bg-transparent">
                <TableHead className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.3em] text-muted">Entity Identifier</TableHead>
                <TableHead className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.3em] text-muted">Categorization</TableHead>
                <TableHead className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.3em] text-muted">Geographic Node</TableHead>
                <TableHead className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.3em] text-muted">Active Vectors</TableHead>
                <TableHead className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.3em] text-muted text-right">Access Controls</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <AnimatePresence mode="popLayout">
                {isLoading ? (
                  Array.from({ length: 6 }).map((_, i) => (
                    <TableRow key={i} className="border-b border-hairline/50">
                      <TableCell className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <Skeleton className="size-14 rounded-xl" />
                          <div className="flex flex-col gap-2">
                            <Skeleton className="h-5 w-48" />
                            <Skeleton className="h-3 w-32" />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="px-8 py-6"><Skeleton className="h-7 w-24 rounded-pill" /></TableCell>
                      <TableCell className="px-8 py-6"><Skeleton className="h-5 w-28" /></TableCell>
                      <TableCell className="px-8 py-6"><Skeleton className="h-8 w-12" /></TableCell>
                      <TableCell className="px-8 py-6 text-right"><Skeleton className="h-10 w-28 rounded-xl ml-auto" /></TableCell>
                    </TableRow>
                  ))
                ) : filteredCompanies.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-96 text-center">
                       <div className="flex flex-col items-center justify-center gap-6 opacity-20 group">
                        <div className="size-20 rounded-full bg-canvas-soft flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                          <Building2 size={48} />
                        </div>
                        <p className="text-sm font-bold tracking-[0.25em] uppercase">No Corporate Entities Syncing</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCompanies.map((company) => (
                    <motion.tr 
                      key={company.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="group border-b border-hairline hover:bg-canvas-soft/50 transition-all duration-300 cursor-pointer"
                    >
                      <TableCell className="px-8 py-6">
                        <div className="flex items-center gap-5">
                          <div className="size-14 rounded-2xl bg-white dark:bg-white/5 p-2 shadow-sm border border-hairline flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg">
                            <img src={company.logo} alt={company.name} className="max-h-full max-w-full object-contain" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-base font-bold text-ink leading-tight group-hover:text-indigo-600 transition-colors">{company.name}</span>
                            <span className="text-xs text-muted font-medium flex items-center gap-2 mt-1.5 opacity-70">
                              <Globe size={12} className="text-ink/40" />
                              {company.website}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="px-8 py-6">
                        <Badge variant="outline" className="bg-ink/5 text-ink text-[9px] font-bold uppercase tracking-[0.25em] px-3 py-1.5 rounded-pill border-hairline shadow-sm">
                          {company.category}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-8 py-6">
                        <div className="flex items-center gap-2.5 text-xs font-bold text-ink uppercase tracking-widest opacity-80">
                          <MapPin size={14} className="text-indigo-500" />
                          {company.location}
                        </div>
                      </TableCell>
                      <TableCell className="px-8 py-6">
                        <div className="flex flex-col gap-0.5">
                          <span className="text-3xl font-headline text-ink leading-none tracking-tighter">{company.roles}</span>
                          <span className="text-[9px] font-black text-muted uppercase tracking-[0.2em] opacity-60">Open Vectors</span>
                        </div>
                      </TableCell>
                      <TableCell className="px-8 py-6 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-10 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] px-5 border-hairline hover:bg-ink hover:text-canvas transition-all shadow-sm" 
                            render={
                              <a href={`https://${company.website}`} target="_blank" rel="noopener noreferrer" />
                            }
                          >
                            <ExternalLink size={12} className="mr-2" />
                            Portal
                          </Button>
                          <Button variant="ghost" size="icon" className="size-10 rounded-xl hover:bg-canvas-soft text-muted hover:text-ink transition-all">
                            <MoreVertical size={18} />
                          </Button>
                        </div>
                      </TableCell>
                    </motion.tr>
                  ))
                )}
              </AnimatePresence>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {/* Pending Queue Cluster */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-8 bg-surface-card rounded-2xl border border-hairline shadow-premium-sm transition-all hover:border-hairline-strong duration-500 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-10 opacity-[0.03] group-hover:rotate-12 group-hover:scale-125 transition-transform duration-700">
            <Activity size={100} />
        </div>
        <div className="flex items-center gap-8 relative z-10">
          <div className="flex -space-x-4">
            {[1, 2, 3].map(i => (
              <Avatar key={i} className="border-4 border-surface-card size-12 shadow-xl transition-transform hover:translate-y-[-4px] cursor-pointer">
                <AvatarFallback className="bg-ink text-canvas font-black text-[10px] uppercase tracking-widest">P{i}</AvatarFallback>
              </Avatar>
            ))}
          </div>
          <div className="flex flex-col gap-1">
            <h4 className="text-2xl font-headline text-ink tracking-tight">Enterprise Onboarding Queue</h4>
            <p className="text-base font-medium text-muted opacity-80 italic leading-none">12 new corporate nodes are pending authorization in the current cluster.</p>
          </div>
        </div>
        <Button variant="ghost" className="rounded-pill font-black uppercase tracking-[0.2em] text-[10px] text-ink hover:bg-canvas-soft flex items-center gap-3 px-8 h-12 relative z-10">
          Sync Queue
          <ChevronRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
        </Button>
      </div>
    </div>
  );
}
