import { PageTransition } from "@/components/animations/page-transition";
import { AboutSection } from "@/components/sections/about-section";
import { ROUTES } from "@/lib/constants";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "About SOPX Tech (SOPX Technologies)",
  description:
    "About SOPX Tech Private Limited (SOPX Technologies): an end-to-end technology partner for software, AI, cloud, networking, cybersecurity and IT support.",
  path: ROUTES.about,
  absoluteTitle: true,
});

export default function AboutPage() {
  return (
    <PageTransition>
      <AboutSection />
    </PageTransition>
  );
}
