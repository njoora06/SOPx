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

/** Section anchors (About and Contact live on their own pages). */
export const SECTIONS = {
  about: "about-overview",
  services: "services-matrix",
  industries: "industries",
  why: "why-sopx",
  contact: "contact-cta",
} as const;

/** Sections the navbar tracks while scrolling, in page order. */
export const SECTION_IDS = [SECTIONS.services, SECTIONS.industries, SECTIONS.why] as const;

/**
 * Nav href to highlight: the route itself on standalone pages, otherwise the
 * homepage section in view (`null`, the page top, maps to Home).
 */
export function activeNavHref(pathname: string, sectionId: string | null) {
  if (pathname !== ROUTES.home) return pathname;
  return sectionId ? `/#${sectionId}` : "/";
}

export const MAIN_NAV: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: `/#${SECTIONS.services}` },
  { label: "Industries", href: `/#${SECTIONS.industries}` },
  { label: "Why SOPX Tech", href: `/#${SECTIONS.why}` },
  { label: "About", href: ROUTES.about },
  { label: "Contact", href: ROUTES.contact },
];

export const LEGAL_NAV: NavItem[] = [
  { label: "Privacy Policy", href: ROUTES.privacy },
  { label: "Terms & Conditions", href: ROUTES.terms },
];

/** "Get a Consultation" buttons open the contact page with the consultation form. */
export const CONSULTATION_HREF = ROUTES.contact;
