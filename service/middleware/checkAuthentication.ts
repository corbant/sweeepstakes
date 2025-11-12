import type { Request, Response, NextFunction } from 'express'

const checkAuthentication = (req: Request, res: Response, next: NextFunction) => {
  const user = req.cookies[process.env.AUTH_COOKIE_NAME || 'token'] // TODO: Replace with real authentication check

  if (user) {
    next()
  } else {
    return res.status(401).json({ error: 'Unauthorized' })
  }
}

export default checkAuthentication
