import type { RequestHandler } from 'express'

export const requireStaff: RequestHandler = (req, res, next) => {
  if (req.session?.staff) return next()
  return res.status(401).json({ error: 'unauthorized_staff' })
}

export const requireCustomer: RequestHandler = (req, res, next) => {
  if (req.session?.customer) return next()
  return res.status(401).json({ error: 'unauthorized_customer' })
}
