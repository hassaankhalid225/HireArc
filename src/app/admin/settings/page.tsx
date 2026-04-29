"use client";
import React from "react";
import { Settings, Shield, Bell, Lock, Globe, Database } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminSettings() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Admin Settings</h1>
        <p className="text-slate-500 dark:text-slate-400">Configure global platform parameters and security.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-[#1E293B] rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
              <Shield size={20} />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white">Security Settings</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-semibold">Two-Factor Authentication</p>
                <p className="text-xs text-slate-500">Enforce 2FA for all admin accounts</p>
              </div>
              <input type="checkbox" className="w-10 h-5 bg-slate-200 rounded-full appearance-none checked:bg-primary transition-all relative after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:w-4 after:h-4 after:bg-white after:rounded-full after:transition-all checked:after:left-5.5" />
            </div>
            <div className="flex items-center justify-between py-2 border-t border-slate-50 dark:border-slate-800">
              <div>
                <p className="text-sm font-semibold">IP Whitelisting</p>
                <p className="text-xs text-slate-500">Restrict admin access to specific IP ranges</p>
              </div>
              <button className="text-xs font-bold text-primary hover:underline">Configure</button>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-[#1E293B] rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
              <Database size={20} />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white">System Configuration</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-semibold">Auto-Approval</p>
                <p className="text-xs text-slate-500">Automatically approve jobs from trusted sources</p>
              </div>
              <input type="checkbox" defaultChecked className="w-10 h-5 bg-slate-200 rounded-full appearance-none checked:bg-primary transition-all relative after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:w-4 after:h-4 after:bg-white after:rounded-full after:transition-all checked:after:left-5.5" />
            </div>
            <div className="flex items-center justify-between py-2 border-t border-slate-50 dark:border-slate-800">
              <div>
                <p className="text-sm font-semibold">Maintenance Mode</p>
                <p className="text-xs text-slate-500">Disable frontend access for maintenance</p>
              </div>
              <input type="checkbox" className="w-10 h-5 bg-slate-200 rounded-full appearance-none checked:bg-primary transition-all relative after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:w-4 after:h-4 after:bg-white after:rounded-full after:transition-all checked:after:left-5.5" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-rose-50 dark:bg-rose-950/20 rounded-2xl border border-rose-100 dark:border-rose-900/30 p-6">
        <h3 className="text-rose-600 dark:text-rose-400 font-bold mb-2">Danger Zone</h3>
        <p className="text-sm text-rose-500 dark:text-rose-300/70 mb-4">Actions here are permanent and cannot be undone.</p>
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-sm font-bold transition-colors">
            Flush All Cache
          </button>
          <button className="px-4 py-2 bg-white dark:bg-slate-800 border border-rose-200 dark:border-rose-900/50 text-rose-500 rounded-xl text-sm font-bold hover:bg-rose-50 transition-colors">
            Reset Platform Data
          </button>
        </div>
      </div>
    </div>
  );
}
