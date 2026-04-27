"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { notificationService, Notification } from "@/services/notification.service";

interface NotificationContextValue {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
  simulateNew: () => void;
}

const NotificationContext = createContext<NotificationContextValue | null>(null);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const load = () => {
    setNotifications(notificationService.getNotifications());
  };

  useEffect(() => {
    load();
    // Listen for updates from other components or service
    window.addEventListener("notifications_updated", load);
    
    // Simulate a random notification every 2 minutes for "real-time" feel
    const interval = setInterval(() => {
      notificationService.addSimulatedNotification({
        type: "profile_view",
        title: "Someone viewed your profile!",
        description: "A hiring manager from a top tech company is looking at your resume."
      });
    }, 120000);

    return () => {
      window.removeEventListener("notifications_updated", load);
      clearInterval(interval);
    };
  }, []);

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount,
      markAsRead: (id) => notificationService.markAsRead(id),
      markAllAsRead: () => notificationService.markAllAsRead(),
      deleteNotification: (id) => notificationService.deleteNotification(id),
      simulateNew: () => {
        notificationService.addSimulatedNotification({
          type: "job_match",
          title: "Flash Match! ⚡",
          description: "A new role just opened up that matches your profile perfectly."
        });
      }
    }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error("useNotifications must be used inside <NotificationProvider>");
  return ctx;
}
