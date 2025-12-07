import type { Request, Response } from 'express'
import UserModel from '../models/user.model'
import GroupModel from '../models/group.model'
import { type Chore } from '../models/chore.model'

export const getUserInfoController = async (req: Request, res: Response) => {
  const userId = getUserId(req)

  const user = await UserModel.findById(userId)
  const userObj = user!.toObject()
  const rawBody = {
    id: userObj._id,
    firstName: userObj.firstName,
    lastName: userObj.lastName,
    avatar: userObj.avatar,
    group: userObj.group.toString()
  }
  res.status(200).json(rawBody)
}

export const updateUserInfoController = async (req: Request, res: Response) => {
  const userId = getUserId(req)
  const updatedData = req.body

  const currentUser = await UserModel.findById(userId)

  // Determine new initials
  const firstName = updatedData.firstName ?? currentUser!.firstName
  const lastName = updatedData.lastName ?? currentUser!.lastName
  const newInitials = (firstName.charAt(0) + lastName.charAt(0)).toUpperCase()

  // Update avatar initials in update object
  updatedData.avatar = {
    initials: newInitials
  }

  const updatedUser = await UserModel.findByIdAndUpdate(userId, updatedData, {
    new: true,
    runValidators: true
  })

  const rawBody = {
    id: updatedUser!._id,
    firstName: updatedUser!.firstName,
    lastName: updatedUser!.lastName,
    avatar: updatedUser!.avatar,
    group: updatedUser!.group.toString()
  }
  res.status(200).json(rawBody)
}

export const getUserChoresController = async (req: Request, res: Response) => {
  const userId = getUserId(req)
  const user = await UserModel.findById(userId)
  const groupId = user!.group
  const group = await GroupModel.findById(groupId).populate<{ chores: Chore[] }>('chores')
  const groupObj = group!.toObject()

  const chores = groupObj.chores
    .filter((chore) => chore.assignedTo.some((assignee) => assignee.toString() === userId))
    .map((chore) => ({
      id: chore._id,
      title: chore.title,
      description: chore.description,
      assignedTo: chore.assignedTo,
      dueDate: chore.dueDate,
      completed: chore.completed
    }))

  const rawBody = chores
  res.status(200).json(rawBody)
}

export const getUserBadgesController = (req: Request, res: Response) => {
  // Implementation here
  res.status(200).json({
    badges: [
      //implementation
    ]
  })
}

export const getUserPointsController = async (req: Request, res: Response) => {
  const userId = getUserId(req)
  const user = await UserModel.findById(userId)
  const points = user!.points
  res.status(200).json({ points })
}

// utils
const getUserId = (req: Request): string => {
  // Placeholder implementation
  const userId = req.cookies[process.env.AUTH_COOKIE_NAME || 'token']
  return userId
}
