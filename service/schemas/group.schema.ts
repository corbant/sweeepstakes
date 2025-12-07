import { z } from 'zod'

export const updateGroupSchema = z.object({
  name: z.string().min(1).max(100).optional()
})

export const addGroupChoreSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  assignedTo: z.array(z.string().length(24)).optional(),
  dueDate: z.iso.date()
})

export const updateGroupChoreSchema = z.object({
  title: z.string().min(1).max(100).optional(),
  description: z.string().max(500).optional(),
  assignedTo: z.array(z.string().length(24)).optional(),
  dueDate: z.iso.date().optional(),
  completed: z.boolean().optional()
})
