import { MAIN_NAV } from "@/lib/constants";
import { SectionLink } from "./section-link";

/**
 * Plain link list. Unlike the header it doesn't mark the section in view:
 * the footer is only seen at the page bottom, where that would always be
 * the last tracked section.
 */
export function FooterNav() {
  return (
    <nav aria-label="Footer" className="flex flex-col gap-0.5 text-body-sm md:gap-2">
      {MAIN_NAV.map((item) => (
        <SectionLink key={item.href} href={item.href} className="w-fit py-1.5 transition-colors duration-300 hover:text-white md:py-0">
          {item.label}
        </SectionLink>
      ))}
    </nav>
  );
}
