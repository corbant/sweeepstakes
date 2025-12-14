import type { Request, Response } from 'express'
import UserModel from '../models/user.model'
import GroupModel from '../models/group.model'
import { type Chore } from '../models/chore.model'
import { BADGES } from '../constants'

export const getUserInfoController = async (req: Request, res: Response) => {
  const user = res.locals.user
  const userObj = user!.toObject()
  const rawBody = {
    id: userObj._id,
    firstName: userObj.firstName,
    lastName: userObj.lastName,
    avatar: userObj.avatar,
    group: userObj.group.toString(),
    weeklyStats: userObj.weeklyStats
  }
  res.status(200).json(rawBody)
}

export const updateUserInfoController = async (req: Request, res: Response) => {
  const updatedData = req.body

  const currentUser = res.locals.user

  // Determine new initials
  const firstName = updatedData.firstName ?? currentUser!.firstName
  const lastName = updatedData.lastName ?? currentUser!.lastName
  const newInitials = (firstName.charAt(0) + lastName.charAt(0)).toUpperCase()

  // Update avatar initials in update object
  updatedData.avatar = {
    initials: newInitials,
    color: updatedData.avatar?.color ?? currentUser!.avatar.color
  }

  const updatedUser = await UserModel.findByIdAndUpdate(currentUser!._id, updatedData, {
    new: true,
    runValidators: true
  })

  const rawBody = {
    id: updatedUser!._id,
    firstName: updatedUser!.firstName,
    lastName: updatedUser!.lastName,
    avatar: updatedUser!.avatar,
    group: updatedUser!.group
  }
  res.status(200).json(rawBody)
}

export const getUserChoresController = async (req: Request, res: Response) => {
  const user = res.locals.user
  const groupId = user!.group
  const group = await GroupModel.findById(groupId).populate<{ chores: Chore[] }>('chores')
  const groupObj = group!.toObject()

  const chores = groupObj.chores
    .filter((chore) =>
      chore.assignedTo.some((assignee) => assignee.toString() === user._id.toString())
    )
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

export const getUserBadgesController = async (req: Request, res: Response) => {
  const user = res.locals.user
  const totalChoresCompleted = user!.weeklyStats.reduce(
    (acc: number, week: { choresCompleted: number }) => acc + week.choresCompleted,
    0
  )
  const points = user!.weeklyStats.reduce(
    (acc: number, week: { points: number }) => acc + week.points,
    0
  )
  const earnedBadges = Object.entries(BADGES)
    .filter(([_key, badge]) => {
      return badge.condition({ totalChoresCompleted, points })
    })
    .map(([_key, badge]) => ({
      name: badge.name,
      color: badge.color
    }))

  const rawBody = earnedBadges.map((badge) => ({
    name: badge.name,
    url: `https://img.shields.io/badge/${encodeURIComponent(badge.name)}-${encodeURIComponent(
      badge.color.replace('#', '')
    )}?style=flat`
  }))

  res.status(200).json(rawBody)
}

export const getUserTotalPointsController = async (req: Request, res: Response) => {
  const user = res.locals.user
  const points = user!.weeklyStats.reduce(
    (acc: number, week: { points: number }) => acc + week.points,
    0
  )
  res.status(200).json({ points })
}

export const getUserTotalCompletedChoresController = async (req: Request, res: Response) => {
  const user = res.locals.user
  const choresCompleted = user!.weeklyStats.reduce(
    (acc: number, week: { choresCompleted: number }) => acc + week.choresCompleted,
    0
  )
  res.status(200).json({ choresCompleted })
}

export const getUserWeeklyStatsController = async (req: Request, res: Response) => {
  const user = res.locals.user
  res.status(200).json({ weeklyStats: user!.weeklyStats })
}
