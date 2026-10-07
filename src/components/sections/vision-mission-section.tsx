import { Reveal } from "@/components/animations/reveal";
import { TiltCard } from "@/components/animations/tilt-card";
import { Container } from "@/components/layout/container";
import { visionMission } from "@/data/home";
import { accentStyles } from "@/lib/accent";
import { cn } from "@/lib/utils";

export function VisionMissionSection() {
  return (
    <section className="relative w-full bg-obsidian-0 py-24">
      <Container>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {visionMission.map(({ label, icon: Icon, accent, title, summary, meta }, i) => (
            <Reveal key={label} index={i} variant="scale" className="h-full">
              <TiltCard className="flex h-full flex-col justify-between overflow-hidden rounded-lg border border-white/8 bg-obsidian-1 p-8 sm:p-10">
                <div
                  aria-hidden
                  className={cn(
                    "pointer-events-none absolute -top-16 -right-16 size-48 rounded-full blur-2xl",
                    accent === "vermilion" ? "bg-vermilion/10" : "bg-silver/10",
                  )}
                />
                <div className="relative z-10 space-y-4">
                  <p className={cn("inline-flex items-center gap-2 text-label-caps", accentStyles[accent].text)}>
                    <Icon aria-hidden className="size-5" />
                    {label}
                  </p>
                  <h3 className="text-headline-md">{title}</h3>
                  <p className="text-body-lg text-silver">{summary}</p>
                </div>
                <p className="mt-6 border-t border-white/6 pt-6 text-code-badge text-slate">{meta}</p>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
