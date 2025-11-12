import type { Request, Response } from 'express'

export const getGroupInfoController = (req: Request, res: Response) => {
  const groupId = getGroupId(req)
  // Fetch group info using groupId
  res.status(200).json({
    group: {
      /* group data */
    }
  })
}

export const updateGroupInfoController = (req: Request, res: Response) => {
  const groupId = getGroupId(req)
  const updatedData = req.body
  // Update group info using groupId and updatedData
  res.status(200).json({
    group: {
      /* updated group data */
    }
  })
}

export const getGroupMembersController = (req: Request, res: Response) => {
  const groupId = getGroupId(req)
  // Fetch group members using groupId
  res.status(200).json({
    members: [
      /* member data */
    ]
  })
}

export const getGroupMemberController = (req: Request, res: Response) => {
  const { userId } = req.params
  const groupId = getGroupId(req)
  // Fetch member info using groupId and userId
  res.status(200).json({
    member: {
      /* member data */
    }
  })
}

export const getGroupChoresController = (req: Request, res: Response) => {
  const groupId = getGroupId(req)
  // Fetch group chores using groupId
  res.status(200).json({
    chores: [
      /* chore data */
    ]
  })
}

export const addGroupChoreController = (req: Request, res: Response) => {
  const groupId = getGroupId(req)
  const choreData = req.body
  // Add new chore to group using groupId and choreData
  res.status(201).json({
    chore: {
      /* new chore data */
    }
  })
}

export const getGroupChoreController = (req: Request, res: Response) => {
  const { choreId } = req.params
  const groupId = getGroupId(req)
  // Fetch chore info using groupId and choreId
  res.status(200).json({
    chore: {
      /* chore data */
    }
  })
}

export const updateGroupChoreController = (req: Request, res: Response) => {
  const { choreId } = req.params
  const groupId = getGroupId(req)
  const updatedData = req.body
  // Update chore info using groupId, choreId, and updatedData
  res.status(200).json({
    chore: {
      /* updated chore data */
    }
  })
}

export const deleteGroupChoreController = (req: Request, res: Response) => {
  const { choreId } = req.params
  const groupId = getGroupId(req)
  // Delete chore using groupId and choreId
  res.status(204).send()
}

export const getGroupLeaderboardController = (req: Request, res: Response) => {
  const groupId = getGroupId(req)
  // Fetch leaderboard data using groupId
  res.status(200).json({
    leaderboard: [
      /* leaderboard data */
    ]
  })
}

// utils
const getGroupId = (req: Request): string => {
  // Placeholder implementation
  const userId = req.cookies[process.env.AUTH_COOKIE_NAME || 'token']
  return 'groupId-placeholder'
}
