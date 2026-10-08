import { MAIN_NAV } from "@/lib/constants";
import { SectionLink } from "./section-link";

/**
 * Plain link list. Unlike the header it doesn't mark the section in view:
 * the footer is only seen at the page bottom, where that would always be
 * the last tracked section.
 */
export function FooterNav() {
  return (
    <nav aria-label="Footer" className="flex flex-col gap-2 text-body-sm">
      {MAIN_NAV.map((item) => (
        <SectionLink key={item.href} href={item.href} className="w-fit transition-colors duration-300 hover:text-white">
          {item.label}
        </SectionLink>
      ))}
    </nav>
  );
}
