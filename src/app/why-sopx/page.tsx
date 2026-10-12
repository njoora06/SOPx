import { PageTransition } from "@/components/animations/page-transition";
import { WhySection } from "@/components/sections/why-section";
import { ROUTES } from "@/lib/constants";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({ title: "Why SOPX Tech", path: ROUTES.why });

export default function WhyPage() {
  return (
    <PageTransition>
      <WhySection />
    </PageTransition>
  );
}
