import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Calendar, Send, Users, Bookmark, Eye, ArrowUp, ArrowDown, Minus, MoreVertical, Sparkles } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/fade-in";

export default function DashboardPage() {
  return (
    <>
      {/* Welcome Area */}
      <FadeIn direction="down" delay={0.1}>
        <div>
          <h1 className="text-3xl font-bold font-headline text-[var(--text-primary)] mb-4">Welcome back, Alex!</h1>
          <div className="inline-flex items-center gap-2 bg-[#678D63]/10 text-[#166534] dark:text-green-400 px-4 py-2 rounded-xl text-sm font-bold border-2 border-[#678D63]/20">
            <Calendar className="w-4 h-4" /> You have 3 interview requests this week.
          </div>
        </div>
      </FadeIn>

      {/* Stat Cards */}
      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Total Applications", value: "45", change: "+12%", color: "text-[#678D63]", bg: "bg-[#678D63]/10", icon: <Send className="w-5 h-5" /> },
          { title: "Interviews", value: "12", change: "+5%", color: "text-[#166534]", bg: "bg-[#166534]/10", icon: <Users className="w-5 h-5" /> },
          { title: "Saved Jobs", value: "28", change: "0%", color: "text-[#88A682]", bg: "bg-[#88A682]/10", icon: <Bookmark className="w-5 h-5" />, neutral: true },
          { title: "Profile Views", value: "342", change: "-2%", color: "text-[#4A6E46]", bg: "bg-[#4A6E46]/10", icon: <Eye className="w-5 h-5" />, negative: true }
        ].map((stat, i) => (
          <StaggerItem key={i}>
            <Card className="border-2 border-[var(--border)] shadow-sm hover:shadow-premium-sm transition-all hover:-translate-y-1 duration-300 bg-white dark:bg-white/5">
              <CardContent className="p-5 flex flex-col justify-between h-full">
                <div className="flex justify-between items-start mb-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.bg} ${stat.color}`}>
                    {stat.icon}
                  </div>
                  <span className={`flex items-center gap-1 text-xs font-bold ${stat.negative ? 'text-red-500' : stat.neutral ? 'text-gray-400' : 'text-[#678D63]'}`}>
                    {stat.change} {stat.negative ? <ArrowDown className="w-3 h-3" /> : stat.neutral ? <Minus className="w-3 h-3" /> : <ArrowUp className="w-3 h-3" />}
                  </span>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-[var(--text-secondary)] mb-1">{stat.title}</h3>
                  <p className="text-3xl font-bold font-headline">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (Tables) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Application Status */}
          <FadeIn delay={0.4} direction="up">
            <Card className="shadow-sm bg-white dark:bg-white/5 overflow-hidden">
              <CardContent className="p-0">
                <div className="p-6 border-b-2 border-[var(--border)] flex justify-between items-center">
                  <h3 className="text-lg font-bold font-headline">Application Status</h3>
                  <button className="text-sm font-bold text-[var(--primary)] hover:underline">View All</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-[11px] uppercase tracking-wider text-[var(--text-muted)] bg-[var(--bg-base)]">
                      <tr>
                        <th className="px-6 py-4 font-bold">Company</th>
                        <th className="px-6 py-4 font-bold">Position</th>
                        <th className="px-6 py-4 font-bold">Status</th>
                        <th className="px-6 py-4 font-bold">Date</th>
                        <th className="px-6 py-4 font-bold text-right"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y-2 divide-[var(--border)]">
                      {[
                        { company: "Google", pos: "Senior UX Designer", status: "Interviewing", statusColor: "text-[#678D63] bg-[#678D63]/10", date: "Oct 24, 2023", initial: "G" },
                        { company: "Figma", pos: "Product Lead", status: "Applied", statusColor: "text-green-600 bg-green-50 dark:bg-green-900/20", date: "Oct 22, 2023", initial: "F" },
                        { company: "Stripe", pos: "Visual Designer", status: "Closed", statusColor: "text-gray-500 bg-gray-100 dark:bg-gray-800", date: "Oct 18, 2023", initial: "S" },
                        { company: "Airbnb", pos: "UX Architect", status: "Interviewing", statusColor: "text-[#678D63] bg-[#678D63]/10", date: "Oct 15, 2023", initial: "A" }
                      ].map((app, i) => (
                        <tr key={i} className="hover:bg-[var(--bg-base)] transition-colors group">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded bg-[var(--bg-base)] border-2 border-[var(--border)] flex items-center justify-center font-bold text-xs group-hover:border-[var(--primary)] transition-colors">{app.initial}</div>
                              <span className="font-semibold group-hover:text-[var(--primary)] transition-colors">{app.company}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-[var(--text-secondary)] font-medium">{app.pos}</td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${app.statusColor}`}>
                              {app.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-[var(--text-secondary)]">{app.date}</td>
                          <td className="px-6 py-4 text-right text-[var(--text-muted)] cursor-pointer hover:text-[var(--text-primary)] flex justify-end">
                            <MoreVertical className="w-4 h-4" />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </FadeIn>

          {/* Recent Activity */}
          <FadeIn delay={0.5} direction="up">
            <Card className="shadow-sm bg-white dark:bg-white/5">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold font-headline mb-6">Recent Activity</h3>
                <div className="relative border-l-2 border-[var(--border)] ml-3 pl-6 space-y-6">
                  <div className="relative group cursor-pointer">
                    <div className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-[var(--primary)] border-2 border-white dark:border-[var(--bg-card)] group-hover:scale-125 transition-transform shadow-sm"></div>
                    <p className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--primary)] transition-colors">New message from Recruiting Team at Google</p>
                    <p className="text-sm text-[var(--text-secondary)] mt-1">"Hi Alex, we'd like to schedule your next round of interviews..."</p>
                    <span className="text-xs text-[var(--text-muted)] mt-2 block font-medium">2 hours ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </FadeIn>

        </div>

        {/* Right Column (Sidebar cards) */}
        <div className="space-y-6">
          
          {/* Recommended for You */}
          <FadeIn delay={0.6} direction="left">
            <Card className="shadow-sm bg-white dark:bg-white/5">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold font-headline mb-6">Recommended for You</h3>
                <div className="space-y-4">
                  
                  {/* Rec Job 1 */}
                  <div className="p-4 border-2 border-[var(--border)] rounded-xl hover:border-[var(--primary)] transition-all duration-300 hover:shadow-premium-sm group bg-white dark:bg-transparent">
                    <div className="flex gap-3 mb-3">
                      <div className="w-8 h-8 bg-black rounded-lg flex flex-shrink-0"></div>
                      <div>
                        <h4 className="font-bold text-sm text-[var(--text-primary)] group-hover:text-[var(--primary)] transition-colors">Senior UI Designer</h4>
                        <p className="text-xs text-[var(--text-secondary)] font-medium">Spotify • Remote</p>
                      </div>
                    </div>
                    <div className="flex gap-2 mb-4">
                      <Badge variant="secondary" className="text-[10px] bg-[#678D63]/10 text-[#166534] dark:bg-green-900/30 dark:text-green-300 py-0.5 px-2 border-none font-bold">$140k - $180k</Badge>
                      <Badge variant="secondary" className="text-[10px] bg-[#678D63]/5 text-[#678D63] dark:bg-green-900/10 dark:text-green-400 py-0.5 px-2 border-none font-bold">Full-time</Badge>
                    </div>
                    <Button className="w-full bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white h-9 text-xs font-bold transition-all duration-300 rounded-lg active:scale-[0.98]">Quick Apply</Button>
                  </div>

                  {/* Rec Job 2 */}
                  <div className="p-4 border-2 border-[var(--border)] rounded-xl hover:border-[var(--primary)] transition-all duration-300 hover:shadow-premium-sm group bg-white dark:bg-transparent">
                    <div className="flex gap-3 mb-3">
                      <div className="w-8 h-8 bg-black rounded-lg flex flex-shrink-0"></div>
                      <div>
                        <h4 className="font-bold text-sm text-[var(--text-primary)] group-hover:text-[var(--primary)] transition-colors">Interaction Designer</h4>
                        <p className="text-xs text-[var(--text-secondary)] font-medium">Netflix • Los Gatos, CA</p>
                      </div>
                    </div>
                    <div className="flex gap-2 mb-4">
                      <Badge variant="secondary" className="text-[10px] bg-[#678D63]/10 text-[#166534] dark:bg-green-900/30 dark:text-green-300 py-0.5 px-2 border-none font-bold">$160k - $210k</Badge>
                      <Badge variant="secondary" className="text-[10px] bg-[#678D63]/5 text-[#678D63] dark:bg-green-900/10 dark:text-green-400 py-0.5 px-2 border-none font-bold">On-site</Badge>
                    </div>
                    <Button className="w-full bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white h-9 text-xs font-bold transition-all duration-300 rounded-lg active:scale-[0.98]">Quick Apply</Button>
                  </div>

                </div>
              </CardContent>
            </Card>
          </FadeIn>

          {/* Profile Strength */}
          <FadeIn delay={0.7} direction="up">
            <Card className="bg-gradient-to-br from-[#678D63] to-[#166534] text-white border-none shadow-md overflow-hidden relative group cursor-pointer hover:shadow-lg transition-shadow duration-300">
              <div className="absolute -right-4 -bottom-4 opacity-10 pointer-events-none group-hover:scale-110 group-hover:rotate-12 transition-transform duration-700">
                <Sparkles className="w-32 h-32" />
              </div>
              <CardContent className="p-6 relative z-10">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold font-headline text-lg">Profile Strength</h3>
                  <Badge className="bg-white/20 hover:bg-white/30 text-white border-none font-bold transition-colors duration-300">Excellent</Badge>
                </div>
                <p className="text-sm text-green-100 mb-6">You're in the top 5% of designers this month.</p>
                
                <div className="w-full bg-black/30 rounded-full h-2 mb-2">
                  <div className="bg-white h-2 rounded-full w-[92%]"></div>
                </div>
                <div className="flex justify-between text-xs text-green-200 font-medium">
                  <span>92% Complete</span>
                  <a href="#" className="text-white hover:underline">Improve profile</a>
                </div>
              </CardContent>
            </Card>
          </FadeIn>

        </div>
      </div>
    </>
  );
}
