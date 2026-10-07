import { ArrowRight, Search } from "lucide-react";
import { Logo } from "@/components/navigation/logo";
import { MainNav } from "@/components/navigation/main-nav";
import { MobileNav } from "@/components/navigation/mobile-nav";
import { SectionLink } from "@/components/navigation/section-link";
import { Button } from "@/components/ui/button";
import { CONSULTATION_HREF } from "@/lib/constants";
import { Container } from "./container";

export function SiteHeader() {
  // Named so page transitions keep the header still (see globals.css).
  return (
    <header style={{ viewTransitionName: "site-header" }} className="fixed inset-x-0 top-0 z-50 border-b border-white/8 bg-obsidian-0/85 backdrop-blur-2xl">
      <Container className="flex h-20 items-center justify-between gap-4">
        <Logo withTagline />

        <MainNav />

        <div className="flex items-center gap-3">
          {/* As drawn in the design; no search behaviour is defined yet. */}
          <button
            type="button"
            className="group hidden items-center gap-3 rounded-md border border-white/8 bg-obsidian-1 px-3.5 py-1.5 text-body-sm text-silver transition-colors outline-none hover:border-white/20 hover:text-white focus-visible:shadow-glow-focus md:inline-flex"
          >
            <Search className="size-4" aria-hidden />
            <span>Quick Search Services...</span>
            <kbd className="pointer-events-none inline-flex h-5 items-center rounded border border-white/6 bg-white/8 px-1.5 font-mono text-[10px] font-medium text-silver">
              ⌘K
            </kbd>
          </button>

          <div className="hidden items-center gap-2 rounded-md border border-telemetry-normal/20 bg-telemetry-normal/8 px-3 py-1.5 text-code-badge text-telemetry-normal lg:flex">
            <span className="size-1.5 animate-ping rounded-full bg-telemetry-normal" aria-hidden />
            <span>Core Ops Active</span>
          </div>

          {/* On phones this action moves to the persistent bottom anchor. */}
          <Button asChild className="group hidden md:inline-flex">
            <SectionLink href={CONSULTATION_HREF}>
              Get a Consultation
              <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
            </SectionLink>
          </Button>

          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
