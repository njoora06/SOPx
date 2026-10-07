import { Reveal } from "@/components/animations/reveal";
import { TiltCard } from "@/components/animations/tilt-card";
import { Container } from "@/components/layout/container";
import { strengths, whyIntro } from "@/data/home";
import { accentStyles, interactiveCard } from "@/lib/accent";
import { SECTIONS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./section-heading";

export function WhySection() {
  return (
    <section id={SECTIONS.why} className="relative w-full scroll-mt-20 border-y border-white/8 bg-surface-container-lowest py-28">
      <Container>
        <SectionHeading accent="silver" {...whyIntro} className="mb-16" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {strengths.map(({ number, title, summary, accent }, i) => (
            <Reveal key={number} index={i % 3} variant="scale" className="h-full">
              <TiltCard className={cn(interactiveCard, "group h-full space-y-4 p-space-lg")}>
                <span className={cn("block w-fit rounded border px-2.5 py-1 text-code-badge font-bold tabular", accentStyles[accent].tile)}>
                  {number}
                </span>
                <h3 className="text-headline-sm">{title}</h3>
                <p className="text-body-md text-silver">{summary}</p>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
