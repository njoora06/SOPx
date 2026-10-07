"use client";

import { useEffect, useRef } from "react";

type RevealVariant = "up" | "scale" | "fade";

interface RevealProps {
  children: React.ReactNode;
  /** Position among siblings; each step adds one stagger interval (max 4). */
  index?: number;
  variant?: RevealVariant;
  as?: "div" | "li";
  className?: string;
}

// One observer shared by every Reveal on the page. Elements reveal as their
// top edge crosses ~92% of the viewport height, then are released.
let sharedObserver: IntersectionObserver | null = null;

function getObserver() {
  sharedObserver ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        el.dataset.visible = "";
        sharedObserver?.unobserve(el);
        // Drop the compositing hint once the entrance has finished.
        el.addEventListener("transitionend", () => el.style.removeProperty("will-change"), { once: true });
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0 },
  );
  return sharedObserver;
}

/**
 * Scroll-triggered entrance. Content is only hidden while JavaScript runs
 * (`html.js`, see globals.css), so it remains visible before hydration,
 * without JS, and for users who prefer reduced motion.
 */
export function Reveal({ children, index = 0, variant = "up", as: Tag = "div", className }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.willChange = "transform, opacity";
    const observer = getObserver();
    observer.observe(el);
    return () => observer.unobserve(el);
  }, []);

  const step = Math.min(index, 4);

  return (
    <Tag
      ref={ref as React.Ref<HTMLDivElement & HTMLLIElement>}
      data-reveal={variant}
      className={className}
      style={step ? ({ "--reveal-step": step } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
