import { Brain, CloudCog, Eye, Flag, Handshake, Headset, Layers, SquareTerminal } from "lucide-react";
import type { Pillar, Strength } from "@/types";

export const hero = {
  badge: "Enterprise Technology Architecture",
  badgeMeta: "v2.4 Tier-1 SLA",
  titleStart: "Helping Organizations Use the Right Technology to",
  highlightA: "Improve Work",
  highlightB: "Increase Efficiency",
  titleEnd: "and Grow Business.",
  metrics: [
    { label: "Engagement", value: "End-to-End", meta: "Full Scope Lifecycle", accent: undefined },
    { label: "Architecture", value: "Modular & Scalable", meta: "Zero Bottlenecks", accent: "blue" },
    { label: "Delivery", value: "Precision Quality", meta: "Institutional Standard", accent: "red" },
  ],
} as const;

/** Decorative copy in the hero's 3D console (hidden from screen readers). */
export const heroConsole = {
  title: "SOPX Neural AI & Robotics Core",
  status: "Online",
  chip: "Synaptic Mesh",
  readouts: {
    core: { label: "Cognitive Core", value: "Online v4.8" },
    latency: { label: "Synaptic Latency", value: "1.2ms" },
    mesh: { label: "Synaptic Mesh", value: "99.98% Active" },
  },
  telemetryTag: "NEURAL AI & ROBOTICS CORE Telemetry",
  lobes: { left: "Left Lobe: Logic & Execution", right: "Right Lobe: Infrastructure & Defense" },
  capacity: {
    label: "Integrated Engineering Capacity",
    value: "Comprehensive Lifecycle",
    protocol: "Protocol: Tailored Architectures",
    status: "Aligned with Verified Objectives",
  },
} as const;

export const about = {
  eyebrow: "Who We Are",
  title: "A Committed Technology Partner for Modern Enterprises",
  paragraphs: [
    "is a dedicated enterprise technology company delivering comprehensive end-to-end solutions. We operate on the foundational belief that technology must serve clear business objectives rather than abstract complexity.",
    "From single-system upgrades to sweeping digital modernization, we provide organizations with structural engineering rigor, reliable execution, and a committed long-term partnership designed to sustain continuous technological evolution.",
  ],
  highlights: [
    {
      title: "Long-Term Partnership",
      summary: "Continuous guidance and system stewardship beyond deployment.",
      icon: Handshake,
      accent: "silver",
    },
    {
      title: "End-to-End Scope",
      summary: "Full technological coverage from foundational hardware to intelligent software.",
      icon: Layers,
      accent: "vermilion",
    },
  ],
} as const;

export const whatWeDo = {
  eyebrow: "What We Do",
  title: "Assisting Organizations Across the Full Technological Lifecycle",
  description:
    "We identify, architect, build, and maintain the precise technology systems organizations require to eliminate operational bottlenecks and unlock growth.",
};

export const pillars: Pillar[] = [
  {
    title: "Custom Software Engineering",
    summary:
      "Designing tailored digital platforms, microservices, and management software shaped around organizational workflows.",
    meta: "Pillar 01 / Modular Architecture",
    icon: SquareTerminal,
    accent: "silver",
  },
  {
    title: "Artificial Intelligence Integration",
    summary:
      "Embedding predictive models, automated decision trees, and intelligent processing into operational procedures.",
    meta: "Pillar 02 / Cognitive Workflows",
    icon: Brain,
    accent: "vermilion",
  },
  {
    title: "Modern Digital Infrastructure",
    summary:
      "Constructing reliable server, networking, cloud, and security fabrics capable of supporting critical organizational traffic.",
    meta: "Pillar 03 / High Availability",
    icon: CloudCog,
    accent: "silver",
  },
  {
    title: "Technical Lifecycle Support",
    summary:
      "Delivering preventive maintenance, ongoing monitoring, rapid troubleshooting, and consultative hardware upgrades.",
    meta: "Pillar 04 / Continual Reliability",
    icon: Headset,
    accent: "vermilion",
  },
];

export const servicesIntro = {
  eyebrow: "Comprehensive Portfolio",
  title: "Our Core Services",
  description:
    "Modular enterprise services engineered to solve discrete technical challenges or integrate as a unified solution.",
  link: "Discuss your project requirements",
};

export const industriesIntro = {
  eyebrow: "Target Sectors",
  title: "Industries We Serve",
  description:
    "We bring pragmatic engineering standards and domain flexibility across diverse sectors with strict operational demands.",
};

export const whyIntro = {
  eyebrow: "Differentiating Strengths",
  title: "Why Choose SOPX Tech",
  description:
    "Built on principles of architectural clarity, structural honesty, and persistent operational dependability.",
};

export const strengths: Strength[] = [
  {
    number: "01",
    title: "Complete IT solutions from a single company",
    summary:
      "Eliminate vendor friction and fragmented responsibility. We handle hardware, networking, custom software, and maintenance under one roof.",
    accent: "silver",
  },
  {
    number: "02",
    title: "Experienced team with practical knowledge",
    summary:
      "Engineers and specialists focused on functional, battle-tested methodologies rather than theoretical frameworks or hype cycles.",
    accent: "silver",
  },
  {
    number: "03",
    title: "Customized solutions based on business needs",
    summary:
      "Every deployment is explicitly shaped to match your actual operating scale, existing legacy investments, and organizational goals.",
    accent: "vermilion",
  },
  {
    number: "04",
    title: "Reliable support before and after project delivery",
    summary:
      "Our relationship does not end at deployment. We ensure system stability, operational onboarding, and attentive continuous care.",
    accent: "silver",
  },
  {
    number: "05",
    title: "Focus on quality, transparency, and long-term relationships",
    summary:
      "Clear project milestones, transparent communications, and clean engineering standards that establish lasting enterprise trust.",
    accent: "silver",
  },
  {
    number: "06",
    title: "Scalable solutions that grow with your business",
    summary:
      "Modular architectures prepared to absorb multiplied user loads, larger data volumes, and expanded organizational footprints smoothly.",
    accent: "vermilion",
  },
];

export const visionMission = [
  {
    label: "Our Vision",
    icon: Eye,
    accent: "silver",
    title: "Empowering organizations with purpose-built, scalable, and resilient technology solutions.",
    summary:
      "We envision an ecosystem where organizations of every scale can leverage robust technical infrastructure with complete confidence, free from unneeded operational friction.",
    meta: "Strategic Foundation // Future State",
  },
  {
    label: "Our Mission",
    icon: Flag,
    accent: "vermilion",
    title:
      "Helping organizations improve work, increase efficiency, and drive sustainable growth through practical and innovative technology implementations.",
    summary:
      "We actively bridge technical complexity and everyday utility, translating business requirements into dependable systems that directly generate organizational impact.",
    meta: "Operational Mandate // Execution Framework",
  },
] as const;
