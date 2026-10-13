import type { CompanyInfo } from "@/types";

// TODO(content): confirm the public site URL and enquiry email.
export const company: CompanyInfo = {
  name: "SOPX Tech",
  legalName: "SOPX Tech Private Limited",
  alternateNames: ["SOPX Technologies", "SOPx", "SOPX"],
  description:
    "SOPX Tech Private Limited is a technology company that helps organizations use the right technology to improve their work, increase efficiency, and grow their business.",
  metaDescription:
    "SOPX Tech (SOPX Technologies) is an AI development and IT services company in India: custom software, AI solutions, cloud, cybersecurity and IT infrastructure.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.sopxtech.com",
  email: "sopxtech@gmail.com",
  // TODO(content): replace each placeholder with the real profile URL, and delete platforms you don't use.
  // Placeholders (a platform's home page) still render as icons but are left out of the
  // Organization schema's `sameAs`; real profile URLs are added there automatically.
  socials: [
    { platform: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/" },
    { platform: "instagram", label: "Instagram", href: "https://www.instagram.com/" },
    { platform: "facebook", label: "Facebook", href: "https://www.facebook.com/" },
    { platform: "x", label: "X (Twitter)", href: "https://x.com/" },
    { platform: "youtube", label: "YouTube", href: "https://www.youtube.com/" },
  ],
};
