import { z } from 'zod'

export const updateGroupSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  description: z.string().max(500).optional()
})

export const addGroupChoreSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  assignedTo: z.uuid().optional(),
  dueDate: z.date(),
  repeat: z.enum(['none', 'daily', 'weekly', 'monthly']).optional()
})

export const updateGroupChoreSchema = z.object({
  title: z.string().min(1).max(100).optional(),
  description: z.string().max(500).optional(),
  assignedTo: z.uuid().optional(),
  dueDate: z.date().optional(),
  repeat: z.enum(['none', 'daily', 'weekly', 'monthly']).optional()
})
