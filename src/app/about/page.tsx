import { PageTransition } from "@/components/animations/page-transition";
import { AboutSection } from "@/components/sections/about-section";
import { ROUTES } from "@/lib/constants";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({ title: "About", path: ROUTES.about });

export default function AboutPage() {
  return (
    <PageTransition>
      <AboutSection />
    </PageTransition>
  );
}
