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
    <div className="space-y-10 pb-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-primary/5 p-10 rounded-[3rem] border border-primary/20 shadow-inner">
        <div>
          <div className="flex items-center gap-2 text-primary font-bold mb-3">
            <Activity className="w-5 h-5" />
            <span className="text-[11px] uppercase tracking-[0.3em] font-black">System Pulse</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground">Scraping Logs</h1>
          <p className="text-muted-foreground font-medium mt-2 text-lg max-w-xl">Audit trail of automated ingestion cycles and corporate node synchronization history.</p>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={fetchLogs}
            className="h-16 w-16 flex items-center justify-center rounded-full bg-background border-2 border-border hover:border-primary hover:text-primary transition-all active:scale-95 shadow-lg group"
          >
            <RefreshCw className={cn("w-6 h-6", isLoading && "animate-spin")} />
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="rounded-[2rem] border-none shadow-xl bg-gradient-to-br from-emerald-500/10 to-transparent">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-600">
                <CheckCircle2 size={24} />
              </div>
              <TrendingUp size={20} className="text-emerald-500 opacity-50" />
            </div>
            <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-1">Last Sync Status</p>
            <h3 className="text-3xl font-black text-foreground">{lastLog?.status || "Unknown"}</h3>
            <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1.5 font-bold uppercase tracking-tight">
              <Clock size={12} /> {lastLog ? new Date(lastLog.timestamp).toLocaleString() : "Never"}
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-[2rem] border-none shadow-xl bg-gradient-to-br from-blue-500/10 to-transparent">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-600">
                <Box size={24} />
              </div>
              <Activity size={20} className="text-blue-500 opacity-50" />
            </div>
            <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-1">Vectors Ingested</p>
            <h3 className="text-3xl font-black text-foreground">{lastLog?.total_jobs || 0}</h3>
            <p className="text-xs text-muted-foreground mt-2 font-bold uppercase tracking-tight">Total unique job records fetched</p>
          </CardContent>
        </Card>

        <Card className="rounded-[2rem] border-none shadow-xl bg-gradient-to-br from-amber-500/10 to-transparent">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 flex items-center justify-center text-amber-600">
                <Building2 size={24} />
              </div>
              <TrendingUp size={20} className="text-amber-500 opacity-50" />
            </div>
            <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-1">Corporate Nodes</p>
            <h3 className="text-3xl font-black text-foreground">{lastLog ? Object.keys(lastLog.company_stats).length : 0}</h3>
            <p className="text-xs text-muted-foreground mt-2 font-bold uppercase tracking-tight">Sources tracked in last cycle</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Logs Table */}
      <Card className="border-none shadow-2xl rounded-[3rem] bg-card/30 backdrop-blur-2xl overflow-hidden border border-white/5">
        <CardHeader className="px-10 py-8 bg-accent/10 border-b border-border/50">
          <CardTitle className="text-lg font-black uppercase tracking-widest flex items-center gap-3">
            <Database className="w-5 h-5 text-primary" />
            Cycle History
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-accent/5">
              <TableRow className="border-none">
                <TableHead className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.3em]">Timestamp</TableHead>
                <TableHead className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.3em]">Status</TableHead>
                <TableHead className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.3em]">Payload Size</TableHead>
                <TableHead className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.3em]">Node Distribution</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <AnimatePresence mode="popLayout">
                {isLoading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i} className="border-b border-border/20">
                      <TableCell className="px-10 py-8"><Skeleton className="h-6 w-48 rounded-lg" /></TableCell>
                      <TableCell className="px-10 py-8"><Skeleton className="h-8 w-24 rounded-full" /></TableCell>
                      <TableCell className="px-10 py-8"><Skeleton className="h-6 w-16 rounded-md" /></TableCell>
                      <TableCell className="px-10 py-8"><Skeleton className="h-6 w-full max-w-xs rounded-md" /></TableCell>
                    </TableRow>
                  ))
                ) : logs.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="h-64 text-center">
                      <div className="flex flex-col items-center justify-center opacity-20 space-y-4">
                        <Database className="w-16 h-16" />
                        <p className="text-xl font-black uppercase tracking-tighter">No logs available</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  logs.map((log) => (
                    <motion.tr 
                      key={log.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="group border-b border-border/20 hover:bg-primary/5 transition-all duration-300"
                    >
                      <TableCell className="px-10 py-8">
                        <div className="flex flex-col">
                          <span className="text-sm font-black text-foreground tracking-tight">
                            {new Date(log.timestamp).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                          </span>
                          <span className="text-[11px] text-muted-foreground font-bold uppercase tracking-wider">
                            {new Date(log.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="px-10 py-8">
                        <Badge variant="outline" className={cn(
                          "text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border-2",
                          log.status === "Success" 
                            ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/30" 
                            : "bg-rose-500/10 text-rose-500 border-rose-500/30"
                        )}>
                          {log.status === "Success" ? <CheckCircle2 size={10} className="mr-1.5 inline" /> : <AlertCircle size={10} className="mr-1.5 inline" />}
                          {log.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-10 py-8">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-black text-foreground">{log.total_jobs}</span>
                          <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-tight">Vectors</span>
                        </div>
                      </TableCell>
                      <TableCell className="px-10 py-8">
                        <div className="flex flex-wrap gap-1.5 max-w-md">
                          {Object.entries(log.company_stats).map(([company, count]) => (
                            count > 0 && (
                              <div key={company} className="px-2 py-1 rounded-md bg-accent/30 border border-border/50 flex items-center gap-1.5 transition-all hover:border-primary/50 group/item">
                                <span className="text-[10px] font-bold text-muted-foreground uppercase group-hover/item:text-primary transition-colors">{company}</span>
                                <span className="text-[10px] font-black text-foreground">{count}</span>
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
