import type { Request, Response } from 'express'
import { type Register, type Login } from '../schemas/auth.schema'
import { v4 as uuid } from 'uuid'
import bcrypt from 'bcryptjs'
import { generateRandomColor } from '../utils/generate-random-color'
import GroupModel from '../models/group.model'
import UserModel from '../models/user.model'
import { userResponseSchema } from '../schemas/user.schema'

const AUTH_COOKIE_NAME = process.env.AUTH_COOKIE_NAME || 'token'

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: true,
  sameSite: 'strict' as const
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

  const token = user._id
  const userObj = user.toObject()

  const rawBody = {
    id: userObj._id,
    firstName: userObj.firstName,
    lastName: userObj.lastName,
    group: userObj.group,
    avatar: userObj.avatar
  }
  const resBody = userResponseSchema.parse(rawBody)
  return res.status(200).cookie(AUTH_COOKIE_NAME, token, COOKIE_OPTIONS).json(resBody)
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

    const token = user._id
    const userObj = user.toObject()

    const rawBody = {
      id: userObj._id,
      firstName: userObj.firstName,
      lastName: userObj.lastName,
      group: userObj.group,
      avatar: userObj.avatar
    }
    const resBody = userResponseSchema.parse(rawBody)
    return res.status(201).cookie(AUTH_COOKIE_NAME, token, COOKIE_OPTIONS).json(resBody)
  } catch (e: any) {
    if (e.code === 11000) {
      await GroupModel.deleteOne({ _id: group._id })
      return res.status(400).json({ message: 'Username already exists' })
    }
    return res.status(500).json({ message: 'Error creating user', error: e })
  }
}
