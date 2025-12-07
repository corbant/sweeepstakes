import type { Request, Response, NextFunction } from 'express'
import UserModel from '../models/user.model'

const checkAuthentication = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies[process.env.AUTH_COOKIE_NAME || 'token']
  if (!token) return res.status(401).json({ error: 'Unauthorized' })

  const user = await UserModel.findById(token)

  if (user) {
    next()
  } else {
    return res.status(401).json({ error: 'Unauthorized' })
  }
}

export default checkAuthentication
