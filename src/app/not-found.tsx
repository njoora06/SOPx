import type { Metadata } from "next";
import { Enter } from "@/components/animations/enter";
import { Container } from "@/components/layout/container";
import { SectionLink } from "@/components/navigation/section-link";
import { Eyebrow } from "@/components/sections/section-heading";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants";

export const metadata: Metadata = { title: "Page Not Found" };

export default function NotFound() {
  return (
    <section className="relative w-full border-y border-white/8 bg-surface-container-lowest py-24">
      <Container>
        <div className="max-w-2xl space-y-4">
          <Enter>
            <Eyebrow>Error 404</Eyebrow>
          </Enter>
          <Enter index={1}>
            <h1 className="text-headline-lg">Page not found</h1>
          </Enter>
          <Enter index={2}>
            <p className="text-body-lg text-silver">The page you are looking for doesn’t exist or has moved.</p>
          </Enter>
          <Enter index={3} className="flex flex-wrap gap-4 pt-4">
            <Button asChild>
              <SectionLink href={ROUTES.home}>Back to Home</SectionLink>
            </Button>
            <Button asChild variant="secondary">
              <SectionLink href={ROUTES.services}>View Services</SectionLink>
            </Button>
          </Enter>
        </div>
      </Container>
    </section>
  );
}
