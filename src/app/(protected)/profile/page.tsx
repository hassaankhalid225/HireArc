"use client";
import { useState, useRef, useEffect } from "react";
import { 
  Users, Mail, MapPin, Building, Calendar, Edit2, Shield, 
  Link as LinkIcon, Globe, Award, Briefcase, GraduationCap, Share2,
  Plus, X, Camera, Save, Check, Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/ui/fade-in";
import { apiClient } from "@/services/api";
import { Skeleton } from "@/components/ui/skeleton";
import { config } from "@/config";

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingAbout, setIsEditingAbout] = useState(false);
  const [isEditingContact, setIsEditingContact] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Hassaan Khalid",
    location: "Lahore, Pakistan",
    portfolio: "portfolio.com",
    about: "Creative and detail-oriented Product Designer with over 5 years of experience in the tech industry. I specialize in building complex design systems and intuitive user interfaces for SaaS and Fintech platforms.",
    skills: ['Product Design', 'UI/UX', 'Design Systems', 'Figma', 'React'],
    jobTitle: "Senior Product Designer at CreativeLabs",
    contact: {
      email: "hassaantech35@gmail.com",
      linkedin: "linkedin.com/in/hassaankhalid225",
      github: "github.com/hassaankhalid23"
    },
    avatarUrl: ""
  });
  const [skillInput, setSkillInput] = useState("");
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function loadProfile() {
      try {
        const data = await apiClient.get<any>("/user/profile");
        if (data) {
          setProfileData(prev => ({
            ...prev,
            ...data,
            contact: data.contact || prev.contact,
            skills: data.skills || prev.skills,
          }));
          if (data.avatarUrl) setAvatarPreview(data.avatarUrl);
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadProfile();
  }, []);

  const saveProfile = async (updatedData: any = {}) => {
    try {
      const payload = { ...profileData, ...updatedData };
      await apiClient.put("/user/profile", payload);
    } catch (error) {
      console.error("Failed to save profile:", error);
    }
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const localUrl = URL.createObjectURL(file);
    setAvatarPreview(localUrl);

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", config.CLOUDINARY.UPLOAD_PRESET);

    try {
      const response = await fetch(config.CLOUDINARY.UPLOAD_URL, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.secure_url) {
        const updatedImageUrl = data.secure_url;
        setProfileData(prev => ({ ...prev, avatarUrl: updatedImageUrl }));
        await saveProfile({ avatarUrl: updatedImageUrl });
        setAvatarPreview(updatedImageUrl);
      }
    } catch (error) {
      console.error("Cloudinary upload failed:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const addSkill = () => {
    if (skillInput.trim() && !profileData.skills.includes(skillInput.trim())) {
      const newSkills = [...profileData.skills, skillInput.trim()];
      setProfileData(prev => ({ ...prev, skills: newSkills }));
      saveProfile({ skills: newSkills });
      setSkillInput("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    const newSkills = profileData.skills.filter(s => s !== skillToRemove);
    setProfileData(prev => ({ ...prev, skills: newSkills }));
    saveProfile({ skills: newSkills });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--bg-base)] pt-32">
        <div className="container-custom max-w-6xl space-y-8">
          <Skeleton className="h-64 w-full rounded-[48px]" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Skeleton className="h-80 rounded-[48px]" />
            <Skeleton className="h-80 rounded-[48px]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-[var(--bg-base)] pt-32 pb-24">
        <div className="container-custom max-w-6xl px-6">
          
          {/* ── Minimalist Premium Header ── */}
          <FadeIn direction="up">
            <div className="bg-white dark:bg-[var(--bg-card)] border-2 border-[var(--border)] rounded-[48px] p-8 md:p-14 mb-10 shadow-sm flex flex-col md:flex-row items-center gap-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--primary)]/5 rounded-full blur-[100px] -mr-48 -mt-48 pointer-events-none" />
              
              <div className="relative group shrink-0">
                <div className="w-48 h-48 rounded-[56px] bg-gradient-to-tr from-[var(--primary)] to-[#A8BA9A] flex items-center justify-center text-6xl font-black text-white shadow-2xl overflow-hidden relative border-4 border-white dark:border-gray-800">
                  {avatarPreview ? (
                    <img src={avatarPreview} alt="Avatar" className={`w-full h-full object-cover transition-all duration-700 ${isUploading ? 'opacity-50 scale-110 blur-sm' : 'opacity-100 scale-100'}`} />
                  ) : (
                    profileData.name.split(' ').map(n => n[0]).join('')
                  )}
                  {isUploading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
                      <Loader2 className="w-12 h-12 text-white animate-spin" />
                    </div>
                  )}
                </div>
                <button 
                  onClick={() => setIsEditingProfile(true)}
                  className="absolute -bottom-2 -right-2 w-14 h-14 rounded-2xl bg-white dark:bg-gray-800 border-2 border-[var(--border)] flex items-center justify-center text-[var(--primary)] shadow-2xl hover:scale-110 transition-all z-10"
                >
                  <Camera className="w-7 h-7" />
                </button>
              </div>

              <div className="flex-1 text-center md:text-left relative z-10">
                <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                  <h1 className="text-5xl md:text-6xl font-black font-headline text-[var(--text-primary)] tracking-tight">{profileData.name}</h1>
                  <Badge className="w-fit mx-auto md:mx-0 bg-[var(--primary)] text-white border-none rounded-full px-5 py-1.5 text-xs font-black uppercase tracking-widest shadow-lg shadow-[var(--primary)]/30">Verified Pro</Badge>
                </div>
                <p className="text-2xl text-[var(--text-secondary)] font-bold mb-8 flex items-center justify-center md:justify-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center">
                    <Briefcase className="w-4 h-4 text-[var(--primary)]" />
                  </div>
                  {profileData.jobTitle}
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-8 text-sm text-[var(--text-muted)] font-black uppercase tracking-[0.1em]">
                  <span className="flex items-center gap-2.5"><MapPin className="w-5 h-5 text-[var(--primary)]" /> {profileData.location}</span>
                  <span className="flex items-center gap-2.5"><Calendar className="w-5 h-5 text-[var(--primary)]" /> Active April 2026</span>
                </div>
              </div>

              <Button 
                onClick={() => setIsEditingProfile(true)}
                className="bg-black dark:bg-white dark:text-black hover:opacity-90 text-white h-16 px-12 rounded-[28px] font-black text-lg shadow-2xl transition-all hover:scale-[1.02] active:scale-95 whitespace-nowrap"
              >
                Edit Details
              </Button>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* ── Left Content: About & Skills ── */}
            <div className="lg:col-span-7 space-y-10">
              
              {/* About Section */}
              <FadeIn delay={0.1}>
                <div className="bg-white dark:bg-[var(--bg-card)] border-2 border-[var(--border)] rounded-[48px] p-12 shadow-sm relative group">
                  <div className="flex justify-between items-center mb-10">
                    <h2 className="text-3xl font-black flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-500">
                        <Shield className="w-6 h-6" />
                      </div>
                      Personal Bio
                    </h2>
                    <button 
                      onClick={() => {
                        if (isEditingAbout) saveProfile();
                        setIsEditingAbout(!isEditingAbout);
                      }}
                      className="w-12 h-12 rounded-2xl bg-gray-50 dark:bg-white/5 flex items-center justify-center text-[var(--primary)] hover:scale-110 transition-all border border-[var(--border)]"
                    >
                      {isEditingAbout ? <Check className="w-6 h-6" /> : <Edit2 className="w-6 h-6" />}
                    </button>
                  </div>
                  {isEditingAbout ? (
                    <textarea 
                      value={profileData.about}
                      onChange={(e) => setProfileData(prev => ({ ...prev, about: e.target.value }))}
                      className="w-full p-8 rounded-[32px] border-2 border-[var(--border)] bg-[var(--bg-base)] text-[var(--text-secondary)] leading-relaxed text-xl focus:outline-none focus:border-[var(--primary)] transition-all min-h-[250px] font-bold"
                    />
                  ) : (
                    <p className="text-[var(--text-secondary)] leading-relaxed text-xl font-bold italic opacity-90">
                      "{profileData.about}"
                    </p>
                  )}
                </div>
              </FadeIn>

              {/* Skills Section */}
              <FadeIn delay={0.2}>
                <div className="bg-white dark:bg-[var(--bg-card)] border-2 border-[var(--border)] rounded-[48px] p-12 shadow-sm">
                  <h2 className="text-3xl font-black mb-10 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500">
                      <Award className="w-6 h-6" />
                    </div>
                    Core Expertise
                  </h2>
                  <div className="flex flex-wrap gap-4 mb-12">
                    {profileData.skills.map(skill => (
                      <Badge key={skill} className="bg-[var(--bg-base)] text-[var(--text-primary)] px-8 py-4 rounded-[20px] border-2 border-[var(--border)] flex items-center gap-4 text-sm font-black shadow-sm hover:border-[var(--primary)] hover:bg-white transition-all cursor-default">
                        {skill}
                        <button onClick={() => removeSkill(skill)} className="text-red-400 hover:text-red-600">
                          <X className="w-5 h-5" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-5">
                    <input 
                      type="text"
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && addSkill()}
                      placeholder="Enter a skill (e.g. Docker, SEO)..."
                      className="flex-1 bg-[var(--bg-base)] border-2 border-[var(--border)] rounded-[24px] px-8 py-5 text-xl focus:outline-none focus:border-[var(--primary)] transition-all font-black placeholder:text-[var(--text-muted)]"
                    />
                    <Button onClick={addSkill} className="bg-[var(--primary)] text-white h-16 px-10 rounded-[24px] font-black text-xl shadow-xl hover:scale-105 active:scale-95 transition-all">
                      Add <Plus className="w-6 h-6 ml-2" />
                    </Button>
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* ── Right Content: Contact ── */}
            <div className="lg:col-span-5 space-y-10">
              <FadeIn delay={0.3}>
                <div className="bg-white dark:bg-[var(--bg-card)] border-2 border-[var(--border)] rounded-[48px] p-12 shadow-sm">
                  <div className="flex justify-between items-center mb-12">
                    <h3 className="text-3xl font-black tracking-tight">Connect</h3>
                    <button 
                      onClick={() => {
                        if (isEditingContact) saveProfile();
                        setIsEditingContact(!isEditingContact);
                      }}
                      className="w-14 h-14 rounded-2xl bg-gray-50 dark:bg-white/5 flex items-center justify-center text-[var(--primary)] border border-[var(--border)] shadow-sm hover:scale-110 transition-all"
                    >
                      {isEditingContact ? <Check className="w-7 h-7" /> : <Edit2 className="w-7 h-7" />}
                    </button>
                  </div>
                  
                  <div className="space-y-12">
                    <div className="relative">
                      <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-[0.3em] mb-4 ml-1">Direct Email</p>
                      {isEditingContact ? (
                        <input 
                          type="email"
                          value={profileData.contact.email}
                          onChange={(e) => setProfileData(prev => ({ ...prev, contact: { ...prev.contact, email: e.target.value } }))}
                          className="w-full bg-[var(--bg-base)] border-2 border-[var(--border)] rounded-[24px] px-6 py-5 focus:outline-none focus:border-[var(--primary)] transition-all font-black text-lg"
                        />
                      ) : (
                        <div className="flex items-center gap-5 group">
                          <div className="w-14 h-14 rounded-2xl bg-blue-500/5 flex items-center justify-center text-blue-500 border border-blue-500/10">
                            <Mail className="w-7 h-7" />
                          </div>
                          <p className="text-xl font-black text-[var(--text-primary)] hover:text-[var(--primary)] transition-colors cursor-pointer truncate">{profileData.contact.email}</p>
                        </div>
                      )}
                    </div>

                    <div className="relative">
                      <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-[0.3em] mb-4 ml-1">LinkedIn Network</p>
                      {isEditingContact ? (
                        <input 
                          type="text"
                          value={profileData.contact.linkedin}
                          onChange={(e) => setProfileData(prev => ({ ...prev, contact: { ...prev.contact, linkedin: e.target.value } }))}
                          className="w-full bg-[var(--bg-base)] border-2 border-[var(--border)] rounded-[24px] px-6 py-5 focus:outline-none focus:border-[var(--primary)] transition-all font-black text-lg"
                        />
                      ) : (
                        <div className="flex items-center gap-5 group">
                          <div className="w-14 h-14 rounded-2xl bg-blue-600/5 flex items-center justify-center text-blue-600 border border-blue-600/10">
                            <Share2 className="w-7 h-7" />
                          </div>
                          <p className="text-xl font-black text-[var(--text-primary)] hover:text-blue-600 transition-colors cursor-pointer truncate">{profileData.contact.linkedin}</p>
                        </div>
                      )}
                    </div>

                    <div className="relative">
                      <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-[0.3em] mb-4 ml-1">GitHub Repositories</p>
                      {isEditingContact ? (
                        <input 
                          type="text"
                          value={profileData.contact.github}
                          onChange={(e) => setProfileData(prev => ({ ...prev, contact: { ...prev.contact, github: e.target.value } }))}
                          className="w-full bg-[var(--bg-base)] border-2 border-[var(--border)] rounded-[24px] px-6 py-5 focus:outline-none focus:border-[var(--primary)] transition-all font-black text-lg"
                        />
                      ) : (
                        <div className="flex items-center gap-5 group">
                          <div className="w-14 h-14 rounded-2xl bg-gray-900/5 dark:bg-white/5 flex items-center justify-center text-gray-900 dark:text-white border border-gray-900/10">
                            <LinkIcon className="w-7 h-7" />
                          </div>
                          <p className="text-xl font-black text-[var(--text-primary)] hover:text-gray-600 transition-colors cursor-pointer truncate">{profileData.contact.github}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </FadeIn>

              {/* Stats Card */}
              <FadeIn delay={0.4}>
                <div className="bg-black text-white rounded-[48px] p-12 shadow-3xl">
                  <div className="flex items-center justify-between mb-10">
                    <h4 className="text-2xl font-black">Performance</h4>
                    <div className="px-4 py-1.5 rounded-full bg-green-500/20 text-green-400 text-[10px] font-black uppercase tracking-widest">Active</div>
                  </div>
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <p className="text-5xl font-black mb-2">92%</p>
                      <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">Visibility</p>
                    </div>
                    <div>
                      <p className="text-5xl font-black mb-2">24</p>
                      <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">Offers</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>

        {/* ── Redesigned Edit Modal ── */}
        {isEditingProfile && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={() => setIsEditingProfile(false)} />
            <FadeIn direction="up" className="w-full max-w-2xl bg-white dark:bg-gray-900 border-2 border-white/10 rounded-[64px] overflow-hidden shadow-2xl relative z-10">
              <div className="p-12 md:p-16">
                <div className="flex justify-between items-center mb-12">
                  <h3 className="text-4xl font-black tracking-tight">Edit Profile</h3>
                  <button onClick={() => setIsEditingProfile(false)} className="w-14 h-14 rounded-2xl bg-gray-100 dark:bg-white/5 flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-all">
                    <X className="w-7 h-7" />
                  </button>
                </div>

                <div className="space-y-10">
                  {/* Photo Upload Box */}
                  <div className="flex flex-col items-center justify-center p-10 bg-[var(--bg-base)] border-2 border-dashed border-[var(--border)] rounded-[40px] text-center">
                    <div className="w-24 h-24 rounded-3xl bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mb-6 shadow-inner">
                      {isUploading ? <Loader2 className="w-10 h-10 animate-spin" /> : <Camera className="w-10 h-10" />}
                    </div>
                    <p className="font-black text-xl mb-6">Profile Picture</p>
                    <Button 
                      onClick={() => fileRef.current?.click()}
                      disabled={isUploading}
                      className="bg-white text-black border-2 border-black hover:bg-black hover:text-white h-14 px-10 rounded-2xl font-black transition-all"
                    >
                      {isUploading ? 'Uploading Image...' : 'Upload New Photo'}
                    </Button>
                    <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-xs font-black text-[var(--text-muted)] uppercase tracking-widest mb-4 ml-1">Full Name</label>
                      <input 
                        type="text" 
                        value={profileData.name} 
                        onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full bg-[var(--bg-base)] border-2 border-[var(--border)] rounded-2xl px-6 py-5 focus:outline-none focus:border-[var(--primary)] transition-all font-black text-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-[var(--text-muted)] uppercase tracking-widest mb-4 ml-1">Current Role</label>
                      <input 
                        type="text" 
                        value={profileData.jobTitle} 
                        onChange={(e) => setProfileData(prev => ({ ...prev, jobTitle: e.target.value }))}
                        className="w-full bg-[var(--bg-base)] border-2 border-[var(--border)] rounded-2xl px-6 py-5 focus:outline-none focus:border-[var(--primary)] transition-all font-black text-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-[var(--text-muted)] uppercase tracking-widest mb-4 ml-1">Portfolio</label>
                      <input 
                        type="text" 
                        value={profileData.portfolio} 
                        onChange={(e) => setProfileData(prev => ({ ...prev, portfolio: e.target.value }))}
                        className="w-full bg-[var(--bg-base)] border-2 border-[var(--border)] rounded-2xl px-6 py-5 focus:outline-none focus:border-[var(--primary)] transition-all font-black text-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-[var(--text-muted)] uppercase tracking-widest mb-4 ml-1">Current City</label>
                      <input 
                        type="text" 
                        value={profileData.location} 
                        onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                        className="w-full bg-[var(--bg-base)] border-2 border-[var(--border)] rounded-2xl px-6 py-5 focus:outline-none focus:border-[var(--primary)] transition-all font-black text-lg"
                      />
                    </div>
                  </div>
                  
                  <Button 
                    onClick={() => { saveProfile(); setIsEditingProfile(false); }}
                    className="w-full bg-[var(--primary)] hover:opacity-90 text-white h-20 rounded-[32px] font-black text-2xl shadow-3xl shadow-[var(--primary)]/30 transition-all active:scale-[0.98] mt-4"
                  >
                    Confirm & Save Profile
                  </Button>
                </div>
              </div>
            </FadeIn>
          </div>
        )}
      </div>
    </>
  );
}
