"use client";

import { MotionConfig } from "framer-motion";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import CursorGlow from "@/components/ui/Cursor";
import ScrollProgress from "@/components/ui/ScrollProgress";
import HandGestureSystem from "@/components/vision/HandGestureSystem";

export default function GlobalProviders({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <SmoothScrollProvider>
        <ScrollProgress />
        <CursorGlow />
        <HandGestureSystem />
        <div className="noise-overlay" aria-hidden="true" />
        {children}
      </SmoothScrollProvider>
    </MotionConfig>
  );
}
