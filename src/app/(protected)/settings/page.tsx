"use client";
import { FadeIn } from "@/components/ui/fade-in";
import { 
  Settings, User, Bell, Shield, Lock, Eye, 
  CreditCard, Globe, LogOut, ChevronRight, Check, ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");

  const menuItems = [
    { id: "general", label: "General", icon: <Settings className="w-4 h-4" /> },
    { id: "account", label: "Account", icon: <User className="w-4 h-4" /> },
    { id: "notifications", label: "Notifications", icon: <Bell className="w-4 h-4" /> },
    { id: "privacy", label: "Privacy & Security", icon: <Shield className="w-4 h-4" /> },
    { id: "billing", label: "Billing", icon: <CreditCard className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-base)] pt-24 pb-20">
      <div className="container-custom max-w-6xl">
        <FadeIn direction="down">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-12 h-12 rounded-2xl bg-[#F0FDF4] dark:bg-white/5 border border-[var(--primary)] flex items-center justify-center text-[var(--primary)]">
              <Settings className="w-6 h-6" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold font-headline">Settings</h1>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar Navigation */}
          <FadeIn delay={0.1} direction="right" className="lg:col-span-1">
            <div className="bg-white dark:bg-[var(--bg-card)] border-2 border-[var(--border)] rounded-[32px] p-4 shadow-sm sticky top-28">
              <div className="space-y-1">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
                      activeTab === item.id 
                        ? "bg-[var(--primary)] text-white shadow-lg shadow-[var(--primary)]/20" 
                        : "text-[var(--text-secondary)] hover:bg-gray-50 dark:hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      {item.label}
                    </div>
                    {activeTab === item.id && <ChevronRight className="w-4 h-4" />}
                  </button>
                ))}
              </div>
              <div className="mt-8 pt-4 border-t border-gray-100 dark:border-white/5">
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors">
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            </div>
          </FadeIn>

          {/* Settings Content */}
          <FadeIn delay={0.2} direction="up" className="lg:col-span-3">
            <div className="bg-white dark:bg-[var(--bg-card)] border-2 border-[var(--border)] rounded-[40px] p-8 md:p-12 shadow-sm min-h-[600px]">
              
              {activeTab === "general" && (
                <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <section>
                    <h2 className="text-2xl font-bold mb-2">General Settings</h2>
                    <p className="text-[var(--text-muted)] mb-8">Manage your basic account preferences and appearance.</p>
                    
                    <div className="space-y-6">
                      <div className="flex items-center justify-between p-6 rounded-3xl bg-gray-50 dark:bg-white/5 border border-transparent hover:border-[var(--border)] transition-all">
                        <div>
                          <p className="font-bold mb-1">Language</p>
                          <p className="text-sm text-[var(--text-muted)]">Select your preferred display language.</p>
                        </div>
                        <Select defaultValue="en">
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select Language" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en">English (US)</SelectItem>
                            <SelectItem value="ur">Urdu</SelectItem>
                            <SelectItem value="de">German</SelectItem>
                            <SelectItem value="es">Spanish</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex items-center justify-between p-6 rounded-3xl bg-gray-50 dark:bg-white/5 border border-transparent hover:border-[var(--border)] transition-all">
                        <div>
                          <p className="font-bold mb-1">Timezone</p>
                          <p className="text-sm text-[var(--text-muted)]">Set your local time for accurate job posting times.</p>
                        </div>
                        <p className="text-sm font-bold text-[var(--primary)]">(GMT+5:00) Islamabad, Karachi</p>
                      </div>

                      <div className="flex items-center justify-between p-6 rounded-3xl bg-gray-50 dark:bg-white/5 border border-transparent hover:border-[var(--border)] transition-all">
                        <div>
                          <p className="font-bold mb-1">Email Visibility</p>
                          <p className="text-sm text-[var(--text-muted)]">Allow companies to see your email on your profile.</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </section>
                  
                  <div className="pt-8 border-t border-gray-100 dark:border-white/5 flex justify-end gap-4">
                    <Button variant="ghost" className="rounded-xl px-8 font-bold">Cancel</Button>
                    <Button className="bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white rounded-xl px-10 font-bold shadow-lg shadow-[var(--primary)]/20">Save Changes</Button>
                  </div>
                </div>
              )}

              {activeTab === "notifications" && (
                <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <section>
                    <h2 className="text-2xl font-bold mb-2">Notification Preferences</h2>
                    <p className="text-[var(--text-muted)] mb-8">Choose how and when you want to be notified.</p>
                    
                    <div className="space-y-4">
                      {[
                        { title: "New Job Matches", desc: "Get notified when a job matches your saved filters." },
                        { title: "Application Updates", desc: "Stay informed about changes in your application status." },
                        { title: "Direct Messages", desc: "Notifications for messages from recruiters." },
                        { title: "Marketing Emails", desc: "Tips, career advice, and product updates." },
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between p-6 rounded-3xl hover:bg-gray-50 dark:hover:bg-white/5 transition-all">
                          <div>
                            <p className="font-bold mb-1">{item.title}</p>
                            <p className="text-sm text-[var(--text-muted)]">{item.desc}</p>
                          </div>
                          <Switch defaultChecked={idx < 2} />
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              )}

              {activeTab !== "general" && activeTab !== "notifications" && (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-20 h-20 bg-gray-50 dark:bg-white/5 rounded-full flex items-center justify-center mb-6">
                    <Lock className="w-10 h-10 text-gray-300" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{menuItems.find(m => m.id === activeTab)?.label} Section</h3>
                  <p className="text-[var(--text-muted)] max-w-md">
                    This section is part of the premium dashboard module. Settings are currently view-only.
                  </p>
                </div>
              )}

            </div>
          </FadeIn>

        </div>
      </div>
    </div>
  );
}
