import { PageTransition } from "@/components/animations/page-transition";
import { Hero } from "@/components/sections/hero";
import { IndustriesSection } from "@/components/sections/industries-section";
import { ServicesSection } from "@/components/sections/services-section";
import { VisionMissionSection } from "@/components/sections/vision-mission-section";
import { WhatWeDoSection } from "@/components/sections/what-we-do-section";
import { company } from "@/data/company";
import { ROUTES } from "@/lib/constants";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: `${company.name}: AI Development Company & IT Services in India`,
  description: company.metaDescription,
  path: ROUTES.home,
  absoluteTitle: true,
});

export default function HomePage() {
  return (
    <PageTransition>
      <Hero />
      <WhatWeDoSection />
      <ServicesSection />
      <IndustriesSection />
      <VisionMissionSection />
    </PageTransition>
  );
}
