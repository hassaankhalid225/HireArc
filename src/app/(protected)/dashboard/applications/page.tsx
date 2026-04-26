import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function ApplicationsPage() {
  return (
    <>
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold font-headline text-[var(--text-primary)] mb-2">My Applications</h1>
          <p className="text-[var(--text-secondary)]">Track and manage your job applications.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">Find More Jobs</Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b-2 border-[var(--border)] mb-6">
        <button className="pb-3 border-b-2 border-blue-600 font-semibold text-blue-600 px-2">All Applications (45)</button>
        <button className="pb-3 border-b-2 border-transparent font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] px-2">Interviewing (12)</button>
        <button className="pb-3 border-b-2 border-transparent font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] px-2">Applied (28)</button>
        <button className="pb-3 border-b-2 border-transparent font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] px-2">Archived (5)</button>
      </div>

      <Card className="border-[var(--border)] shadow-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-[11px] uppercase tracking-wider text-[var(--text-muted)] bg-[var(--bg-base)]">
                <tr>
                  <th className="px-6 py-4 font-bold">Company / Role</th>
                  <th className="px-6 py-4 font-bold">Date Applied</th>
                  <th className="px-6 py-4 font-bold">Status</th>
                  <th className="px-6 py-4 font-bold">Next Step</th>
                  <th className="px-6 py-4 font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {[
                  { company: "Google", pos: "Senior UX Designer", status: "Interviewing", statusColor: "text-blue-600 bg-blue-50 dark:bg-blue-900/20", date: "Oct 24, 2023", initial: "G", step: "Technical Interview" },
                  { company: "Figma", pos: "Product Lead", status: "Applied", statusColor: "text-green-600 bg-green-50 dark:bg-green-900/20", date: "Oct 22, 2023", initial: "F", step: "Awaiting Review" },
                  { company: "Stripe", pos: "Visual Designer", status: "Closed", statusColor: "text-gray-500 bg-gray-100 dark:bg-gray-800", date: "Oct 18, 2023", initial: "S", step: "None" },
                  { company: "Airbnb", pos: "UX Architect", status: "Interviewing", statusColor: "text-blue-600 bg-blue-50 dark:bg-blue-900/20", date: "Oct 15, 2023", initial: "A", step: "Final Round" },
                  { company: "Spotify", pos: "Senior UI Designer", status: "Applied", statusColor: "text-green-600 bg-green-50 dark:bg-green-900/20", date: "Oct 10, 2023", initial: "S", step: "Awaiting Review" },
                ].map((app, i) => (
                  <tr key={i} className="hover:bg-[var(--bg-base)] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded bg-[var(--bg-base)] border-2 border-[var(--border)] flex items-center justify-center font-bold text-sm flex-shrink-0">{app.initial}</div>
                        <div>
                          <div className="font-bold text-[var(--text-primary)]">{app.pos}</div>
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
                    <td className="px-6 py-4 text-[var(--text-secondary)] font-medium">{app.step}</td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="outline" size="sm" className="h-8 text-xs font-semibold">View Details</Button>
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
