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
  ChevronRight,
  Activity
} from "lucide-react";
import { motion } from "framer-motion";
import { apiClient } from "@/services/api";
import { cn } from "@/lib/utils";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";

const StatCard = ({ title, value, icon: Icon, change, trend, isLoading }: any) => (
  <Card className="overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-sm bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-500 rounded-2xl group">
    <CardContent className="p-6">
      <div className="flex justify-between items-start mb-6">
        <div className="size-12 rounded-xl bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:bg-zinc-900 dark:group-hover:bg-zinc-100 group-hover:text-white dark:group-hover:text-zinc-900">
          <Icon size={20} />
        </div>
        {!isLoading ? (
          <div className={cn(
            "flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-pill uppercase tracking-wider", 
            trend === 'up' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
          )}>
            {trend === 'up' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
            {change}
          </div>
        ) : (
          <Skeleton className="h-6 w-14 rounded-pill" />
        )}
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-[11px] font-bold text-muted uppercase tracking-[0.15em]">{title}</p>
        {isLoading ? (
          <Skeleton className="h-9 w-24 mt-1" />
        ) : (
          <h3 className="text-4xl font-headline text-ink tracking-tight">{value}</h3>
        )}
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
    recentActivity: [],
    engagementDensity: 0
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
    <div className="flex flex-col gap-12 pb-12">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 py-10 border-b border-zinc-200 dark:border-zinc-800 relative">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-ink/40 font-bold mb-1">
            <Zap size={12} className="fill-current animate-pulse text-indigo-500" />
            <span className="text-[9px] uppercase tracking-[0.3em]">System Terminal v2.1.0</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-headline tracking-tighter text-ink leading-none">Executive Overview</h1>
          <p className="text-body text-lg max-w-xl font-medium leading-relaxed opacity-70">
            Real-time analytics engine processing hiring trends and platform growth metrics across all global nodes.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" size="lg" className="rounded-pill border-zinc-200 dark:border-zinc-800 font-bold text-[10px] uppercase tracking-widest hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all shadow-sm">
            <Database className="mr-2 size-3.5 opacity-50" />
            Export Logs
          </Button>
          <Button size="lg" className="rounded-pill font-bold text-[10px] uppercase tracking-widest bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:opacity-90 transition-all shadow-xl shadow-zinc-900/10">
            <Plus className="mr-2 size-3.5" />
            New Control Unit
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard 
          title="Total Registered" 
          value={stats.totalUsers.toLocaleString()} 
          icon={Users} 
          change="+12.4%" 
          trend="up" 
          isLoading={isLoading}
        />
        <StatCard 
          title="Active Listings" 
          value={stats.totalJobs.toLocaleString()} 
          icon={Briefcase} 
          change="+5.2%" 
          trend="up" 
          isLoading={isLoading}
        />
        <StatCard 
          title="Partner Nodes" 
          value={stats.totalCompanies.toLocaleString()} 
          icon={Building2} 
          change="+2.1%" 
          trend="up" 
          isLoading={isLoading}
        />
        <StatCard 
          title="System Uptime" 
          value="99.9%" 
          icon={CheckCircle2} 
          change="STABLE" 
          trend="up" 
          isLoading={false}
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Recent Activity Table */}
        <Card className="xl:col-span-2 border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden rounded-2xl bg-white dark:bg-zinc-900 transition-all duration-500 hover:border-zinc-300 dark:hover:border-zinc-700">
          <CardHeader className="flex flex-row items-center justify-between p-8 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/30 dark:bg-zinc-800/30">
            <div className="flex flex-col gap-1">
              <CardTitle className="text-2xl font-headline text-ink">Stream Protocol</CardTitle>
              <CardDescription className="text-body font-medium text-muted">Live audit trail of platform interactions.</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="font-bold text-ink uppercase tracking-[0.2em] text-[10px] hover:bg-canvas-soft rounded-pill px-4">Live View</Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="flex flex-col divide-y divide-hairline">
              {isLoading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="px-8 py-6 flex items-center gap-5 bg-canvas-soft/10">
                    <Skeleton className="size-12 rounded-xl shrink-0" />
                    <div className="flex-1 flex flex-col gap-2">
                      <Skeleton className="h-5 w-1/3" />
                      <Skeleton className="h-3 w-1/4" />
                    </div>
                  </div>
                ))
              ) : stats.recentActivity?.length === 0 ? (
                <div className="p-24 text-center flex flex-col items-center gap-4">
                  <div className="size-16 rounded-full bg-canvas-soft flex items-center justify-center text-muted/20">
                    <Activity size={32} />
                  </div>
                  <p className="text-muted font-bold uppercase tracking-widest text-[10px]">No Activity Recorded in Current Cluster</p>
                </div>
              ) : (
                stats.recentActivity?.map((activity: any) => (
                  <div key={activity.id} className="px-8 py-6 flex items-center justify-between hover:bg-canvas-soft/50 transition-all duration-300 group cursor-pointer border-l-2 border-transparent hover:border-ink">
                    <div className="flex items-center gap-5">
                      <div className="size-12 rounded-xl bg-canvas-soft flex items-center justify-center transition-transform group-hover:scale-110 group-hover:bg-ink group-hover:text-canvas">
                        <Clock size={18} />
                      </div>
                      <div className="flex flex-col">
                        <p className="text-base font-bold text-ink line-clamp-1">{activity.title}</p>
                        <p className="text-xs text-muted font-medium uppercase tracking-wider">{activity.subtitle}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <p className="text-[10px] font-bold text-muted uppercase tracking-widest">{activity.time}</p>
                      <Badge variant="outline" className="bg-ink/5 text-ink border-hairline text-[9px] font-bold uppercase px-3 py-1 rounded-pill">
                        {activity.type}
                      </Badge>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
          <div className="p-6 border-t border-hairline bg-canvas-soft/10 text-center">
            <Button variant="ghost" className="font-bold text-muted hover:text-ink transition-colors text-[10px] uppercase tracking-[0.2em]">Load Archive Clusters</Button>
          </div>
        </Card>

        {/* Platform Insights */}
        <div className="flex flex-col gap-8">
          <Card className="border-none shadow-2xl rounded-[2.5rem] bg-ink text-canvas overflow-hidden relative group min-h-[350px] flex flex-col justify-end">
            <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:rotate-12 transition-transform duration-700 pointer-events-none">
              <Globe size={180} />
            </div>
            <CardContent className="p-10 relative z-10">
              <div className="flex items-center gap-2 mb-10 opacity-60">
                <TrendingUp size={18} />
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Growth Pulse</span>
              </div>
              <div className="flex flex-col gap-2 mb-12">
                <h3 className="text-7xl font-headline tracking-tighter leading-none">
                  {isLoading ? <Skeleton className="h-16 w-32 bg-canvas/20" /> : `${stats.engagementDensity}%`}
                </h3>
                <p className="text-base font-medium opacity-70">Engagement density remains in optimal production parameters.</p>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex justify-between text-[10px] font-bold uppercase opacity-50 tracking-widest">
                  <span>Resource Saturation</span>
                  <span>Target: 100%</span>
                </div>
                <Progress value={stats.engagementDensity || 0} className="h-2.5 bg-canvas/10 [&>div]:bg-canvas" />
              </div>
            </CardContent>
          </Card>

          <Card className="border border-zinc-200 dark:border-zinc-800 shadow-sm rounded-2xl bg-white dark:bg-zinc-900 p-2 transition-all hover:border-zinc-300 dark:hover:border-zinc-700 overflow-hidden">
            <CardHeader className="p-8 pb-4">
              <CardTitle className="text-xl font-headline text-ink">Control Panel</CardTitle>
              <CardDescription className="text-[11px] font-bold text-muted uppercase tracking-widest">Administrative Overrides</CardDescription>
            </CardHeader>
            <CardContent className="p-4 flex flex-col gap-2">
              <Button className="w-full justify-between h-14 rounded-xl group px-5 bg-zinc-50 dark:bg-zinc-800/50 hover:bg-zinc-900 dark:hover:bg-zinc-100 hover:text-white dark:hover:text-zinc-900 border-none transition-all shadow-none" variant="ghost">
                <div className="flex items-center">
                  <div className="size-9 rounded-lg bg-white dark:bg-white/5 flex items-center justify-center mr-4 shadow-sm group-hover:bg-white/20 transition-colors">
                    <Database className="size-4 text-ink group-hover:text-canvas transition-colors" />
                  </div>
                  <span className="font-bold text-[11px] uppercase tracking-widest">Sync Data Clusters</span>
                </div>
                <ChevronRight size={14} className="opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </Button>
              <Button className="w-full justify-between h-14 rounded-xl group px-5 bg-canvas-soft hover:bg-ink hover:text-canvas border-none transition-all shadow-none" variant="ghost">
                <div className="flex items-center">
                   <div className="size-9 rounded-lg bg-white dark:bg-white/5 flex items-center justify-center mr-4 shadow-sm group-hover:bg-white/20 transition-colors">
                    <Users className="size-4 text-ink group-hover:text-canvas transition-colors" />
                  </div>
                  <span className="font-bold text-[11px] uppercase tracking-widest">Audit User Access</span>
                </div>
                <ChevronRight size={14} className="opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </Button>
              <Button className="w-full justify-between h-14 rounded-xl group px-5 bg-canvas-soft hover:bg-ink hover:text-canvas border-none transition-all shadow-none" variant="ghost">
                <div className="flex items-center">
                   <div className="size-9 rounded-lg bg-white dark:bg-white/5 flex items-center justify-center mr-4 shadow-sm group-hover:bg-white/20 transition-colors">
                    <AlertCircle className="size-4 text-ink group-hover:text-canvas transition-colors" />
                  </div>
                  <span className="font-bold text-[11px] uppercase tracking-widest">System Manifest</span>
                </div>
                <ChevronRight size={14} className="opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
