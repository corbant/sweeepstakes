import { z } from 'zod'
import mongoose from 'mongoose'

export const updateUserSchema = z.object({
  firstName: z.string().min(1).max(50).optional(),
  lastName: z.string().min(1).max(50).optional()
})

export const userResponseSchema = z.object({
  id: z.instanceof(mongoose.Types.ObjectId),
  firstName: z.string(),
  lastName: z.string(),
  group: z.instanceof(mongoose.Types.ObjectId),
  avatar: z.object({
    initials: z.string(),
    color: z.string()
  })
})
