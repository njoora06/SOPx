import type { Metadata } from "next";
import { Geist, Geist_Mono, Sora } from "next/font/google";
import { CursorSpotlight } from "@/components/animations/cursor-spotlight";
import { MotionProvider } from "@/components/animations/motion-provider";
import { ScrollProgress } from "@/components/animations/scroll-progress";
import { AmbientMesh } from "@/components/layout/ambient-mesh";
import { MobileActionBar } from "@/components/layout/mobile-action-bar";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { company } from "@/data/company";
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
  openGraph: {
    type: "website",
    siteName: company.name,
    locale: "en_IN",
    url: "/",
  },
  robots: { index: true, follow: true },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: company.legalName,
  url: company.url,
  email: company.email,
  sameAs: company.socials.map((s) => s.href),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning className={`${sora.variable} ${geist.variable} ${geistMono.variable}`}>
      <head>
        {/* Lets CSS hide reveal-on-scroll content only when JS will reveal it. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="relative overflow-x-hidden pb-18 md:pb-0">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <MotionProvider>
          <ScrollProgress />
          <CursorSpotlight />
          <AmbientMesh />
          <SiteHeader />
          <main className="w-full pt-20">{children}</main>
          <SiteFooter />
          <MobileActionBar />
        </MotionProvider>
      </body>
    </html>
  );
}
