import { ArrowRight } from "lucide-react";
import { Logo } from "@/components/navigation/logo";
import { MainNav } from "@/components/navigation/main-nav";
import { MobileNav } from "@/components/navigation/mobile-nav";
import { SectionLink } from "@/components/navigation/section-link";
import { ServiceSearch } from "@/components/navigation/service-search";
import { ThemeToggle } from "@/components/navigation/theme-toggle";
import { Button } from "@/components/ui/button";
import { CONSULTATION_HREF } from "@/lib/constants";
import { Container } from "./container";

export function SiteHeader() {
  // Named so page transitions keep the header still (see globals.css).
  return (
    <header style={{ viewTransitionName: "site-header" }} className="fixed inset-x-0 top-0 z-50 border-b border-white/8 bg-obsidian-0/85 backdrop-blur-2xl">
      <Container className="flex h-20 items-center justify-between gap-4">
        <Logo eager />

        <MainNav />

        <div className="flex items-center gap-3">
          <ServiceSearch />

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

          <ThemeToggle />

          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
