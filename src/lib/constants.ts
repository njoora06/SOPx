import type { NavItem } from "@/types";

export const ROUTES = {
  home: "/",
  about: "/about",
  services: "/services",
  industries: "/industries",
  whySopx: "/why-sopx-tech",
  contact: "/contact",
  consultation: "/get-a-consultation",
  privacy: "/privacy-policy",
  terms: "/terms",
} as const;

/** Homepage section anchors (the design is a single scrolling page). */
export const SECTIONS = {
  about: "about-overview",
  services: "services-matrix",
  industries: "industries",
  why: "why-sopx",
  contact: "contact-cta",
} as const;

/** Sections the navbar tracks while scrolling, in page order. */
export const SECTION_IDS = [SECTIONS.about, SECTIONS.services, SECTIONS.industries, SECTIONS.why, SECTIONS.contact] as const;

/** Nav href for the section in view; `null` (page top) maps to Home. */
export function activeNavHref(sectionId: string | null) {
  return sectionId ? `/#${sectionId}` : "/";
}

export const MAIN_NAV: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: `/#${SECTIONS.about}` },
  { label: "Services", href: `/#${SECTIONS.services}` },
  { label: "Industries", href: `/#${SECTIONS.industries}` },
  { label: "Why SOPX Tech", href: `/#${SECTIONS.why}` },
  { label: "Contact", href: `/#${SECTIONS.contact}` },
];

export const LEGAL_NAV: NavItem[] = [
  { label: "Privacy Policy", href: ROUTES.privacy },
  { label: "Terms & Conditions", href: ROUTES.terms },
];

/** "Get a Consultation" buttons scroll to the consultation CTA section. */
export const CONSULTATION_HREF = `/#${SECTIONS.contact}`;
