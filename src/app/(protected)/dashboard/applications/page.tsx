import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function ApplicationsPage() {
  return (
    <>
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold font-headline text-[var(--text-primary)] mb-2">Applied Jobs</h1>
          <p className="text-[var(--text-secondary)]">Track and manage your job applications.</p>
        </div>
        <Button className="bg-[#678D63] hover:bg-[#166534] text-white">Find More Jobs</Button>
      </div>

      <Card className="border-2 border-[var(--border)] shadow-sm bg-white dark:bg-white/5">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-[11px] uppercase tracking-wider text-[var(--text-muted)] bg-[var(--bg-base)]">
                <tr>
                  <th className="px-6 py-4 font-bold">Company / Role</th>
                  <th className="px-6 py-4 font-bold">Date Applied</th>
                  <th className="px-6 py-4 font-bold">Status</th>
                  <th className="px-6 py-4 font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-[var(--border)]">
                {[
                  { company: "Figma", pos: "Product Lead", status: "Applied", statusColor: "text-green-600 bg-green-50 dark:bg-green-900/20", date: "Oct 22, 2023", initial: "F" },
                  { company: "Stripe", pos: "Visual Designer", status: "Reviewing", statusColor: "text-blue-600 bg-blue-50 dark:bg-blue-900/20", date: "Oct 18, 2023", initial: "S" },
                  { company: "Spotify", pos: "Senior UI Designer", status: "Applied", statusColor: "text-green-600 bg-green-50 dark:bg-green-900/20", date: "Oct 10, 2023", initial: "S" },
                ].map((app, i) => (
                  <tr key={i} className="hover:bg-[var(--bg-base)] transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded bg-[var(--bg-base)] border-2 border-[var(--border)] flex items-center justify-center font-bold text-sm flex-shrink-0 group-hover:border-[var(--primary)] transition-colors">{app.initial}</div>
                        <div>
                          <div className="font-bold text-[var(--text-primary)] group-hover:text-[var(--primary)] transition-colors">{app.pos}</div>
                          <div className="text-xs text-[var(--text-secondary)]">{app.company}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[var(--text-secondary)] font-medium">{app.date}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${app.statusColor}`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="outline" size="sm" className="h-8 text-xs font-bold border-2 hover:bg-[var(--primary)] hover:text-white transition-all">View Details</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
