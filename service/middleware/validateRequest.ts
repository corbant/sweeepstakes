import type { Request, Response, NextFunction } from 'express'
import { type ZodType, ZodError } from 'zod'

const validateRequest =
  ({ paramSchema, bodySchema }: { bodySchema?: ZodType; paramSchema?: ZodType }) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      if (paramSchema) {
        paramSchema.parse(req.params)
      }
      if (bodySchema) {
        bodySchema.parse(req.body)
      }
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ errors: error.issues })
      }
    }
    next()
  }

export default validateRequest
