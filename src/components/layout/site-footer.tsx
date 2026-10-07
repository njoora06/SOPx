import Link from "next/link";
import { FooterNav } from "@/components/navigation/footer-nav";
import { Logo } from "@/components/navigation/logo";
import { SectionLink } from "@/components/navigation/section-link";
import { Button } from "@/components/ui/button";
import { company } from "@/data/company";
import { footerServices } from "@/data/services";
import { CONSULTATION_HREF, LEGAL_NAV } from "@/lib/constants";
import { Container } from "./container";

export function SiteFooter() {
  return (
    <footer className="w-full border-t border-white/8 bg-void text-silver">
      <Container className="py-16">
        <div className="grid grid-cols-1 gap-12 border-b border-white/6 pb-16 md:grid-cols-2 lg:grid-cols-12">
          <div className="space-y-5 lg:col-span-4">
            <Logo />
            <p className="text-label-caps text-snow">{company.legalName}</p>
            <p className="max-w-sm text-body-sm">{company.description}</p>
            <Button asChild variant="secondary" size="sm">
              <SectionLink href={CONSULTATION_HREF}>Get a Consultation</SectionLink>
            </Button>
          </div>

          <div className="space-y-4 lg:col-span-5">
            <h2 className="text-label-caps text-white">Main Services</h2>
            <ul className="grid grid-cols-1 gap-x-4 gap-y-2 text-body-sm sm:grid-cols-2">
              {footerServices.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>

          <div className="space-y-4 lg:col-span-3">
            <h2 className="text-label-caps text-white">Navigation</h2>
            <FooterNav />
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 pt-8 font-mono text-body-sm text-slate sm:flex-row">
          <p>© {company.legalName}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            {LEGAL_NAV.map((item) => (
              <Link key={item.href} href={item.href} className="transition-colors hover:text-silver">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
