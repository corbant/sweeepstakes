import type { Request, Response } from 'express'
import UserModel, { type User } from '../models/user.model'
import GroupModel from '../models/group.model'
import ChoreModel, { type Chore } from '../models/chore.model'
import { POINTS_PER_CHORE } from '../constants'
import dayjs from 'dayjs'
import { notificationEvents } from '../events'

export const getGroupInfoController = async (req: Request, res: Response) => {
  const groupId = await getGroupId(req)
  const group = await GroupModel.findById(groupId).populate<{ chores: Chore[]; members: User[] }>(
    'chores members'
  )
  const groupObj = group!.toObject()
  const rawBody = {
    id: groupObj._id,
    name: groupObj.name,
    completedChores: groupObj.completedChores,
    members: groupObj.members.map((member) => ({
      id: member._id,
      firstName: member.firstName,
      lastName: member.lastName,
      avatar: member.avatar
    })),
    chores: groupObj.chores.map((chore) => ({
      id: chore._id,
      title: chore.title,
      description: chore.description,
      assignedTo: chore.assignedTo,
      dueDate: chore.dueDate,
      completed: chore.completed
    }))
  }
  res.status(200).json(rawBody)
}

export const updateGroupInfoController = async (req: Request, res: Response) => {
  const groupId = await getGroupId(req)
  const updatedData = req.body
  const updatedGroup = await GroupModel.findByIdAndUpdate(groupId, updatedData, {
    new: true,
    runValidators: true
  }).populate<{ chores: Chore[]; members: User[] }>('chores members')
  const updatedGroupObj = updatedGroup!.toObject()
  const rawBody = {
    id: updatedGroupObj._id,
    name: updatedGroupObj.name,
    completedChores: updatedGroupObj.completedChores,
    members: updatedGroupObj.members.map((member) => ({
      id: member._id,
      firstName: member.firstName,
      lastName: member.lastName,
      avatar: member.avatar
    })),
    chores: updatedGroupObj.chores.map((chore) => ({
      id: chore._id,
      title: chore.title,
      description: chore.description,
      assignedTo: chore.assignedTo,
      dueDate: chore.dueDate,
      completed: chore.completed
    }))
  }
  notificationEvents.emit(
    `group:${updatedGroupObj._id}`,
    `Group name was changed to ${updatedGroupObj.name}`
  )
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
    assignedTo: newChoreObj.assignedTo.map((id) => id.toString()),
    dueDate: newChoreObj.dueDate,
    completed: newChoreObj.completed
  }
  UserModel.find({ _id: { $in: choreData.assignedTo } }).then((users) => {
    for (const user of users) {
      notificationEvents.emit(
        `user:${user._id}`,
        `New chore assigned: ${newChoreObj.title} due on ${dayjs(newChoreObj.dueDate).format('MM/DD')}`
      )
    }
  })
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

  // Get the current chore state before updating
  const currentChore = await ChoreModel.findById(choreId)

  const updatedChore = await ChoreModel.findByIdAndUpdate(choreId, updatedData, {
    new: true,
    runValidators: true
  })

  if (updatedChore!.assignedTo.length !== currentChore!.assignedTo.length) {
    // Notify new assigned users
    const newAssignedUsers = updatedChore!.assignedTo.filter(
      (id) => !currentChore!.assignedTo.includes(id)
    )
    const newAssignedUserDocs = await UserModel.find({ _id: { $in: newAssignedUsers } })
    for (const user of newAssignedUserDocs) {
      notificationEvents.emit(
        `user:${user._id}`,
        `You have been assigned a new chore: ${updatedChore!.title} due on ${dayjs(updatedChore!.dueDate).format('MM/DD')}`
      )
    }
    // Notify unassigned users
    const unassignedUsers = currentChore!.assignedTo.filter(
      (id) => !updatedChore!.assignedTo.includes(id)
    )
    const unassignedUserDocs = await UserModel.find({ _id: { $in: unassignedUsers } })
    for (const user of unassignedUserDocs) {
      notificationEvents.emit(
        `user:${user._id}`,
        `You have been unassigned from a chore: ${updatedChore!.title}`
      )
    }
  }

  // Check if chore was just marked as completed
  if (!currentChore!.completed && updatedChore!.completed) {
    // Award points to all assigned users
    const users = await UserModel.find({ _id: { $in: updatedChore!.assignedTo } })

    const currentWeekStart = dayjs().startOf('week').toDate()

    for (const user of users) {
      const currentWeekStats = user.weeklyStats.find(
        (stat) => stat.weekStart.getTime() === currentWeekStart.getTime()
      )

      if (currentWeekStats) {
        currentWeekStats.choresCompleted += 1
        currentWeekStats.points += POINTS_PER_CHORE
      } else {
        user.weeklyStats.push({
          weekStart: currentWeekStart,
          choresCompleted: 1,
          points: POINTS_PER_CHORE
        })
      }

      await user.save()
      notificationEvents.emit(`user:${user._id}`, `Chore completed: ${updatedChore!.title}`)
    }
  } else if (currentChore!.completed && !updatedChore!.completed) {
    // If chore was unmarked as completed, deduct points
    const users = await UserModel.find({ _id: { $in: updatedChore!.assignedTo } })

    const currentWeekStart = dayjs().startOf('week').toDate()

    for (const user of users) {
      const currentWeekStats = user.weeklyStats.find(
        (stat) => stat.weekStart.getTime() === currentWeekStart.getTime()
      )

      if (currentWeekStats) {
        currentWeekStats.choresCompleted -= 1
        currentWeekStats.points -= POINTS_PER_CHORE
      }

      await user.save()
      notificationEvents.emit(
        `user:${user._id}`,
        `Chore unmarked as completed: ${updatedChore!.title}`
      )
    }
  }

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

  const currentWeekStart = dayjs().startOf('week').toDate()

  const leaderboard = members.map((member) => {
    // Get current week's stats only
    const currentWeekStats = member.weeklyStats.find(
      (stat) => stat.weekStart.getTime() === currentWeekStart.getTime()
    )
    return {
      id: member._id,
      points: currentWeekStats ? currentWeekStats.points : 0
    }
  })

  leaderboard.sort((a, b) => b.points - a.points)
  res.status(200).json(leaderboard)
}

// utils
const getGroupId: (req: Request) => Promise<string> = async (req: Request): Promise<string> => {
  // Placeholder implementation
  const userId = req.cookies[process.env.AUTH_COOKIE_NAME || 'token']

  const user = await UserModel.findById(userId)

  return user!.group.toString()
}
