"use client";
import React, { useState } from "react";
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
    <div className="space-y-10 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-accent/20 p-6 md:p-10 rounded-3xl md:rounded-[3rem] border border-accent/30 shadow-inner">
        <div>
          <div className="flex items-center gap-2 text-primary font-bold mb-3">
            <Building className="w-5 h-5 fill-primary/20" />
            <span className="text-[11px] uppercase tracking-[0.3em] font-black">Enterprise Cluster</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-foreground">Global Nodes</h1>
          <p className="text-muted-foreground font-medium mt-2 text-base md:text-lg max-w-xl">Centralized authorization center for managing corporate entities and their workforce vectors.</p>
        </div>
        <div className="flex items-center gap-4">
          <Button className="h-14 md:h-16 px-6 md:px-10 rounded-2xl md:rounded-[2rem] font-black shadow-xl shadow-primary/20 hover:scale-105 transition-all active:scale-95 bg-primary text-white">
            <Plus className="mr-3 h-5 w-5 md:h-6 w-6" />
            Onboard Entity
          </Button>
        </div>
      </div>

      {/* Stats Quick View */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: "Active Partners", value: companies.length, icon: Building2, color: "text-blue-500", bg: "bg-blue-500/10" },
          { label: "Verified Nodes", value: "100%", icon: ShieldCheck, color: "text-emerald-500", bg: "bg-emerald-500/10" },
          { label: "Aggregate Roles", value: companies.reduce((acc, c) => acc + (c.roles || 0), 0), icon: ArrowUpRight, color: "text-violet-500", bg: "bg-violet-500/10" }
        ].map((stat, idx) => (
          <Card key={idx} className="bg-card/40 backdrop-blur-xl border-none shadow-2xl rounded-[2rem] hover:ring-2 hover:ring-primary/10 transition-all">
            <CardContent className="p-8 flex items-center gap-6">
              <div className={cn("w-16 h-16 rounded-[1.25rem] flex items-center justify-center transition-transform hover:scale-110 hover:rotate-3", stat.bg, stat.color)}>
                <stat.icon size={32} />
              </div>
              <div>
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-1">{stat.label}</p>
                <h3 className="text-4xl font-black text-foreground tracking-tighter">
                  {isLoading ? "..." : stat.value}
                </h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between bg-card/20 p-6 rounded-[2rem] border border-border/40 backdrop-blur-sm">
        <div className="relative w-full md:w-[450px] group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5 group-focus-within:text-primary transition-colors" />
          <Input 
            placeholder="Filter entities by identifier or geographic node..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-14 h-14 rounded-2xl bg-background/50 border-none focus-visible:ring-2 focus-visible:ring-primary/10 text-base font-medium"
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto no-scrollbar pb-2 md:pb-0">
          <div className="flex items-center gap-2 bg-accent/10 p-1.5 rounded-2xl border border-accent/20">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={cn(
                  "px-5 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all whitespace-nowrap",
                  filterCategory === cat 
                    ? "bg-primary text-white shadow-lg shadow-primary/20 scale-105" 
                    : "text-muted-foreground hover:bg-accent/40 hover:text-foreground"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <Card className="border-none shadow-2xl rounded-[3rem] bg-card/30 backdrop-blur-2xl overflow-hidden border border-white/5">
        <CardContent className="p-0 overflow-x-auto no-scrollbar">
          <Table className="min-w-[1000px]">
            <TableHeader className="bg-accent/20 border-b border-border/50">
              <TableRow className="border-none hover:bg-transparent">
                <TableHead className="px-10 py-7 text-[11px] font-black uppercase tracking-[0.3em] text-muted-foreground">Entity Identifier</TableHead>
                <TableHead className="px-10 py-7 text-[11px] font-black uppercase tracking-[0.3em] text-muted-foreground">Categorization</TableHead>
                <TableHead className="px-10 py-7 text-[11px] font-black uppercase tracking-[0.3em] text-muted-foreground">Geographic Node</TableHead>
                <TableHead className="px-10 py-7 text-[11px] font-black uppercase tracking-[0.3em] text-muted-foreground">Active Vectors</TableHead>
                <TableHead className="px-10 py-7 text-[11px] font-black uppercase tracking-[0.3em] text-muted-foreground text-right">Access Controls</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <AnimatePresence mode="popLayout">
                {isLoading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i} className="border-b border-border/30">
                      <TableCell colSpan={5} className="h-24"><Skeleton className="h-16 w-full rounded-2xl" /></TableCell>
                    </TableRow>
                  ))
                ) : filteredCompanies.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-64 text-center text-muted-foreground font-bold uppercase tracking-widest">No Entities Found</TableCell>
                  </TableRow>
                ) : (
                  filteredCompanies.map((company) => (
                    <motion.tr 
                      key={company.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="group border-b border-border/30 hover:bg-primary/5 transition-all duration-500 ease-out"
                    >
                      <TableCell className="px-10 py-8">
                        <div className="flex items-center gap-6">
                          <div className="w-16 h-16 rounded-[1.25rem] bg-white p-3 shadow-md border-2 border-accent/20 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:border-primary/30">
                            <img src={company.logo} alt={company.name} className="max-h-full max-w-full object-contain" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xl font-black text-foreground tracking-tight group-hover:text-primary transition-colors">{company.name}</span>
                            <span className="text-xs text-muted-foreground font-bold flex items-center gap-2 mt-1 opacity-70">
                              <Globe size={14} className="text-primary" />
                              {company.website}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="px-10 py-8">
                        <Badge variant="outline" className="bg-primary/5 text-primary text-[10px] font-black uppercase tracking-[0.15em] px-4 py-1.5 rounded-full border-primary/20">
                          {company.category}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-10 py-8">
                        <div className="flex items-center gap-2.5 text-sm font-bold text-foreground opacity-80">
                          <MapPin size={16} className="text-rose-500 fill-rose-500/10" />
                          {company.location}
                        </div>
                      </TableCell>
                      <TableCell className="px-10 py-8">
                        <div className="flex flex-col">
                          <span className="text-2xl font-black text-foreground tracking-tighter group-hover:scale-110 origin-left transition-transform duration-300">{company.roles}</span>
                          <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest opacity-60">Open Roles</span>
                        </div>
                      </TableCell>
                      <TableCell className="px-10 py-8 text-right">
                        <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0">
                          <Button variant="outline" size="sm" className="h-11 rounded-xl font-bold px-4 border-2 hover:bg-primary hover:text-white transition-all" asChild>
                            <a href={`https://${company.website}`} target="_blank" rel="noopener noreferrer">
                              <ExternalLink size={16} className="mr-2" />
                              Portal
                            </a>
                          </Button>
                          <Button variant="ghost" size="icon" className="h-11 w-11 rounded-xl hover:bg-accent/40 text-muted-foreground hover:text-foreground border border-transparent hover:border-border/50 transition-all">
                            <MoreVertical size={20} />
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
      
      <div className="mt-8 flex items-center justify-between p-8 bg-card/40 backdrop-blur-xl rounded-[2.5rem] border border-border/30">
        <div className="flex items-center gap-4">
          <div className="flex -space-x-4">
            {[1, 2, 3].map(i => (
              <Avatar key={i} className="border-4 border-card h-12 w-12">
                <AvatarFallback className="bg-primary/10 text-primary font-bold">U{i}</AvatarFallback>
              </Avatar>
            ))}
          </div>
          <p className="text-sm font-bold text-muted-foreground italic">12 new partner requests pending authorization.</p>
        </div>
        <Button variant="link" className="font-black uppercase tracking-widest text-[11px] text-primary hover:no-underline flex items-center gap-2">
          View Permission Queue
          <ChevronRight size={14} />
        </Button>
      </div>
    </div>
  );
}
