"use client";

import { useReducedMotion, useScroll, useTransform } from "framer-motion";
import * as m from "framer-motion/m";

interface ParallaxProps {
  children: React.ReactNode;
  /** Pixels moved per pixel scrolled; negative moves against the scroll. */
  factor: number;
  className?: string;
}

/** Shifts content vertically in proportion to page scroll (static under reduced motion). */
export function Parallax({ children, factor, className }: ParallaxProps) {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, (v) => (reduceMotion ? 0 : v * factor));
  return (
    <m.div className={className} style={{ y }}>
      {children}
    </m.div>
  );
}
