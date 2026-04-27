/**
 * Notification Service
 * ─────────────────────
 * Manages user notifications.
 * Simulated for now, but built for real-time integration.
 */

export type NotifType = "job_match" | "application" | "profile_view" | "saved" | "system";

export interface Notification {
  id: string;
  type: NotifType;
  title: string;
  description: string;
  time: string;
  unread: boolean;
  timestamp: number;
}

const STORAGE_KEY = "HireArc_notifications";

const MOCK_INITIAL: Notification[] = [
  {
    id: "1", type: "job_match",
    title: "New job match found!",
    description: "Senior React Developer at Google — 95% match with your profile",
    time: "2 minutes ago", unread: true,
    timestamp: Date.now() - 120000,
  },
  {
    id: "2", type: "application",
    title: "Application status updated",
    description: "Your application at Meta is now Under Review — hang tight!",
    time: "1 hour ago", unread: true,
    timestamp: Date.now() - 3600000,
  },
  {
    id: "3", type: "profile_view",
    title: "Your profile was viewed",
    description: "A recruiter from Amazon viewed your profile",
    time: "3 hours ago", unread: false,
    timestamp: Date.now() - 10800000,
  }
];

export const notificationService = {
  getNotifications(): Notification[] {
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_INITIAL));
      return MOCK_INITIAL;
    }
    return JSON.parse(stored);
  },

  markAsRead(id: string) {
    const notifs = this.getNotifications();
    const updated = notifs.map(n => n.id === id ? { ...n, unread: false } : n);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    // Trigger custom event for real-time updates across components
    window.dispatchEvent(new CustomEvent("notifications_updated"));
  },

  markAllAsRead() {
    const notifs = this.getNotifications();
    const updated = notifs.map(n => ({ ...n, unread: false }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent("notifications_updated"));
  },

  deleteNotification(id: string) {
    const notifs = this.getNotifications();
    const updated = notifs.filter(n => n.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent("notifications_updated"));
  },

  /** 
   * Simulate a new notification arriving 
   */
  addSimulatedNotification(notif: Omit<Notification, "id" | "timestamp" | "unread" | "time">) {
    const notifs = this.getNotifications();
    const newNotif: Notification = {
      ...notif,
      id: Math.random().toString(36).substring(7),
      unread: true,
      timestamp: Date.now(),
      time: "Just now"
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify([newNotif, ...notifs]));
    window.dispatchEvent(new CustomEvent("notifications_updated"));
  }
};
