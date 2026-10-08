"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { useActiveNavHref } from "@/hooks/use-active-section";
import { MAIN_NAV } from "@/lib/constants";
import { SectionLink } from "./section-link";

/** Desktop navigation; one pill glides to whichever section is in view. */
export function MainNav() {
  const activeHref = useActiveNavHref();
  const linkRefs = useRef(new Map<string, HTMLAnchorElement>());
  const [pill, setPill] = useState<{ left: number; width: number } | null>(null);

  const navRef = useRef<HTMLElement>(null);

  // Measure the active link; re-measure when the nav resizes (breakpoint
  // changes, web fonts finishing loading).
  useLayoutEffect(() => {
    const nav = navRef.current;
    const measure = () => {
      const link = linkRefs.current.get(activeHref);
      if (link && link.offsetWidth) setPill({ left: link.offsetLeft, width: link.offsetWidth });
    };
    measure();
    if (!nav) return;
    const observer = new ResizeObserver(measure);
    observer.observe(nav);
    return () => observer.disconnect();
  }, [activeHref]);

  return (
    <nav ref={navRef} aria-label="Main" className="relative hidden items-center gap-1 rounded-md border border-white/8 bg-obsidian-1/80 p-1.5 backdrop-blur-md xl:flex">
      {pill && (
        <span
          aria-hidden
          className="absolute top-1.5 bottom-1.5 rounded bg-white/10 shadow-sm transition-[left,width] duration-300 ease-(--ease-out-expo)"
          style={{ left: pill.left, width: pill.width }}
        />
      )}
      {MAIN_NAV.map((item) => (
        <SectionLink
          key={item.href}
          href={item.href}
          ref={(el) => {
            if (el) linkRefs.current.set(item.href, el);
            else linkRefs.current.delete(item.href);
          }}
          aria-current={item.href === activeHref ? "true" : undefined}
          className="relative rounded px-4 py-1.5 text-body-sm font-medium text-silver transition-colors duration-300 outline-none hover:text-white focus-visible:shadow-glow-focus aria-[current=true]:text-white"
        >
          {item.label}
        </SectionLink>
      ))}
    </nav>
  );
}
