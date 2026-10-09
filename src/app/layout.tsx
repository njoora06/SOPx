import type { Metadata } from "next";
import { Geist, Geist_Mono, Sora } from "next/font/google";
import { CursorSpotlight } from "@/components/animations/cursor-spotlight";
import { ScrollProgress } from "@/components/animations/scroll-progress";
import { AmbientMesh } from "@/components/layout/ambient-mesh";
import { MobileActionBar } from "@/components/layout/mobile-action-bar";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { company } from "@/data/company";
import { contactChannels } from "@/data/contact";
import { sharedOpenGraph } from "@/lib/seo";
import { DEFAULT_THEME, themeInitScript } from "@/lib/theme";
import "./globals.css";

const sora = Sora({ variable: "--font-sora", subsets: ["latin"], weight: ["600", "700"], display: "swap" });
const geist = Geist({ variable: "--font-geist", subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: {
    default: `${company.legalName} — Enterprise Engineering & Technology Architecture`,
    template: `%s | ${company.name}`,
  },
  description: company.description,
  applicationName: company.name,
  authors: [{ name: company.legalName }],
  alternates: { canonical: "/" },
  openGraph: { ...sharedOpenGraph, url: "/" },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: company.legalName,
  url: company.url,
  logo: new URL("/logo/sopx-logo-light.png", company.url).toString(),
  email: company.email,
  telephone: contactChannels.phone.href.replace("tel:", ""),
  address: {
    "@type": "PostalAddress",
    streetAddress: "Lajpat Nagar, Near Kanhaiya Talkies",
    addressLocality: "Padrauna",
    addressRegion: "Uttar Pradesh",
    postalCode: "274304",
    addressCountry: "IN",
  },
  sameAs: company.socials.map((s) => s.href),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-theme={DEFAULT_THEME} suppressHydrationWarning className={`${sora.variable} ${geist.variable} ${geistMono.variable}`}>
      <head>
        {/* Lets CSS hide reveal-on-scroll content only when JS will reveal it,
            and applies the saved theme before first paint. */}
        <script dangerouslySetInnerHTML={{ __html: `document.documentElement.classList.add('js');${themeInitScript}` }} />
      </head>
      <body className="relative overflow-x-hidden pb-18 md:pb-0">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <ScrollProgress />
        <AmbientMesh />
        <CursorSpotlight />
        <SiteHeader />
        <main className="w-full pt-20">{children}</main>
        <SiteFooter />
        <MobileActionBar />
      </body>
    </html>
  );
}
