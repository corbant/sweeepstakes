import express from 'express'
import {
  getUserBadgesController,
  getUserChoresController,
  getUserGroupController,
  getUserInfoController,
  updateUserInfoController
} from '../controllers/user.controller'

const userRouter = express.Router()

// Get user info
userRouter.route('/').get(getUserInfoController).put(updateUserInfoController)

userRouter.route('/group').get(getUserGroupController)

userRouter.route('/chores').get(getUserChoresController)
userRouter.route('/badges').get(getUserBadgesController)

export default userRouter
