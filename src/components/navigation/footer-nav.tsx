"use client";

import { useActiveSection } from "@/hooks/use-active-section";
import { MAIN_NAV, SECTION_IDS, activeNavHref } from "@/lib/constants";
import { SectionLink } from "./section-link";

export function FooterNav() {
  const activeHref = activeNavHref(useActiveSection(SECTION_IDS));

  return (
    <nav aria-label="Footer" className="flex flex-col gap-2 text-body-sm">
      {MAIN_NAV.map((item) => (
        <SectionLink
          key={item.href}
          href={item.href}
          aria-current={item.href === activeHref ? "true" : undefined}
          className="w-fit transition-colors duration-300 hover:text-white aria-[current=true]:font-medium aria-[current=true]:text-white"
        >
          {item.label}
        </SectionLink>
      ))}
    </nav>
  );
}
