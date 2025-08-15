import type { Onboarding } from './validation/onboarding.js'

const DISPOSABLE = new Set([
  'mailinator.com',
  'tempmail.com',
  '10minutemail.com',
  'guerrillamail.com',
])

function calcAge(dobISO: string): number {
  const d = new Date(dobISO)
  const now = new Date()
  let age = now.getFullYear() - d.getFullYear()
  const m = now.getMonth() - d.getMonth()
  if (m < 0 || (m === 0 && now.getDate() < d.getDate())) age--
  return age
}

function postalLooksValid(postal: string) {
  return /^[A-Za-z]\d[A-Za-z]\s?\d[A-Za-z]\d$/.test(postal.trim())
}

function phoneLooksValid(phone: string) {
  const digits = phone.replace(/\D/g, '')
  return digits.length === 10
}

export type RiskResult = { score: number; level: 'LOW' | 'MEDIUM' | 'HIGH'; reasons: string[] }

export function scoreRisk(input: Onboarding): RiskResult {
  // hard block
  if (calcAge(input.dob) < 18) {
    throw Object.assign(new Error('Under 18 not allowed'), { code: 'UNDERAGE' })
  }

  let score = 0
  const reasons: string[] = []

  const domain = input.email.split('@')[1]?.toLowerCase()
  if (domain && DISPOSABLE.has(domain)) {
    score += 2
    reasons.push('disposable_email_domain')
  }

  if (input.residency === 'other' && input.intendedUse === 'business') {
    score += 2
    reasons.push('non_resident_business_use')
  }

  if (!phoneLooksValid(input.phone)) {
    score += 1
    reasons.push('phone_suspect')
  } else {
    reasons.push('phone_valid')
  }

  if (!postalLooksValid(input.postal)) {
    score += 1
    reasons.push('postal_suspect')
  } else {
    reasons.push('postal_valid')
  }

  const level: RiskResult['level'] = score <= 2 ? 'LOW' : score <= 5 ? 'MEDIUM' : 'HIGH'
  return { score, level, reasons }
}
