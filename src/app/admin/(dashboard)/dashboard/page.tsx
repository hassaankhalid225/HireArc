"use client";
import React, { useEffect, useState } from "react";
import { 
  Users, 
  Briefcase, 
  Building2, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Zap,
  Globe,
  Database
} from "lucide-react";
import { motion } from "framer-motion";
import { apiClient } from "@/services/api";
import { cn } from "@/lib/utils";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const StatCard = ({ title, value, icon: Icon, change, trend, color }: any) => (
  <Card className="overflow-hidden border-none shadow-xl bg-card/40 backdrop-blur-md group hover:ring-2 hover:ring-primary/20 transition-all duration-300">
    <CardContent className="p-6">
      <div className="flex justify-between items-start mb-6">
        <div className={cn("p-3 rounded-2xl bg-primary/10 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3", color.replace('bg-', 'text-'))}>
          <Icon size={24} />
        </div>
        <div className={cn("flex items-center gap-1 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-tighter", trend === 'up' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500')}>
          {trend === 'up' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
          {change}
        </div>
      </div>
      <div>
        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">{title}</p>
        <h3 className="text-4xl font-black tracking-tighter text-foreground">{value}</h3>
      </div>
    </CardContent>
    <div className={cn("h-1 w-full opacity-30", color)} />
  </Card>
);

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalJobs: 0,
    totalCompanies: 0,
    activeJobs: 0,
    recentApplications: []
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await apiClient.get<any>("/stats/overview");
        setStats(response);
      } catch (error) {
        console.error("Failed to fetch admin stats:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchStats();
  }, []);

  return (
    <div className="space-y-10 pb-10">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-accent/20 p-8 rounded-[2rem] border border-accent/30 shadow-inner">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary font-bold mb-2">
            <Zap size={18} className="fill-primary" />
            <span className="text-xs uppercase tracking-[0.2em]">System Terminal v2.1</span>
          </div>
          <h1 className="text-4xl font-black tracking-tight text-foreground lg:text-5xl">Executive Overview</h1>
          <p className="text-muted-foreground font-medium text-lg max-w-2xl">
            Real-time analytics engine processing hiring trends and platform growth metrics across all global nodes.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" className="rounded-2xl h-14 px-6 border-2 font-bold hover:bg-background shadow-lg">
            <Database className="mr-2 h-4 w-4" />
            Export Logs
          </Button>
          <Button className="rounded-2xl h-14 px-8 font-black shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all">
            <Plus className="mr-2 h-5 w-5" />
            New Control Unit
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard 
          title="Total Registered" 
          value={isLoading ? "..." : stats.totalUsers} 
          icon={Users} 
          change="+12.4%" 
          trend="up" 
          color="bg-blue-500" 
        />
        <StatCard 
          title="Active Listings" 
          value={isLoading ? "..." : stats.totalJobs} 
          icon={Briefcase} 
          change="+5.2%" 
          trend="up" 
          color="bg-violet-500" 
        />
        <StatCard 
          title="Partner Nodes" 
          value={isLoading ? "..." : stats.totalCompanies} 
          icon={Building2} 
          change="+2.1%" 
          trend="up" 
          color="bg-amber-500" 
        />
        <StatCard 
          title="System Uptime" 
          value="99.9%" 
          icon={CheckCircle2} 
          change="STABLE" 
          trend="up" 
          color="bg-emerald-500" 
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Recent Activity Table */}
        <Card className="xl:col-span-2 border-none shadow-2xl overflow-hidden rounded-[2.5rem] bg-card/40 backdrop-blur-lg">
          <CardHeader className="flex flex-row items-center justify-between p-8 border-b bg-accent/5">
            <div className="space-y-1">
              <CardTitle className="text-2xl font-black tracking-tight">Stream Protocol</CardTitle>
              <CardDescription className="font-medium">Live audit trail of platform interactions.</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="font-black text-primary uppercase tracking-widest text-[10px]">Live View</Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border/50">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="px-8 py-6 flex items-center justify-between hover:bg-primary/5 transition-all duration-300 group cursor-pointer">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-accent/40 flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-2">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-base font-bold text-foreground">Cloud Architecture Sync</p>
                      <p className="text-xs text-muted-foreground font-medium">Automatic ingest from Partner API • 5.2s execution</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">2m ago</p>
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 text-[9px] font-black uppercase px-2">
                      Verified
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-6 bg-accent/5 text-center">
              <Button variant="link" className="font-bold text-muted-foreground hover:text-primary transition-colors">Load Archive Clusters</Button>
            </div>
          </CardContent>
        </Card>

        {/* Platform Insights */}
        <div className="space-y-8">
          <Card className="border-none shadow-2xl rounded-[2.5rem] bg-primary text-primary-foreground overflow-hidden relative group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-700">
              <Globe size={120} />
            </div>
            <CardContent className="p-10 relative z-10">
              <div className="flex items-center gap-2 mb-8 opacity-80">
                <TrendingUp size={18} />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Growth Pulse</span>
              </div>
              <div className="space-y-2 mb-10">
                <h3 className="text-6xl font-black tracking-tighter">94.8%</h3>
                <p className="text-base font-bold opacity-80">Engagement density remains optimal.</p>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-[10px] font-black uppercase opacity-60">
                  <span>Resource Saturation</span>
                  <span>Target: 100%</span>
                </div>
                <Progress value={94.8} className="h-3 bg-white/20" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-2xl rounded-[2.5rem] bg-card/40 backdrop-blur-lg p-8">
            <CardHeader className="p-0 mb-8">
              <CardTitle className="text-xl font-black">Control Panel</CardTitle>
              <CardDescription className="font-medium">Immediate administrative overrides.</CardDescription>
            </CardHeader>
            <CardContent className="p-0 space-y-3">
              <Button className="w-full justify-between h-14 rounded-2xl group px-5 bg-accent/20 hover:bg-primary hover:text-white border-none transition-all" variant="ghost">
                <div className="flex items-center">
                  <Briefcase className="mr-4 h-5 w-5 text-primary group-hover:text-white transition-colors" />
                  <span className="font-bold">Sync Data Clusters</span>
                </div>
                <ChevronRightIcon size={16} className="opacity-40 group-hover:opacity-100" />
              </Button>
              <Button className="w-full justify-between h-14 rounded-2xl group px-5 bg-accent/20 hover:bg-primary hover:text-white border-none transition-all" variant="ghost">
                <div className="flex items-center">
                  <Users className="mr-4 h-5 w-5 text-primary group-hover:text-white transition-colors" />
                  <span className="font-bold">Audit User Access</span>
                </div>
                <ChevronRightIcon size={16} className="opacity-40 group-hover:opacity-100" />
              </Button>
              <Button className="w-full justify-between h-14 rounded-2xl group px-5 bg-accent/20 hover:bg-primary hover:text-white border-none transition-all" variant="ghost">
                <AlertCircle className="mr-4 h-5 w-5 text-primary group-hover:text-white transition-colors" />
                <span className="font-bold">System Manifest</span>
                <ChevronRightIcon size={16} className="opacity-40 group-hover:opacity-100" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
