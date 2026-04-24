import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Paperclip } from "lucide-react";

export default function MessagesPage() {
  return (
    <div className="h-[calc(100vh-140px)] flex flex-col">
      <div className="mb-6">
        <h1 className="text-3xl font-bold font-headline text-[var(--text-primary)] mb-2">Messages</h1>
        <p className="text-[var(--text-secondary)]">Communicate directly with recruiters.</p>
      </div>

      <Card className="flex-1 border-[var(--border)] shadow-sm flex overflow-hidden">
        {/* Chat List */}
        <div className="w-[300px] border-r border-[var(--border)] bg-[var(--bg-base)] overflow-y-auto">
          <div className="p-4 border-b border-[var(--border)]">
            <input 
              type="text" 
              placeholder="Search messages..." 
              className="w-full h-10 px-3 rounded-md border border-[var(--border)] bg-white dark:bg-[var(--bg-card)] outline-none text-sm"
            />
          </div>
          
          {[
            { name: "Google Recruiting", role: "UX Team", time: "2h ago", active: true },
            { name: "Figma Team", role: "Product", time: "Yesterday", active: false },
            { name: "Airbnb Careers", role: "Design", time: "Oct 15", active: false },
          ].map((chat, i) => (
            <div key={i} className={`p-4 border-b border-[var(--border)] cursor-pointer transition-colors ${chat.active ? 'bg-white dark:bg-[var(--bg-card)] border-l-4 border-l-blue-600' : 'hover:bg-white/50 dark:hover:bg-[var(--bg-card)]/50 border-l-4 border-l-transparent'}`}>
              <div className="flex justify-between items-start mb-1">
                <span className="font-bold text-sm text-[var(--text-primary)]">{chat.name}</span>
                <span className="text-[10px] text-[var(--text-muted)] font-medium">{chat.time}</span>
              </div>
              <p className="text-xs text-[var(--text-secondary)] truncate">Hi Alex, we'd like to schedule your next round...</p>
            </div>
          ))}
        </div>

        {/* Chat Window */}
        <div className="flex-1 flex flex-col bg-white dark:bg-[var(--bg-card)]">
          {/* Chat Header */}
          <div className="h-[72px] border-b border-[var(--border)] px-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">G</div>
              <div>
                <h3 className="font-bold text-[var(--text-primary)] leading-tight">Google Recruiting</h3>
                <p className="text-xs text-green-500 font-medium">Online</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="h-8">View Job Details</Button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="text-center">
              <span className="text-xs text-[var(--text-muted)] bg-[var(--bg-base)] px-3 py-1 rounded-full font-medium">Today</span>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex-shrink-0"></div>
              <div className="bg-[var(--bg-base)] p-4 rounded-2xl rounded-tl-sm max-w-[80%]">
                <p className="text-sm text-[var(--text-primary)] leading-relaxed">
                  Hi Alex, thanks for taking the time to speak with our design team yesterday. We were really impressed with your portfolio and would love to move you forward to the next round. Are you available for a technical interview this Thursday?
                </p>
                <span className="text-[10px] text-[var(--text-muted)] mt-2 block">10:42 AM</span>
              </div>
            </div>

            <div className="flex items-start gap-3 flex-row-reverse">
              <div className="w-8 h-8 rounded-full bg-amber-200 flex-shrink-0"></div>
              <div className="bg-blue-600 text-white p-4 rounded-2xl rounded-tr-sm max-w-[80%]">
                <p className="text-sm leading-relaxed">
                  Hi there! Thank you so much for the update. I'm really excited about the opportunity. Yes, I am available this Thursday anytime after 1 PM PST.
                </p>
                <span className="text-[10px] text-blue-200 mt-2 block text-right">11:15 AM</span>
              </div>
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-[var(--border)] bg-[var(--bg-base)]">
            <div className="flex gap-2">
              <button className="w-10 h-10 flex items-center justify-center text-[var(--text-secondary)] hover:text-blue-600 transition-colors">
                <Paperclip className="w-5 h-5" />
              </button>
              <input 
                type="text" 
                placeholder="Type your message..." 
                className="flex-1 h-10 px-4 rounded-full border border-[var(--border)] bg-white dark:bg-[var(--bg-card)] outline-none text-sm"
              />
              <Button className="h-10 px-6 bg-blue-600 hover:bg-blue-700 rounded-full">Send</Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
