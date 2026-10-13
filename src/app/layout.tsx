import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Sora } from "next/font/google";
import { CursorEffects } from "@/components/animations/cursor-effects";
import { ScrollProgress } from "@/components/animations/scroll-progress";
import { AmbientMesh } from "@/components/layout/ambient-mesh";
import { MobileActionBar } from "@/components/layout/mobile-action-bar";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { JsonLd } from "@/components/seo/json-ld";
import { company } from "@/data/company";
import { sharedOpenGraph } from "@/lib/seo";
import { organizationJsonLd, websiteJsonLd } from "@/lib/structured-data";
import { DEFAULT_THEME, THEME_COLORS, themeInitScript } from "@/lib/theme";
import "./globals.css";

const sora = Sora({ variable: "--font-sora", subsets: ["latin"], weight: ["600", "700"], display: "swap" });
const geist = Geist({ variable: "--font-geist", subsets: ["latin"], display: "swap" });
// Only small labels use the mono face, so it isn't worth a preload.
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap", preload: false });

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: {
    default: `${company.name} — AI Development & IT Services Company in India`,
    template: `%s | ${company.name}`,
  },
  description: company.metaDescription,
  applicationName: company.name,
  authors: [{ name: company.legalName }],
  publisher: company.legalName,
  // Canonical URLs are set per page (lib/seo.ts) so a new page never inherits the homepage's.
  openGraph: { ...sharedOpenGraph, title: company.name, description: company.metaDescription },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
};

// Lets content reach under the notch / home indicator; the bottom bar pads itself with safe-area insets.
export const viewport: Viewport = { viewportFit: "cover" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-theme={DEFAULT_THEME} suppressHydrationWarning className={`${sora.variable} ${geist.variable} ${geistMono.variable}`}>
      <head>
        {/* Browser UI colour; follows the chosen theme (lib/theme.ts), not the OS setting. */}
        <meta name="theme-color" content={THEME_COLORS[DEFAULT_THEME]} />
        {/* Lets CSS hide reveal-on-scroll content only when JS will reveal it,
            and applies the saved theme before first paint. */}
        <script dangerouslySetInnerHTML={{ __html: `document.documentElement.classList.add('js');${themeInitScript}` }} />
      </head>
      <body className="relative overflow-x-clip pb-[calc(4.5rem+1px+env(safe-area-inset-bottom))] md:pb-0">
        <JsonLd data={organizationJsonLd} />
        <JsonLd data={websiteJsonLd} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-60 focus:rounded focus:bg-vermilion focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <ScrollProgress />
        <AmbientMesh />
        <CursorEffects />
        <SiteHeader />
        <main id="main" tabIndex={-1} className="w-full pt-20 outline-none">{children}</main>
        <SiteFooter />
        <MobileActionBar />
      </body>
    </html>
  );
}
