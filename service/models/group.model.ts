import mongoose from 'mongoose'

export interface Group {
  _id: mongoose.Types.ObjectId
  name: string
  members: mongoose.Types.ObjectId[]
  chores: mongoose.Types.ObjectId[]
}

const groupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  chores: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chore' }]
})

const GroupModel = mongoose.model('Group', groupSchema)

export default GroupModel
