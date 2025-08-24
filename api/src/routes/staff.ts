import { Router } from 'express'
import { z } from 'zod'
import { prisma } from '../utils/prisma.js'
import type { Prisma } from '@prisma/client'
import {
  RiskLevel,
  CaseStatus,
  DocumentType,
  Employment,
  IntendedUse,
  Province,
  Residency,
} from '@prisma/client'
import { requireStaff } from '../middleware/guards.js'

const r = Router()
r.use(requireStaff)

/** Strongly-typed query contract */
const ListQuery = z.object({
  q: z.string().optional(),

  // Customer fields
  email: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  city: z.string().optional(),
  postal: z.string().optional(),
  province: z.nativeEnum(Province).optional(),
  residency: z.nativeEnum(Residency).optional(),

  // Case fields
  status: z.nativeEnum(CaseStatus).optional(),
  documentType: z.nativeEnum(DocumentType).optional(),
  employment: z.nativeEnum(Employment).optional(),
  income: z.string().optional(), // keep string unless modeled as enum
  intendedUse: z.nativeEnum(IntendedUse).optional(),

  // Risk
  risk: z.nativeEnum(RiskLevel).optional(),

  // Misc
  from: z.string().optional(), // ISO date
  to: z.string().optional(), // ISO date
  sortBy: z.string().optional(),
  sortDir: z.enum(['asc', 'desc']).optional(),
  page: z.coerce.number().min(1).default(1),
  pageSize: z.coerce.number().min(1).max(100).default(10),
})

r.get('/cases', async (req, res) => {
  const q = ListQuery.parse(req.query)

  const where: Prisma.CaseWhereInput = {}
  const customer: Prisma.CustomerWhereInput = {}

  if (q.q) {
    customer.OR = [
      { email: { contains: q.q, mode: 'insensitive' } },
      { firstName: { contains: q.q, mode: 'insensitive' } },
      { lastName: { contains: q.q, mode: 'insensitive' } },
      { city: { contains: q.q, mode: 'insensitive' } },
      { postal: { contains: q.q, mode: 'insensitive' } },
    ]
  }

  // Customer-scoped filters
  if (q.email) customer.email = { contains: q.email, mode: 'insensitive' }
  if (q.firstName) customer.firstName = { contains: q.firstName, mode: 'insensitive' }
  if (q.lastName) customer.lastName = { contains: q.lastName, mode: 'insensitive' }
  if (q.city) customer.city = { contains: q.city, mode: 'insensitive' }
  if (q.postal) customer.postal = { contains: q.postal, mode: 'insensitive' }
  if (q.province) customer.province = q.province
  if (q.residency) customer.residency = q.residency

  if (Object.keys(customer).length) where.customer = { is: customer }

  // Case-scoped filters
  if (q.status) where.status = q.status
  if (q.documentType) where.documentType = q.documentType
  if (q.employment) where.employment = q.employment
  if (q.income) where.income = q.income
  if (q.intendedUse) where.intendedUse = q.intendedUse

  // Risk relation filter
  if (q.risk) where.risk = { is: { level: q.risk } }

  // Date window
  if (q.from || q.to) {
    where.submittedAt = {}
    if (q.from) where.submittedAt.gte = new Date(q.from)
    if (q.to) where.submittedAt.lte = new Date(q.to)
  }

  // Sorting (supports nested)
  const field = q.sortBy || 'submittedAt'
  const dir = q.sortDir || 'desc'
  const orderBy: Prisma.CaseOrderByWithRelationInput =
    field === 'riskLevel'
      ? { risk: { level: dir } }
      : field === 'email'
        ? { customer: { email: dir } }
        : ({ [field]: dir } as Prisma.CaseOrderByWithRelationInput)

  const [total, rows] = await Promise.all([
    prisma.case.count({ where }),
    prisma.case.findMany({
      where,
      include: { customer: true, risk: true },
      orderBy,
      skip: (q.page - 1) * q.pageSize,
      take: q.pageSize,
    }),
  ])

  res.json({ rows, total, page: q.page, pageSize: q.pageSize })
})

r.get('/cases/:id', async (req, res) => {
  const id = req.params.id
  const c = await prisma.case.findUnique({
    where: { id },
    include: {
      customer: true,
      risk: true,
      notes: {
        include: { author: { select: { id: true, email: true } } },
        orderBy: { createdAt: 'desc' },
      },
      audits: { orderBy: { createdAt: 'desc' }, take: 50 },
    },
  })
  if (!c) return res.status(404).json({ error: 'case_not_found' })
  res.json(c)
})

const NoteSchema = z.object({ body: z.string().min(1).max(2000) })

r.post('/cases/:id/notes', async (req, res) => {
  const { body } = NoteSchema.parse(req.body)
  const caseId = req.params.id
  const authorId = req.session!.staff!.id

  const note = await prisma.caseNote.create({
    data: { caseId, authorId, body },
    include: { author: { select: { id: true, email: true } } },
  })

  const payloadNote: Prisma.InputJsonValue = { authorEmail: req.session!.staff!.email }
  await prisma.auditLog.create({
    data: {
      caseId,
      event: 'note_added',
      data: payloadNote, // JSON column name in your schema
    },
  })

  res.json(note)
})

const DecisionSchema = z.object({
  status: z.nativeEnum(CaseStatus),
  reason: z.string().min(3).max(500),
})

r.post('/cases/:id/decision', async (req, res) => {
  const { status, reason } = DecisionSchema.parse(req.body)
  const id = req.params.id

  const updated = await prisma.case.update({
    where: { id },
    data: { status },
  })

  const payloadDecision: Prisma.InputJsonValue = {
    status,
    reason,
    actorEmail: req.session!.staff!.email,
  }
  await prisma.auditLog.create({
    data: {
      caseId: id,
      event: 'decision_made',
      data: payloadDecision, // JSON column name in your schema
    },
  })

  res.json(updated)
})

export default r
