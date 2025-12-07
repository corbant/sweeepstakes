import mongoose from 'mongoose'

export interface User {
  _id: mongoose.Types.ObjectId
  group: mongoose.Types.ObjectId
  username: string
  password: string
  firstName: string
  lastName: string
  avatar: {
    initials: string
    color: string
  }
  points: number
}

const userSchema = new mongoose.Schema({
  group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  avatar: {
    type: {
      initials: { type: String, required: true },
      color: { type: String, required: true }
    },
    required: true,
    _id: false
  },
  points: { type: Number, default: 0 }
})

const UserModel = mongoose.model('User', userSchema)

export default UserModel
