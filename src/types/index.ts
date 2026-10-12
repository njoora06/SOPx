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

export interface SocialLink {
  label: string;
  href: string;
}

export interface CompanyInfo {
  name: string;
  legalName: string;
  description: string;
  url: string;
  email: string;
  socials: SocialLink[];
}
