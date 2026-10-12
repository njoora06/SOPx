import { z } from "zod";

// Shared between client (React Hook Form) and server (submitContact Server Action).

const phoneRegex = /^[+]?[\d\s()-]{7,20}$/;
const singleLine = /^[^\r\n]*$/;

export const FOCUS_AREAS = [
  "AI & Robotics",
  "Enterprise Software",
  "Cloud & DevOps",
  "Cybersecurity",
  "IT & Hardware Infra",
  "Digital Transformation",
] as const;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100).regex(singleLine, "Please enter your name on one line"),
  email: z.email("Please enter a valid email address"),
  company: z.string().trim().max(120).regex(singleLine).optional().or(z.literal("")),
  phone: z
    .string()
    .trim()
    .regex(phoneRegex, "Please enter a valid phone number")
    .optional()
    .or(z.literal("")),
  message: z.string().trim().min(10, "Please tell us a little more").max(5000),
  focusAreas: z.array(z.enum(FOCUS_AREAS)).max(FOCUS_AREAS.length).optional(),
  nda: z.boolean().optional(),
  // Honeypot: real users leave this empty. Not rejected here, so the server
  // can accept a filled one silently instead of telling the bot to retry.
  website: z.string().max(200).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
