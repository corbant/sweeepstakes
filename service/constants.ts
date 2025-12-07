import { type User } from './models/user.model'

export const POINTS_PER_CHORE = 10

interface Badge {
  name: string
  condition: (user: User) => boolean
  color: string
}

export const BADGES: Record<string, Badge> = {
  FIRST_SWEEP: {
    name: 'First Sweep',
    condition: (user: User) => user.totalChoresCompleted >= 1,
    color: '#4CAF50' // Green
  },
  HIGH_FIVE: {
    name: 'High Five',
    condition: (user: User) => user.totalChoresCompleted >= 5,
    color: '#2196F3' // Blue
  },
  DOZEN_DONE: {
    name: 'Dozen Done',
    condition: (user: User) => user.totalChoresCompleted >= 12,
    color: '#FF9800' // Orange
  },
  CENTURY_CLEAER: {
    name: 'Century Clearer',
    condition: (user: User) => user.totalChoresCompleted >= 100,
    color: '#9C27B0' // Purple
  },
  POINT_STARTER: {
    name: 'Point Starter',
    condition: (user: User) => user.points >= 50,
    color: '#00BCD4' // Cyan
  },
  LEVEL_UP: {
    name: 'Level Up',
    condition: (user: User) => user.points >= 100,
    color: '#FFC107' // Amber
  },
  POINT_PRO: {
    name: 'Point Pro',
    condition: (user: User) => user.points >= 500,
    color: '#E91E63' // Pink
  },
  SWEEEPSTAKES_CHAMP: {
    name: 'Sweeepstakes Champ',
    condition: (user: User) => user.points >= 1000,
    color: '#FFD700' // Gold
  }
}
