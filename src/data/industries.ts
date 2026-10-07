import {
  Building2,
  Factory,
  GraduationCap,
  Hospital,
  Landmark,
  PiggyBank,
  Rocket,
  Store,
  Truck,
} from "lucide-react";
import type { Industry } from "@/types";

export const industries: Industry[] = [
  {
    title: "Businesses of all sizes",
    summary: "Streamlined setups that optimize internal operations and team communication.",
    icon: Building2,
  },
  {
    title: "Government organizations",
    summary: "Resilient, compliant, and secure institutional IT infrastructure foundations.",
    icon: Landmark,
  },
  {
    title: "Educational institutions",
    summary: "Campus network solutions, academic administration systems, and lab hardware.",
    icon: GraduationCap,
  },
  {
    title: "Healthcare organizations",
    summary: "High-availability systems protecting data privacy and critical diagnostic connectivity.",
    icon: Hospital,
  },
  {
    title: "Manufacturing companies",
    summary: "Industrial plant networks, telemetry monitoring, and inventory management tools.",
    icon: Factory,
  },
  {
    title: "Retail businesses",
    summary: "Point-of-sale stability, multi-outlet network links, and e-commerce platforms.",
    icon: Store,
  },
  {
    title: "Logistics and transportation companies",
    summary: "Fleet tracking infrastructure, routing architectures, and dispatch software.",
    icon: Truck,
  },
  {
    title: "Banks and financial institutions",
    summary: "Multi-layered security protocols, robust transactional systems, and data audits.",
    icon: PiggyBank,
  },
  {
    title: "Startups and growing enterprises",
    summary: "Flexible, cost-disciplined architectures built to scale as teams and traffic expand.",
    icon: Rocket,
  },
];
