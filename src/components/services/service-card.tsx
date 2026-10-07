import { ArrowRight } from "lucide-react";
import { TiltCard } from "@/components/animations/tilt-card";
import { SectionLink } from "@/components/navigation/section-link";
import { accentStyles, interactiveCard } from "@/lib/accent";
import { CONSULTATION_HREF } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { Service } from "@/types";

export function ServiceCard({ service }: { service: Service }) {
  const { number, title, summary, tag, icon: Icon, accent, capabilities, wide } = service;
  const styles = accentStyles[accent];

  return (
    <TiltCard
      className={cn(
        interactiveCard,
        "group flex h-full flex-col justify-between overflow-hidden p-space-lg",
        wide && "edge-light border-slate-border",
      )}
    >
      {wide && (
        <div aria-hidden className="pointer-events-none absolute -right-20 -bottom-20 size-64 rounded-full bg-secondary-container/30 blur-3xl" />
      )}
      <div className="relative z-10 space-y-4">
        <div className="flex items-center justify-between">
          <span className={cn("flex size-11 items-center justify-center rounded border transition-transform group-hover:scale-105", styles.tile)}>
            <Icon aria-hidden className="size-5.5" />
          </span>
          <span className={cn("rounded border px-2 py-0.5 text-label-caps", styles.chip)}>{tag}</span>
        </div>
        <h3 className="text-headline-sm transition-colors group-hover:text-snow">{title}</h3>
        <p className="text-body-md text-silver">{summary}</p>
        <ul className={cn("space-y-2 pt-2 text-body-sm text-snow", wide && "sm:flex sm:gap-6 sm:space-y-0")}>
          {capabilities.map((c) => (
            <li key={c} className="flex items-center gap-2">
              <span aria-hidden className={cn("size-1.5 shrink-0 rounded-full", styles.dot)} />
              {c}
            </li>
          ))}
        </ul>
      </div>
      <div className="relative z-10 mt-6 flex items-center justify-between border-t border-white/6 pt-6">
        <SectionLink href={CONSULTATION_HREF} className="inline-flex items-center gap-1.5 rounded text-body-sm font-semibold text-snow outline-none hover:text-white focus-visible:shadow-glow-focus">
          Request details <ArrowRight aria-hidden className="size-3.5" />
          <span className="sr-only">about {title}</span>
        </SectionLink>
        <span className="text-code-badge text-slate">#{number}</span>
      </div>
    </TiltCard>
  );
}
