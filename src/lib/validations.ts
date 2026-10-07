import { z } from "zod";

// Shared between client (React Hook Form) and server (Server Action / API route).

const phoneRegex = /^[+]?[\d\s()-]{7,20}$/;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.email("Please enter a valid email address"),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  phone: z
    .string()
    .trim()
    .regex(phoneRegex, "Please enter a valid phone number")
    .optional()
    .or(z.literal("")),
  message: z.string().trim().min(10, "Please tell us a little more").max(5000),
  focusAreas: z.array(z.string().max(60)).max(6).optional(),
  nda: z.boolean().optional(),
  // Honeypot: real users leave this empty.
  website: z.string().max(0).optional(),
});

export const consultationSchema = contactSchema.extend({
  service: z.string().min(1, "Please choose a service"),
  budget: z.string().optional(),
  timeline: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ConsultationInput = z.infer<typeof consultationSchema>;
