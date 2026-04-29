"use client";
import React, { useState } from "react";
import { Building2, Search, Globe, Plus, MoreHorizontal, ExternalLink, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

const companies = [
  { name: "Google", logo: "G", jobs: 124, website: "google.com", status: "Verified" },
  { name: "Microsoft", logo: "M", jobs: 89, website: "microsoft.com", status: "Verified" },
  { name: "Amazon", logo: "A", jobs: 210, website: "amazon.com", status: "Verified" },
  { name: "Meta", logo: "M", jobs: 56, website: "meta.com", status: "Verified" },
  { name: "Netflix", logo: "N", jobs: 12, website: "netflix.com", status: "Verified" },
];

export default function CompanyManagement() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Company Management</h1>
          <p className="text-slate-500 dark:text-slate-400">View and manage company profiles and their listings.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-sm font-bold hover:shadow-lg hover:shadow-primary/20 transition-all">
          <Plus size={18} />
          Add Company
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {companies.map((company) => (
          <motion.div 
            key={company.name}
            whileHover={{ y: -4 }}
            className="bg-white dark:bg-[#1E293B] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xl font-bold text-slate-600 dark:text-slate-400">
                {company.logo}
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-600 uppercase tracking-wider">
                {company.status}
              </span>
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-1">{company.name}</h3>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
              <Globe size={12} />
              {company.website}
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-slate-50 dark:border-slate-800">
              <div className="text-xs">
                <span className="font-bold text-slate-900 dark:text-white">{company.jobs}</span>
                <span className="text-slate-500 ml-1">Active Jobs</span>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500 transition-colors">
                  <ExternalLink size={16} />
                </button>
                <button className="p-2 hover:bg-rose-50 text-rose-500 rounded-lg transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
