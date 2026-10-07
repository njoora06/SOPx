import { Reveal } from "@/components/animations/reveal";
import { accentStyles } from "@/lib/accent";
import { cn } from "@/lib/utils";
import type { Accent } from "@/types";

interface EyebrowProps {
  children: React.ReactNode;
  accent?: Accent;
  className?: string;
}

/** Small all-caps section label with a leading status dot. */
export function Eyebrow({ children, accent = "vermilion", className }: EyebrowProps) {
  return (
    <p className={cn("inline-flex items-center gap-2 text-label-caps", accentStyles[accent].text, className)}>
      <span aria-hidden className={cn("size-1.5 rounded-full", accentStyles[accent].dot)} />
      {children}
    </p>
  );
}

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  accent?: Accent;
  className?: string;
}

export function SectionHeading({ eyebrow, title, description, accent, className }: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl space-y-3", className)}>
      <Reveal>
        <Eyebrow accent={accent}>{eyebrow}</Eyebrow>
      </Reveal>
      <Reveal index={1}>
        <h2 className="text-headline-lg">{title}</h2>
      </Reveal>
      {description && (
        <Reveal index={2}>
          <p className="text-body-lg text-silver">{description}</p>
        </Reveal>
      )}
    </div>
  );
}
