"use client";
import React, { useEffect, useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  Database, 
  Activity, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  ArrowRight,
  TrendingUp,
  Building2,
  Box,
  RefreshCw,
  Zap
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { apiClient } from "@/services/api";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ScrapingLog {
  id: string;
  timestamp: string;
  status: string;
  total_jobs: number;
  company_stats: Record<string, number>;
  duration?: string;
}

export default function ScrapingLogs() {
  const [logs, setLogs] = useState<ScrapingLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchLogs = async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.get<ScrapingLog[]>("/admin/scraping-logs");
      setLogs(response || []);
    } catch (error) {
      console.error("Failed to fetch logs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const lastLog = logs[0];

  return (
    <div className="flex flex-col gap-12 pb-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 py-10 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-ink/40 font-bold mb-1">
            <Activity size={12} className="fill-current animate-pulse text-indigo-500" />
            <span className="text-[9px] uppercase tracking-[0.3em]">System Pulse Protocol</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-headline tracking-tighter text-ink leading-none">Scraping Logs</h1>
          <p className="text-body text-lg max-w-xl font-medium leading-relaxed opacity-70">Audit trail of automated ingestion cycles and corporate node synchronization history.</p>
        </div>
        <div className="shrink-0">
          <Button 
            variant="outline" 
            size="icon-lg"
            onClick={fetchLogs}
            className="rounded-full border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-100 transition-all shadow-sm group"
          >
            <RefreshCw size={20} className={cn("transition-transform duration-700", isLoading && "animate-spin")} />
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { 
            label: "Last Sync Status", 
            value: lastLog?.status || "Unknown", 
            icon: CheckCircle2, 
            sub: lastLog ? new Date(lastLog.timestamp).toLocaleString() : "Never",
            status: lastLog?.status === "Success" ? "stable" : "alert"
          },
          { 
            label: "Vectors Ingested", 
            value: lastLog?.total_jobs || 0, 
            icon: Box, 
            sub: "Total unique records fetched" 
          },
          { 
            label: "Corporate Nodes", 
            value: lastLog ? Object.keys(lastLog.company_stats).length : 0, 
            icon: Building2, 
            sub: "Sources tracked in last cycle" 
          }
        ].map((stat, idx) => (
          <Card key={idx} className="overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-sm bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-500 rounded-2xl group">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-8">
                <div className="size-12 rounded-2xl bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:bg-zinc-900 dark:group-hover:bg-zinc-100 group-hover:text-white dark:group-hover:text-zinc-900 shadow-sm">
                  <stat.icon size={24} />
                </div>
                <div className="flex flex-col items-end">
                    <TrendingUp size={16} className="text-ink/10 group-hover:text-indigo-500/40 transition-colors" />
                    {stat.status === "stable" && <span className="text-[8px] font-black text-emerald-500 bg-emerald-500/5 px-1.5 py-0.5 rounded border border-emerald-500/10 uppercase tracking-widest mt-2">Verified</span>}
                </div>
              </div>
              <p className="text-[10px] font-bold text-muted uppercase tracking-[0.2em] mb-2">{stat.label}</p>
              <h3 className="text-4xl font-headline text-ink leading-none tracking-tight">
                {isLoading ? <Skeleton className="h-9 w-24" /> : stat.value}
              </h3>
              <p className="text-[10px] text-muted mt-4 flex items-center gap-2 font-bold uppercase tracking-widest opacity-60">
                <Clock size={12} className="opacity-40" /> {stat.sub}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Logs Table */}
      <Card className="border border-zinc-200 dark:border-zinc-800 shadow-sm rounded-2xl bg-white dark:bg-zinc-900 overflow-hidden transition-all duration-500 hover:border-zinc-300 dark:hover:border-zinc-700">
        <CardHeader className="px-8 py-8 bg-zinc-50/30 dark:bg-zinc-800/30 border-b border-zinc-200 dark:border-zinc-800 flex flex-row items-center justify-between">
          <div className="flex flex-col gap-1">
            <CardTitle className="text-2xl font-headline text-ink flex items-center gap-3 leading-none">
              <Database size={20} className="text-ink/40" />
              Cycle History
            </CardTitle>
            <CardDescription className="text-body font-medium text-muted">Raw stream of ingestion metadata and node synchronization events.</CardDescription>
          </div>
          <Badge variant="outline" className="bg-indigo-500/5 text-indigo-600 border-indigo-500/10 text-[9px] font-black uppercase px-4 py-1.5 rounded-pill shadow-sm">
            Live Stream Active
          </Badge>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto no-scrollbar">
          <Table className="min-w-[1000px]">
            <TableHeader className="bg-zinc-50/50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800">
              <TableRow className="border-none hover:bg-transparent">
                <TableHead className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.3em] text-muted">Timestamp</TableHead>
                <TableHead className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.3em] text-muted">Auth State</TableHead>
                <TableHead className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.3em] text-muted">Payload Density</TableHead>
                <TableHead className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.3em] text-muted">Node Distribution Matrix</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <AnimatePresence mode="popLayout">
                {isLoading ? (
                  Array.from({ length: 6 }).map((_, i) => (
                    <TableRow key={i} className="border-b border-hairline/50">
                      <TableCell className="px-8 py-6">
                        <div className="flex flex-col gap-2">
                          <Skeleton className="h-5 w-32" />
                          <Skeleton className="h-3 w-20" />
                        </div>
                      </TableCell>
                      <TableCell className="px-8 py-6"><Skeleton className="h-7 w-24 rounded-pill" /></TableCell>
                      <TableCell className="px-8 py-6"><Skeleton className="h-6 w-16" /></TableCell>
                      <TableCell className="px-8 py-6"><Skeleton className="h-6 w-full max-w-sm rounded-lg" /></TableCell>
                    </TableRow>
                  ))
                ) : logs.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="h-96 text-center">
                      <div className="flex flex-col items-center justify-center gap-6 opacity-20 group">
                        <div className="size-20 rounded-full bg-canvas-soft flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                          <Database size={48} />
                        </div>
                        <p className="text-sm font-bold tracking-[0.25em] uppercase">No Ingestion Logs Found in Registry</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  logs.map((log) => (
                    <motion.tr 
                      key={log.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="group border-b border-zinc-200/50 dark:border-zinc-800/50 hover:bg-zinc-50/50 dark:hover:bg-zinc-800/50 transition-all duration-300 cursor-pointer"
                    >
                      <TableCell className="px-8 py-8">
                        <div className="flex flex-col gap-1">
                          <span className="text-base font-black text-ink leading-tight group-hover:text-indigo-600 transition-colors">
                            {new Date(log.timestamp).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                          </span>
                          <span className="text-[10px] text-muted font-black uppercase tracking-[0.2em] opacity-60">
                            {new Date(log.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="px-8 py-8">
                        <Badge variant="outline" className={cn(
                          "text-[9px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-pill border transition-all shadow-sm",
                          log.status === "Success" 
                            ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" 
                            : "bg-rose-500/10 text-rose-600 border-rose-500/20"
                        )}>
                          {log.status === "Success" ? <CheckCircle2 size={12} className="mr-2 inline" /> : <AlertCircle size={12} className="mr-2 inline" />}
                          {log.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-8 py-8">
                        <div className="flex items-center gap-3">
                          <span className="text-3xl font-headline text-ink leading-none tracking-tighter">{log.total_jobs}</span>
                          <span className="text-[10px] text-muted font-black uppercase tracking-[0.2em] opacity-60">Vectors</span>
                        </div>
                      </TableCell>
                      <TableCell className="px-8 py-8">
                        <div className="flex flex-wrap gap-2 max-w-lg">
                          {Object.entries(log.company_stats).map(([company, count]) => (
                            count > 0 && (
                              <div key={company} className="px-3 py-1.5 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center gap-3 transition-all hover:border-indigo-500/30 hover:shadow-sm group/item">
                                <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest group-hover/item:text-zinc-900 dark:group-hover/item:text-zinc-100 transition-colors">{company}</span>
                                <div className="w-px h-3 bg-zinc-200 dark:bg-zinc-700" />
                                <span className="text-[10px] font-black text-indigo-500">{count}</span>
                              </div>
                            )
                          ))}
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
    </div>
  );
}
