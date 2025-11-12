import type { Request, Response } from 'express'
import { Register, type Login } from '../schemas/auth.schema'
import { v4 as uuid } from 'uuid'

const AUTH_COOKIE_NAME = process.env.AUTH_COOKIE_NAME || 'token'

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: true
}

export const loginController = (req: Request, res: Response) => {
  const data: Login = req.body
  const token = uuid()
  res.status(200).cookie(AUTH_COOKIE_NAME, token, COOKIE_OPTIONS).json({ token })
}

export const logoutController = (req: Request, res: Response) => {
  res.status(204).clearCookie(AUTH_COOKIE_NAME, COOKIE_OPTIONS).send()
}

export const registerController = (req: Request, res: Response) => {
  const data: Register = req.body
  if (data.groupCode) {
    // add user to the group corresponding to the group code
  } else {
    // create a new group for the user
  }
  const token = uuid()
  res.status(201).cookie(AUTH_COOKIE_NAME, token, COOKIE_OPTIONS).json({ token })
}
