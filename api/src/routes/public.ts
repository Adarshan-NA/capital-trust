import { Router } from 'express'
import { ZodError, type ZodIssue } from 'zod'
import { PrismaClient, RiskLevel } from '@prisma/client'
import { OnboardingSchema, type Onboarding } from '../validation/onboarding.js'
import { scoreRisk } from '../risk.js'

const prisma = new PrismaClient()
export const publicRouter = Router()

// Zod schema + TS type for consistent error envelopes
type ApiError = { code: string; message: string; details?: string[] }

// Narrower check for the custom risk error we throw on underage
function isUnderageError(e: unknown): e is { code: 'UNDERAGE'; message: string } {
  return (
    typeof e === 'object' &&
    e !== null &&
    'code' in e &&
    (e as { code?: string }).code === 'UNDERAGE'
  )
}

publicRouter.post('/onboard', async (req, res) => {
  try {
    const payload: Onboarding = OnboardingSchema.parse(req.body)

    // Risk scoring (throws UNDERAGE for <18)
    const risk = scoreRisk(payload)

    // Upsert customer by email (idempotent) and keep profile current
    const customer = await prisma.customer.upsert({
      where: { email: payload.email },
      update: {
        firstName: payload.firstName,
        lastName: payload.lastName,
        phone: payload.phone,
        dob: new Date(payload.dob),
        address1: payload.address1,
        address2: payload.address2 ?? '',
        city: payload.city,
        province: payload.province,
        postal: payload.postal,
        residency: payload.residency,
      },
      create: {
        email: payload.email,
        firstName: payload.firstName,
        lastName: payload.lastName,
        phone: payload.phone,
        dob: new Date(payload.dob),
        address1: payload.address1,
        address2: payload.address2 ?? '',
        city: payload.city,
        province: payload.province,
        postal: payload.postal,
        residency: payload.residency,
      },
    })

    // Create case + risk + audit in a single transaction
    const result = await prisma.$transaction(async (tx) => {
      const theCase = await tx.case.create({
        data: {
          customerId: customer.id,
          documentType: payload.documentType,
          employment: payload.employment,
          income: payload.income,
          intendedUse: payload.intendedUse,
          status: 'submitted',
        },
      })

      await tx.auditLog.create({
        data: { caseId: theCase.id, event: 'case_created', data: {} },
      })

      await tx.riskAssessment.create({
        data: {
          caseId: theCase.id,
          score: risk.score,
          level: risk.level as RiskLevel,
          reasons: risk.reasons,
        },
      })

      await tx.auditLog.create({
        data: { caseId: theCase.id, event: 'risk_scored', data: { risk } },
      })

      return { caseId: theCase.id, customerId: customer.id }
    })

    return res
      .status(201)
      .location(`/cases/${result.caseId}`)
      .json({ ...result, risk })
  } catch (err: unknown) {
    // Input validation errors → 422
    if (err instanceof ZodError) {
      const details = (err.issues as ZodIssue[]).map((i) => i.path.join('.'))
      const body: { error: ApiError } = {
        error: { code: 'VALIDATION_FAILED', message: 'Validation failed', details },
      }
      return res.status(422).json(body)
    }

    // Domain rule: underage → 422
    if (isUnderageError(err)) {
      const body: { error: ApiError } = {
        error: { code: 'UNDERAGE', message: 'Must be 18 or older', details: ['dob'] },
      }
      return res.status(422).json(body)
    }

    // Fallback
    console.error(err)
    const body: { error: ApiError } = { error: { code: 'INTERNAL', message: 'Unexpected error' } }
    return res.status(500).json(body)
  }
})

// Get all cases (public view)
publicRouter.get('/cases/:id', async (req, res) => {
  const c = await prisma.case.findUnique({
    where: { id: req.params.id },
    include: { customer: true, risk: true },
  })
  if (!c) return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Case not found' } })
  res.json(c)
})

export default publicRouter
