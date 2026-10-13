import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Enter } from "@/components/animations/enter";
import { Reveal } from "@/components/animations/reveal";
import { Container } from "@/components/layout/container";
import { SectionLink } from "@/components/navigation/section-link";
import { ServiceCard } from "@/components/services/service-card";
import { Button } from "@/components/ui/button";
import { services } from "@/data/services";
import { accentStyles, interactiveCard } from "@/lib/accent";
import { CONSULTATION_HREF, ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { Service } from "@/types";
import { Eyebrow, SectionHeading } from "./section-heading";

/** Up to three other services: same category first, then the rest in order. */
function relatedServices(service: Service) {
  const others = services.filter((s) => s.slug !== service.slug);
  const sameCategory = others.filter((s) => s.category === service.category);
  return [...sameCategory, ...others.filter((s) => s.category !== service.category)].slice(0, 3);
}

/** A service's own page: what it covers, capabilities, consultation CTA and related services. */
export function ServiceDetail({ service }: { service: Service }) {
  const { title, tag, icon: Icon, accent, details, capabilities } = service;
  const styles = accentStyles[accent];

  return (
    <>
      <section className="relative w-full border-y border-white/8 bg-surface-container-lowest py-24">
        <Container>
          <Enter>
            <nav aria-label="Breadcrumb" className="mb-10 text-body-sm text-slate">
              <ol className="flex flex-wrap items-center gap-1.5">
                <li>
                  <Link href={ROUTES.home} className="transition-colors hover:text-white">Home</Link>
                </li>
                <li className="flex items-center gap-1.5">
                  <ChevronRight aria-hidden className="size-3.5" />
                  <Link href={ROUTES.services} className="transition-colors hover:text-white">Services</Link>
                </li>
                <li aria-current="page" className="flex items-center gap-1.5 text-silver">
                  <ChevronRight aria-hidden className="size-3.5" />
                  {title}
                </li>
              </ol>
            </nav>
          </Enter>

          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="space-y-4 lg:col-span-5">
              <Enter>
                <Eyebrow accent={accent}>{tag}</Eyebrow>
              </Enter>
              <Enter index={1}>
                <h1 className="text-headline-lg">{title}</h1>
              </Enter>
              <Enter index={2}>
                <div aria-hidden className="h-1 w-16 rounded-full bg-linear-to-r from-vermilion to-silver" />
              </Enter>
              <Enter index={3} className="pt-4">
                <Button asChild>
                  <SectionLink href={CONSULTATION_HREF}>
                    Get a Consultation <ArrowRight aria-hidden />
                  </SectionLink>
                </Button>
              </Enter>
            </div>

            <div className="space-y-6 text-body-lg text-silver lg:col-span-7">
              {details.map((paragraph, i) => (
                <Enter key={paragraph} index={i + 1}>
                  <p>{paragraph}</p>
                </Enter>
              ))}

              <Reveal variant="scale" className="pt-4">
                <div className={cn(interactiveCard, "flex items-start gap-4 bg-obsidian-2 p-5")}>
                  <span className={cn("flex size-10 shrink-0 items-center justify-center rounded border", styles.tile)}>
                    <Icon aria-hidden className="size-5" />
                  </span>
                  <div>
                    <h2 className="mb-2 font-sans text-title-md text-white">Key capabilities</h2>
                    <ul className="space-y-2 text-body-md text-snow">
                      {capabilities.map((c) => (
                        <li key={c} className="flex items-center gap-2">
                          <span aria-hidden className={cn("size-1.5 shrink-0 rounded-full", styles.dot)} />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      <section className="relative w-full bg-obsidian-0 py-24">
        <Container>
          <SectionHeading eyebrow="Explore More" title="Related Services" className="mb-12" />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {relatedServices(service).map((s, i) => (
              <Reveal key={s.slug} index={i} variant="scale" className="h-full">
                <ServiceCard service={s} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
