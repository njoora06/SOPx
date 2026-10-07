"use client";

import { useEffect, useState } from "react";

/**
 * Id of the section crossing the middle of the viewport, or `null` above the
 * first one (the page top). Drives the active navbar link while scrolling.
 */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const elements = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
    if (!elements.length) return;

    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        // With several in the band, the one latest in document order wins.
        const current = ids.filter((id) => visible.has(id)).at(-1) ?? null;
        setActive((prev) => {
          if (current) return current;
          // Between sections (e.g. an un-navigable band) keep the last one,
          // unless we are back above the first section.
          const first = elements[0];
          return first && first.getBoundingClientRect().top > window.innerHeight / 2 ? null : prev;
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
