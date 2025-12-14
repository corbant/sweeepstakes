import type { Request, Response } from 'express'
import { type Register, type Login } from '../schemas/auth.schema'
import bcrypt from 'bcryptjs'
import { generateRandomColor } from './utils/generate-random-color'
import GroupModel from '../models/group.model'
import UserModel from '../models/user.model'
import { notificationEvents } from '../events'
import { SignJWT } from 'jose'
import { AUTH_COOKIE_NAME, JWT_SECRET } from '../constants'

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: true,
  sameSite: 'strict' as const,
  maxAge: 7 * 24 * 60 * 60 * 1000
}

const SALT_LENGTH = process.env.SALT_LENGTH ? Number(process.env.SALT_LENGTH) : 10

export const loginController = async (req: Request, res: Response) => {
  const data: Login = req.body
  const user = await UserModel.findOne({ username: data.username })
  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password' })
  }

  const passwordMatch = await bcrypt.compare(data.password, user.password)
  if (!passwordMatch) {
    return res.status(401).json({ message: 'Invalid username or password' })
  }

  const token = await generateAuthToken(user._id.toString())

  const userObj = user.toObject()

  const rawBody = {
    id: userObj._id,
    firstName: userObj.firstName,
    lastName: userObj.lastName,
    group: userObj.group,
    avatar: userObj.avatar,
    weeklyStats: userObj.weeklyStats
  }
  return res.status(200).cookie(AUTH_COOKIE_NAME, token, COOKIE_OPTIONS).json(rawBody)
}

export const logoutController = (req: Request, res: Response) => {
  return res.status(204).clearCookie(AUTH_COOKIE_NAME, COOKIE_OPTIONS).send()
}

export const registerController = async (req: Request, res: Response) => {
  const data: Register = req.body

  let group = null

  if (data.groupId) {
    // join existing group
    group = await GroupModel.findById(data.groupId)
    if (!group) {
      return res.status(400).json({ message: 'Invalid group code' })
    }
  } else {
    // create a new group for the user
    group = await GroupModel.create({
      name: `${data.firstName}'s Group`
    })
  }

  // create user
  try {
    const user = await UserModel.create({
      username: data.username,
      password: await bcrypt.hash(data.password, SALT_LENGTH),
      firstName: data.firstName,
      lastName: data.lastName,
      group: group._id,
      avatar: {
        initials: (data.firstName.charAt(0) + data.lastName.charAt(0)).toUpperCase(),
        color: generateRandomColor()
      }
    })

    group.members.push(user._id)
    await group.save()

    const token = await generateAuthToken(user._id.toString())
    const userObj = user.toObject()

    const rawBody = {
      id: userObj._id,
      firstName: userObj.firstName,
      lastName: userObj.lastName,
      group: userObj.group,
      avatar: userObj.avatar,
      weeklyStats: userObj.weeklyStats
    }
    notificationEvents.emit(
      `group:${group._id}`,
      `${userObj.firstName} ${userObj.lastName} has joined your group. Give them a warm welcome!`
    )
    return res.status(201).cookie(AUTH_COOKIE_NAME, token, COOKIE_OPTIONS).json(rawBody)
  } catch (e: any) {
    if (e.code === 11000) {
      await GroupModel.deleteOne({ _id: group._id })
      return res.status(400).json({ message: 'Username already exists' })
    }
    return res.status(500).json({ message: 'Error creating user', error: e })
  }
}

export const getGroupNameController = async (req: Request, res: Response) => {
  const { id: groupId } = req.params
  const group = await GroupModel.findById(groupId)
  if (!group) {
    return res.status(404).json({ message: 'Group not found' })
  }
  res.status(200).json({ name: group.name })
}

const generateAuthToken = async (userId: string) => {
  return await new SignJWT({ id: userId })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(new TextEncoder().encode(JWT_SECRET))
}
