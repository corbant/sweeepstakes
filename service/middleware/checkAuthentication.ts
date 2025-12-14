import type { Request, Response, NextFunction } from 'express'
import UserModel from '../models/user.model'
import { jwtVerify } from 'jose'

const JWT_SECRET = process.env.JWT_SECRET || 'secret'

const checkAuthentication = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies[process.env.AUTH_COOKIE_NAME || 'token']
  if (!token) return res.status(401).json({ error: 'Unauthorized' })

  const { payload } = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET))
  if (!payload.id) return res.status(401).json({ error: 'Unauthorized' })

  const user = await UserModel.findById(payload.id)
  if (user) {
    res.locals.user = user
    next()
  } else {
    return res.status(401).json({ error: 'Unauthorized' })
  }
}

export default checkAuthentication
