import { SocialIcon } from "@/components/icons/social-icons";
import { company } from "@/data/company";
import { cn } from "@/lib/utils";

/** Icon links to the company's social profiles (data/company.ts). */
export function SocialLinks({ className }: { className?: string }) {
  if (company.socials.length === 0) return null;

  return (
    <ul className={cn("flex flex-wrap items-center gap-2", className)}>
      {company.socials.map(({ platform, label, href }) => (
        <li key={platform}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${company.name} on ${label}`}
            title={label}
            className="flex size-9 items-center justify-center rounded-lg border border-white/8 bg-white/4 text-slate-400 transition-all outline-none hover:bg-vermilion hover:text-primary-foreground focus-visible:shadow-glow-focus"
          >
            <SocialIcon platform={platform} className="size-4" />
          </a>
        </li>
      ))}
    </ul>
  );
}
