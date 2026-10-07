import { PageTransition } from "@/components/animations/page-transition";
import { AboutSection } from "@/components/sections/about-section";
import { ContactSection } from "@/components/sections/contact-section";
import { Hero } from "@/components/sections/hero";
import { IndustriesSection } from "@/components/sections/industries-section";
import { ServicesSection } from "@/components/sections/services-section";
import { VisionMissionSection } from "@/components/sections/vision-mission-section";
import { WhatWeDoSection } from "@/components/sections/what-we-do-section";
import { WhySection } from "@/components/sections/why-section";

export default function HomePage() {
  return (
    <PageTransition>
      <Hero />
      <AboutSection />
      <WhatWeDoSection />
      <ServicesSection />
      <IndustriesSection />
      <WhySection />
      <VisionMissionSection />
      <ContactSection />
    </PageTransition>
  );
}
