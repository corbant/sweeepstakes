import express from 'express'
import {
  addGroupChoreController,
  deleteGroupChoreController,
  getGroupChoreController,
  getGroupChoresController,
  getGroupInfoController,
  getGroupLeaderboardController,
  getGroupMemberController,
  getGroupMembersController,
  updateGroupChoreController,
  updateGroupInfoController
} from '../controllers/group.controller'
import validateRequest from '../middleware/validateRequest'
import {
  addGroupChoreSchema,
  updateGroupChoreSchema,
  updateGroupSchema
} from '../schemas/group.schema'

const groupRouter = express.Router()

groupRouter
  .route('/')
  .get(getGroupInfoController)
  .put(validateRequest(updateGroupSchema), updateGroupInfoController)

groupRouter
  .route('/chores')
  .get(getGroupChoresController)
  .post(validateRequest(addGroupChoreSchema), addGroupChoreController)

groupRouter.route('/members').get(getGroupMembersController)

groupRouter.route('/members/:userId').get(getGroupMemberController)

groupRouter
  .route('/chores/:choreId')
  .get(getGroupChoreController)
  .put(validateRequest(updateGroupChoreSchema), updateGroupChoreController)
  .delete(deleteGroupChoreController)

groupRouter.route('/leaderboard').get(getGroupLeaderboardController)

export default groupRouter
