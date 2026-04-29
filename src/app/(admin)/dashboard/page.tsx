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

const StatCard = ({ title, value, icon: Icon, change, trend, color }: any) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-white dark:bg-[#1E293B] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all"
  >
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-xl ${color} bg-opacity-10`}>
        <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
      </div>
      <div className={`flex items-center gap-1 text-sm font-medium ${trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}>
        {trend === 'up' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
        {change}
      </div>
    </div>
    <div>
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">{title}</p>
      <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{value}</h3>
    </div>
  </motion.div>
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
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Admin Overview</h1>
        <p className="text-slate-500 dark:text-slate-400">Welcome back! Here's what's happening with JobSphere today.</p>
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
        <div className="lg:col-span-2 bg-white dark:bg-[#1E293B] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
            <h3 className="font-bold text-slate-900 dark:text-white">Recent Activity</h3>
            <button className="text-sm font-medium text-primary hover:underline">View All</button>
          </div>
          <div className="p-0">
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-slate-500" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">New Job Posted</p>
                      <p className="text-xs text-slate-500">Frontend Engineer at TechCorp</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-medium text-slate-400">2 mins ago</p>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-600 uppercase tracking-wider">
                      Auto-Approved
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-[#1E293B] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
          <h3 className="font-bold text-slate-900 dark:text-white mb-6">Quick Actions</h3>
          <div className="space-y-4">
            <button className="w-full flex items-center gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-primary hover:text-white transition-all group">
              <div className="p-2 rounded-lg bg-white dark:bg-slate-700 group-hover:bg-white/20">
                <Briefcase className="w-5 h-5 text-primary group-hover:text-white" />
              </div>
              <span className="font-semibold text-sm">Post New Job</span>
            </button>
            <button className="w-full flex items-center gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-primary hover:text-white transition-all group">
              <div className="p-2 rounded-lg bg-white dark:bg-slate-700 group-hover:bg-white/20">
                <Users className="w-5 h-5 text-primary group-hover:text-white" />
              </div>
              <span className="font-semibold text-sm">Review New Users</span>
            </button>
            <button className="w-full flex items-center gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-primary hover:text-white transition-all group">
              <div className="p-2 rounded-lg bg-white dark:bg-slate-700 group-hover:bg-white/20">
                <AlertCircle className="w-5 h-5 text-primary group-hover:text-white" />
              </div>
              <span className="font-semibold text-sm">System Logs</span>
            </button>
          </div>

          <div className="mt-8 p-4 bg-primary/5 rounded-2xl border border-primary/10">
            <div className="flex items-center gap-2 text-primary mb-2">
              <TrendingUp size={18} />
              <span className="text-xs font-bold uppercase tracking-wider">Platform Health</span>
            </div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white mb-1">98.2%</p>
            <p className="text-xs text-slate-500">System is performing optimally across all nodes.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
