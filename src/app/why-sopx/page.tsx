import { PageTransition } from "@/components/animations/page-transition";
import { WhySection } from "@/components/sections/why-section";
import { ROUTES } from "@/lib/constants";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Why Choose SOPX Tech as Your Technology Partner",
  description:
    "Why organizations choose SOPX Tech: complete IT solutions from one company, an experienced, practical team, and long-term support for software, AI and IT.",
  path: ROUTES.why,
  absoluteTitle: true,
});

export default function WhyPage() {
  return (
    <PageTransition>
      <WhySection />
    </PageTransition>
  );
}
