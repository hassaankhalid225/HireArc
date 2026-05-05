"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { 
  ArrowLeft, Camera, User, Mail, Phone, MapPin, Briefcase, 
  Globe, Plus, X, Upload, Check, Lock, Eye, EyeOff, Save,
  Loader2
} from "lucide-react";
import { apiClient } from "@/services/api";
import { config } from "@/config";
import { toast } from "sonner";

interface IconProps {
  className?: string;
}

const LinkedinIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className ?? "w-4 h-4"} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const GithubIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className ?? "w-4 h-4"} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
  </svg>
);

const TwitterIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className ?? "w-4 h-4"} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const SKILL_SUGGESTIONS = [
  "React", "Next.js", "TypeScript", "Node.js", "Python", "GraphQL",
  "PostgreSQL", "Docker", "AWS", "Tailwind CSS", "Vue.js", "MongoDB"
];

export default function EditProfilePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<"personal" | "skills" | "social" | "security">("personal");
  
  const [profile, setProfile] = useState({
    name: "",
    jobTitle: "",
    email: "",
    phone: "",
    location: "",
    about: "",
    portfolio: "",
    avatarUrl: "",
    contact: {
      email: "",
      linkedin: "",
      github: "",
      twitter: ""
    },
    skills: [] as string[]
  });

  const [skillInput, setSkillInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const data = await apiClient.get<any>("/user/profile");
        if (data) {
          setProfile({
            name: data.name || "",
            jobTitle: data.jobTitle || "",
            email: data.email || "",
            phone: data.phone || "",
            location: data.location || "",
            about: data.about || "",
            portfolio: data.portfolio || "",
            avatarUrl: data.avatarUrl || "",
            contact: {
              email: data.contact?.email || "",
              linkedin: data.contact?.linkedin || "",
              github: data.contact?.github || "",
              twitter: data.contact?.twitter || "",
            },
            skills: data.skills || []
          });
          if (data.avatarUrl) setAvatarPreview(data.avatarUrl);
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProfile();
  }, []);

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const localUrl = URL.createObjectURL(file);
    setAvatarPreview(localUrl);
    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      // Use our new backend upload endpoint
      const response = await fetch(`${config.BACKEND_URL}/user/upload-avatar`, {
        method: "POST",
        body: formData,
        // Don't set Content-Type header, let browser set it with boundary
      });
      
      if (!response.ok) throw new Error("Upload failed");
      
      const data = await response.json();
      if (data.url) {
        setProfile(prev => ({ ...prev, avatarUrl: data.url }));
        setAvatarPreview(data.url);
        toast.success("Photo uploaded successfully!");
      }
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Failed to upload photo via backend.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await apiClient.put("/user/profile", profile);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to save profile:", error);
      toast.error("Failed to save profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const addSkill = (skill: string) => {
    const trimmed = skill.trim();
    if (trimmed && !profile.skills.includes(trimmed)) {
      setProfile(prev => ({ ...prev, skills: [...prev.skills, trimmed] }));
    }
    setSkillInput("");
  };

  const removeSkill = (skill: string) => {
    setProfile(prev => ({ ...prev, skills: prev.skills.filter(s => s !== skill) }));
  };

  const updateContact = (key: string, value: string) => {
    setProfile(prev => ({
      ...prev,
      contact: { ...prev.contact, [key]: value }
    }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-[var(--primary)] animate-spin" />
      </div>
    );
  }

  const TABS = [
    { key: "personal", label: "Personal Info" },
    { key: "skills", label: "Skills & Resume" },
    { key: "social", label: "Social Links" },
    { key: "security", label: "Security" },
  ] as const;

  return (
    <div className="min-h-screen pt-[100px] pb-20 px-4 bg-[#F8FAFC] dark:bg-[#0B1110]">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/profile" 
            className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Profile
          </Link>
          <h1 className="text-3xl font-extrabold font-headline text-[var(--text-primary)]">Edit Profile</h1>
          <p className="text-[var(--text-muted)] mt-1">Update your personal information and preferences</p>
        </div>

        {/* Avatar Section */}
        <div className="bg-white dark:bg-[#15201E] border border-slate-200 dark:border-white/5 rounded-2xl p-6 mb-6 shadow-sm">
          <div className="flex items-center gap-6">
            <div className="relative group">
              <div className="w-24 h-24 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-400 text-2xl font-bold overflow-hidden shadow-sm border border-slate-200 dark:border-white/10">
                {isUploading ? (
                  <Loader2 className="w-8 h-8 animate-spin" />
                ) : avatarPreview ? (
                  <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  profile.name ? profile.name[0] : <User />
                )}
              </div>
              <button
                onClick={() => fileRef.current?.click()}
                disabled={isUploading}
                className="absolute inset-0 rounded-2xl bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer disabled:cursor-not-allowed"
              >
                <Camera className="w-6 h-6 text-white" />
              </button>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </div>
            <div>
              <h3 className="font-bold text-[var(--text-primary)] text-xl">{profile.name || "Set your name"}</h3>
              <p className="text-sm text-[var(--text-muted)] mb-3">{profile.jobTitle || "Your role"}</p>
              <button
                onClick={() => fileRef.current?.click()}
                disabled={isUploading}
                className="text-xs font-bold text-[var(--primary)] border border-[var(--primary)]/30 px-4 py-2 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors disabled:opacity-50"
              >
                {isUploading ? "Uploading..." : "Change Photo"}
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 p-1 bg-white/60 dark:bg-[#1C261F]/60 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-xl mb-6 shadow-sm">
          {TABS.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 py-2 px-3 text-xs font-bold uppercase tracking-wider rounded-lg transition-all duration-200 ${
                activeTab === tab.key
                  ? "bg-[var(--primary)] text-white shadow-md"
                  : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-white dark:bg-[#15201E] border border-slate-200 dark:border-white/5 rounded-2xl p-6 shadow-sm min-h-[400px]">

          {/* Personal Info */}
          {activeTab === "personal" && (
            <div className="space-y-5 animate-in fade-in duration-300">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest mb-2 ml-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
                    <input
                      type="text"
                      value={profile.name}
                      onChange={e => setProfile(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g. Hassaan Khalid"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 text-[var(--text-primary)] text-sm focus:outline-none focus:ring-1 focus:ring-[var(--primary)] transition-all font-medium"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest mb-2 ml-1">Job Title</label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
                    <input
                      type="text"
                      value={profile.jobTitle}
                      onChange={e => setProfile(prev => ({ ...prev, jobTitle: e.target.value }))}
                      placeholder="e.g. Full Stack Developer"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 text-[var(--text-primary)] text-sm focus:outline-none focus:ring-1 focus:ring-[var(--primary)] transition-all font-medium"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest mb-2 ml-1">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
                  <input
                    type="text"
                    value={profile.location}
                    onChange={e => setProfile(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="e.g. Lahore, Pakistan"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 text-[var(--text-primary)] text-sm focus:outline-none focus:ring-1 focus:ring-[var(--primary)] transition-all font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest mb-2 ml-1">Bio / Headline</label>
                <textarea
                  rows={4}
                  value={profile.about}
                  onChange={e => setProfile(prev => ({ ...prev, about: e.target.value }))}
                  placeholder="Tell us about yourself..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 text-[var(--text-primary)] text-sm focus:outline-none focus:ring-1 focus:ring-[var(--primary)] transition-all resize-none font-medium leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest mb-2 ml-1">Portfolio URL</label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
                  <input
                    type="text"
                    value={profile.portfolio}
                    onChange={e => setProfile(prev => ({ ...prev, portfolio: e.target.value }))}
                    placeholder="https://yourportfolio.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 text-[var(--text-primary)] text-sm focus:outline-none focus:ring-1 focus:ring-[var(--primary)] transition-all font-medium"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Skills & Resume */}
          {activeTab === "skills" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div>
                <label className="block text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest mb-4 ml-1">Professional Skills</label>
                <div className="flex flex-wrap gap-2 mb-4 min-h-[40px]">
                  {profile.skills.map(skill => (
                    <span key={skill} className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-white text-xs font-bold rounded-lg border border-slate-200 dark:border-white/5">
                      {skill}
                      <button onClick={() => removeSkill(skill)} className="hover:text-red-500 transition-colors">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </span>
                  ))}
                  {profile.skills.length === 0 && <p className="text-xs text-slate-400 italic">No skills added yet.</p>}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={skillInput}
                    onChange={e => setSkillInput(e.target.value)}
                    onKeyDown={e => { if (e.key === "Enter") addSkill(skillInput); }}
                    placeholder="Add a skill..."
                    className="flex-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 text-[var(--text-primary)] text-sm focus:outline-none focus:ring-1 focus:ring-[var(--primary)] transition-all font-medium"
                  />
                  <button
                    onClick={() => addSkill(skillInput)}
                    className="px-5 py-3 rounded-xl bg-[var(--primary)] text-white text-sm font-bold hover:shadow-lg transition-all active:scale-95"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-4">
                  <p className="text-[10px] font-bold text-slate-400 uppercase w-full mb-1">Suggestions:</p>
                  {SKILL_SUGGESTIONS.filter(s => !profile.skills.includes(s)).map(s => (
                    <button
                      key={s}
                      onClick={() => addSkill(s)}
                      className="text-[10px] font-bold px-3 py-1.5 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-slate-500 hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all"
                    >
                      + {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-white/5">
                <label className="block text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest mb-4 ml-1">Resume / CV</label>
                <div className="border-2 border-dashed border-slate-200 dark:border-white/10 rounded-2xl p-8 text-center hover:border-[var(--primary)] hover:bg-slate-50 dark:hover:bg-white/5 transition-all cursor-pointer group">
                  <Upload className="w-8 h-8 text-slate-300 group-hover:text-[var(--primary)] mx-auto mb-3 transition-colors" />
                  <p className="text-sm font-bold text-slate-700 dark:text-white">Drop your resume here</p>
                  <p className="text-xs text-slate-400 mt-1 uppercase tracking-tighter">PDF, DOC, DOCX up to 5MB</p>
                  <button className="mt-5 text-xs font-bold text-[var(--primary)] border border-[var(--primary)]/30 px-5 py-2 rounded-xl hover:bg-white dark:hover:bg-white/10 transition-all shadow-sm">
                    Browse Files
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Social Links */}
          {activeTab === "social" && (
            <div className="space-y-5 animate-in fade-in duration-300">
              {[
                { icon: <LinkedinIcon />, label: "LinkedIn", key: "linkedin", placeholder: "linkedin.com/in/username" },
                { icon: <GithubIcon />, label: "GitHub", key: "github", placeholder: "github.com/username" },
                { icon: <TwitterIcon />, label: "Twitter / X", key: "twitter", placeholder: "twitter.com/username" },
                { icon: <Mail className="w-4 h-4" />, label: "Public Contact Email", key: "email", placeholder: "public@example.com" },
              ].map(({ icon, label, key, placeholder }) => (
                <div key={label}>
                  <label className="block text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest mb-2 ml-1">{label}</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">{icon}</span>
                    <input
                      type="text"
                      value={(profile.contact as any)[key]}
                      onChange={e => updateContact(key, e.target.value)}
                      placeholder={placeholder}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 text-[var(--text-primary)] text-sm focus:outline-none focus:ring-1 focus:ring-[var(--primary)] transition-all font-medium"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Security */}
          {activeTab === "security" && (
            <div className="space-y-5 animate-in fade-in duration-300">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Current Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 text-[var(--text-primary)] text-sm focus:outline-none focus:ring-1 focus:ring-[var(--primary)] transition-all"
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">New Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 text-[var(--text-primary)] text-sm focus:outline-none focus:ring-1 focus:ring-[var(--primary)] transition-all"
                  />
                </div>
              </div>
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
                Password must be at least 8 characters, containing uppercase, lowercase, and a number.
              </div>
            </div>
          )}
        </div>

        {/* Save Button */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSave}
            disabled={isSaving || isUploading}
            className={`flex items-center gap-3 px-10 py-4 rounded-2xl text-sm font-bold uppercase tracking-widest transition-all duration-300 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed ${
              isSaving 
                ? "bg-slate-700 text-white animate-pulse" 
                : "bg-[var(--primary)] text-white hover:shadow-primary/20 hover:-translate-y-1 active:translate-y-0"
            }`}
          >
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {isSaving ? "Syncing..." : "Save Profile Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
