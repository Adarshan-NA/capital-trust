import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import { publicRouter } from './routes/public.js'

const app = express()
const PORT = process.env.PORT ? Number(process.env.PORT) : 3020
const WEB_ORIGIN = process.env.WEB_ORIGIN || 'http://localhost:5173'

app.use(helmet())
app.use(cors({ origin: WEB_ORIGIN }))
app.use(express.json({ limit: '100kb' }))

const publicLimiter = rateLimit({ windowMs: 60_000, max: 60 }) // 60/min
app.use('/public', publicLimiter)

app.get('/health', (_req, res) => res.json({ ok: true, uptime: process.uptime() }))

app.use('/public', publicRouter)

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`)
})
