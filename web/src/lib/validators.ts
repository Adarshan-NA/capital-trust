// Purpose: single source of truth for form validation schemas (Zod) and TypeScript types.
import { z } from "zod";

// --- Enumerations (kept as const arrays for TS + UI selects) ---
export const PROVINCES = [
  "AB",
  "BC",
  "MB",
  "NB",
  "NL",
  "NS",
  "NT",
  "NU",
  "ON",
  "PE",
  "QC",
  "SK",
  "YT",
] as const;
export const DOC_TYPES = ["drivers_license", "passport", "photo_id"] as const;
export const EMPLOYMENT = [
  "employed",
  "self_employed",
  "student",
  "unemployed",
  "retired",
] as const;
export const INCOME = [
  "<25k",
  "25k-50k",
  "50k-100k",
  "100k-150k",
  "150k+",
] as const;
export const INTENDED_USE = [
  "everyday",
  "savings",
  "student",
  "business",
] as const;
export const RESIDENCY = ["citizen", "permanent_resident", "other"] as const;

// --- Helpers ---
const isAdult = (isoDate: string) => {
  const d = new Date(isoDate);
  if (isNaN(d.getTime())) return false;
  const now = new Date();
  let age = now.getFullYear() - d.getFullYear();
  const m = now.getMonth() - d.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < d.getDate())) age--;
  return age >= 18;
};

const CA_POSTAL =
  /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ ]?\d[ABCEGHJ-NPRSTV-Z]\d$/i;
const PHONE_10 =
  /^\D*?(\d)\D*?(\d)\D*?(\d)\D*?(\d)\D*?(\d)\D*?(\d)\D*?(\d)\D*?(\d)\D*?(\d)\D*?(\d)\D*?$/;

// --- Schemas per step ---
export const AboutYouSchema = z.object({
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  email: z.string().email("Invalid email"),
  phone: z
    .string()
    .min(10, "10 digits")
    .refine((v) => PHONE_10.test(v), "Enter a 10-digit phone"),
  dob: z.string().refine(isAdult, "You must be at least 18"),
  address1: z.string().min(1, "Required"),
  address2: z.string().optional().or(z.literal("")),
  city: z.string().min(1, "Required"),
  province: z.enum(PROVINCES, {
    message: "Select a province/territory",
  }),
  postal: z
    .string()
    .refine((v) => CA_POSTAL.test(v.toUpperCase()), "Use format A1A 1A1"),
});

export const IdentitySchema = z.object({
  documentType: z.enum(DOC_TYPES),
  consentIdentity: z.literal(true, {
    message: "Consent is required",
  }),
});

export const FinancialSchema = z.object({
  employment: z.enum(EMPLOYMENT),
  income: z.enum(INCOME),
  intendedUse: z.enum(INTENDED_USE),
  residency: z.enum(RESIDENCY),
  consentFinal: z.literal(true, {
    message: "Consent is required",
  }),
});

export const OnboardingSchema =
  AboutYouSchema.and(IdentitySchema).and(FinancialSchema);

export type AboutYou = z.infer<typeof AboutYouSchema>;
export type Identity = z.infer<typeof IdentitySchema>;
export type Financial = z.infer<typeof FinancialSchema>;
export type Onboarding = z.infer<typeof OnboardingSchema>;
