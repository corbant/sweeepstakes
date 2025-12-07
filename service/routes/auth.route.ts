import express from 'express'
import {
  loginController,
  logoutController,
  registerController
} from '../controllers/auth.controller'
import validateRequest from '../middleware/validateRequest'
import { loginSchema, registerSchema } from '../schemas/auth.schema'

const authRouter = express.Router()

authRouter.post('/register', validateRequest({ bodySchema: registerSchema }), registerController)
authRouter.post('/login', validateRequest({ bodySchema: loginSchema }), loginController)
authRouter.delete('/logout', logoutController)

export default authRouter
