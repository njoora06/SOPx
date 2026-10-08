import Image from "next/image";
import Link from "next/link";
import { company } from "@/data/company";
import { cn } from "@/lib/utils";

interface LogoProps {
  /** Show the "Enterprise Architecture" sub-label (header only). */
  withTagline?: boolean;
  className?: string;
}

/** Official lockup, cropped from /public/logo/logo.webp with the blue backdrop removed. */
const LOGO_SRC = "/logo/sopx-tech-logo.webp";

export function Logo({ withTagline = false, className }: LogoProps) {
  return (
    <Link href="/" aria-label={`${company.name} home`} className={cn("flex w-fit shrink-0 flex-col items-start gap-1 rounded outline-none focus-visible:shadow-glow-focus", className)}>
      {/* Rendered at 40px tall; Next serves a 1x/2x srcset from these dimensions. */}
      {/* The lockup has white lettering: in the light theme, invert it and turn the hue back so the "S" stays red. */}
      <Image src={LOGO_SRC} alt={company.name} width={104} height={40} loading={withTagline ? "eager" : "lazy"} className="h-10 w-auto light:[filter:invert(1)_hue-rotate(180deg)]" />
      {/* {withTagline && <span className="font-mono text-[9px] tracking-widest text-slate uppercase">Enterprise Architecture</span>} */}
    </Link>
  );
}
