"use client";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/fade-in";
import { 
  Users, Mail, MapPin, Building, Calendar, Edit2, Shield, 
  Link as LinkIcon, Globe, Award, Briefcase, GraduationCap, Share2,
  Plus, X, Camera, Save, Check, Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState, useRef, useEffect } from "react";
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
    about: "Creative and detail-oriented Product Designer with over 5 years of experience in the tech industry. I specialize in building complex design systems and intuitive user interfaces for SaaS and Fintech platforms. My goal is to bridge the gap between user needs and business objectives through elegant, functional design.",
    skills: ['Product Design', 'UI/UX', 'Design Systems', 'Figma', 'React', 'User Research'],
    jobTitle: "Senior Product Designer at CreativeLabs",
    contact: {
      email: "hassaankhalid@HireArc.com",
      linkedin: "linkedin.com/in/hassaankhalid",
      github: "github.com/hassaankhalid"
    }
  });
  const [skillInput, setSkillInput] = useState("");
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
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

  const [isUploading, setIsUploading] = useState(false);

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 1. Show local preview immediately
    const localUrl = URL.createObjectURL(file);
    setAvatarPreview(localUrl);

    // 2. Upload to Cloudinary
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
        // 3. Update State & Database
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
      <div className="min-h-screen bg-[var(--bg-base)] pt-24 pb-20">
        <div className="container-custom max-w-5xl space-y-8">
          <Skeleton className="h-64 w-full rounded-[40px]" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <Skeleton className="h-48 w-full rounded-[32px]" />
              <Skeleton className="h-48 w-full rounded-[32px]" />
            </div>
            <Skeleton className="h-96 w-full rounded-[32px]" />
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="min-h-screen bg-[var(--bg-base)] pt-24 pb-20">
      <div className="container-custom max-w-5xl">
        
        {/* Header Section */}
        <FadeIn direction="down">
          <div className="bg-white dark:bg-[var(--bg-card)] border-2 border-[var(--border)] rounded-[40px] overflow-hidden mb-8 shadow-sm">
            <div className="h-48 bg-gradient-to-r from-[#2E4633] via-[#446644] to-[#678D63] relative">
              <div 
                className="absolute inset-0 opacity-20 mix-blend-overlay"
                style={{ backgroundImage: `url('${config.ASSETS.GRAINY_BACKGROUND}')` }}
              ></div>
            </div>
            
            <div className="px-10 pb-10 relative">
              <div className="absolute -top-20 left-10">
                <div className="w-40 h-40 rounded-[32px] bg-white dark:bg-gray-800 p-2 shadow-2xl relative group">
                  <div className="w-full h-full rounded-[24px] bg-gradient-to-tr from-[#678D63] to-[#A8BA9A] flex items-center justify-center text-5xl font-bold text-white shadow-inner overflow-hidden relative">
                    {avatarPreview ? (
                      <img src={avatarPreview} alt="Avatar" className={`w-full h-full object-cover transition-opacity ${isUploading ? 'opacity-50' : 'opacity-100'}`} />
                    ) : (
                      profileData.name.split(' ').map(n => n[0]).join('')
                    )}
                    {isUploading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <Loader2 className="w-10 h-10 text-white animate-spin" />
                      </div>
                    )}
                  </div>
                  {isEditingProfile && (
                    <button 
                      onClick={() => fileRef.current?.click()}
                      className="absolute inset-2 rounded-[24px] bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    >
                      <Camera className="w-8 h-8 text-white" />
                    </button>
                  )}
                  <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                </div>
              </div>

              <div className="pt-24 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-4xl font-extrabold font-headline text-[var(--text-primary)]">{profileData.name}</h1>
                    <Badge className="bg-[#F0FDF4] text-[#166534] border-[#DCFCE7] rounded-full px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider">Premium</Badge>
                  </div>
                  <p className="text-lg text-[var(--text-secondary)] font-medium flex items-center gap-2 mb-4">
                    <Briefcase className="w-5 h-5 text-[var(--primary)]" /> {profileData.jobTitle}
                  </p>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-[var(--text-muted)] font-medium">
                    <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {profileData.location}</span>
                    <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> Joined April 2026</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3 w-full md:w-auto">
                  <Button variant="outline" className="rounded-2xl border-2 hover:bg-gray-50 dark:hover:bg-white/5 px-6">
                    <Globe className="w-4 h-4 mr-2" /> {profileData.portfolio}
                  </Button>
                  <Button 
                    onClick={() => setIsEditingProfile(true)}
                    className="bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white rounded-2xl px-8 font-bold shadow-lg shadow-[var(--primary)]/20 transition-all hover:scale-105 active:scale-95"
                  >
                    <Edit2 className="w-4 h-4 mr-2" /> Edit Profile
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Details */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* About Section */}
            <FadeIn delay={0.1} direction="up">
              <div className="bg-white dark:bg-[var(--bg-card)] border-2 border-[var(--border)] rounded-[32px] p-8 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <Shield className="w-6 h-6 text-[var(--primary)]" /> About Me
                  </h2>
                  <button 
                    onClick={() => {
                      if (isEditingAbout) saveProfile();
                      setIsEditingAbout(!isEditingAbout);
                    }}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-xl transition-colors text-[var(--primary)]"
                  >
                    {isEditingAbout ? <Check className="w-5 h-5" /> : <Edit2 className="w-5 h-5" />}
                  </button>
                </div>
                {isEditingAbout ? (
                  <textarea 
                    value={profileData.about}
                    onChange={(e) => setProfileData(prev => ({ ...prev, about: e.target.value }))}
                    className="w-full p-4 rounded-2xl border-2 border-[var(--border)] bg-[var(--bg-base)] text-[var(--text-secondary)] leading-relaxed text-lg focus:outline-none focus:border-[var(--primary)] transition-all min-h-[150px]"
                  />
                ) : (
                  <p className="text-[var(--text-secondary)] leading-relaxed text-lg">
                    {profileData.about}
                  </p>
                )}
              </div>
            </FadeIn>

            {/* Skills Section */}
            <FadeIn delay={0.15} direction="up">
              <div className="bg-white dark:bg-[var(--bg-card)] border-2 border-[var(--border)] rounded-[32px] p-8 shadow-sm">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Award className="w-6 h-6 text-[var(--primary)]" /> Skills
                </h2>
                <div className="flex flex-wrap gap-2 mb-6">
                  {profileData.skills.map(skill => (
                    <Badge key={skill} variant="secondary" className="bg-[#F8FAFC] dark:bg-white/5 text-[var(--text-secondary)] px-4 py-1.5 rounded-xl border-2 border-[var(--border)] flex items-center gap-2">
                      {skill}
                      <button onClick={() => removeSkill(skill)} className="hover:text-red-500 transition-colors">
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-3">
                  <input 
                    type="text"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addSkill()}
                    placeholder="Add a new skill..."
                    className="flex-1 bg-[var(--bg-base)] border-2 border-[var(--border)] rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-[var(--primary)] transition-all"
                  />
                  <Button onClick={addSkill} className="bg-[var(--primary)] text-white px-4 py-2 rounded-xl">
                    <Plus className="w-4 h-4 mr-2" /> Add Skill
                  </Button>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right Column: Sidebar */}
          <div className="space-y-8">
            {/* Contact Info */}
            <FadeIn delay={0.3} direction="left">
              <div className="bg-white dark:bg-[var(--bg-card)] border-2 border-[var(--border)] rounded-[32px] p-8 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold">Contact Information</h3>
                  <button 
                    onClick={() => {
                      if (isEditingContact) saveProfile();
                      setIsEditingContact(!isEditingContact);
                    }}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-xl transition-colors text-[var(--primary)]"
                  >
                    {isEditingContact ? <Check className="w-5 h-5" /> : <Edit2 className="w-5 h-5" />}
                  </button>
                </div>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-50 dark:bg-white/5 flex items-center justify-center text-[var(--primary)]">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-[var(--text-muted)] font-bold uppercase tracking-wider">Email</p>
                      {isEditingContact ? (
                        <input 
                          type="email"
                          value={profileData.contact.email}
                          onChange={(e) => setProfileData(prev => ({ ...prev, contact: { ...prev.contact, email: e.target.value } }))}
                          className="w-full bg-[var(--bg-base)] border-2 border-[var(--border)] rounded-xl px-3 py-1.5 focus:outline-none focus:border-[var(--primary)] transition-all text-sm font-bold"
                        />
                      ) : (
                        <p className="text-sm font-bold truncate">{profileData.contact.email}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-50 dark:bg-white/5 flex items-center justify-center text-blue-600">
                      <Share2 className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-[var(--text-muted)] font-bold uppercase tracking-wider">LinkedIn</p>
                      {isEditingContact ? (
                        <input 
                          type="text"
                          value={profileData.contact.linkedin}
                          onChange={(e) => setProfileData(prev => ({ ...prev, contact: { ...prev.contact, linkedin: e.target.value } }))}
                          className="w-full bg-[var(--bg-base)] border-2 border-[var(--border)] rounded-xl px-3 py-1.5 focus:outline-none focus:border-[var(--primary)] transition-all text-sm font-bold"
                        />
                      ) : (
                        <p className="text-sm font-bold">{profileData.contact.linkedin}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-50 dark:bg-white/5 flex items-center justify-center text-gray-900 dark:text-white">
                      <LinkIcon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-[var(--text-muted)] font-bold uppercase tracking-wider">GitHub</p>
                      {isEditingContact ? (
                        <input 
                          type="text"
                          value={profileData.contact.github}
                          onChange={(e) => setProfileData(prev => ({ ...prev, contact: { ...prev.contact, github: e.target.value } }))}
                          className="w-full bg-[var(--bg-base)] border-2 border-[var(--border)] rounded-xl px-3 py-1.5 focus:outline-none focus:border-[var(--primary)] transition-all text-sm font-bold"
                        />
                      ) : (
                        <p className="text-sm font-bold">{profileData.contact.github}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditingProfile && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsEditingProfile(false)}
          />
          <FadeIn direction="up" className="w-full max-w-lg bg-white dark:bg-[var(--bg-card)] border-2 border-[var(--border)] rounded-[40px] overflow-hidden shadow-2xl relative z-10">
            <div className="p-10">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-bold font-headline">Edit Profile Details</h3>
                <button 
                  onClick={() => setIsEditingProfile(false)}
                  className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-2">Full Name</label>
                  <input 
                    type="text"
                    value={profileData.name}
                    onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full bg-[var(--bg-base)] border-2 border-[var(--border)] rounded-2xl px-5 py-3.5 focus:outline-none focus:border-[var(--primary)] transition-all font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-2">Portfolio URL</label>
                  <input 
                    type="text"
                    value={profileData.portfolio}
                    onChange={(e) => setProfileData(prev => ({ ...prev, portfolio: e.target.value }))}
                    className="w-full bg-[var(--bg-base)] border-2 border-[var(--border)] rounded-2xl px-5 py-3.5 focus:outline-none focus:border-[var(--primary)] transition-all font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-2">Location</label>
                  <input 
                    type="text"
                    value={profileData.location}
                    onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                    className="w-full bg-[var(--bg-base)] border-2 border-[var(--border)] rounded-2xl px-5 py-3.5 focus:outline-none focus:border-[var(--primary)] transition-all font-medium"
                  />
                </div>
                
                <Button 
                  onClick={() => {
                    saveProfile();
                    setIsEditingProfile(false);
                  }}
                  className="w-full bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white h-14 rounded-2xl font-bold text-lg shadow-lg shadow-[var(--primary)]/20 transition-all active:scale-[0.98] mt-4"
                >
                  <Save className="w-5 h-5 mr-2" /> Save Changes
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
