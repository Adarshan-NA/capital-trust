import { Router } from 'express'
import { requireCustomer } from '../middleware/guards.js'
import { prisma } from '../utils/prisma.js'

const r = Router()
r.use(requireCustomer)

r.get('/cases', async (req, res) => {
  const customerId = req.session!.customer!.id
  const rows = await prisma.case.findMany({
    where: { customerId },
    include: { risk: true },
    orderBy: { submittedAt: 'desc' },
  })
  res.json(rows)
})

r.get('/cases/:id', async (req, res) => {
  const customerId = req.session!.customer!.id
  const id = req.params.id
  const row = await prisma.case.findFirst({
    where: { id, customerId },
    include: { risk: true, customer: true },
  })
  if (!row) return res.status(404).json({ error: 'case_not_found' })
  res.json(row)
})

export default r
