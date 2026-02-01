"use client";

import { useEffect } from "react";

// CONCEPT: Templates vs Layouts
// Layouts persist (do not re-mount) on navigation.
// Templates create a NEW instance on every navigation.
// Use Templates for:
// 1. Enter/Exit animations (Framermotion).
// 2. Logging page views (useEffect).
// 3. Resetting state per page.

export default function Template({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    console.log("Template mounted! (Navigation happened)");
  });

  return (
    <div className="animate-in fade-in duration-500">
      {/* Example: A fade-in animation that runs on EVERY page navigation */}
      {children}
    </div>
  );
}
