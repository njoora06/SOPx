import {
  Bot,
  Cloud,
  Code,
  Lightbulb,
  MonitorSmartphone,
  Network,
  Puzzle,
  Router,
  Shield,
  Workflow,
  Wrench,
} from "lucide-react";
import type { Service, ServiceCategory } from "@/types";

export const services: Service[] = [
  {
    number: "01",
    title: "Custom Software Development",
    summary:
      "Bespoke web applications, internal operational tools, and enterprise management software designed to specific operational constraints.",
    tag: "Software",
    icon: Code,
    accent: "silver",
    category: "software-ai",
    capabilities: ["Tailored business logic implementation", "Scalable multi-tier web platforms"],
  },
  {
    number: "02",
    title: "Artificial Intelligence (AI) Solutions",
    summary:
      "Practical artificial intelligence and machine learning components deployed to automate routines and glean operational signals.",
    tag: "Intelligence",
    icon: Bot,
    accent: "vermilion",
    category: "software-ai",
    capabilities: ["Workflow and process automation", "Intelligent data processing models"],
  },
  {
    number: "03",
    title: "Cloud Computing",
    summary:
      "Strategic cloud deployment, virtual machine setups, data storage provisioning, and secure hybrid environments.",
    tag: "Cloud",
    icon: Cloud,
    accent: "silver",
    category: "cloud-infrastructure",
    capabilities: ["Private, public, and hybrid setup", "Elastic resource management"],
  },
  {
    number: "04",
    title: "IT Infrastructure Setup",
    summary:
      "Ground-up establishment of enterprise on-premise hardware, server room architectures, power backups, and system rooms.",
    tag: "Infrastructure",
    icon: Network,
    accent: "silver",
    category: "cloud-infrastructure",
    capabilities: ["Server staging and physical installation", "Baseline systems configuration"],
  },
  {
    number: "05",
    title: "Networking Solutions",
    summary:
      "High-bandwidth LAN, WAN, SD-WAN topologies, switching matrices, and secure wireless environments for multi-site operations.",
    tag: "Networks",
    icon: Router,
    accent: "silver",
    category: "cloud-infrastructure",
    capabilities: ["Structured cabling and routing design", "Performance and traffic optimization"],
  },
  {
    number: "06",
    title: "Cybersecurity",
    summary:
      "Comprehensive threat defense, boundary firewalls, access management systems, and organizational digital vulnerability audits.",
    tag: "Security",
    icon: Shield,
    accent: "vermilion",
    category: "security-support",
    capabilities: ["Perimeter defense and data governance", "Security baseline and policy hardening"],
  },
  {
    number: "07",
    title: "System Integration",
    summary:
      "Harmonizing legacy enterprise applications, databases, third-party APIs, and hardware peripherals into unified ecosystems.",
    tag: "Systems",
    icon: Puzzle,
    accent: "silver",
    category: "cloud-infrastructure",
    capabilities: ["Cross-platform data synchronization", "Interoperability architecture"],
  },
  {
    number: "08",
    title: "IT Hardware Supply",
    summary:
      "Procurement, pre-configuration, and direct deployment of corporate workstations, server nodes, storage chassis, and networking devices.",
    tag: "Hardware",
    icon: MonitorSmartphone,
    accent: "silver",
    category: "cloud-infrastructure",
    capabilities: ["Enterprise-grade hardware selection", "Pre-shipment verification and testing"],
  },
  {
    number: "09",
    title: "Technology Consulting",
    summary:
      "Actionable strategic advisory that assists organizational leaders in making justified technology investments and architecture decisions.",
    tag: "Consulting",
    icon: Lightbulb,
    accent: "silver",
    category: "transformation-consulting",
    capabilities: ["Infrastructure feasibility evaluations", "Technical roadmapping & cost assessment"],
  },
  {
    number: "10",
    title: "Technical Support & Maintenance",
    summary:
      "Responsive maintenance contracts, active monitoring, system patching, and rapid hardware/software incident intervention.",
    tag: "Operations",
    icon: Wrench,
    accent: "vermilion",
    category: "security-support",
    capabilities: ["Scheduled preventive system maintenance", "Responsive incident management"],
  },
  {
    number: "11",
    title: "Digital Transformation Services",
    summary:
      "End-to-end structural overhaul of paper-based or obsolete manual procedures into modern, interconnected digital operational workflows that scale cleanly.",
    tag: "Modernization",
    icon: Workflow,
    accent: "silver",
    category: "transformation-consulting",
    capabilities: ["Process digitization & automated routing", "Enterprise tech stack modernization"],
    wide: true,
  },
];

export const serviceFilters: { label: string; value: ServiceCategory | "all" }[] = [
  { label: `All ${services.length} Capabilities`, value: "all" },
  { label: "Software & AI", value: "software-ai" },
  { label: "Cloud & Infrastructure", value: "cloud-infrastructure" },
  { label: "Cybersecurity & Support", value: "security-support" },
  { label: "Transformation & Consulting", value: "transformation-consulting" },
];

/** Short service names listed in the footer. */
export const footerServices = [
  "Software Development",
  "Artificial Intelligence",
  "Cloud Services",
  "IT Infrastructure",
  "Cybersecurity",
  "Hardware Solutions",
  "Technical Support",
  "System Integration",
  "Technology Consulting",
  "Digital Transformation Services",
];
