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
  ArrowDownRight
} from "lucide-react";
import { motion } from "framer-motion";
import { apiClient } from "@/services/api";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

const StatCard = ({ title, value, icon: Icon, change, trend, color }: any) => (
  <Card className="overflow-hidden border-none shadow-md bg-card/50 backdrop-blur-sm">
    <CardContent className="p-6">
      <div className="flex justify-between items-start mb-4">
        <div className={cn("p-2.5 rounded-xl bg-primary/10", color.replace('bg-', 'text-'))}>
          <Icon size={24} />
        </div>
        <div className={cn("flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full", trend === 'up' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500')}>
          {trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {change}
        </div>
      </div>
      <div>
        <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
        <h3 className="text-3xl font-bold tracking-tight">{value}</h3>
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
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Admin Overview</h1>
          <p className="text-muted-foreground mt-1 text-lg">Welcome back! Monitoring HireArc system health and growth metrics.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-xl">Download Report</Button>
          <Button className="rounded-xl">Manage System</Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Users" 
          value={isLoading ? "..." : stats.totalUsers} 
          icon={Users} 
          change="+12%" 
          trend="up" 
          color="bg-blue-500" 
        />
        <StatCard 
          title="Total Jobs" 
          value={isLoading ? "..." : stats.totalJobs} 
          icon={Briefcase} 
          change="+5.2%" 
          trend="up" 
          color="bg-violet-500" 
        />
        <StatCard 
          title="Companies" 
          value={isLoading ? "..." : stats.totalCompanies} 
          icon={Building2} 
          change="+2%" 
          trend="up" 
          color="bg-amber-500" 
        />
        <StatCard 
          title="Active Jobs" 
          value={isLoading ? "..." : stats.activeJobs} 
          icon={CheckCircle2} 
          change="-1.5%" 
          trend="down" 
          color="bg-emerald-500" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <Card className="lg:col-span-2 border-none shadow-lg overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b bg-accent/5">
            <div>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest system events and audit logs.</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="font-bold text-primary">View All</Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="px-6 py-5 flex items-center justify-between hover:bg-accent/30 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center">
                      <Clock className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-bold">New Job Posted</p>
                      <p className="text-xs text-muted-foreground">Frontend Engineer at TechCorp</p>
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-end gap-2">
                    <p className="text-xs font-medium text-muted-foreground">2 mins ago</p>
                    <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20 text-[10px] font-bold uppercase tracking-wider">
                      Auto-Approved
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions & Platform Health */}
        <div className="space-y-8">
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Frequently used administrative tools.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start h-12 rounded-xl group" variant="outline">
                <Briefcase className="mr-3 h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
                Post New Job
              </Button>
              <Button className="w-full justify-start h-12 rounded-xl group" variant="outline">
                <Users className="mr-3 h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
                Review New Users
              </Button>
              <Button className="w-full justify-start h-12 rounded-xl group" variant="outline">
                <AlertCircle className="mr-3 h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
                System Logs
              </Button>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg bg-primary text-primary-foreground">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4 opacity-80">
                <TrendingUp size={18} />
                <span className="text-xs font-bold uppercase tracking-widest">Platform Health</span>
              </div>
              <div className="space-y-1 mb-6">
                <h3 className="text-4xl font-extrabold tracking-tighter">98.2%</h3>
                <p className="text-sm opacity-80 font-medium">Optimal performance active.</p>
              </div>
              <div className="h-1.5 w-full bg-primary-foreground/20 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "98.2%" }}
                  className="h-full bg-primary-foreground"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
