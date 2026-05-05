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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  RefreshCw
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { apiClient } from "@/services/api";
import { Skeleton } from "@/components/ui/skeleton";
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

  useEffect(() => {
    fetchLogs();
  }, []);

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

  const lastLog = logs[0];

  return (
    <div className="space-y-12 pb-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 py-8 border-b border-hairline">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-ink font-bold mb-1">
            <Activity className="w-4 h-4" />
            <span className="text-[10px] uppercase tracking-[0.2em]">System Pulse</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-headline tracking-tight text-ink leading-none">Scraping Logs</h1>
          <p className="text-body text-lg max-w-xl font-medium">Audit trail of automated ingestion cycles and corporate node synchronization history.</p>
        </div>
        <div>
          <button 
            onClick={fetchLogs}
            className="h-12 w-12 flex items-center justify-center rounded-full bg-canvas-soft border border-hairline hover:border-ink hover:text-ink transition-all active:scale-95 shadow-premium-sm group"
          >
            <RefreshCw className={cn("w-5 h-5", isLoading && "animate-spin")} />
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border border-hairline shadow-premium-sm rounded-xl bg-surface-card hover:border-hairline-strong transition-all duration-300">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 rounded-xl bg-canvas-soft flex items-center justify-center text-ink">
                <CheckCircle2 size={24} />
              </div>
              <TrendingUp size={18} className="text-ink/20" />
            </div>
            <p className="text-[10px] font-bold text-muted uppercase tracking-[0.2em] mb-1">Last Sync Status</p>
            <h3 className="text-3xl font-headline text-ink leading-none">{lastLog?.status || "Unknown"}</h3>
            <p className="text-[10px] text-muted mt-2 flex items-center gap-1.5 font-bold uppercase tracking-wider">
              <Clock size={10} /> {lastLog ? new Date(lastLog.timestamp).toLocaleString() : "Never"}
            </p>
          </CardContent>
        </Card>

        <Card className="border border-hairline shadow-premium-sm rounded-xl bg-surface-card hover:border-hairline-strong transition-all duration-300">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 rounded-xl bg-canvas-soft flex items-center justify-center text-ink">
                <Box size={24} />
              </div>
              <Activity size={18} className="text-ink/20" />
            </div>
            <p className="text-[10px] font-bold text-muted uppercase tracking-[0.2em] mb-1">Vectors Ingested</p>
            <h3 className="text-3xl font-headline text-ink leading-none">{lastLog?.total_jobs || 0}</h3>
            <p className="text-[10px] text-muted mt-2 font-bold uppercase tracking-wider">Total unique records fetched</p>
          </CardContent>
        </Card>

        <Card className="border border-hairline shadow-premium-sm rounded-xl bg-surface-card hover:border-hairline-strong transition-all duration-300">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 rounded-xl bg-canvas-soft flex items-center justify-center text-ink">
                <Building2 size={24} />
              </div>
              <TrendingUp size={18} className="text-ink/20" />
            </div>
            <p className="text-[10px] font-bold text-muted uppercase tracking-[0.2em] mb-1">Corporate Nodes</p>
            <h3 className="text-3xl font-headline text-ink leading-none">{lastLog ? Object.keys(lastLog.company_stats).length : 0}</h3>
            <p className="text-[10px] text-muted mt-2 font-bold uppercase tracking-wider">Sources tracked in last cycle</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Logs Table */}
      <Card className="border border-hairline shadow-premium-sm rounded-xl bg-surface-card overflow-hidden">
        <CardHeader className="px-8 py-6 bg-canvas-soft/30 border-b border-hairline">
          <CardTitle className="text-lg font-headline text-ink flex items-center gap-3 leading-none">
            <Database className="w-4 h-4 text-ink/40" />
            Cycle History
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto no-scrollbar">
          <Table>
            <TableHeader className="bg-canvas-soft/50 border-b border-hairline">
              <TableRow className="border-none hover:bg-transparent">
                <TableHead className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-muted">Timestamp</TableHead>
                <TableHead className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-muted">Status</TableHead>
                <TableHead className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-muted">Payload Size</TableHead>
                <TableHead className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-muted">Node Distribution</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <AnimatePresence mode="popLayout">
                {isLoading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i} className="border-b border-hairline">
                      <TableCell className="px-8 py-6"><Skeleton className="h-10 w-48 rounded-lg opacity-20" /></TableCell>
                      <TableCell className="px-8 py-6"><Skeleton className="h-8 w-24 rounded-pill opacity-20" /></TableCell>
                      <TableCell className="px-8 py-6"><Skeleton className="h-6 w-16 rounded opacity-20" /></TableCell>
                      <TableCell className="px-8 py-6"><Skeleton className="h-6 w-full max-w-xs rounded opacity-20" /></TableCell>
                    </TableRow>
                  ))
                ) : logs.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="h-64 text-center">
                      <div className="flex flex-col items-center justify-center opacity-20 space-y-4">
                        <Database className="w-16 h-16" />
                        <p className="text-xs font-bold uppercase tracking-widest">No logs available</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  logs.map((log) => (
                    <motion.tr 
                      key={log.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="group border-b border-hairline hover:bg-canvas-soft/50 transition-all duration-300"
                    >
                      <TableCell className="px-8 py-6">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-ink leading-tight">
                            {new Date(log.timestamp).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                          </span>
                          <span className="text-[10px] text-muted font-bold uppercase tracking-wider">
                            {new Date(log.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="px-8 py-6">
                        <Badge variant="outline" className={cn(
                          "text-[9px] font-bold uppercase tracking-wider px-3 py-1 rounded-pill border transition-all",
                          log.status === "Success" 
                            ? "bg-emerald-500/5 text-emerald-600 border-emerald-500/20" 
                            : "bg-rose-500/5 text-rose-600 border-rose-500/20"
                        )}>
                          {log.status === "Success" ? <CheckCircle2 size={10} className="mr-1.5 inline" /> : <AlertCircle size={10} className="mr-1.5 inline" />}
                          {log.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-8 py-6">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-headline text-ink leading-none">{log.total_jobs}</span>
                          <span className="text-[10px] text-muted font-bold uppercase tracking-wider">Vectors</span>
                        </div>
                      </TableCell>
                      <TableCell className="px-8 py-6">
                        <div className="flex flex-wrap gap-1.5 max-w-md">
                          {Object.entries(log.company_stats).map(([company, count]) => (
                            count > 0 && (
                              <div key={company} className="px-2 py-0.5 rounded bg-canvas-soft border border-hairline flex items-center gap-2 transition-all hover:border-ink/30 group/item">
                                <span className="text-[9px] font-bold text-muted uppercase group-hover/item:text-ink transition-colors">{company}</span>
                                <span className="text-[9px] font-bold text-ink">{count}</span>
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
