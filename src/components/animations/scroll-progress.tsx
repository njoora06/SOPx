"use client";

import { useEffect, useRef } from "react";

/**
 * Thin reading-progress bar pinned to the top of the viewport. Browsers with
 * CSS scroll-driven animations run it entirely in CSS (`.scroll-progress` in
 * globals.css); elsewhere (e.g. Firefox) this effect drives it from scroll events.
 */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || CSS.supports("animation-timeline: scroll()")) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      el.style.transform = `scaleX(${max > 0 ? Math.min(window.scrollY / max, 1) : 0})`;
    };
    const onScroll = () => {
      frame ||= requestAnimationFrame(update);
    };

    el.style.display = "block";
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="scroll-progress fixed inset-x-0 top-0 z-100 h-[2.5px] origin-left bg-linear-to-r from-vermilion via-crimson to-silver shadow-[0_0_12px_rgb(239_68_68/0.8)]"
    />
  );
}
