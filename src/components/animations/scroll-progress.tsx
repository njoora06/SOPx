"use client";

import { useEffect, useState } from "react";
import { useScroll } from "framer-motion";
import * as m from "framer-motion/m";

/** Thin reading-progress bar pinned to the top of the viewport. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  // Rendered after mount only: the server has no scroll position, and an
  // unscaled bar would flash at full width before hydration.
  const [mounted, setMounted] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time mount flag
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <m.div
      aria-hidden
      style={{ scaleX: scrollYProgress }}
      className="fixed inset-x-0 top-0 z-100 h-[2.5px] origin-left bg-linear-to-r from-vermilion via-crimson to-silver shadow-[0_0_12px_rgb(239_68_68/0.8)]"
    />
  );
}
