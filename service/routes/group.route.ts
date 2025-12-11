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
import { paramSchema } from '../schemas/param.schema'

const groupRouter = express.Router()

groupRouter
  .route('/')
  .get(getGroupInfoController)
  .put(validateRequest({ bodySchema: updateGroupSchema }), updateGroupInfoController)

groupRouter
  .route('/chores')
  .get(getGroupChoresController)
  .post(validateRequest({ bodySchema: addGroupChoreSchema }), addGroupChoreController)

groupRouter.route('/members').get(getGroupMembersController)

groupRouter.route('/members/:id').get(validateRequest({ paramSchema }), getGroupMemberController)

groupRouter
  .route('/chores/:id')
  .get(validateRequest({ paramSchema }), getGroupChoreController)
  .put(
    validateRequest({ paramSchema, bodySchema: updateGroupChoreSchema }),
    updateGroupChoreController
  )
  .delete(validateRequest({ paramSchema }), deleteGroupChoreController)

groupRouter.route('/leaderboard').get(getGroupLeaderboardController)

export default groupRouter
