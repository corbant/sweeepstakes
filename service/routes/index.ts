import express from 'express'
import groupRouter from './group.route'
import userRouter from './user.route'
import authRouter from './auth.route'
import websocketProxy from './ws.route'
import checkAuthentication from '../middleware/checkAuthentication'

const apiRouter = express.Router()

apiRouter.use('/auth', authRouter)
apiRouter.use('/group', checkAuthentication, groupRouter)
apiRouter.use('/user', checkAuthentication, userRouter)

apiRouter.use('/status', (_req, res) => {
  res.status(200).json({ status: 'OK' })
})

export { apiRouter, websocketProxy }
