import express from 'express'
import {
  getGroupNameController,
  loginController,
  logoutController,
  registerController
} from '../controllers/auth.controller'
import validateRequest from '../middleware/validateRequest'
import { loginSchema, registerSchema } from '../schemas/auth.schema'
import { paramSchema } from '../schemas/param.schema'

const authRouter = express.Router()

authRouter.post('/register', validateRequest({ bodySchema: registerSchema }), registerController)
authRouter.post('/login', validateRequest({ bodySchema: loginSchema }), loginController)
authRouter.delete('/logout', logoutController)
authRouter.get('/group/:id/name', validateRequest({ paramSchema }), getGroupNameController)

export default authRouter
