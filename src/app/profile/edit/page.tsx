"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import { 
  ArrowLeft, Camera, User, Mail, Phone, MapPin, Briefcase, 
  Globe, Github, Linkedin, Twitter, Plus, X, Upload, Check,
  Lock, Eye, EyeOff, Save
} from "lucide-react";

const SKILL_SUGGESTIONS = [
  "React", "Next.js", "TypeScript", "Node.js", "Python", "GraphQL",
  "PostgreSQL", "Docker", "AWS", "Tailwind CSS", "Vue.js", "MongoDB"
];

export default function EditProfilePage() {
  const [activeTab, setActiveTab] = useState<"personal" | "skills" | "social" | "security">("personal");
  const [skills, setSkills] = useState<string[]>(["React", "TypeScript", "Next.js"]);
  const [skillInput, setSkillInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [saved, setSaved] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const addSkill = (skill: string) => {
    const trimmed = skill.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills(prev => [...prev, trimmed]);
    }
    setSkillInput("");
  };

  const removeSkill = (skill: string) => {
    setSkills(prev => prev.filter(s => s !== skill));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatarPreview(url);
    }
  };

  const TABS = [
    { key: "personal", label: "Personal Info" },
    { key: "skills", label: "Skills & Resume" },
    { key: "social", label: "Social Links" },
    { key: "security", label: "Security" },
  ] as const;

  return (
    <div className="min-h-screen pt-[100px] pb-20 px-4">
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
        <div className="bg-white/80 dark:bg-[#1C261F]/80 backdrop-blur-xl border border-white/60 dark:border-white/10 rounded-2xl p-6 mb-6 shadow-sm">
          <div className="flex items-center gap-6">
            <div className="relative group">
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#678D63] to-[#A8BA9A] flex items-center justify-center text-white text-2xl font-bold overflow-hidden shadow-lg">
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  "HK"
                )}
              </div>
              <button
                onClick={() => fileRef.current?.click()}
                className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer"
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
              <h3 className="font-bold text-[var(--text-primary)]">Hassaan Khalid</h3>
              <p className="text-sm text-[var(--text-muted)] mb-3">Premium Member</p>
              <button
                onClick={() => fileRef.current?.click()}
                className="text-sm font-semibold text-[var(--primary)] border border-[var(--primary)]/30 px-4 py-1.5 rounded-full hover:bg-[#F0FDF4] dark:hover:bg-white/10 transition-colors"
              >
                Change Photo
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 p-1 bg-white/60 dark:bg-[#1C261F]/60 backdrop-blur-xl border border-white/50 dark:border-white/10 rounded-xl mb-6 shadow-sm">
          {TABS.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 py-2 px-3 text-sm font-semibold rounded-lg transition-all duration-200 ${
                activeTab === tab.key
                  ? "bg-[var(--primary)] text-white shadow-sm"
                  : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-white/80 dark:bg-[#1C261F]/80 backdrop-blur-xl border border-white/60 dark:border-white/10 rounded-2xl p-6 shadow-sm">

          {/* Personal Info */}
          {activeTab === "personal" && (
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-1.5">First Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
                    <input
                      type="text"
                      defaultValue="Hassaan"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[var(--border)] bg-white/50 dark:bg-white/5 text-[var(--text-primary)] text-sm focus:outline-none focus:border-[#678D63] focus:ring-2 focus:ring-[#678D63]/20 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-1.5">Last Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
                    <input
                      type="text"
                      defaultValue="Khalid"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[var(--border)] bg-white/50 dark:bg-white/5 text-[var(--text-primary)] text-sm focus:outline-none focus:border-[#678D63] focus:ring-2 focus:ring-[#678D63]/20 transition-all"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
                  <input
                    type="email"
                    defaultValue="hassaankhalid@HireArc.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[var(--border)] bg-white/50 dark:bg-white/5 text-[var(--text-primary)] text-sm focus:outline-none focus:border-[#678D63] focus:ring-2 focus:ring-[#678D63]/20 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-1.5">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
                  <input
                    type="tel"
                    defaultValue="+92 300 1234567"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[var(--border)] bg-white/50 dark:bg-white/5 text-[var(--text-primary)] text-sm focus:outline-none focus:border-[#678D63] focus:ring-2 focus:ring-[#678D63]/20 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-1.5">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
                  <input
                    type="text"
                    defaultValue="Lahore, Pakistan"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[var(--border)] bg-white/50 dark:bg-white/5 text-[var(--text-primary)] text-sm focus:outline-none focus:border-[#678D63] focus:ring-2 focus:ring-[#678D63]/20 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-1.5">Job Title</label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
                  <input
                    type="text"
                    defaultValue="Full Stack Developer"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[var(--border)] bg-white/50 dark:bg-white/5 text-[var(--text-primary)] text-sm focus:outline-none focus:border-[#678D63] focus:ring-2 focus:ring-[#678D63]/20 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-1.5">Bio</label>
                <textarea
                  rows={4}
                  defaultValue="Passionate full-stack developer with 4+ years of experience building scalable web applications using React, Next.js, and Node.js."
                  className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-white/50 dark:bg-white/5 text-[var(--text-primary)] text-sm focus:outline-none focus:border-[#678D63] focus:ring-2 focus:ring-[#678D63]/20 transition-all resize-none"
                />
              </div>
            </div>
          )}

          {/* Skills & Resume */}
          {activeTab === "skills" && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-3">Your Skills</label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {skills.map(skill => (
                    <span key={skill} className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F0FDF4] dark:bg-white/10 text-[#166534] dark:text-white text-sm font-semibold rounded-full">
                      {skill}
                      <button onClick={() => removeSkill(skill)} className="hover:text-red-500 transition-colors">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={skillInput}
                    onChange={e => setSkillInput(e.target.value)}
                    onKeyDown={e => { if (e.key === "Enter") addSkill(skillInput); }}
                    placeholder="Add a skill..."
                    className="flex-1 px-4 py-2.5 rounded-xl border border-[var(--border)] bg-white/50 dark:bg-white/5 text-[var(--text-primary)] text-sm focus:outline-none focus:border-[#678D63] focus:ring-2 focus:ring-[#678D63]/20 transition-all"
                  />
                  <button
                    onClick={() => addSkill(skillInput)}
                    className="px-4 py-2.5 rounded-xl bg-[var(--primary)] text-white text-sm font-semibold hover:bg-[#2a3d2d] transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {SKILL_SUGGESTIONS.filter(s => !skills.includes(s)).map(s => (
                    <button
                      key={s}
                      onClick={() => addSkill(s)}
                      className="text-xs px-2.5 py-1 border border-[var(--border)] rounded-full text-[var(--text-muted)] hover:border-[#678D63] hover:text-[#678D63] transition-colors"
                    >
                      + {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-3">Resume / CV</label>
                <div className="border-2 border-dashed border-[var(--border)] rounded-2xl p-8 text-center hover:border-[#678D63] transition-colors cursor-pointer group">
                  <Upload className="w-8 h-8 text-[var(--text-muted)] group-hover:text-[#678D63] mx-auto mb-3 transition-colors" />
                  <p className="text-sm font-semibold text-[var(--text-primary)]">Drop your resume here</p>
                  <p className="text-xs text-[var(--text-muted)] mt-1">PDF, DOC, DOCX up to 5MB</p>
                  <button className="mt-4 text-sm font-bold text-[var(--primary)] border border-[var(--primary)]/30 px-4 py-1.5 rounded-full hover:bg-[#F0FDF4] dark:hover:bg-white/10 transition-colors">
                    Browse Files
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Social Links */}
          {activeTab === "social" && (
            <div className="space-y-5">
              {[
                { icon: <Globe className="w-4 h-4" />, label: "Website", placeholder: "https://yourwebsite.com", defaultVal: "" },
                { icon: <Linkedin className="w-4 h-4" />, label: "LinkedIn", placeholder: "linkedin.com/in/username", defaultVal: "linkedin.com/in/hassaan" },
                { icon: <Github className="w-4 h-4" />, label: "GitHub", placeholder: "github.com/username", defaultVal: "github.com/hassaan" },
                { icon: <Twitter className="w-4 h-4" />, label: "Twitter / X", placeholder: "twitter.com/username", defaultVal: "" },
              ].map(({ icon, label, placeholder, defaultVal }) => (
                <div key={label}>
                  <label className="block text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-1.5">{label}</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]">{icon}</span>
                    <input
                      type="url"
                      defaultValue={defaultVal}
                      placeholder={placeholder}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[var(--border)] bg-white/50 dark:bg-white/5 text-[var(--text-primary)] text-sm focus:outline-none focus:border-[#678D63] focus:ring-2 focus:ring-[#678D63]/20 transition-all"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Security */}
          {activeTab === "security" && (
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-1.5">Current Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-[var(--border)] bg-white/50 dark:bg-white/5 text-[var(--text-primary)] text-sm focus:outline-none focus:border-[#678D63] focus:ring-2 focus:ring-[#678D63]/20 transition-all"
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-1.5">New Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[var(--border)] bg-white/50 dark:bg-white/5 text-[var(--text-primary)] text-sm focus:outline-none focus:border-[#678D63] focus:ring-2 focus:ring-[#678D63]/20 transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-1.5">Confirm New Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[var(--border)] bg-white/50 dark:bg-white/5 text-[var(--text-primary)] text-sm focus:outline-none focus:border-[#678D63] focus:ring-2 focus:ring-[#678D63]/20 transition-all"
                  />
                </div>
              </div>
              <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 rounded-xl p-4 text-sm text-amber-700 dark:text-amber-400">
                Password must be at least 8 characters, containing uppercase, lowercase, and a number.
              </div>
            </div>
          )}
        </div>

        {/* Save Button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSave}
            className={`flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-bold transition-all duration-300 shadow-md ${
              saved 
                ? "bg-emerald-500 text-white scale-95" 
                : "bg-[var(--primary)] text-white hover:bg-[#2a3d2d] hover:shadow-lg hover:-translate-y-0.5"
            }`}
          >
            {saved ? <><Check className="w-4 h-4" /> Saved!</> : <><Save className="w-4 h-4" /> Save Changes</>}
          </button>
        </div>
      </div>
    </div>
  );
}
