import { TiltCard } from "@/components/animations/tilt-card";
import { accentStyles, interactiveCard } from "@/lib/accent";
import { cn } from "@/lib/utils";
import type { Industry } from "@/types";

export function IndustryCard({ industry: { title, summary, icon: Icon } }: { industry: Industry }) {
  return (
    <TiltCard className={cn(interactiveCard, "group flex h-full items-start gap-4 p-space-lg")}>
      <span className={cn("flex size-10 shrink-0 items-center justify-center rounded border transition-transform group-hover:scale-105", accentStyles.silver.tile)}>
        <Icon aria-hidden className="size-5" />
      </span>
      <div className="space-y-1">
        <h3 className="font-sans text-title-md text-white">{title}</h3>
        <p className="text-body-sm text-silver">{summary}</p>
      </div>
    </TiltCard>
  );
}
