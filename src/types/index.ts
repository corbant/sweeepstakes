export interface User {
  email: string
  firstName: string
  lastName: string
  avatar: {
    initials: string
    color: string
  }
}

export interface Chore {
  id: string
  title: string
  description: string
  assignedTo: User[] | null
  dueDate: Date
  completed: boolean
}

export interface Group {
  id: string
  name: string
  members: User[]
  chores: Chore[]
}
