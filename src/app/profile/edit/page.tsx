"use client";
import { FadeIn } from "@/components/ui/fade-in";
import { 
  User, Mail, MapPin, Building, Camera, 
  Save, X, Globe, Twitter, Share2, Link as LinkIcon 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { useState } from "react";

export default function EditProfilePage() {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      // Logic for saving would go here
      window.location.href = "/profile";
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-base)] pt-24 pb-20">
      <div className="container-custom max-w-3xl">
        
        {/* Header */}
        <FadeIn direction="down">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h1 className="text-3xl font-bold font-headline mb-2">Edit Profile</h1>
              <p className="text-[var(--text-muted)]">Update your professional information and presence.</p>
            </div>
            <Link href="/profile">
              <Button variant="ghost" className="rounded-xl border border-[var(--border)]">
                <X className="w-4 h-4 mr-2" /> Cancel
              </Button>
            </Link>
          </div>
        </FadeIn>

        <div className="space-y-8">
          
          {/* Profile Picture Section */}
          <FadeIn delay={0.1}>
            <div className="bg-white dark:bg-[var(--bg-card)] border border-[var(--border)] rounded-[32px] p-8 shadow-sm">
              <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                <User className="w-5 h-5 text-[var(--primary)]" /> Profile Picture
              </h2>
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="relative group">
                  <div className="w-32 h-32 rounded-[24px] bg-gradient-to-tr from-[#678D63] to-[#A8BA9A] flex items-center justify-center text-4xl font-bold text-white shadow-xl">
                    HK
                  </div>
                  <button className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-white dark:bg-gray-800 border-2 border-[var(--primary)] flex items-center justify-center text-[var(--primary)] shadow-lg hover:scale-110 transition-transform">
                    <Camera className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <p className="font-bold mb-1">Upload a new photo</p>
                  <p className="text-xs text-[var(--text-muted)] mb-4">Recommended size: 400x400px. Max file size: 2MB.</p>
                  <div className="flex gap-3 justify-center md:justify-start">
                    <Button size="sm" className="bg-[var(--primary)] rounded-lg">Choose File</Button>
                    <Button size="sm" variant="ghost" className="text-red-500 hover:bg-red-50">Remove</Button>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Basic Info */}
          <FadeIn delay={0.2}>
            <div className="bg-white dark:bg-[var(--bg-card)] border border-[var(--border)] rounded-[32px] p-8 shadow-sm">
              <h2 className="text-lg font-bold mb-8 flex items-center gap-2">
                <Building className="w-5 h-5 text-[var(--primary)]" /> Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-[var(--text-secondary)]">Full Name</label>
                  <Input defaultValue="Hassaan Khalid" className="rounded-xl border-[var(--border)] focus:ring-[var(--primary)]" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-[var(--text-secondary)]">Professional Title</label>
                  <Input defaultValue="Senior Product Designer" className="rounded-xl border-[var(--border)]" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-[var(--text-secondary)]">Current Company</label>
                  <Input defaultValue="CreativeLabs" className="rounded-xl border-[var(--border)]" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-[var(--text-secondary)]">Location</label>
                  <Input defaultValue="Lahore, Pakistan" className="rounded-xl border-[var(--border)]" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-bold text-[var(--text-secondary)]">Bio / Summary</label>
                  <Textarea 
                    defaultValue="Creative and detail-oriented Product Designer with over 5 years of experience in the tech industry..." 
                    className="rounded-2xl border-[var(--border)] min-h-[120px] resize-none" 
                  />
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Social Links */}
          <FadeIn delay={0.3}>
            <div className="bg-white dark:bg-[var(--bg-card)] border border-[var(--border)] rounded-[32px] p-8 shadow-sm">
              <h2 className="text-lg font-bold mb-8 flex items-center gap-2">
                <Globe className="w-5 h-5 text-[var(--primary)]" /> Social Presence
              </h2>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-white/5 flex items-center justify-center text-blue-600 border border-[var(--border)]">
                    <Share2 className="w-5 h-5" />
                  </div>
                  <Input defaultValue="linkedin.com/in/hassaankhalid" className="rounded-xl border-[var(--border)]" />
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-white/5 flex items-center justify-center text-gray-900 dark:text-white border border-[var(--border)]">
                    <LinkIcon className="w-5 h-5" />
                  </div>
                  <Input defaultValue="github.com/hassaankhalid" className="rounded-xl border-[var(--border)]" />
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-white/5 flex items-center justify-center text-blue-400 border border-[var(--border)]">
                    <Twitter className="w-5 h-5" />
                  </div>
                  <Input defaultValue="twitter.com/hassaankhalid" className="rounded-xl border-[var(--border)]" />
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Actions */}
          <FadeIn delay={0.4}>
            <div className="flex justify-end gap-4">
              <Link href="/profile">
                <Button variant="ghost" className="rounded-xl px-8 font-bold">Discard</Button>
              </Link>
              <Button 
                onClick={handleSave}
                disabled={isSaving}
                className="bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white rounded-xl px-12 font-bold shadow-xl shadow-[var(--primary)]/20 transition-all hover:scale-105"
              >
                {isSaving ? "Saving..." : <span className="flex items-center gap-2"><Save className="w-4 h-4" /> Save Changes</span>}
              </Button>
            </div>
          </FadeIn>

        </div>
      </div>
    </div>
  );
}
