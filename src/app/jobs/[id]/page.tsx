import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { Building, MapPin, Clock, Bookmark, Check, Leaf, ExternalLink, Banknote, Briefcase, Star, ArrowRight } from "lucide-react";

export default function JobDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-[var(--bg-base)] pt-24 pb-20">
      
      {/* Breadcrumbs */}
      <div className="container-custom mb-6">
        <div className="text-sm text-[var(--text-secondary)] flex items-center gap-2">
          <Link href="/jobs" className="hover:text-[var(--primary)] transition-colors">Jobs</Link>
          <span>›</span>
          <Link href="/search" className="hover:text-[var(--primary)] transition-colors">Software Engineering</Link>
          <span>›</span>
          <span className="font-medium text-[var(--text-primary)]">Senior Software Engineer at Airbnb</span>
        </div>
      </div>

      <div className="container-custom max-w-5xl">
        
        {/* Main Header Card */}
        <Card className="mb-8 border-[var(--border)] overflow-hidden">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              
              <div className="flex gap-6 items-center">
                <div className="w-20 h-20 rounded-xl bg-white border border-[var(--border)] flex items-center justify-center flex-shrink-0 shadow-sm">
                  {/* Placeholder for Airbnb Logo */}
                  <span className="text-3xl font-bold text-red-500">A</span>
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold font-headline mb-2">Senior Software Engineer</h1>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--text-secondary)] mb-4">
                    <span className="flex items-center gap-1 font-medium text-[var(--text-primary)]">
                      <Building className="w-4 h-4" /> Airbnb
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> San Francisco, CA (Remote)</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> Posted 2 days ago</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 uppercase text-xs font-bold rounded-sm">Full-time</Badge>
                    <Badge variant="secondary" className="bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300 uppercase text-xs font-bold rounded-sm">$185k - $240k</Badge>
                    <Badge variant="secondary" className="bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300 uppercase text-xs font-bold rounded-sm">High Growth</Badge>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 w-full md:w-auto">
                <Button variant="outline" className="flex-1 md:flex-none border-[var(--primary)] text-[var(--primary)] hover:bg-blue-50 dark:hover:bg-blue-950 font-semibold h-11 px-6 gap-2">
                  <Bookmark className="w-4 h-4" /> Save Job
                </Button>
                <Button className="flex-1 md:flex-none bg-blue-600 hover:bg-blue-700 font-semibold h-11 px-8 text-white">
                  Apply Now
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Two Column Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Content: Job Description */}
          <div className="flex-1 space-y-8">
            <section>
              <h2 className="text-xl font-bold font-headline mb-4">About the Role</h2>
              <div className="text-[var(--text-secondary)] space-y-4 text-[15px] leading-relaxed">
                <p>
                  Airbnb is looking for a Senior Software Engineer to join our Core Guest Experience team. In this role, you will be responsible for building and scaling the fundamental components that power millions of bookings every day. You'll work on high-availability distributed systems and collaborate with world-class product designers to create seamless, magical experiences for our global community of guests.
                </p>
                <p>
                  You will have the opportunity to influence the architectural direction of our next-generation guest services, ensuring they are robust, performant, and secure.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-lg font-bold font-headline mb-4">The Work You'll Do</h2>
              <ul className="space-y-3 text-[15px] text-[var(--text-secondary)]">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span>Design and implement scalable backend services using Java, Kotlin, and GraphQL.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span>Optimize performance for critical path guest flows to ensure sub-second response times.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span>Collaborate with cross-functional partners in Product, Design, and Data Science.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span>Mentor junior engineers and foster a culture of technical excellence and inclusion.</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold font-headline mb-4">What We're Looking For</h2>
              <ul className="space-y-3 text-[15px] text-[var(--text-secondary)]">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span>5+ years of professional software development experience.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span>Deep expertise in building distributed systems and microservices.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span>Strong command of modern JVM languages and relational databases.</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold font-headline mb-4">Required Skills</h2>
              <div className="flex flex-wrap gap-2">
                {['Java', 'Kotlin', 'GraphQL', 'Distributed Systems', 'AWS', 'React', 'System Design'].map((skill) => (
                  <Badge key={skill} variant="secondary" className="bg-[var(--bg-base)] text-[var(--text-primary)] border border-[var(--border)] font-medium px-4 py-1.5 rounded-md hover:bg-[var(--border)] transition-colors">
                    {skill}
                  </Badge>
                ))}
              </div>
            </section>
          </div>

          {/* Right Sidebar */}
          <aside className="w-full lg:w-[320px] flex-shrink-0 space-y-6">
            
            {/* Apply Card */}
            <Card className="border-[var(--border)] shadow-sm bg-white dark:bg-[var(--bg-card)]">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 bg-green-100 rounded flex items-center justify-center text-green-600"><Leaf className="w-3 h-3" /></div>
                  <span className="text-sm font-semibold">Apply via Greenhouse</span>
                </div>
                <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed mb-6">
                  By clicking "Apply Now" you will be redirected to Airbnb's official careers portal hosted on Greenhouse.
                </p>
                <div className="space-y-3">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold h-11 flex justify-between px-4">
                    <span>Apply Now</span>
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" className="w-full border-[var(--border)] text-[var(--text-primary)] hover:bg-[var(--bg-base)] font-semibold h-11 flex items-center justify-center gap-2">
                    <Bookmark className="w-4 h-4" /> Save this job
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Job Summary Card */}
            <Card className="border-[var(--border)] shadow-sm bg-white dark:bg-[var(--bg-card)]">
              <CardContent className="p-0">
                <div className="p-5 border-b border-[var(--border)]">
                  <h3 className="font-semibold text-[var(--text-primary)]">Job Summary</h3>
                </div>
                <div className="p-5 space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2 text-[var(--text-muted)]">
                      <MapPin className="w-4 h-4" /> Location
                    </div>
                    <span className="font-medium text-right text-[var(--text-primary)]">San Francisco, CA</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2 text-[var(--text-muted)]">
                      <Banknote className="w-4 h-4" /> Salary Range
                    </div>
                    <span className="font-medium text-right text-[var(--text-primary)]">$185k - $240k</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2 text-[var(--text-muted)]">
                      <Briefcase className="w-4 h-4" /> Job Type
                    </div>
                    <span className="font-medium text-right text-[var(--text-primary)]">Full-Time</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2 text-[var(--text-muted)]">
                      <Star className="w-4 h-4" /> Experience
                    </div>
                    <span className="font-medium text-right text-[var(--text-primary)]">Senior (5+ yrs)</span>
                  </div>
                </div>
              </CardContent>
            </Card>

          </aside>
        </div>

        {/* Similar Jobs Section */}
        <section className="mt-16 pt-10 border-t border-[var(--border)]">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold font-headline">Similar Jobs You Might Like</h2>
            <Link href="/search" className="text-sm font-semibold text-blue-600 hover:underline flex items-center gap-1">
              View all engineering jobs <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Senior Product Engineer", company: "Dropbox • Remote", tag: "FULL-TIME", salary: "$170k - $220k", icon: "📦" },
              { title: "Staff Backend Engineer", company: "Stripe • Seattle, WA", tag: "HYBRID", salary: "$200k - $260k", icon: "S" },
              { title: "Senior Systems Engineer", company: "Slack • New York, NY", tag: "FULL-TIME", salary: "$160k - $210k", icon: "💬" }
            ].map((job, i) => (
              <Card key={i} className="hover:shadow-md transition-shadow border-[var(--border)]">
                <CardContent className="p-6">
                  <div className="flex gap-3 mb-4">
                    <div className="w-10 h-10 rounded bg-[var(--bg-base)] border border-[var(--border)] flex items-center justify-center flex-shrink-0 text-xl font-bold">
                      {job.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-[var(--text-primary)]">{job.title}</h4>
                      <p className="text-xs text-[var(--text-secondary)]">{job.company}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 mb-4">
                    <Badge variant="secondary" className="text-[10px] bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 py-0.5">{job.tag}</Badge>
                    <Badge variant="secondary" className="text-[10px] bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300 py-0.5">{job.salary}</Badge>
                  </div>
                  <Button variant="outline" className="w-full h-9 text-xs font-semibold bg-[var(--bg-base)] hover:bg-[var(--border)] border-none">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
