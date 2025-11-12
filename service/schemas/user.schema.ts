import { z } from 'zod'

export const updateUserSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  email: z.email().optional(),
  avatar: z.object({})
})
