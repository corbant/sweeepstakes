import { z } from 'zod'

export const paramSchema = z.object({
  id: z.string().length(24)
})
