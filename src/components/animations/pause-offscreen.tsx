"use client";

import { useEffect, useRef } from "react";

/**
 * Pauses the decorative CSS loops (pings, sweeps, spins) inside it while it is
 * offscreen, so they stop costing paint time (rule in globals.css).
 */
export function PauseOffscreen({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry) return;
      if (entry.isIntersecting) el.dataset.inview = "";
      else delete el.dataset.inview;
      el.dataset.ready = "";
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} data-pause-offscreen className={className}>
      {children}
    </div>
  );
}
