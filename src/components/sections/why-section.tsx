import { Enter } from "@/components/animations/enter";
import { Reveal } from "@/components/animations/reveal";
import { TiltCard } from "@/components/animations/tilt-card";
import { Container } from "@/components/layout/container";
import { strengths, whyIntro } from "@/data/home";
import { accentStyles, interactiveCard } from "@/lib/accent";
import { SECTIONS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Eyebrow } from "./section-heading";

export function WhySection() {
  return (
    <section id={SECTIONS.why} className="relative w-full scroll-mt-20 border-y border-white/8 bg-surface-container-lowest py-24">
      <Container>
        {/* The page heading paints with the first HTML, like the About page. */}
        <div className="mb-16 max-w-3xl space-y-3">
          <Enter>
            <Eyebrow accent="silver">{whyIntro.eyebrow}</Eyebrow>
          </Enter>
          <Enter index={1}>
            <h1 className="text-headline-lg">{whyIntro.title}</h1>
          </Enter>
          <Enter index={2}>
            <p className="text-body-lg text-silver">{whyIntro.description}</p>
          </Enter>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {strengths.map(({ number, title, summary, accent }, i) => (
            <Reveal key={number} index={i % 3} variant="scale" className="h-full">
              <TiltCard className={cn(interactiveCard, "group h-full space-y-4 p-space-lg")}>
                <span className={cn("block w-fit rounded border px-2.5 py-1 text-code-badge font-bold tabular", accentStyles[accent].tile)}>
                  {number}
                </span>
                <h2 className="text-headline-sm">{title}</h2>
                <p className="text-body-md text-silver">{summary}</p>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
