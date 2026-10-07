import { ArrowRight } from "lucide-react";
import { SectionLink } from "@/components/navigation/section-link";
import { Button } from "@/components/ui/button";
import { CONSULTATION_HREF } from "@/lib/constants";

/** DESIGN.md › Mobile: primary action sticks to a persistent bottom anchor. */
export function MobileActionBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-carbon bg-obsidian-0/90 p-4 backdrop-blur-xl md:hidden">
      <Button asChild className="w-full">
        <SectionLink href={CONSULTATION_HREF}>
          Get a Consultation
          <ArrowRight />
        </SectionLink>
      </Button>
    </div>
  );
}
