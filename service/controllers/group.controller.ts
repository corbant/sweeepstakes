import type { Request, Response } from 'express'
import UserModel, { type User } from '../models/user.model'
import GroupModel from '../models/group.model'
import ChoreModel, { type Chore } from '../models/chore.model'

export const getGroupInfoController = async (req: Request, res: Response) => {
  const groupId = await getGroupId(req)
  const group = await GroupModel.findById(groupId)
  const groupObj = group!.toObject()
  const rawBody = {
    id: groupObj._id,
    name: groupObj.name,
    members: groupObj.members,
    chores: groupObj.chores
  }
  res.status(200).json(rawBody)
}

export const updateGroupInfoController = async (req: Request, res: Response) => {
  const groupId = await getGroupId(req)
  const updatedData = req.body
  const updatedGroup = await GroupModel.findByIdAndUpdate(groupId, updatedData, {
    new: true,
    runValidators: true
  })
  const updatedGroupObj = updatedGroup!.toObject()
  const rawBody = {
    id: updatedGroupObj._id,
    name: updatedGroupObj.name,
    members: updatedGroupObj.members,
    chores: updatedGroupObj.chores
  }
  res.status(200).json(rawBody)
}

export const getGroupMembersController = async (req: Request, res: Response) => {
  const groupId = await getGroupId(req)
  const group = await GroupModel.findById(groupId)
  if (!group) {
    return res.status(404).json({ message: 'Group not found' })
  }
  const members = await UserModel.find(
    { _id: { $in: group.members } },
    'firstName lastName avatar _id'
  )
  const rawBody = members.map((member) => ({
    id: member._id,
    firstName: member.firstName,
    lastName: member.lastName,
    avatar: member.avatar
  }))
  // Fetch group members using groupId
  res.status(200).json(rawBody)
}

export const getGroupMemberController = async (req: Request, res: Response) => {
  const { id: userId } = req.params
  const groupId = await getGroupId(req)
  const group = await GroupModel.findById(groupId)
  if (!group!.members.find((memberId) => memberId.toString() === userId)) {
    return res.status(404).json({ message: 'Member not found in group' })
  }
  const member = await UserModel.findById(userId, 'firstName lastName avatar _id')

  const memberObj = member!.toObject()
  const rawBody = {
    id: memberObj._id,
    firstName: memberObj.firstName,
    lastName: memberObj.lastName,
    avatar: memberObj.avatar
  }
  res.status(200).json(rawBody)
}

export const getGroupChoresController = async (req: Request, res: Response) => {
  const groupId = await getGroupId(req)
  const group = await GroupModel.findById(groupId).populate<{ chores: Chore[] }>('chores')
  const chores = group!.chores
  const rawBody = chores.map((chore) => ({
    id: chore._id,
    title: chore.title,
    description: chore.description,
    assignedTo: chore.assignedTo,
    dueDate: chore.dueDate,
    completed: chore.completed
  }))
  // Fetch group chores using groupId
  res.status(200).json(rawBody)
}

export const addGroupChoreController = async (req: Request, res: Response) => {
  const groupId = await getGroupId(req)
  const choreData = req.body
  let newChore
  try {
    newChore = await ChoreModel.create({
      title: choreData.title,
      description: choreData.description,
      assignedTo: choreData.assignedTo,
      dueDate: choreData.dueDate,
      completed: false
    })
  } catch (e) {
    return res.status(400).json({ message: 'Invalid chore data' })
  }

  await GroupModel.findByIdAndUpdate(groupId, { $push: { chores: newChore._id } })

  const newChoreObj = newChore.toObject()
  const rawBody = {
    id: newChoreObj._id,
    title: newChoreObj.title,
    description: newChoreObj.description,
    assignedTo: newChoreObj.assignedTo,
    dueDate: newChoreObj.dueDate,
    completed: newChoreObj.completed
  }
  res.status(201).json(rawBody)
}

export const getGroupChoreController = async (req: Request, res: Response) => {
  const { id: choreId } = req.params
  const groupId = await getGroupId(req)
  const group = await GroupModel.findById(groupId)
  if (!group!.chores.find((id) => id.toString() === choreId)) {
    return res.status(404).json({ message: 'Chore not found in group' })
  }
  const chore = await ChoreModel.findById(choreId)
  const choreObj = chore!.toObject()
  const rawBody = {
    id: choreObj._id,
    title: choreObj.title,
    description: choreObj.description,
    assignedTo: choreObj.assignedTo,
    dueDate: choreObj.dueDate,
    completed: choreObj.completed
  }
  res.status(200).json(rawBody)
}

export const updateGroupChoreController = async (req: Request, res: Response) => {
  const { id: choreId } = req.params
  const groupId = await getGroupId(req)
  const updatedData = req.body

  const group = await GroupModel.findById(groupId)
  if (!group!.chores.find((id) => id.toString() === choreId)) {
    return res.status(404).json({ message: 'Chore not found in group' })
  }
  const updatedChore = await ChoreModel.findByIdAndUpdate(choreId, updatedData, {
    new: true,
    runValidators: true
  })
  const updatedChoreObj = updatedChore!.toObject()
  const rawBody = {
    id: updatedChoreObj._id,
    title: updatedChoreObj.title,
    description: updatedChoreObj.description,
    assignedTo: updatedChoreObj.assignedTo,
    dueDate: updatedChoreObj.dueDate,
    completed: updatedChoreObj.completed
  }
  res.status(200).json(rawBody)
}

export const deleteGroupChoreController = async (req: Request, res: Response) => {
  const { id: choreId } = req.params
  const groupId = await getGroupId(req)
  const group = await GroupModel.findById(groupId)
  if (!group!.chores.find((id) => id.toString() === choreId)) {
    return res.status(404).json({ message: 'Chore not found in group' })
  }
  try {
    await ChoreModel.findByIdAndDelete(choreId)
    await GroupModel.findByIdAndUpdate(groupId, { $pull: { chores: choreId } })
  } catch (e) {
    return res.status(500).json({ message: 'Error deleting chore' })
  }

  res.status(204).send()
}

export const getGroupLeaderboardController = async (req: Request, res: Response) => {
  const groupId = await getGroupId(req)

  const group = await GroupModel.findById(groupId).populate<{ members: User[] }>('members')
  const members = group!.members

  const leaderboard = members.map((member) => ({
    id: member._id,
    points: member.points
  }))

  leaderboard.sort((a, b) => b.points - a.points)
  res.status(200).json(leaderboard)
}

// utils
const getGroupId = async (req: Request): Promise<string> => {
  // Placeholder implementation
  const userId = req.cookies[process.env.AUTH_COOKIE_NAME || 'token']

  const user = await UserModel.findById(userId)

  return user!.group.toString()
}
