export interface User {
  id: string
  firstName: string
  lastName: string
  group: string
  avatar: {
    initials: string
    color: string
  }
  weeklyStats: [
    {
      weekStart: Date
      choresCompleted: number
      points: number
    }
  ]
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
  completedChores: number
}

export interface Badge {
  name: string
  url: string
}

export interface LeaderboardEntry {
  id: string
  points: number
}
