import { Reveal } from "@/components/animations/reveal";
import { TiltCard } from "@/components/animations/tilt-card";
import { Container } from "@/components/layout/container";
import { company } from "@/data/company";
import { about } from "@/data/home";
import { accentStyles, interactiveCard } from "@/lib/accent";
import { SECTIONS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Eyebrow } from "./section-heading";

export function AboutSection() {
  return (
    <section id={SECTIONS.about} className="relative w-full scroll-mt-20 border-y border-white/8 bg-surface-container-lowest py-24">
      <Container>
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="space-y-4 lg:col-span-5">
            <Reveal>
              <Eyebrow>{about.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal index={1}>
              <h2 className="text-headline-lg">{about.title}</h2>
            </Reveal>
            <Reveal index={2} variant="fade">
              <div aria-hidden className="h-1 w-16 rounded-full bg-linear-to-r from-vermilion to-silver" />
            </Reveal>
          </div>

          <div className="space-y-6 text-body-lg text-silver lg:col-span-7">
            <Reveal index={1}>
              <p>
                <strong className="font-semibold text-white">{company.legalName}</strong> {about.paragraphs[0]}
              </p>
            </Reveal>
            <Reveal index={2}>
              <p>{about.paragraphs[1]}</p>
            </Reveal>

            <div className="grid grid-cols-1 gap-4 pt-4 sm:grid-cols-2">
              {about.highlights.map(({ title, summary, icon: Icon, accent }, i) => (
                <Reveal key={title} index={i + 2} variant="scale" className="h-full">
                <TiltCard className={cn(interactiveCard, "flex h-full items-start gap-4 bg-obsidian-2 p-5")}>
                  <span className={cn("flex size-10 shrink-0 items-center justify-center rounded border", accentStyles[accent].tile)}>
                    <Icon aria-hidden className="size-5" />
                  </span>
                  <div>
                    <h3 className="mb-1 font-sans text-title-md text-white">{title}</h3>
                    <p className="text-body-md text-silver">{summary}</p>
                  </div>
                </TiltCard>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
