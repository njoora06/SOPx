import Link from "next/link";
import { company } from "@/data/company";
import { cn } from "@/lib/utils";

interface LogoProps {
  /** Show the "Enterprise Architecture" sub-label (header only). */
  withTagline?: boolean;
  className?: string;
}

// TODO(brand): the logo mark from the design (left of the wordmark) needs the
// real logo file in /public/logo; the source image in the mockup is private.
export function Logo({ withTagline = false, className }: LogoProps) {
  return (
    <Link href="/" aria-label={`${company.name} home`} className={cn("flex shrink-0 flex-col rounded outline-none focus-visible:shadow-glow-focus", className)}>
      <span className="flex items-center gap-1.5 font-display text-lg font-bold tracking-tight text-white">
        SOPX
        <span className="bg-linear-to-r from-silver via-snow to-vermilion bg-clip-text font-extrabold text-transparent">Tech</span>
      </span>
      {withTagline && <span className="font-mono text-[9px] tracking-widest text-slate uppercase">Enterprise Architecture</span>}
    </Link>
  );
}
