import Image from "next/image";
import Link from "next/link";
import { company } from "@/data/company";
import { cn } from "@/lib/utils";

interface LogoProps {
  /** Load eagerly: it's above the fold (header only). */
  eager?: boolean;
  className?: string;
}

/** Transparent lockups: white lettering for the dark theme, blue lettering for the light theme. */
const LOGO_DARK_THEME_SRC = "/logo/sopx-logo-dark.png";
const LOGO_LIGHT_THEME_SRC = "/logo/sopx-logo-light.png";

export function Logo({ eager = false, className }: LogoProps) {
  return (
    <Link href="/" aria-label={`${company.name} home`} className={cn("flex w-fit shrink-0 flex-col items-start gap-1 rounded outline-none focus-visible:shadow-glow-focus", className)}>
      {/* Rendered at 40px tall; Next serves a 1x/2x srcset from these dimensions.
          Only the default (light) theme's logo loads eagerly. The other stays lazy,
          and browsers never fetch a lazy image while it's display:none, so each
          visitor downloads just the logo for their theme. */}
      <Image src={LOGO_DARK_THEME_SRC} alt={company.name} width={97} height={40} loading="lazy" className="h-10 w-auto light:hidden" />
      <Image src={LOGO_LIGHT_THEME_SRC} alt={company.name} width={97} height={40} loading={eager ? "eager" : "lazy"} className="hidden h-10 w-auto light:block" />
    </Link>
  );
}
