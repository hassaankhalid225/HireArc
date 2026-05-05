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
  Database,
  ChevronRight
} from "lucide-react";
import { motion } from "framer-motion";
import { apiClient } from "@/services/api";
import { cn } from "@/lib/utils";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const StatCard = ({ title, value, icon: Icon, change, trend }: any) => (
  <Card className="overflow-hidden border border-hairline shadow-premium-sm bg-surface-card hover:border-hairline-strong transition-all duration-300 rounded-xl">
    <CardContent className="p-6">
      <div className="flex justify-between items-start mb-6">
        <div className="p-3 rounded-xl bg-canvas-soft text-ink transition-transform duration-300 group-hover:scale-110">
          <Icon size={20} />
        </div>
        <div className={cn(
          "flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-pill uppercase tracking-wider", 
          trend === 'up' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
        )}>
          {trend === 'up' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
          {change}
        </div>
      </div>
      <div>
        <p className="text-[11px] font-bold text-muted uppercase tracking-[0.1em] mb-1">{title}</p>
        <h3 className="text-3xl font-headline text-ink">{value}</h3>
      </div>
    </CardContent>
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
    <div className="space-y-12 pb-12">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 py-10 border-b border-hairline">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-ink/40 font-bold mb-1">
            <Zap size={12} className="fill-current" />
            <span className="text-[9px] uppercase tracking-[0.25em]">System Terminal v2.1</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-headline tracking-tighter text-ink leading-[0.9]">Executive Overview</h1>
          <p className="text-body text-base max-w-xl font-medium leading-relaxed opacity-70">
            Real-time analytics engine processing hiring trends and platform growth metrics across all global nodes.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" className="rounded-pill h-11 px-6 border-hairline font-bold text-[10px] uppercase tracking-widest hover:bg-canvas-soft transition-all shadow-sm">
            <Database className="mr-2 h-3.5 w-3.5 opacity-50" />
            Export Logs
          </Button>
          <Button className="rounded-pill h-11 px-7 font-bold text-[10px] uppercase tracking-widest bg-ink text-canvas hover:opacity-90 transition-all shadow-lg shadow-ink/10">
            <Plus className="mr-2 h-3.5 w-3.5" />
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
        />
        <StatCard 
          title="Active Listings" 
          value={isLoading ? "..." : stats.totalJobs} 
          icon={Briefcase} 
          change="+5.2%" 
          trend="up" 
        />
        <StatCard 
          title="Partner Nodes" 
          value={isLoading ? "..." : stats.totalCompanies} 
          icon={Building2} 
          change="+2.1%" 
          trend="up" 
        />
        <StatCard 
          title="System Uptime" 
          value="99.9%" 
          icon={CheckCircle2} 
          change="STABLE" 
          trend="up" 
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Recent Activity Table */}
        <Card className="xl:col-span-2 border border-hairline shadow-premium-sm overflow-hidden rounded-xl bg-surface-card transition-all duration-300 hover:border-hairline-strong">
          <CardHeader className="flex flex-row items-center justify-between p-8 border-b border-hairline bg-canvas-soft/30">
            <div className="space-y-1">
              <CardTitle className="text-2xl font-headline text-ink">Stream Protocol</CardTitle>
              <CardDescription className="text-body font-medium">Live audit trail of platform interactions.</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="font-bold text-ink uppercase tracking-[0.2em] text-[10px] hover:bg-canvas-soft rounded-pill px-4">Live View</Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-hairline">
              {isLoading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="px-8 py-6 animate-pulse bg-canvas-soft/50 h-24" />
                ))
              ) : stats.recentActivity?.length === 0 ? (
                <div className="p-20 text-center text-muted font-bold uppercase tracking-widest text-xs">No Activity Recorded</div>
              ) : (
                stats.recentActivity?.map((activity: any) => (
                  <div key={activity.id} className="px-8 py-6 flex items-center justify-between hover:bg-canvas-soft/50 transition-all duration-300 group cursor-pointer">
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 rounded-xl bg-canvas-soft flex items-center justify-center transition-transform group-hover:scale-110">
                        <Clock className="w-5 h-5 text-ink" />
                      </div>
                      <div>
                        <p className="text-base font-bold text-ink line-clamp-1">{activity.title}</p>
                        <p className="text-xs text-body font-medium">{activity.subtitle}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <p className="text-[10px] font-bold text-muted uppercase tracking-widest">{activity.time}</p>
                      <Badge variant="outline" className="bg-ink/5 text-ink border-hairline text-[9px] font-bold uppercase px-2 rounded-pill">
                        {activity.type}
                      </Badge>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="p-6 bg-canvas-soft/20 text-center">
              <Button variant="link" className="font-bold text-muted hover:text-ink transition-colors text-xs uppercase tracking-widest">Load Archive Clusters</Button>
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
                <h3 className="text-6xl font-black tracking-tighter">
                  {isLoading ? "..." : `${stats.engagementDensity}%`}
                </h3>
                <p className="text-base font-bold opacity-80">Engagement density remains optimal.</p>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-[10px] font-black uppercase opacity-60">
                  <span>Resource Saturation</span>
                  <span>Target: 100%</span>
                </div>
                <Progress value={stats.engagementDensity || 0} className="h-3 bg-white/20" />
              </div>
            </CardContent>
          </Card>

          <Card className="border border-hairline shadow-premium-sm rounded-xl bg-surface-card p-8 transition-all hover:border-hairline-strong">
            <CardHeader className="p-0 mb-8">
              <CardTitle className="text-xl font-headline text-ink">Control Panel</CardTitle>
              <CardDescription className="text-body font-medium">Immediate administrative overrides.</CardDescription>
            </CardHeader>
            <CardContent className="p-0 space-y-3">
              <Button className="w-full justify-between h-14 rounded-xl group px-5 bg-canvas-soft hover:bg-ink hover:text-canvas border-none transition-all" variant="ghost">
                <div className="flex items-center">
                  <Briefcase className="mr-4 h-5 w-5 text-ink group-hover:text-canvas transition-colors" />
                  <span className="font-bold">Sync Data Clusters</span>
                </div>
                <ChevronRight size={16} className="opacity-40 group-hover:opacity-100" />
              </Button>
              <Button className="w-full justify-between h-14 rounded-xl group px-5 bg-canvas-soft hover:bg-ink hover:text-canvas border-none transition-all" variant="ghost">
                <div className="flex items-center">
                  <Users className="mr-4 h-5 w-5 text-ink group-hover:text-canvas transition-colors" />
                  <span className="font-bold">Audit User Access</span>
                </div>
                <ChevronRight size={16} className="opacity-40 group-hover:opacity-100" />
              </Button>
              <Button className="w-full justify-between h-14 rounded-xl group px-5 bg-canvas-soft hover:bg-ink hover:text-canvas border-none transition-all" variant="ghost">
                <div className="flex items-center">
                  <AlertCircle className="mr-4 h-5 w-5 text-ink group-hover:text-canvas transition-colors" />
                  <span className="font-bold">System Manifest</span>
                </div>
                <ChevronRight size={16} className="opacity-40 group-hover:opacity-100" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
