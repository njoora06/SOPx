import type { CompanyInfo } from "@/types";

// TODO(content): confirm the public site URL and enquiry email.
export const company: CompanyInfo = {
  name: "SOPX Tech",
  legalName: "SOPX Tech Private Limited",
  description:
    "SOPX Tech Private Limited is a technology company that helps organizations use the right technology to improve their work, increase efficiency, and grow their business.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.sopxtech.com",
  email: "hello@sopxtech.com",
  socials: [],
};
