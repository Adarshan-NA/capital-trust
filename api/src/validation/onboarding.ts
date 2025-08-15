import { z } from 'zod'

export const provinces = [
  'AB',
  'BC',
  'MB',
  'NB',
  'NL',
  'NS',
  'NT',
  'NU',
  'ON',
  'PE',
  'QC',
  'SK',
  'YT',
] as const
export const docTypes = ['drivers_license', 'passport', 'photo_id'] as const
export const employment = ['employed', 'self_employed', 'student', 'unemployed', 'retired'] as const
export const income = ['<25k', '25k-50k', '50k-100k', '100k-150k', '150k+'] as const
export const intendedUse = ['everyday', 'savings', 'student', 'business'] as const
export const residency = ['citizen', 'permanent_resident', 'other'] as const

export const OnboardingSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(7),
  dob: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // ISO date
  address1: z.string().min(1),
  address2: z.string().optional().default(''),
  city: z.string().min(1),
  province: z.enum(provinces),
  postal: z.string().min(5),
  documentType: z.enum(docTypes),
  consentIdentity: z.literal(true),
  employment: z.enum(employment),
  income: z.enum(income),
  intendedUse: z.enum(intendedUse),
  residency: z.enum(residency),
  consentFinal: z.literal(true),
})
export type Onboarding = z.infer<typeof OnboardingSchema>
