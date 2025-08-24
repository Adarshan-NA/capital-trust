import { Router } from 'express'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import { prisma } from '../utils/prisma.js'

const r = Router()

/** -------- Staff auth -------- */
const StaffLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

r.post('/staff/login', async (req, res) => {
  const data = StaffLoginSchema.safeParse(req.body)
  if (!data.success) return res.status(400).json({ error: 'invalid_body' })

  const user = await prisma.staffUser.findUnique({
    where: { email: data.data.email.toLowerCase() },
  })
  if (!user) return res.status(401).json({ error: 'invalid_credentials' })

  const ok = await bcrypt.compare(data.data.password, user.passwordHash)
  if (!ok) return res.status(401).json({ error: 'invalid_credentials' })

  req.session = {
    ...(req.session || {}),
    staff: { id: user.id, email: user.email, role: user.role },
  }
  return res.json({ ok: true })
})

r.post('/staff/logout', (req, res) => {
  if (req.session) req.session.staff = undefined
  res.json({ ok: true })
})

r.get('/staff/me', (req, res) => {
  return res.json({ user: req.session?.staff ?? null })
})

/** -------- Customer auth (MVP: email + dob) -------- */
const CustomerLoginSchema = z.object({
  email: z.string().email(),
  dob: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // YYYY-MM-DD
})

r.post('/customer/login', async (req, res) => {
  const data = CustomerLoginSchema.safeParse(req.body)
  if (!data.success) return res.status(400).json({ error: 'invalid_body' })

  const email = data.data.email.toLowerCase()
  const customer = await prisma.customer.findFirst({
    where: { email, dob: data.data.dob },
    select: { id: true, email: true },
  })
  if (!customer) return res.status(401).json({ error: 'invalid_credentials' })

  req.session = {
    ...(req.session || {}),
    customer: { id: customer.id, email: customer.email },
  }
  res.json({ ok: true })
})

r.post('/customer/logout', (req, res) => {
  if (req.session) req.session.customer = undefined
  res.json({ ok: true })
})

r.get('/customer/me', (req, res) => {
  return res.json({ user: req.session?.customer ?? null })
})

export default r
