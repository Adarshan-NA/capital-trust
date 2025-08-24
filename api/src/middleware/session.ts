/* eslint-disable @typescript-eslint/no-namespace */
import cookieSession from 'cookie-session'
import type { RequestHandler } from 'express'

declare global {
  namespace Express {
    interface Request {
      session?: {
        staff?: { id: string; email: string; role: 'analyst' | 'admin' }
        customer?: { id: string; email: string }
      } | null
    }
  }
}

export const sessionMiddleware = (): RequestHandler =>
  cookieSession({
    name: 'ct_session',
    secret: process.env.SESSION_SECRET!,
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000,
  })
