import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function RecommendedPage() {
  return (
    <>
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold font-headline text-[var(--text-primary)] mb-2">Recommended for You</h1>
          <p className="text-[var(--text-secondary)]">AI-curated opportunities based on your profile and activity.</p>
        </div>
        <Button variant="outline" className="h-10 border-[var(--border)] text-[var(--text-primary)]">Update Preferences</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[
          { title: "Senior UI Designer", company: "Spotify", location: "Remote", match: "98%", tags: ["$140k - $180k", "Full-time", "Figma"], icon: "S", color: "bg-[#678D63]/10 text-[#166534]" },
          { title: "Interaction Designer", company: "Netflix", location: "Los Gatos, CA", match: "95%", tags: ["$160k - $210k", "On-site", "Prototyping"], icon: "N", color: "bg-red-50 text-red-700" },
          { title: "Lead Product Designer", company: "Apple", location: "Cupertino, CA", match: "92%", tags: ["$180k - $240k", "On-site", "Hardware"], icon: "A", color: "bg-gray-50 text-gray-700" },
          { title: "UX Engineer", company: "Vercel", location: "Remote", match: "89%", tags: ["$150k - $190k", "Full-time", "React"], icon: "V", color: "bg-black text-white" },
        ].map((job, i) => (
          <Card key={i} className="group hover:shadow-premium transition-all duration-300 border-2 border-[var(--border)] overflow-hidden relative bg-white dark:bg-white/5">
            <div className="absolute top-6 right-6 flex flex-col items-end">
              <Badge className="bg-[#678D63]/10 text-[#166534] dark:text-[#A8BA9A] hover:bg-[#678D63]/20 border-none px-2 py-1 flex gap-1 items-center font-bold">
                <span className="text-[10px]">✨ Match</span>
                {job.match}
              </Badge>
            </div>
            
            <CardContent className="p-8">
              <div className="flex gap-5 mb-6">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-xl flex-shrink-0 ${job.color}`}>
                  {job.icon}
                </div>
                <div className="pt-1">
                  <h3 className="text-xl font-bold text-[var(--text-primary)] group-hover:text-[var(--primary)] transition-colors cursor-pointer">{job.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)] font-medium">{job.company} • {job.location}</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {job.tags.map((tag, j) => (
                  <Badge key={j} variant="secondary" className="bg-[var(--bg-base)] text-[var(--text-secondary)] border-2 border-[var(--border)] font-semibold px-3 py-1 rounded-lg">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <div className="flex gap-3">
                <Button className="flex-1 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white font-bold h-12 rounded-xl transition-all active:scale-95 shadow-md">Quick Apply</Button>
                <Button variant="outline" className="flex-1 border-2 border-[var(--border)] font-bold text-[var(--text-primary)] hover:bg-[var(--bg-base)] h-12 rounded-xl transition-all">View Details</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
