"use client";
import { useState, useRef, useEffect } from "react";
import { 
  Mail, MapPin, Building, Calendar, Edit2, Shield, 
  Link as LinkIcon, Globe, Award, Briefcase, 
  Plus, X, Camera, Save, Check, Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/ui/fade-in";
import { apiClient } from "@/services/api";
import { Skeleton } from "@/components/ui/skeleton";
import { config } from "@/config";

const Linkedin = ({ className }: { className?: string }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);

const Github = ({ className }: { className?: string }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5-.73 1.02-1.08 2.25-1 3.5 0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingAbout, setIsEditingAbout] = useState(false);
  const [isEditingContact, setIsEditingContact] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Hassaan Khalid",
    location: "Lahore, Pakistan",
    portfolio: "hassaankhalid.design",
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
      <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B1110] pt-32">
        <div className="container-custom max-w-5xl space-y-6">
          <Skeleton className="h-48 w-full rounded-2xl" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Skeleton className="md:col-span-2 h-80 rounded-2xl" />
            <Skeleton className="h-80 rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B1110] pt-24 pb-20">
        <div className="container-custom max-w-5xl px-4 sm:px-6 lg:px-8">
          
          {/* ── Refined Header ── */}
          <FadeIn direction="up">
            <div className="bg-white dark:bg-[#15201E] border border-slate-200 dark:border-white/5 rounded-2xl p-6 sm:p-8 mb-6 shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-6 relative overflow-hidden">
              <div className="relative group shrink-0">
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-3xl font-bold text-slate-400 overflow-hidden relative border border-slate-200 dark:border-white/10">
                  {avatarPreview ? (
                    <img src={avatarPreview} alt="Avatar" className={`w-full h-full object-cover transition-opacity duration-500 ${isUploading ? 'opacity-50' : 'opacity-100'}`} />
                  ) : (
                    profileData.name.split(' ').map(n => n[0]).join('')
                  )}
                  {isUploading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-[2px]">
                      <Loader2 className="w-8 h-8 text-white animate-spin" />
                    </div>
                  )}
                </div>
                <button 
                  onClick={() => setIsEditingProfile(true)}
                  className="absolute -bottom-2 -right-2 w-9 h-9 rounded-xl bg-white dark:bg-[#1E2D2A] border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-600 dark:text-slate-300 shadow-md hover:bg-slate-50 transition-all z-10"
                >
                  <Camera className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-2">
                  <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">{profileData.name}</h1>
                  <Badge className="w-fit mx-auto sm:mx-0 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-none rounded-full px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider">Premium Account</Badge>
                </div>
                <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 font-medium mb-4 flex items-center justify-center sm:justify-start gap-2">
                  <Briefcase className="w-4 h-4 text-emerald-500" /> {profileData.jobTitle}
                </p>
                <div className="flex flex-wrap justify-center sm:justify-start gap-5 text-sm text-slate-500 dark:text-slate-500 font-medium">
                  <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {profileData.location}</span>
                  <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> Joined April 2026</span>
                </div>
              </div>

              <Button 
                onClick={() => setIsEditingProfile(true)}
                variant="outline"
                className="h-10 px-6 rounded-xl font-semibold text-sm border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 transition-all w-full sm:w-auto"
              >
                <Edit2 className="w-3.5 h-3.5 mr-2" /> Edit Profile
              </Button>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* ── Main Content Column ── */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* About Section */}
              <FadeIn delay={0.1}>
                <div className="bg-white dark:bg-[#15201E] border border-slate-200 dark:border-white/5 rounded-2xl p-6 sm:p-8 shadow-sm">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-bold flex items-center gap-2 text-slate-900 dark:text-white">
                      <Shield className="w-5 h-5 text-emerald-500" /> About Me
                    </h2>
                    <button 
                      onClick={() => {
                        if (isEditingAbout) saveProfile();
                        setIsEditingAbout(!isEditingAbout);
                      }}
                      className="p-2 hover:bg-slate-50 dark:hover:bg-white/5 rounded-lg transition-colors text-slate-400 hover:text-emerald-500"
                    >
                      {isEditingAbout ? <Check className="w-5 h-5" /> : <Edit2 className="w-4 h-4" />}
                    </button>
                  </div>
                  {isEditingAbout ? (
                    <textarea 
                      value={profileData.about}
                      onChange={(e) => setProfileData(prev => ({ ...prev, about: e.target.value }))}
                      className="w-full p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-700 dark:text-slate-300 leading-relaxed text-base focus:outline-none focus:ring-1 focus:ring-emerald-500/50 transition-all min-h-[120px] font-medium"
                    />
                  ) : (
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-base">
                      {profileData.about}
                    </p>
                  )}
                </div>
              </FadeIn>

              {/* Skills Section */}
              <FadeIn delay={0.2}>
                <div className="bg-white dark:bg-[#15201E] border border-slate-200 dark:border-white/5 rounded-2xl p-6 sm:p-8 shadow-sm">
                  <h2 className="text-lg font-bold mb-6 flex items-center gap-2 text-slate-900 dark:text-white">
                    <Award className="w-5 h-5 text-emerald-500" /> Professional Skills
                  </h2>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {profileData.skills.map(skill => (
                      <Badge key={skill} className="bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 px-3 py-1.5 rounded-lg border-none flex items-center gap-2 text-xs font-semibold">
                        {skill}
                        <button onClick={() => removeSkill(skill)} className="hover:text-red-500">
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input 
                      type="text"
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && addSkill()}
                      placeholder="Add a skill..."
                      className="flex-1 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500/50 transition-all"
                    />
                    <Button onClick={addSkill} size="sm" className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl">
                      Add
                    </Button>
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* ── Sidebar Column ── */}
            <div className="space-y-6">
              <FadeIn delay={0.3}>
                <div className="bg-white dark:bg-[#15201E] border border-slate-200 dark:border-white/5 rounded-2xl p-6 sm:p-8 shadow-sm">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Contact</h3>
                    <button 
                      onClick={() => {
                        if (isEditingContact) saveProfile();
                        setIsEditingContact(!isEditingContact);
                      }}
                      className="p-2 hover:bg-slate-50 dark:hover:bg-white/5 rounded-lg transition-colors text-slate-400 hover:text-emerald-500"
                    >
                      {isEditingContact ? <Check className="w-5 h-5" /> : <Edit2 className="w-4 h-4" />}
                    </button>
                  </div>
                  
                  <div className="space-y-5">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Email</p>
                      {isEditingContact ? (
                        <input 
                          type="email"
                          value={profileData.contact.email}
                          onChange={(e) => setProfileData(prev => ({ ...prev, contact: { ...prev.contact, email: e.target.value } }))}
                          className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500/50"
                        />
                      ) : (
                        <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                          <Mail className="w-4 h-4 text-slate-400" />
                          <span className="text-sm font-medium truncate">{profileData.contact.email}</span>
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">LinkedIn</p>
                      {isEditingContact ? (
                        <input 
                          type="text"
                          value={profileData.contact.linkedin}
                          onChange={(e) => setProfileData(prev => ({ ...prev, contact: { ...prev.contact, linkedin: e.target.value } }))}
                          className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500/50"
                        />
                      ) : (
                        <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                          <Linkedin className="w-4 h-4 text-slate-400" />
                          <span className="text-sm font-medium truncate">{profileData.contact.linkedin}</span>
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">GitHub</p>
                      {isEditingContact ? (
                        <input 
                          type="text"
                          value={profileData.contact.github}
                          onChange={(e) => setProfileData(prev => ({ ...prev, contact: { ...prev.contact, github: e.target.value } }))}
                          className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500/50"
                        />
                      ) : (
                        <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                          <Github className="w-4 h-4 text-slate-400" />
                          <span className="text-sm font-medium truncate">{profileData.contact.github}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.4}>
                <div className="bg-slate-900 dark:bg-white/[0.02] rounded-2xl p-6 text-white border border-white/5">
                  <div className="flex items-center justify-between mb-6">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Strength</p>
                    <span className="text-emerald-400 text-xs font-bold">92%</span>
                  </div>
                  <div className="w-full bg-white/10 h-1.5 rounded-full mb-6">
                    <div className="bg-emerald-500 h-full w-[92%] rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">Your profile is highly visible to top recruiters.</p>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>

        {/* ── Refined Edit Modal ── */}
        {isEditingProfile && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsEditingProfile(false)} />
            <FadeIn direction="up" className="w-full max-w-lg bg-white dark:bg-[#15201E] border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-2xl relative z-10">
              <div className="p-6 sm:p-8">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Edit Profile</h3>
                  <button onClick={() => setIsEditingProfile(false)} className="text-slate-400 hover:text-red-500 transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Photo Section */}
                  <div className="flex items-center gap-6 p-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/10">
                    <div className="w-20 h-20 rounded-xl bg-slate-200 dark:bg-white/10 flex items-center justify-center overflow-hidden">
                      {isUploading ? <Loader2 className="w-6 h-6 animate-spin" /> : (avatarPreview ? <img src={avatarPreview} className="w-full h-full object-cover" /> : <Camera className="w-6 h-6" />)}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold mb-2">Profile Photo</p>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => fileRef.current?.click()}
                        disabled={isUploading}
                        className="h-9 px-4 rounded-lg font-semibold text-xs border-slate-200"
                      >
                        {isUploading ? 'Uploading...' : 'Change Photo'}
                      </Button>
                      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Full Name</label>
                      <input 
                        type="text" 
                        value={profileData.name} 
                        onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500/50 transition-all font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Job Title</label>
                      <input 
                        type="text" 
                        value={profileData.jobTitle} 
                        onChange={(e) => setProfileData(prev => ({ ...prev, jobTitle: e.target.value }))}
                        className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500/50 transition-all font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Portfolio</label>
                      <input 
                        type="text" 
                        value={profileData.portfolio} 
                        onChange={(e) => setProfileData(prev => ({ ...prev, portfolio: e.target.value }))}
                        className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500/50 transition-all font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Location</label>
                      <input 
                        type="text" 
                        value={profileData.location} 
                        onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                        className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500/50 transition-all font-medium"
                      />
                    </div>
                  </div>
                  
                  <Button 
                    onClick={() => { saveProfile(); setIsEditingProfile(false); }}
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-white h-12 rounded-xl font-bold text-base shadow-lg shadow-emerald-500/20 transition-all active:scale-[0.98] mt-2"
                  >
                    Save Changes
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
