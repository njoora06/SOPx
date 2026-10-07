"use client";

import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";

/** Lightweight motion features, app-wide reduced-motion support. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
