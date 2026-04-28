"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Calendar, Send, Users, Bookmark, Eye, 
  ArrowUp, ArrowDown, Minus, MoreVertical, Sparkles,
  Briefcase, Bell, Zap
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/fade-in";
import { useAuth, useAppliedJobs, useSavedJobs, useNotifications } from "@/context";
import { dashboardService, DashboardStats } from "@/services/dashboard.service";
import { jobsService } from "@/services/jobs.service";
import { Job } from "@/types";

export default function DashboardPage() {
  const { user } = useAuth();
  const { count: appliedCount, appliedJobs } = useAppliedJobs();
  const { count: savedCount } = useSavedJobs();
  const { notifications } = useNotifications();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recommendedJobs, setRecommendedJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    async function loadData() {
      try {
        const [statsData, jobsData] = await Promise.all([
          dashboardService.getStats(),
          jobsService.getJobs({ pageSize: 2 })
        ]);
        setStats(statsData);
        setRecommendedJobs(jobsData.data || []);
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  if (!mounted) return null;

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <Skeleton className="h-10 w-64" />
            <Skeleton className="h-4 w-48" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => (
            <Card key={i} className="border-2 border-[var(--border)] shadow-sm bg-white dark:bg-white/5">
              <CardContent className="p-5 flex flex-col justify-between h-full">
                <div className="flex justify-between items-start mb-4">
                  <Skeleton className="w-10 h-10 rounded-lg" />
                  <Skeleton className="w-12 h-4" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-8 w-16" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card className="shadow-sm bg-white dark:bg-white/5 border-2 border-[var(--border)]">
              <CardContent className="p-0">
                <div className="p-6 border-b-2 border-[var(--border)] flex justify-between items-center">
                  <Skeleton className="h-6 w-40" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <div className="p-6 space-y-4">
                  {[1, 2, 3].map(i => <Skeleton key={i} className="h-12 w-full" />)}
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="space-y-8">
            <Card className="shadow-sm bg-white dark:bg-white/5 border-2 border-[var(--border)]">
              <CardContent className="p-6 space-y-4">
                <Skeleton className="h-6 w-48 mb-6" />
                {[1, 2].map(i => <Skeleton key={i} className="h-24 w-full rounded-xl" />)}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  const statCards = [
    { 
      title: "Total Applications", 
      value: appliedCount,
      change: "+0%", 
      color: "text-[#678D63]", 
      bg: "bg-[#678D63]/10", 
      icon: <Send className="w-5 h-5" />,
      neutral: true,
      href: "/applied-jobs"
    },
    { 
      title: "Saved Jobs", 
      value: savedCount,
      change: "+0%", 
      color: "text-[#88A682]", 
      bg: "bg-[#88A682]/10", 
      icon: <Bookmark className="w-5 h-5" />, 
      neutral: true,
      href: "/saved-jobs"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Area */}
      <FadeIn direction="down" delay={0.1}>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold font-headline text-[var(--text-primary)] mb-2">
              Welcome back, {user?.name?.split(' ')[0] || 'User'}!
            </h1>
            <p className="text-[var(--text-secondary)] font-medium">
              Here's what's happening with your job search today.
            </p>
          </div>

        </div>
      </FadeIn>

      {/* Stat Cards */}
      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {statCards.map((stat, i) => (
          <StaggerItem key={i}>
            <Link href={stat.href}>
              <Card className="border-2 border-[var(--border)] shadow-sm hover:shadow-premium-sm transition-all hover:-translate-y-1 duration-300 bg-white dark:bg-white/5 cursor-pointer">
                <CardContent className="p-5 flex flex-col justify-between h-full">
                  <div className="flex justify-between items-start mb-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.bg} ${stat.color}`}>
                      {stat.icon}
                    </div>
                    <span className={`flex items-center gap-1 text-xs font-bold ${stat.neutral ? 'text-gray-400' : 'text-[#678D63]'}`}>
                      {stat.change} <Minus className="w-3 h-3" />
                    </span>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-[var(--text-secondary)] mb-1">{stat.title}</h3>
                    <p className="text-3xl font-bold font-headline">{stat.value}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (Tables & Activity) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Application Status — from localStorage context */}
          {appliedJobs.length > 0 ? (
            <FadeIn delay={0.4} direction="up">
              <Card className="shadow-sm bg-white dark:bg-white/5 overflow-hidden border-2 border-[var(--border)]">
                <CardContent className="p-0">
                  <div className="p-6 border-b-2 border-[var(--border)] flex justify-between items-center">
                    <h3 className="text-lg font-bold font-headline">Applied Jobs</h3>
                    <Link href="/applied-jobs" className="text-sm font-bold text-[var(--primary)] hover:underline">View All</Link>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead className="text-[11px] uppercase tracking-wider text-[var(--text-muted)] bg-[var(--bg-base)]">
                        <tr>
                          <th className="px-6 py-4 font-bold">Company</th>
                          <th className="px-6 py-4 font-bold">Position</th>
                          <th className="px-6 py-4 font-bold">Status</th>
                          <th className="px-6 py-4 font-bold">Applied</th>
                          <th className="px-6 py-4 font-bold text-right"></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y-2 divide-[var(--border)]">
                        {appliedJobs.slice(0, 5).map((app, i) => (
                          <tr key={i} className="hover:bg-[var(--bg-base)] transition-colors group">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded bg-[var(--bg-base)] border-2 border-[var(--border)] flex items-center justify-center font-bold text-xs group-hover:border-[var(--primary)] transition-colors">
                                  {app.company.charAt(0)}
                                </div>
                                <span className="font-semibold group-hover:text-[var(--primary)] transition-colors">{app.company}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-[var(--text-secondary)] font-medium line-clamp-1 max-w-[200px]">{app.title}</td>
                            <td className="px-6 py-4">
                              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#678D63]/10 text-[#166534] capitalize">
                                {app.status.replace("_", " ")}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-[var(--text-secondary)]">
                              {new Date(app.appliedAt).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 text-right">
                              <Link href={`/jobs/${app.job_id}`} className="text-xs font-bold text-[var(--primary)] hover:underline">
                                View →
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          ) : (
            <FadeIn delay={0.4} direction="up">
              <Card className="shadow-sm bg-white dark:bg-white/5 p-8 border-2 border-dashed border-[var(--border)] flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-[var(--bg-base)] rounded-full flex items-center justify-center mb-4">
                  <Briefcase className="w-8 h-8 text-[var(--text-muted)]" />
                </div>
                <h3 className="text-xl font-bold mb-2">No applications yet</h3>
                <p className="text-[var(--text-secondary)] mb-6 max-w-md">Start applying to jobs to track your progress here. Your application status will appear once you've applied.</p>
                <Link href="/search">
                  <Button className="bg-[var(--primary)] text-white px-8">Find Jobs</Button>
                </Link>
              </Card>
            </FadeIn>
          )}

          {/* Profile Strength - Moved here for better mobile flow if desired, or keep as card */}
        </div>

        {/* Right Column (Sidebar cards) */}
        <div className="space-y-8">
          
          {/* Recent Activity / Notifications */}
          <FadeIn delay={0.6} direction="left">
            <Card className="shadow-sm bg-white dark:bg-white/5 border-2 border-[var(--border)] mb-8">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold font-headline flex items-center gap-2">
                    <Bell className="w-5 h-5 text-[var(--primary)]" /> Recent Activity
                  </h3>
                  <Link href="/notifications" className="text-xs font-bold text-[var(--primary)] hover:underline">View All</Link>
                </div>
                <div className="space-y-4">
                  {notifications.slice(0, 3).map((notif) => (
                    <div key={notif.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-[var(--bg-base)] transition-colors group">
                      <div className="w-8 h-8 rounded-lg bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Zap className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-[var(--text-primary)] truncate">{notif.title}</p>
                        <p className="text-xs text-[var(--text-muted)] line-clamp-2">{notif.description}</p>
                        <p className="text-[10px] text-[var(--text-muted)] mt-1">{notif.time || "Just now"}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </FadeIn>



          {/* Profile Strength */}
          <FadeIn delay={0.7} direction="up">
            <Card className="bg-gradient-to-br from-[#678D63] to-[#166534] text-white border-none shadow-md overflow-hidden relative group cursor-pointer hover:shadow-lg transition-shadow duration-300">
              <div className="absolute -right-4 -bottom-4 opacity-10 pointer-events-none group-hover:scale-110 group-hover:rotate-12 transition-transform duration-700">
                <Sparkles className="w-32 h-32" />
              </div>
              <CardContent className="p-6 relative z-10">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold font-headline text-lg">Profile Strength</h3>
                  <Badge className="bg-white/20 hover:bg-white/30 text-white border-none font-bold transition-colors duration-300">Excellent</Badge>
                </div>
                <p className="text-sm text-green-100 mb-6">Complete your profile to stand out to employers.</p>
                
                <div className="w-full bg-black/30 rounded-full h-2 mb-2">
                  <div className="bg-white h-2 rounded-full w-[92%]"></div>
                </div>
                <div className="flex justify-between text-xs text-green-200 font-medium">
                  <span>92% Complete</span>
                  <Link href="/profile" className="text-white hover:underline font-bold">Improve profile</Link>
                </div>
              </CardContent>
            </Card>
          </FadeIn>

        </div>
      </div>
    </div>
  );
}
