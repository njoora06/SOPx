import { PageTransition } from "@/components/animations/page-transition";
import { Enter } from "@/components/animations/enter";
import { Container } from "@/components/layout/container";
import { Eyebrow } from "@/components/sections/section-heading";
import { JsonLd } from "@/components/seo/json-ld";
import { ServicesExplorer } from "@/components/services/services-explorer";
import { servicesIntro } from "@/data/home";
import { ROUTES } from "@/lib/constants";
import { createMetadata } from "@/lib/seo";
import { breadcrumbJsonLd, servicesListJsonLd } from "@/lib/structured-data";

export const metadata = createMetadata({
  title: "IT Services & AI Development Solutions",
  description:
    "SOPX Tech IT services: custom software development, AI solutions, cloud computing, cybersecurity, networking, IT infrastructure, consulting and support.",
  path: ROUTES.services,
});

export default function ServicesPage() {
  return (
    <PageTransition>
      <JsonLd data={servicesListJsonLd} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Services", path: ROUTES.services }])} />
      <section className="relative w-full border-y border-white/8 bg-surface-container-lowest py-24">
        <Container>
          {/* The page heading paints with the first HTML, like the About page. */}
          <div className="mb-12 max-w-3xl space-y-3">
            <Enter>
              <Eyebrow>{servicesIntro.eyebrow}</Eyebrow>
            </Enter>
            <Enter index={1}>
              <h1 className="text-headline-lg">IT Services &amp; AI Solutions</h1>
            </Enter>
            <Enter index={2}>
              <p className="text-body-lg text-silver">{servicesIntro.description}</p>
            </Enter>
          </div>
          <ServicesExplorer />
        </Container>
      </section>
    </PageTransition>
  );
}
