"use client";
import React from "react";
import { 
  Settings, 
  Shield, 
  Bell, 
  Lock, 
  Globe, 
  Database,
  Zap,
  Activity,
  ChevronRight,
  RefreshCw,
  Trash2,
  AlertTriangle,
  Server,
  Key
} from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function AdminSettings() {
  return (
    <div className="flex flex-col gap-12 pb-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 py-10 border-b border-hairline">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-ink/40 font-bold mb-1">
            <Settings size={12} className="fill-current animate-pulse text-indigo-500" />
            <span className="text-[9px] uppercase tracking-[0.3em]">System Configuration Protocol</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-headline tracking-tighter text-ink leading-none">Global Settings</h1>
          <p className="text-body text-lg max-w-xl font-medium leading-relaxed opacity-70">
            Override core platform parameters, manage security clearances, and synchronize global node distribution.
          </p>
        </div>
        <div className="shrink-0 flex gap-3">
           <Button variant="outline" size="lg" className="rounded-pill border-hairline font-bold text-[10px] uppercase tracking-widest hover:bg-canvas-soft transition-all shadow-sm">
            <RefreshCw className="mr-2 size-3.5 opacity-50" />
            Restore Defaults
          </Button>
          <Button size="lg" className="rounded-pill font-bold text-[10px] uppercase tracking-widest bg-ink text-canvas hover:opacity-90 transition-all shadow-xl shadow-ink/10">
            Save Manifest
          </Button>
        </div>
      </div>

      <Tabs defaultValue="security" className="w-full">
        <TabsList className="bg-canvas-soft/50 p-1.5 rounded-pill border border-hairline mb-10 w-fit">
          <TabsTrigger value="security" className="px-8 py-2.5 rounded-pill text-[10px] font-bold uppercase tracking-[0.2em] data-[state=active]:bg-ink data-[state=active]:text-canvas transition-all">
            Security Clearance
          </TabsTrigger>
          <TabsTrigger value="system" className="px-8 py-2.5 rounded-pill text-[10px] font-bold uppercase tracking-[0.2em] data-[state=active]:bg-ink data-[state=active]:text-canvas transition-all">
            System Parameters
          </TabsTrigger>
          <TabsTrigger value="notifications" className="px-8 py-2.5 rounded-pill text-[10px] font-bold uppercase tracking-[0.2em] data-[state=active]:bg-ink data-[state=active]:text-canvas transition-all">
            Signal Logic
          </TabsTrigger>
        </TabsList>

        <TabsContent value="security" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="border border-hairline shadow-premium-sm bg-surface-card rounded-2xl overflow-hidden">
              <CardHeader className="p-8 border-b border-hairline bg-canvas-soft/20">
                <div className="flex items-center gap-4">
                  <div className="size-10 rounded-xl bg-ink/5 text-ink flex items-center justify-center border border-hairline">
                    <Shield size={20} />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-headline text-ink">Authentication Core</CardTitle>
                    <CardDescription className="text-xs font-bold text-muted uppercase tracking-widest">Clearance Level Management</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-8 flex flex-col gap-8">
                <div className="flex items-center justify-between group">
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-bold text-ink uppercase tracking-wider">Multi-Factor Protocol (MFA)</p>
                    <p className="text-xs text-muted font-medium italic leading-relaxed opacity-70 max-w-[280px]">Enforce mandatory cryptographic verification for all administrative nodes.</p>
                  </div>
                  <Switch className="data-[state=checked]:bg-indigo-500" />
                </div>
                <div className="h-px bg-hairline" />
                <div className="flex items-center justify-between group">
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-bold text-ink uppercase tracking-wider">IP White-labeling</p>
                    <p className="text-xs text-muted font-medium italic leading-relaxed opacity-70 max-w-[280px]">Restrict administrative access to authorized geographic IP clusters.</p>
                  </div>
                  <Button variant="outline" size="sm" className="rounded-pill font-bold text-[9px] uppercase tracking-widest px-4 border-hairline hover:bg-ink hover:text-canvas transition-all">Configure</Button>
                </div>
                <div className="h-px bg-hairline" />
                <div className="flex items-center justify-between group">
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-bold text-ink uppercase tracking-wider">Session Persistence</p>
                    <p className="text-xs text-muted font-medium italic leading-relaxed opacity-70 max-w-[280px]">Automatic session termination after 4 hours of inactivity.</p>
                  </div>
                  <Switch defaultChecked className="data-[state=checked]:bg-indigo-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="border border-hairline shadow-premium-sm bg-surface-card rounded-2xl overflow-hidden">
              <CardHeader className="p-8 border-b border-hairline bg-canvas-soft/20">
                <div className="flex items-center gap-4">
                  <div className="size-10 rounded-xl bg-ink/5 text-ink flex items-center justify-center border border-hairline">
                    <Key size={20} />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-headline text-ink">API Access</CardTitle>
                    <CardDescription className="text-xs font-bold text-muted uppercase tracking-widest">Secret Key Distribution</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-8 flex flex-col gap-6">
                <div className="p-5 rounded-xl bg-canvas-soft border border-hairline flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black text-muted uppercase tracking-[0.2em]">Primary Access Key</span>
                        <Badge variant="outline" className="bg-emerald-500/5 text-emerald-600 border-emerald-500/10 text-[8px] font-black uppercase">Active</Badge>
                    </div>
                    <code className="text-xs font-bold text-ink opacity-40 select-all truncate tracking-widest">hk_live_8353eb379b4e41f18aa986df63d1ce7b</code>
                    <div className="flex gap-2">
                        <Button variant="outline" size="xs" className="w-full rounded-lg border-hairline font-bold text-[9px] uppercase tracking-widest">Regenerate</Button>
                        <Button variant="outline" size="xs" className="w-full rounded-lg border-hairline font-bold text-[9px] uppercase tracking-widest">Copy</Button>
                    </div>
                </div>
                <div className="flex items-center gap-4 p-5 rounded-xl bg-indigo-500/5 border border-indigo-500/10">
                    <Zap size={20} className="text-indigo-500 shrink-0" />
                    <p className="text-[10px] font-medium text-indigo-900 dark:text-indigo-200 leading-relaxed">
                        Developer access keys should be rotated every 90 days to maintain optimal security clearance.
                    </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="system" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="border border-hairline shadow-premium-sm bg-surface-card rounded-2xl overflow-hidden">
              <CardHeader className="p-8 border-b border-hairline bg-canvas-soft/20">
                <div className="flex items-center gap-4">
                  <div className="size-10 rounded-xl bg-ink/5 text-ink flex items-center justify-center border border-hairline">
                    <Database size={20} />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-headline text-ink">Ingestion Logic</CardTitle>
                    <CardDescription className="text-xs font-bold text-muted uppercase tracking-widest">Vector Synchronization Params</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-8 flex flex-col gap-8">
                <div className="flex items-center justify-between group">
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-bold text-ink uppercase tracking-wider">Automated Approval</p>
                    <p className="text-xs text-muted font-medium italic leading-relaxed opacity-70 max-w-[280px]">Automatically synchronize and approve vectors from high-trust nodes.</p>
                  </div>
                  <Switch defaultChecked className="data-[state=checked]:bg-indigo-500" />
                </div>
                <div className="h-px bg-hairline" />
                <div className="flex items-center justify-between group">
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-bold text-ink uppercase tracking-wider">Duplicate Filter Density</p>
                    <p className="text-xs text-muted font-medium italic leading-relaxed opacity-70 max-w-[280px]">Density level for fingerprinting similar job descriptions.</p>
                  </div>
                  <Badge variant="outline" className="bg-ink/5 text-ink border-hairline text-[10px] font-bold uppercase px-3 py-1 rounded-pill">Optimal (0.85)</Badge>
                </div>
                <div className="h-px bg-hairline" />
                <div className="flex items-center justify-between group">
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-bold text-ink uppercase tracking-wider">Cache TTL (Hours)</p>
                    <p className="text-xs text-muted font-medium italic leading-relaxed opacity-70 max-w-[280px]">Time-to-live for scraped metadata in the edge registry.</p>
                  </div>
                  <div className="flex items-center gap-3">
                      <span className="text-xl font-headline text-ink">12.0</span>
                      <ChevronRight size={14} className="opacity-20" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-hairline shadow-premium-sm bg-surface-card rounded-2xl overflow-hidden">
              <CardHeader className="p-8 border-b border-hairline bg-canvas-soft/20">
                <div className="flex items-center gap-4">
                  <div className="size-10 rounded-xl bg-ink/5 text-ink flex items-center justify-center border border-hairline">
                    <Server size={20} />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-headline text-ink">Infrastructure</CardTitle>
                    <CardDescription className="text-xs font-bold text-muted uppercase tracking-widest">Global Node Distribution</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-8 flex flex-col gap-6">
                 <div className="flex flex-col gap-4">
                    {[
                        { name: "US-EAST-ALPHA", status: "Active", load: "24%" },
                        { name: "EU-WEST-BETA", status: "Active", load: "18%" },
                        { name: "AS-PACIFIC-GAMMA", status: "Standby", load: "0%" }
                    ].map((node) => (
                        <div key={node.name} className="flex items-center justify-between p-4 rounded-xl bg-canvas-soft border border-hairline group/node hover:border-ink/20 transition-all">
                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] font-black text-ink uppercase tracking-widest">{node.name}</span>
                                <div className="flex items-center gap-2">
                                    <span className={cn("size-1.5 rounded-full", node.status === "Active" ? "bg-emerald-500 animate-pulse" : "bg-muted")} />
                                    <span className="text-[9px] font-bold text-muted uppercase tracking-widest">{node.status}</span>
                                </div>
                            </div>
                            <div className="text-right flex flex-col gap-1">
                                <span className="text-xs font-headline text-ink">{node.load} Load</span>
                                <div className="w-16 h-1 bg-hairline rounded-full overflow-hidden">
                                    <div className="h-full bg-ink" style={{ width: node.load }} />
                                </div>
                            </div>
                        </div>
                    ))}
                 </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Danger Zone */}
      <Card className="border border-rose-500/20 bg-rose-500/[0.02] rounded-2xl overflow-hidden relative group">
        <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:rotate-12 transition-transform duration-700 pointer-events-none">
            <AlertTriangle size={150} className="text-rose-600" />
        </div>
        <CardContent className="p-10 relative z-10">
          <div className="flex flex-col gap-2 mb-8">
            <div className="flex items-center gap-3">
                 <div className="size-10 rounded-xl bg-rose-500 text-canvas flex items-center justify-center shadow-lg shadow-rose-500/20">
                    <Trash2 size={20} />
                </div>
                <h3 className="text-2xl font-headline text-rose-600 tracking-tight">Danger Zone</h3>
            </div>
            <p className="text-base font-medium text-rose-900/60 dark:text-rose-200/60 leading-relaxed italic">
                Destructive operations that irreversibly modify the platform registry and synchronization vectors.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="ghost" className="h-20 flex flex-col items-start gap-1 p-6 rounded-2xl border border-rose-500/10 hover:bg-rose-500/5 transition-all text-left group/btn">
                <span className="text-xs font-black text-rose-600 uppercase tracking-widest">Flush Edge Cache</span>
                <span className="text-[10px] font-medium text-rose-900/40 dark:text-rose-200/40 uppercase tracking-widest">Purge all temporary metadata clusters</span>
            </Button>
            <Button variant="ghost" className="h-20 flex flex-col items-start gap-1 p-6 rounded-2xl border border-rose-500/10 hover:bg-rose-500/5 transition-all text-left group/btn">
                <span className="text-xs font-black text-rose-600 uppercase tracking-widest">Factory Reset Registry</span>
                <span className="text-[10px] font-medium text-rose-900/40 dark:text-rose-200/40 uppercase tracking-widest">Wipe all non-authorized platform vectors</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
