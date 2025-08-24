import express from 'express'
import rateLimit from 'express-rate-limit'
import { sessionMiddleware } from './middleware/session.js'
import authRoutes from './routes/auth.js'
import staffRoutes from './routes/staff.js'
import customerRoutes from './routes/customer.js'
import publicRoutes from './routes/public.js'

const app = express()

app.use(express.json())
app.use(sessionMiddleware())

// CORS setup
import cors from 'cors'
app.use(
  cors({
    origin: process.env.WEB_ORIGIN,
    credentials: true,
  }),
)

// Basic rate limit on auth endpoints
app.use('/auth', rateLimit({ windowMs: 60_000, max: 20, standardHeaders: true }))

// Routes
app.use('/auth', authRoutes)
app.use('/staff', staffRoutes)
app.use('/customer', customerRoutes)
app.use('/public', publicRoutes)

const port = Number(process.env.PORT || 3020)
app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`)
})
