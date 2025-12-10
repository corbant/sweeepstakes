import express from 'express'
import {
  getUserBadgesController,
  getUserChoresController,
  getUserInfoController,
  updateUserInfoController,
  getUserTotalPointsController,
  getUserTotalCompletedChoresController,
  getUserWeeklyStatsController
} from '../controllers/user.controller'
import validateRequest from '../middleware/validateRequest'
import { updateUserSchema } from '../schemas/user.schema'

const userRouter = express.Router()

// Get user info
userRouter
  .route('/')
  .get(getUserInfoController)
  .put(validateRequest({ bodySchema: updateUserSchema }), updateUserInfoController)

userRouter.route('/chores').get(getUserChoresController)
userRouter.route('/stats/completed-chores').get(getUserTotalCompletedChoresController)
userRouter.route('/badges').get(getUserBadgesController)
userRouter.route('/stats/points').get(getUserTotalPointsController)
userRouter.route('/stats/weekly').get(getUserWeeklyStatsController)

export default userRouter
