import { BadgeCheck, Bot, CloudCog, Lock, Network, Server, ShieldEllipsis, SquareTerminal, Timer } from "lucide-react";

export const contactIntro = {
  eyebrow: "Direct Architect Access · Enterprise Advisory",
  titleStart: "Let’s Architect Your",
  titleHighlight: "Next Frontier System.",
  description:
    "Connect directly with SOPX Tech senior engineering leadership. Evaluate system topologies, AI pipelines, cloud migrations, and mission-critical roadmaps under bilateral NDA.",
  badges: [
    { label: "Principal Architect Access", icon: BadgeCheck, className: "text-vermilion" },
    { label: "< 4-Hour Rapid Triage SLA", icon: Timer, className: "text-telemetry-normal" },
    { label: "Strict Enterprise NDA", icon: Lock, className: "text-indigo-400" },
  ],
} as const;

export const consultationForm = {
  title: "Initiate Architecture Consultation",
  tag: "DIRECT",
  description: "Review stack feasibility, compute budgets, and sprint topologies with senior partners.",
  fields: {
    name: { label: "Full Name", placeholder: "e.g. Dr. Elena Vance" },
    email: { label: "Corporate Email", placeholder: "elena@enterprise.com" },
    phone: { label: "Direct Phone / Mobile", placeholder: "+91 98765 43210" },
    company: { label: "Company / Entity Name", placeholder: "Acme Systems Corp" },
    focus: { label: "Primary Technical Focus", hint: "Select all relevant" },
    message: {
      label: "Project Brief & Architecture Target",
      hint: "AES-256 Bilateral Vault",
      placeholder:
        "Briefly describe system requirements, existing stack bottlenecks, scale benchmarks, or immediate transformation targets...",
    },
  },
  focusAreas: [
    { label: "AI & Robotics", icon: Bot },
    { label: "Enterprise Software", icon: SquareTerminal },
    { label: "Cloud & DevOps", icon: CloudCog },
    { label: "Cybersecurity", icon: ShieldEllipsis },
    { label: "IT & Hardware Infra", icon: Server },
    { label: "Digital Transformation", icon: Network },
  ],
  nda: {
    title: "Bilateral Enterprise NDA Requested:",
    text: "SOPX Tech will execute a non-disclosure agreement prior to stack analysis and proprietary source auditing.",
  },
  submit: "Initiate Consultation & Dispatch Request",
  success: {
    title: "Consultation Brief Received Successfully.",
    text: "Your brief has been routed to our Lead Architecture Team. Expect triage feedback within 4 business hours.",
  },
} as const;

export const contactChannels = {
  title: "Corporate Channels",
  description: "Direct access lines & communication endpoints",
  status: "ACTIVE",
  phone: {
    label: "Phone / Direct & WhatsApp",
    display: "+91 9453012655",
    href: "tel:+9453012655",
    note: "Corporate line & WhatsApp Business escalation",
  },
  email: {
    label: "Direct Inquiry Email",
    address: "sopxtech@gmail.com",
    note: "Architectural proposals, RFPs & consultations",
  },
  hours: { label: "Mon – Sat:", value: "09:30 AM – 06:30 PM IST", tag: "24/7 SLA" },
} as const;

export const headquarters = {
  title: "Registered Headquarters",
  address: "Lajpat Nagar, Near Kanhaiya Talkies, Padrauna City, Padrauna, Kushinagar, Uttar Pradesh, India - 274304",
  pin: "PIN: 274304",
  coordinates: "26.9025° N, 83.9818° E",
  area: "Padrauna, Kushinagar",
  marker: { title: "SOPX Tech HQ · Padrauna City", subtitle: "Near Kanhaiya Talkies, Lajpat Nagar" },
  mapPin: "PIN: Padrauna HQ (274304)",
  mapsUrl: "https://maps.google.com/?q=Lajpat+Nagar+Padrauna+Kushinagar+274304",
  mapsLabel: "Open in Google Maps",
} as const;

export const triageNote = {
  label: "Standard Triage < 4 Hours",
  meta: "Direct peer-to-peer engineering lead",
} as const;
