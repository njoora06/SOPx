import { PageTransition } from "@/components/animations/page-transition";
import { ContactSection } from "@/components/sections/contact-section";
import { JsonLd } from "@/components/seo/json-ld";
import { Toaster } from "@/components/ui/toaster";
import { ROUTES } from "@/lib/constants";
import { createMetadata } from "@/lib/seo";
import { localBusinessJsonLd } from "@/lib/structured-data";

export const metadata = createMetadata({
  title: "Contact SOPX Tech — Get an IT & AI Consultation",
  description:
    "Contact SOPX Tech in Padrauna, Kushinagar, Uttar Pradesh. Call +91 9453012655 or send a brief for software, AI, cloud, cybersecurity or IT infrastructure projects.",
  path: ROUTES.contact,
  absoluteTitle: true,
});

export default function ContactPage() {
  return (
    <PageTransition>
      <JsonLd data={localBusinessJsonLd} />
      <ContactSection />
      <Toaster />
    </PageTransition>
  );
}
