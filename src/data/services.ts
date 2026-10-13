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
    slug: "custom-software-development",
    number: "01",
    title: "Custom Software Development",
    summary:
      "Bespoke web applications, internal operational tools, and enterprise management software designed to specific operational constraints.",
    tag: "Software",
    icon: Code,
    accent: "silver",
    category: "software-ai",
    capabilities: ["Tailored business logic implementation", "Scalable multi-tier web platforms"],
    seoTitle: "Custom Software Development Company",
    metaDescription:
      "Custom software development by SOPX Tech: web applications, internal tools and enterprise management software built around how your organization works.",
    details: [
      "SOPX Tech designs and builds custom software for organizations whose work does not fit off-the-shelf products. We start from your actual processes, constraints and users, then build web applications, internal operational tools and enterprise management systems around them.",
      "Typical projects include business portals, workflow and approval systems, inventory and operations dashboards, and multi-tier web platforms that need to grow with the organization. We handle requirements, architecture, development, testing and deployment.",
      "Because SOPX Tech also delivers cloud, infrastructure and support services, the software we build can be hosted, secured and maintained by the same team after launch.",
    ],
  },
  {
    slug: "ai-development",
    number: "02",
    title: "Artificial Intelligence (AI) Solutions",
    summary:
      "Practical artificial intelligence and machine learning components deployed to automate routines and glean operational signals.",
    tag: "Intelligence",
    icon: Bot,
    accent: "vermilion",
    category: "software-ai",
    capabilities: ["Workflow and process automation", "Intelligent data processing models"],
    seoTitle: "AI Development Company & AI Solutions",
    metaDescription:
      "SOPX Tech is an AI development company building practical artificial intelligence and machine learning solutions that automate work and turn data into decisions.",
    details: [
      "SOPX Tech builds practical artificial intelligence (AI) and machine learning solutions for organizations that want measurable results, not experiments. We focus on automating repetitive work and extracting useful signals from the data you already have.",
      "Our AI development work covers workflow and process automation, intelligent document and data processing, predictive models, and AI features embedded into existing business software. Every solution is scoped against a clear operational objective.",
      "As an AI development company that also delivers software, cloud and infrastructure, SOPX Tech can take an AI project from feasibility assessment through deployment, integration and ongoing maintenance.",
    ],
  },
  {
    slug: "cloud-computing",
    number: "03",
    title: "Cloud Computing",
    summary:
      "Strategic cloud deployment, virtual machine setups, data storage provisioning, and secure hybrid environments.",
    tag: "Cloud",
    icon: Cloud,
    accent: "silver",
    category: "cloud-infrastructure",
    capabilities: ["Private, public, and hybrid setup", "Elastic resource management"],
    seoTitle: "Cloud Computing & Hybrid Cloud Services",
    metaDescription:
      "Cloud computing services from SOPX Tech: cloud deployment, virtual machines, storage provisioning and secure private, public and hybrid cloud environments.",
    details: [
      "SOPX Tech helps organizations plan, deploy and run cloud environments that match their workload, budget and security needs. We work across private, public and hybrid cloud setups.",
      "Services include cloud deployment and migration, virtual machine setup, data storage provisioning, backup configuration and elastic resource management so capacity follows demand.",
      "We design cloud environments alongside your on-premise systems and networks, so that applications, data and users connect securely wherever they run.",
    ],
  },
  {
    slug: "it-infrastructure",
    number: "04",
    title: "IT Infrastructure Setup",
    summary:
      "Ground-up establishment of enterprise on-premise hardware, server room architectures, power backups, and system rooms.",
    tag: "Infrastructure",
    icon: Network,
    accent: "silver",
    category: "cloud-infrastructure",
    capabilities: ["Server staging and physical installation", "Baseline systems configuration"],
    seoTitle: "IT Infrastructure Setup & Server Rooms",
    metaDescription:
      "IT infrastructure setup by SOPX Tech: on-premise servers, server room architecture, power backup and baseline system configuration for growing organizations.",
    details: [
      "SOPX Tech establishes IT infrastructure from the ground up for offices, campuses and enterprises. We plan and build the physical and system foundations that every other technology depends on.",
      "Work includes server staging and physical installation, server room and rack architecture, power backup planning, and baseline operating system and network configuration.",
      "Infrastructure is delivered with documentation and can be backed by SOPX Tech technical support and maintenance contracts, so it stays reliable after handover.",
    ],
  },
  {
    slug: "networking-solutions",
    number: "05",
    title: "Networking Solutions",
    summary:
      "High-bandwidth LAN, WAN, SD-WAN topologies, switching matrices, and secure wireless environments for multi-site operations.",
    tag: "Networks",
    icon: Router,
    accent: "silver",
    category: "cloud-infrastructure",
    capabilities: ["Structured cabling and routing design", "Performance and traffic optimization"],
    seoTitle: "Networking Solutions: LAN, WAN & Wi-Fi",
    metaDescription:
      "Enterprise networking solutions from SOPX Tech: LAN, WAN and SD-WAN design, structured cabling, switching and secure wireless networks for multi-site operations.",
    details: [
      "SOPX Tech designs and deploys business networks that are fast, secure and easy to manage, from a single office to multi-site operations.",
      "Our networking solutions cover LAN, WAN and SD-WAN topologies, structured cabling, routing and switching design, secure wireless environments, and performance and traffic optimization.",
      "Networks are planned together with your infrastructure, cloud and security requirements, so connectivity supports the rest of your technology rather than limiting it.",
    ],
  },
  {
    slug: "cybersecurity",
    number: "06",
    title: "Cybersecurity",
    summary:
      "Comprehensive threat defense, boundary firewalls, access management systems, and organizational digital vulnerability audits.",
    tag: "Security",
    icon: Shield,
    accent: "vermilion",
    category: "security-support",
    capabilities: ["Perimeter defense and data governance", "Security baseline and policy hardening"],
    seoTitle: "Cybersecurity Services & Security Audits",
    metaDescription:
      "Cybersecurity services from SOPX Tech: firewalls, access management, vulnerability audits, data governance and security policy hardening for organizations.",
    details: [
      "SOPX Tech helps organizations protect their systems, data and users with layered, practical cybersecurity.",
      "Services include perimeter defense and boundary firewalls, identity and access management, digital vulnerability audits, data governance, and security baseline and policy hardening.",
      "Because we also build software and infrastructure, security is designed into systems from the start and reviewed as they change, rather than added afterwards.",
    ],
  },
  {
    slug: "system-integration",
    number: "07",
    title: "System Integration",
    summary:
      "Harmonizing legacy enterprise applications, databases, third-party APIs, and hardware peripherals into unified ecosystems.",
    tag: "Systems",
    icon: Puzzle,
    accent: "silver",
    category: "cloud-infrastructure",
    capabilities: ["Cross-platform data synchronization", "Interoperability architecture"],
    seoTitle: "System Integration & API Services",
    metaDescription:
      "System integration by SOPX Tech: connecting legacy applications, databases, third-party APIs and hardware into one unified, synchronized business ecosystem.",
    details: [
      "SOPX Tech connects the applications, databases and devices your organization already uses so information flows between them without manual re-entry.",
      "Integration work includes legacy application connectivity, third-party API integration, database and cross-platform data synchronization, hardware peripheral integration, and interoperability architecture.",
      "The result is one consistent view of your operations, built on the systems you have instead of replacing them all at once.",
    ],
  },
  {
    slug: "it-hardware-supply",
    number: "08",
    title: "IT Hardware Supply",
    summary:
      "Procurement, pre-configuration, and direct deployment of corporate workstations, server nodes, storage chassis, and networking devices.",
    tag: "Hardware",
    icon: MonitorSmartphone,
    accent: "silver",
    category: "cloud-infrastructure",
    capabilities: ["Enterprise-grade hardware selection", "Pre-shipment verification and testing"],
    seoTitle: "IT Hardware Supply: Workstations & Servers",
    metaDescription:
      "IT hardware supply by SOPX Tech: procurement, pre-configuration and deployment of business workstations, servers, storage and networking equipment.",
    details: [
      "SOPX Tech supplies enterprise-grade IT hardware selected for your workload, and delivers it ready to use.",
      "We handle procurement, pre-configuration and direct deployment of workstations, server nodes, storage chassis and networking devices, with pre-shipment verification and testing.",
      "Hardware supply can be combined with SOPX Tech infrastructure setup, networking and support services, so equipment is installed, connected and maintained by one team.",
    ],
  },
  {
    slug: "technology-consulting",
    number: "09",
    title: "Technology Consulting",
    summary:
      "Actionable strategic advisory that assists organizational leaders in making justified technology investments and architecture decisions.",
    tag: "Consulting",
    icon: Lightbulb,
    accent: "silver",
    category: "transformation-consulting",
    capabilities: ["Infrastructure feasibility evaluations", "Technical roadmapping & cost assessment"],
    seoTitle: "Technology Consulting & IT Strategy",
    metaDescription:
      "Technology consulting from SOPX Tech: independent IT strategy, feasibility evaluations, technical roadmaps and cost assessments for confident technology decisions.",
    details: [
      "SOPX Tech advises organizational leaders on technology investments and architecture decisions, so spending is justified and plans are realistic.",
      "Consulting engagements include infrastructure feasibility evaluations, technical roadmapping, cost assessment, vendor and platform selection, and AI and digital transformation readiness reviews.",
      "Recommendations are grounded in delivery experience: SOPX Tech builds and maintains the kinds of systems it advises on.",
    ],
  },
  {
    slug: "technical-support-maintenance",
    number: "10",
    title: "Technical Support & Maintenance",
    summary:
      "Responsive maintenance contracts, active monitoring, system patching, and rapid hardware/software incident intervention.",
    tag: "Operations",
    icon: Wrench,
    accent: "vermilion",
    category: "security-support",
    capabilities: ["Scheduled preventive system maintenance", "Responsive incident management"],
    seoTitle: "Technical Support & IT Maintenance",
    metaDescription:
      "Technical support and IT maintenance from SOPX Tech: preventive maintenance, monitoring, patching and fast incident response for hardware and software.",
    details: [
      "SOPX Tech keeps business systems running with responsive technical support and planned maintenance.",
      "Support contracts include scheduled preventive maintenance, active monitoring, system patching and updates, and rapid response to hardware and software incidents.",
      "Ongoing support pairs naturally with the software, infrastructure and networks SOPX Tech delivers, but we also support systems built by others.",
    ],
  },
  {
    slug: "digital-transformation",
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
    seoTitle: "Digital Transformation Services",
    metaDescription:
      "Digital transformation services from SOPX Tech: replacing paper-based and manual processes with modern, connected digital workflows that scale.",
    details: [
      "SOPX Tech helps organizations move from paper-based and manual procedures to modern, connected digital workflows.",
      "Digital transformation projects include process digitization and automated routing, enterprise tech stack modernization, data migration, and the custom software, AI automation, cloud and integration work needed to support new ways of working.",
      "We plan transformation in practical stages, so teams see benefits early and each step builds on the last.",
    ],
  },
];

export const serviceFilters: { label: string; value: ServiceCategory | "all" }[] = [
  { label: `All ${services.length} Capabilities`, value: "all" },
  { label: "Software & AI", value: "software-ai" },
  { label: "Cloud & Infrastructure", value: "cloud-infrastructure" },
  { label: "Cybersecurity & Support", value: "security-support" },
  { label: "Transformation & Consulting", value: "transformation-consulting" },
];

/** Short service names listed in the footer, linking to each service page. */
export const footerServices: { label: string; slug: string }[] = [
  { label: "Software Development", slug: "custom-software-development" },
  { label: "Artificial Intelligence", slug: "ai-development" },
  { label: "Cloud Services", slug: "cloud-computing" },
  { label: "IT Infrastructure", slug: "it-infrastructure" },
  { label: "Cybersecurity", slug: "cybersecurity" },
  { label: "Hardware Solutions", slug: "it-hardware-supply" },
  { label: "Technical Support", slug: "technical-support-maintenance" },
  { label: "System Integration", slug: "system-integration" },
  { label: "Technology Consulting", slug: "technology-consulting" },
  { label: "Digital Transformation Services", slug: "digital-transformation" },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
