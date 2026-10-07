"use client";

import { useEffect, useRef } from "react";

interface ScrollFadeProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Fades and gently lifts content in each time it scrolls into view, in either
 * direction. Unlike `Reveal` it keeps observing, and it starts visible so
 * content already on screen at load is never hidden (see globals.css).
 */
export function ScrollFade({ children, className }: ScrollFadeProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting) el.dataset.inview = "";
        else delete el.dataset.inview;
        el.dataset.ready = "";
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} data-scroll-fade className={className}>
      {children}
    </div>
  );
}
