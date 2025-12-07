export interface User {
  id: string
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
  assignedTo: string[]
  dueDate: Date
  completed: boolean
}

export interface Group {
  id: string
  name: string
  members: User[]
  chores: Chore[]
}

export interface Badge {
  name: string
  url: string
}

export interface LeaderboardEntry {
  user: string
  points: number
}
