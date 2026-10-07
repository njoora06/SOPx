import { Reveal } from "@/components/animations/reveal";
import { IndustryCard } from "@/components/industries/industry-card";
import { Container } from "@/components/layout/container";
import { industriesIntro } from "@/data/home";
import { industries } from "@/data/industries";
import { SECTIONS } from "@/lib/constants";
import { SectionHeading } from "./section-heading";

export function IndustriesSection() {
  return (
    <section id={SECTIONS.industries} className="relative w-full scroll-mt-20 bg-obsidian-0 py-28">
      <Container>
        <SectionHeading {...industriesIntro} className="mb-16" />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry, i) => (
            <Reveal key={industry.title} index={i % 3} variant="scale" className="h-full">
              <IndustryCard industry={industry} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
