import express from 'express'
import {
  loginController,
  logoutController,
  registerController
} from '../controllers/auth.controller'
import validateRequest from '../middleware/validateRequest'
import { loginSchema, registerSchema } from '../schemas/auth.schema'

const authRouter = express.Router()

authRouter.post('/register', validateRequest(registerSchema), registerController)
authRouter.post('/login', validateRequest(loginSchema), loginController)
authRouter.delete('/logout', logoutController)

export default authRouter
