"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function ProfileRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to settings for now, as profile info is managed there
    router.replace("/admin/settings");
  }, [router]);

  return (
    <div className="h-[60vh] flex flex-col items-center justify-center space-y-4">
      <Loader2 className="w-10 h-10 text-primary animate-spin" />
      <p className="text-muted-foreground font-bold uppercase tracking-widest text-xs">Synchronizing Profile Data...</p>
    </div>
  );
}
