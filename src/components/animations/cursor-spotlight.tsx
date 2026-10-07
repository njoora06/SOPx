"use client";

import { useEffect, useRef } from "react";

const RADIUS = 650;

/**
 * Soft light that trails the cursor across the page (desktop pointers only).
 * Uses a neutral silver tint: DESIGN.md reserves vermilion for focal points,
 * never ambient washes. The glow is moved with a compositor-only transform and
 * the loop idles once it has caught up with the cursor.
 */
export function CursorSpotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!el || !fine || reduced) return;

    let mouseX = 0;
    let mouseY = 0;
    let x = 0;
    let y = 0;
    let frame = 0;

    const tick = () => {
      x += (mouseX - x) * 0.12;
      y += (mouseY - y) * 0.12;
      el.style.transform = `translate3d(${x - RADIUS}px, ${y - RADIUS}px, 0)`;
      frame = Math.abs(mouseX - x) + Math.abs(mouseY - y) > 0.5 ? requestAnimationFrame(tick) : 0;
    };
    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      el.style.opacity = "1";
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const onLeave = () => {
      el.style.opacity = "0";
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-30 hidden overflow-hidden md:block">
      <div
        ref={ref}
        className="absolute top-0 left-0 rounded-full opacity-0 transition-opacity duration-500 will-change-transform"
        style={{
          width: RADIUS * 2,
          height: RADIUS * 2,
          background: "radial-gradient(circle closest-side, rgb(148 163 184 / 0.06), transparent)",
        }}
      />
    </div>
  );
}
