import { PageTransition } from "@/components/animations/page-transition";
import { ContactSection } from "@/components/sections/contact-section";
import { ROUTES } from "@/lib/constants";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({ title: "Contact", path: ROUTES.contact });

export default function ContactPage() {
  return (
    <PageTransition>
      <ContactSection />
    </PageTransition>
  );
}
