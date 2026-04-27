"use client";
import React from "react";
import Link from "next/link";
import { 
  ArrowLeft, Bell, Briefcase, Eye, Users, Star, Zap, 
  Check, Trash2, Settings, CheckCheck
} from "lucide-react";
import { useNotifications } from "@/context";

const FILTER_TABS = [
  { key: "all", label: "All" },
  { key: "unread", label: "Unread" },
  { key: "job_match", label: "Job Matches" },
  { key: "application", label: "Applications" },
  { key: "profile_view", label: "Profile Views" },
  { key: "system", label: "System" },
] as const;

type FilterKey = typeof FILTER_TABS[number]["key"];

const NOTIF_ICONS: Record<string, any> = {
  job_match: { icon: <Briefcase className="w-4 h-4" />, color: "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400" },
  application: { icon: <Zap className="w-4 h-4" />, color: "bg-[#F0FDF4] text-[#166534] dark:bg-white/10 dark:text-[#A8BA9A]" },
  profile_view: { icon: <Eye className="w-4 h-4" />, color: "bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400" },
  saved: { icon: <Star className="w-4 h-4" />, color: "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400" },
  system: { icon: <Bell className="w-4 h-4" />, color: "bg-gray-50 text-gray-500 dark:bg-white/5 dark:text-gray-400" },
};

export default function NotificationsPage() {
  const { notifications, unreadCount, markAsRead, markAllAsRead, deleteNotification, simulateNew } = useNotifications();
  const [activeFilter, setActiveFilter] = React.useState<FilterKey>("all");

  const filtered = notifications.filter(n => {
    if (activeFilter === "all") return true;
    if (activeFilter === "unread") return n.unread;
    return n.type === activeFilter;
  });

  return (
    <div className="min-h-screen pt-[100px] pb-20 px-4 bg-[var(--bg-base)]">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-extrabold font-headline text-[var(--text-primary)]">Notifications</h1>
              <p className="text-[var(--text-muted)] mt-1">
                {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}` : "You're all caught up!"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={simulateNew}
                className="text-xs font-bold text-[var(--text-muted)] hover:text-[var(--primary)] px-3 py-1.5"
              >
                Test Real-time
              </button>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="flex items-center gap-1.5 text-sm font-semibold text-[var(--primary)] border border-[var(--primary)]/30 px-3 py-1.5 rounded-full hover:bg-[#F0FDF4] dark:hover:bg-white/10 transition-colors"
                >
                  <CheckCheck className="w-3.5 h-3.5" />
                  Mark all read
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
          {FILTER_TABS.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveFilter(tab.key)}
              className={`flex-shrink-0 text-sm font-semibold px-4 py-1.5 rounded-full transition-all duration-200 ${
                activeFilter === tab.key
                  ? "bg-[var(--primary)] text-white shadow-sm"
                  : "bg-white/60 dark:bg-[#1C261F]/60 border border-white/50 dark:border-white/10 text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              }`}
            >
              {tab.label}
              {tab.key === "unread" && unreadCount > 0 && (
                <span className="ml-1.5 text-xs bg-white/30 dark:bg-white/20 px-1.5 py-0.5 rounded-full">{unreadCount}</span>
              )}
            </button>
          ))}
        </div>

        {/* Notifications List */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 bg-white/80 dark:bg-[#1C261F]/80 backdrop-blur-xl border border-white/60 dark:border-white/10 rounded-2xl">
            <Bell className="w-12 h-12 text-[var(--text-muted)] mx-auto mb-3 opacity-40" />
            <p className="font-semibold text-[var(--text-primary)]">No notifications here</p>
            <p className="text-sm text-[var(--text-muted)] mt-1">Check back later for updates</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {filtered.map(notif => {
              const style = NOTIF_ICONS[notif.type] || NOTIF_ICONS.system;
              return (
                <div
                  key={notif.id}
                  className={`group relative flex items-start gap-4 p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${
                    notif.unread
                      ? "bg-white dark:bg-[#1C261F]/90 border-[#678D63]/30 shadow-sm"
                      : "bg-white/70 dark:bg-[#1C261F]/60 border-white/50 dark:border-white/10"
                  } hover:shadow-md hover:-translate-y-0.5 backdrop-blur-xl`}
                  onClick={() => markAsRead(notif.id)}
                >
                  {/* Unread dot */}
                  {notif.unread && (
                    <span className="absolute top-4 right-4 w-2 h-2 bg-[#678D63] rounded-full animate-pulse" />
                  )}

                  {/* Icon */}
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${style.color}`}>
                    {style.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-bold ${notif.unread ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)]"}`}>
                      {notif.title}
                    </p>
                    <p className="text-xs text-[var(--text-muted)] mt-0.5 leading-relaxed">{notif.description}</p>
                    <p className="text-[10px] text-[var(--text-muted)] mt-1.5 font-medium">{notif.time || "Just now"}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                    {notif.unread && (
                      <button
                        onClick={e => { e.stopPropagation(); markAsRead(notif.id); }}
                        className="p-1.5 rounded-lg text-[var(--text-muted)] hover:bg-[#F0FDF4] hover:text-[#166534] dark:hover:bg-white/10 transition-colors"
                        title="Mark as read"
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                    )}
                    <button
                      onClick={e => { e.stopPropagation(); deleteNotification(notif.id); }}
                      className="p-1.5 rounded-lg text-[var(--text-muted)] hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-500/10 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
