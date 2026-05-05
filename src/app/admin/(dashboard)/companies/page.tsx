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
  ChevronRight
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
import { Card, CardContent } from "@/components/ui/card";
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
    const matchesSearch = company.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          company.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === "All" || company.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ["All", ...Array.from(new Set(companies.map(c => c.category)))];

  return (
    <div className="space-y-12 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 py-8 border-b border-hairline">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-ink/40 font-bold mb-1">
            <Building className="w-4 h-4 fill-current opacity-20" />
            <span className="text-[9px] uppercase tracking-[0.25em]">Enterprise Cluster</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-headline tracking-tighter text-ink leading-[0.9]">Entity Directory</h1>
          <p className="text-body text-base max-w-xl font-medium leading-relaxed opacity-70">Centralized authorization center for managing corporate entities and their workforce vectors.</p>
        </div>
        <div>
          <Button className="h-11 px-8 rounded-pill font-bold text-[10px] uppercase tracking-widest bg-ink text-canvas hover:opacity-90 transition-all shadow-lg shadow-ink/10">
            <Plus className="mr-2 h-3.5 w-3.5" />
            Onboard Entity
          </Button>
        </div>
      </div>

      {/* Stats Quick View */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Active Partners", value: companies.length, icon: Building2 },
          { label: "Verified Nodes", value: "100%", icon: ShieldCheck },
          { label: "Aggregate Roles", value: companies.reduce((acc, c) => acc + (c.roles || 0), 0), icon: ArrowUpRight }
        ].map((stat, idx) => (
          <Card key={idx} className="border border-hairline shadow-premium-sm rounded-xl bg-surface-card hover:border-hairline-strong transition-all duration-300">
            <CardContent className="p-8 flex items-center gap-6">
              <div className="w-14 h-14 rounded-xl bg-canvas-soft flex items-center justify-center transition-transform hover:scale-110 text-ink">
                <stat.icon size={28} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-muted uppercase tracking-[0.2em] mb-1">{stat.label}</p>
                <h3 className="text-3xl font-headline text-ink leading-none">
                  {isLoading ? "..." : stat.value}
                </h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-8 items-center justify-between bg-canvas-soft/30 p-6 rounded-xl border border-hairline">
        <div className="relative w-full md:w-[450px] group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-muted w-5 h-5 group-focus-within:text-ink transition-colors" />
          <Input 
            placeholder="Filter entities by identifier or geographic node..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-14 h-12 rounded-xl bg-surface-card border-hairline focus-visible:ring-2 focus-visible:ring-ink/10 text-sm font-medium"
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto no-scrollbar pb-2 md:pb-0">
          <div className="flex items-center gap-2 bg-canvas-soft p-1.5 rounded-pill border border-hairline">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={cn(
                  "px-6 py-2 rounded-pill text-[11px] font-bold uppercase tracking-widest transition-all whitespace-nowrap",
                  filterCategory === cat 
                    ? "bg-ink text-canvas shadow-premium-sm" 
                    : "text-muted hover:bg-surface-card hover:text-ink"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <Card className="border border-hairline shadow-premium-sm rounded-xl bg-surface-card overflow-hidden">
        <CardContent className="p-0 overflow-x-auto no-scrollbar">
          <Table className="min-w-[1000px]">
            <TableHeader className="bg-canvas-soft/50 border-b border-hairline">
              <TableRow className="border-none hover:bg-transparent">
                <TableHead className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-muted">Entity Identifier</TableHead>
                <TableHead className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-muted">Categorization</TableHead>
                <TableHead className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-muted">Geographic Node</TableHead>
                <TableHead className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-muted">Active Vectors</TableHead>
                <TableHead className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-muted text-right">Access Controls</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <AnimatePresence mode="popLayout">
                {isLoading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i} className="border-b border-hairline">
                      <TableCell colSpan={5} className="h-24 px-8"><Skeleton className="h-16 w-full rounded-xl opacity-20" /></TableCell>
                    </TableRow>
                  ))
                ) : filteredCompanies.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-64 text-center text-muted font-bold uppercase tracking-widest text-xs opacity-50">No Entities Found</TableCell>
                  </TableRow>
                ) : (
                  filteredCompanies.map((company) => (
                    <motion.tr 
                      key={company.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="group border-b border-hairline hover:bg-canvas-soft/50 transition-all duration-300"
                    >
                      <TableCell className="px-8 py-6">
                        <div className="flex items-center gap-5">
                          <div className="w-14 h-14 rounded-xl bg-white p-2 shadow-sm border border-hairline flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                            <img src={company.logo} alt={company.name} className="max-h-full max-w-full object-contain" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-base font-bold text-ink leading-tight">{company.name}</span>
                            <span className="text-xs text-muted font-medium flex items-center gap-2 mt-1 opacity-70">
                              <Globe size={12} className="text-ink/40" />
                              {company.website}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="px-8 py-6">
                        <Badge variant="outline" className="bg-ink/5 text-ink text-[9px] font-bold uppercase tracking-wider px-3 py-1 rounded-pill border-hairline">
                          {company.category}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-8 py-6">
                        <div className="flex items-center gap-2.5 text-xs font-bold text-body">
                          <MapPin size={14} className="text-ink/40" />
                          {company.location}
                        </div>
                      </TableCell>
                      <TableCell className="px-8 py-6">
                        <div className="flex flex-col">
                          <span className="text-2xl font-headline text-ink leading-none">{company.roles}</span>
                          <span className="text-[10px] font-bold text-muted uppercase tracking-widest opacity-60">Open Roles</span>
                        </div>
                      </TableCell>
                      <TableCell className="px-8 py-6 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-10 rounded-xl font-bold px-4 border-hairline hover:bg-ink hover:text-canvas transition-all" 
                            render={
                              <a href={`https://${company.website}`} target="_blank" rel="noopener noreferrer" />
                            }
                          >
                            <ExternalLink size={14} className="mr-2" />
                            Portal
                          </Button>
                          <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-canvas-soft text-muted hover:text-ink transition-all">
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
      
      <div className="flex items-center justify-between p-8 bg-surface-card rounded-xl border border-hairline shadow-premium-sm group cursor-pointer hover:border-hairline-strong transition-all">
        <div className="flex items-center gap-6">
          <div className="flex -space-x-4">
            {[1, 2, 3].map(i => (
              <Avatar key={i} className="border-4 border-surface-card h-10 w-10 shadow-sm">
                <AvatarFallback className="bg-canvas-soft text-ink font-bold text-xs">U{i}</AvatarFallback>
              </Avatar>
            ))}
          </div>
          <p className="text-sm font-medium text-body italic">12 new partner requests pending authorization.</p>
        </div>
        <Button variant="link" className="font-bold uppercase tracking-widest text-[11px] text-ink hover:no-underline flex items-center gap-2">
          View Permission Queue
          <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
}
