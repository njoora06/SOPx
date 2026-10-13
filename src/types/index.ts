import type { LucideIcon } from "lucide-react";

/**
 * Content models. Shaped so they can later be served from a CMS without
 * changing the components that consume them.
 */

/** Visual emphasis of a content item: vermilion accent or silver accent. */
export type Accent = "vermilion" | "silver";

export interface NavItem {
  label: string;
  href: string;
}

export type ServiceCategory = "software-ai" | "cloud-infrastructure" | "security-support" | "transformation-consulting";

export interface Service {
  /** URL segment of the service's page: /services/{slug}. */
  slug: string;
  number: string;
  title: string;
  summary: string;
  tag: string;
  icon: LucideIcon;
  accent: Accent;
  category: ServiceCategory;
  capabilities: string[];
  /** Spans two grid columns on tablet/desktop. */
  wide?: boolean;
  /** Search-result title of the service page (the site name is appended). */
  seoTitle: string;
  /** Meta description of the service page, about 150–160 characters. */
  metaDescription: string;
  /** Body copy of the service page, one paragraph per entry. */
  details: string[];
}

export interface Industry {
  title: string;
  summary: string;
  icon: LucideIcon;
}

export interface Pillar {
  title: string;
  summary: string;
  meta: string;
  icon: LucideIcon;
  accent: Accent;
}

export interface Strength {
  number: string;
  title: string;
  summary: string;
  accent: Accent;
}

export type SocialPlatform = "linkedin" | "instagram" | "facebook" | "x" | "youtube";

export interface SocialLink {
  platform: SocialPlatform;
  label: string;
  href: string;
}

export interface CompanyInfo {
  name: string;
  legalName: string;
  /** Other names the company is known by (Organization schema `alternateName`). */
  alternateNames: string[];
  description: string;
  /** Default meta description, about 150–160 characters. */
  metaDescription: string;
  url: string;
  email: string;
  socials: SocialLink[];
}
