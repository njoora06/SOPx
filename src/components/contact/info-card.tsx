import { cn } from "@/lib/utils";

/** Frosted card shell shared by the contact page's panels. */
export const infoCard = "relative overflow-hidden rounded-2xl border border-white/8 bg-surface-dim/95 backdrop-blur-xl";

/** 2.5px vermilion hairline across the top edge of each card. */
export function AccentLine() {
  return <div aria-hidden className="absolute inset-x-0 top-0 h-[2.5px] bg-linear-to-r from-transparent via-vermilion to-transparent" />;
}

export function InfoCard({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn(infoCard, className)}>
      <AccentLine />
      {children}
    </div>
  );
}
