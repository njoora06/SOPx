import { company } from "@/data/company";
import { contactChannels, headquarters } from "@/data/contact";
import { services } from "@/data/services";
import { ROUTES, serviceHref } from "@/lib/constants";
import { absoluteUrl, isPlaceholderSocial, ORGANIZATION_ID, WEBSITE_ID } from "@/lib/seo";
import type { Service } from "@/types";

/**
 * schema.org JSON-LD builders. Every node points back to the one Organization
 * by `@id`, so Google reads the whole site as a single company.
 */

// Only real profiles: pointing Google at placeholder links would mislead it.
const profileUrls = company.socials.map((s) => s.href).filter((href) => !isPlaceholderSocial(href));

const telephone = contactChannels.phone.href.replace("tel:", "");

const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: "Lajpat Nagar, Near Kanhaiya Talkies",
  addressLocality: "Padrauna",
  addressRegion: "Uttar Pradesh",
  postalCode: "274304",
  addressCountry: "IN",
};

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORGANIZATION_ID,
  name: company.name,
  legalName: company.legalName,
  alternateName: company.alternateNames,
  url: absoluteUrl("/"),
  logo: absoluteUrl("/logo/sopx-logo-light.png"),
  description: company.metaDescription,
  email: company.email,
  telephone,
  address: postalAddress,
  areaServed: "IN",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    telephone,
    email: company.email,
    areaServed: "IN",
  },
  knowsAbout: services.map((s) => s.title),
  ...(profileUrls.length > 0 && { sameAs: profileUrls }),
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  name: company.name,
  alternateName: company.alternateNames,
  url: absoluteUrl("/"),
  inLanguage: "en-IN",
  publisher: { "@id": ORGANIZATION_ID },
};

/** The headquarters as a local business, for the contact page. */
export const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": absoluteUrl(`${ROUTES.contact}#business`),
  name: company.name,
  url: absoluteUrl(ROUTES.contact),
  image: absoluteUrl("/opengraph-image.jpg"),
  logo: absoluteUrl("/logo/sopx-logo-light.png"),
  telephone,
  email: company.email,
  address: postalAddress,
  geo: { "@type": "GeoCoordinates", latitude: 26.9025, longitude: 83.9818 },
  hasMap: headquarters.mapsUrl,
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "09:30",
    closes: "18:30",
  },
  areaServed: "IN",
  parentOrganization: { "@id": ORGANIZATION_ID },
};

export function serviceJsonLd(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": absoluteUrl(`${serviceHref(service.slug)}#service`),
    name: service.title,
    serviceType: service.title,
    description: service.metaDescription,
    url: absoluteUrl(serviceHref(service.slug)),
    provider: { "@id": ORGANIZATION_ID },
    areaServed: "IN",
  };
}

export const servicesListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: `${company.name} IT services`,
  itemListElement: services.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: s.title,
    url: absoluteUrl(serviceHref(s.slug)),
  })),
};

/** Breadcrumb trail from Home; the last item is the current page. */
export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
