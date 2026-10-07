import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { TiltCard } from "@/components/animations/tilt-card";
import { Container } from "@/components/layout/container";
import { pillars, whatWeDo } from "@/data/home";
import { accentStyles, interactiveCard } from "@/lib/accent";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./section-heading";

export function WhatWeDoSection() {
  return (
    <section className="relative w-full bg-obsidian-0 py-24">
      <Container>
        <SectionHeading accent="silver" {...whatWeDo} className="mb-16" />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {pillars.map(({ title, summary, meta, icon: Icon, accent }, i) => (
            <Reveal key={title} index={i} variant="scale" className="h-full">
              <TiltCard className={cn(interactiveCard, "group flex h-full flex-col justify-between p-space-lg")}>
                <div>
                  <span
                    className={cn(
                      "mb-6 flex size-12 items-center justify-center rounded border transition-transform duration-300 group-hover:scale-110",
                      accentStyles[accent].tile,
                    )}
                  >
                    <Icon aria-hidden className="size-6" />
                  </span>
                  <h3 className="mb-2 text-headline-sm">{title}</h3>
                  <p className="text-body-md text-silver">{summary}</p>
                </div>
                <div className="mt-6 flex items-center justify-between border-t border-white/6 pt-4 text-code-badge text-slate">
                  <span>{meta}</span>
                  <ArrowRight
                    aria-hidden
                    className={cn("size-4 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100", accentStyles[accent].text)}
                  />
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
