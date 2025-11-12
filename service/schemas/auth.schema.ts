import { z } from 'zod'

export const loginSchema = z.object({
  username: z.string(),
  password: z
    .string()
    .min(process.env.MIN_PASSWORD_LENGTH ? Number(process.env.MIN_PASSWORD_LENGTH) : 6)
})

export type Login = z.infer<typeof loginSchema>

export const registerSchema = z.object({
  username: z.string(),
  password: z
    .string()
    .min(process.env.MIN_PASSWORD_LENGTH ? Number(process.env.MIN_PASSWORD_LENGTH) : 6),
  email: z.email(),
  groupCode: z.string().length(6).optional()
})

export type Register = z.infer<typeof registerSchema>
