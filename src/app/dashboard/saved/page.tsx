import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Bookmark } from "lucide-react";

export default function SavedJobsPage() {
  return (
    <>
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold font-headline text-[var(--text-primary)] mb-2">Saved Jobs</h1>
          <p className="text-[var(--text-secondary)]">You have 28 jobs saved for later.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { title: "Senior Product Designer", company: "Streamline Flow • California, US (Remote)", tags: ["Full-time", "$140k - $180k"], time: "Saved 2 days ago", icon: "SF" },
          { title: "UX Designer (Fintech)", company: "NeoBank Systems • London, UK (Hybrid)", tags: ["Full-time", "$90k - $130k"], time: "Saved 4 days ago", icon: "UX" },
          { title: "Visual Designer (Contract)", company: "Evolve Studio • Remote", tags: ["Contract", "$80 - $120 / hr"], time: "Saved 1 week ago", icon: "VD" },
          { title: "Lead Product Designer", company: "TechNova • New York, NY", tags: ["Full-time", "$160k - $200k"], time: "Saved 1 week ago", icon: "TN" },
        ].map((job, i) => (
          <Card key={i} className="hover:shadow-md transition-shadow border-[var(--border)] overflow-hidden">
            <CardContent className="p-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-lg bg-[var(--bg-base)] border border-[var(--border)] flex items-center justify-center flex-shrink-0">
                  <span className="text-xl font-bold">{job.icon}</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <Link href="/jobs/1" className="text-lg font-bold hover:text-blue-600 transition-colors">{job.title}</Link>
                    <button className="text-blue-600"><Bookmark className="w-5 h-5 fill-current" /></button>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] mb-4">{job.company}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {job.tags.map((tag, j) => (
                      <Badge key={j} variant="secondary" className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 rounded-sm">{tag}</Badge>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center text-xs text-[var(--text-muted)] pt-4 border-t border-[var(--border)]">
                    <span>{job.time}</span>
                    <Button className="h-8 px-4 text-xs bg-blue-600 hover:bg-blue-700">Apply Now</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
