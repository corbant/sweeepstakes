import mongoose from 'mongoose'

export interface Chore {
  _id: mongoose.Types.ObjectId
  title: string
  description: string
  assignedTo: mongoose.Types.ObjectId[]
  dueDate: Date
  completed: boolean
}

const choreSchema = new mongoose.Schema<Chore>({
  title: String,
  description: String,
  assignedTo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  dueDate: Date,
  completed: Boolean
})

const ChoreModel = mongoose.model<Chore>('Chore', choreSchema)

export default ChoreModel
