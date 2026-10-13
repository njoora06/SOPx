import { notFound } from "next/navigation";
import { PageTransition } from "@/components/animations/page-transition";
import { ServiceDetail } from "@/components/sections/service-detail";
import { JsonLd } from "@/components/seo/json-ld";
import { getService, services } from "@/data/services";
import { ROUTES, serviceHref } from "@/lib/constants";
import { createMetadata } from "@/lib/seo";
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/structured-data";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">) {
  const service = getService((await params).slug);
  if (!service) return {};
  return createMetadata({ title: service.seoTitle, description: service.metaDescription, path: serviceHref(service.slug) });
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const service = getService((await params).slug);
  if (!service) notFound();

  return (
    <PageTransition>
      <JsonLd data={serviceJsonLd(service)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Services", path: ROUTES.services },
          { name: service.title, path: serviceHref(service.slug) },
        ])}
      />
      <ServiceDetail service={service} />
    </PageTransition>
  );
}
