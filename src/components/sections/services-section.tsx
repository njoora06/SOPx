import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { Container } from "@/components/layout/container";
import { SectionLink } from "@/components/navigation/section-link";
import { ServicesExplorer } from "@/components/services/services-explorer";
import { servicesIntro } from "@/data/home";
import { CONSULTATION_HREF, SECTIONS } from "@/lib/constants";
import { SectionHeading } from "./section-heading";

export function ServicesSection() {
  const { link, ...heading } = servicesIntro;
  return (
    <section id={SECTIONS.services} className="relative w-full scroll-mt-20 border-t border-white/8 bg-surface-container-lowest py-28">
      <Container>
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading {...heading} className="max-w-2xl" />
          <Reveal index={2} variant="fade" className="shrink-0">
          <SectionLink
            href={CONSULTATION_HREF}
            className="group inline-flex shrink-0 items-center gap-2 rounded text-title-md text-snow transition-colors outline-none hover:text-white focus-visible:shadow-glow-focus"
          >
            {link}
            <ArrowRight aria-hidden className="size-4.5 text-vermilion transition-transform group-hover:translate-x-1" />
          </SectionLink>
          </Reveal>
        </div>
        <ServicesExplorer />
      </Container>
    </section>
  );
}
