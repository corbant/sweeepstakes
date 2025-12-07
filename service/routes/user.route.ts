import express from 'express'
import {
  getUserBadgesController,
  getUserChoresController,
  getUserInfoController,
  updateUserInfoController,
  getUserPointsController
} from '../controllers/user.controller'

const userRouter = express.Router()

// Get user info
userRouter.route('/').get(getUserInfoController).put(updateUserInfoController)

userRouter.route('/chores').get(getUserChoresController)
userRouter.route('/badges').get(getUserBadgesController)
userRouter.route('/points').get(getUserPointsController)

export default userRouter
