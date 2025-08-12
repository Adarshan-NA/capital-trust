import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { Prisma, PrismaClient } from '@prisma/client'
import { z } from 'zod'

const app = express()
const prisma = new PrismaClient()
const PORT = Number(process.env.PORT ?? 3000)

app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())

app.get('/health', (_req, res) => res.json({ ok: true, uptime: process.uptime() }))

// --- Validation schema
const CreateUser = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(100).optional(),
})

// --- Routes
app.get('/api/users', async (_req, res) => {
  const users = await prisma.user.findMany({ orderBy: { createdAt: 'desc' } })
  res.json(users)
})

app.post('/api/users', async (req, res) => {
  const parsed = CreateUser.safeParse(req.body)
  if (!parsed.success) {
    return res.status(422).json({ error: 'validation_failed', details: parsed.error.flatten() })
  }
  const { email, name } = parsed.data

  try {
    const user = await prisma.user.create({ data: { email, name } })
    return res.status(201).json(user)
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
      return res.status(409).json({ error: 'duplicate', field: 'email' })
    }
    console.error(err)
    return res.status(500).json({ error: 'internal' })
  }
})

// Optional: DELETE for cleanup in dev
app.delete('/api/users/:id', async (req, res) => {
  try {
    await prisma.user.delete({ where: { id: req.params.id } })
    res.status(204).end()
  } catch {
    res.status(404).json({ error: 'not_found' })
  }
})

app.listen(PORT, () => console.log(`API listening on http://localhost:${PORT}`))
