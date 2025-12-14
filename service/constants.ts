import { type User } from './models/user.model'

export const AUTH_COOKIE_NAME = process.env.AUTH_COOKIE_NAME || 'token'
export const JWT_SECRET = process.env.JWT_SECRET || 'secret'

export const POINTS_PER_CHORE = 10

interface Badge {
  name: string
  condition: (stats: { totalChoresCompleted: number; points: number }) => boolean
  color: string
}

export const BADGES: Record<string, Badge> = {
  FIRST_SWEEP: {
    name: 'First Sweep',
    condition: ({ totalChoresCompleted }) => totalChoresCompleted >= 1,
    color: '#4CAF50' // Green
  },
  HIGH_FIVE: {
    name: 'High Five',
    condition: ({ totalChoresCompleted }) => totalChoresCompleted >= 5,
    color: '#2196F3' // Blue
  },
  DOZEN_DONE: {
    name: 'Dozen Done',
    condition: ({ totalChoresCompleted }) => totalChoresCompleted >= 12,
    color: '#FF9800' // Orange
  },
  CENTURY_CLEAER: {
    name: 'Century Clearer',
    condition: ({ totalChoresCompleted }) => totalChoresCompleted >= 100,
    color: '#9C27B0' // Purple
  },
  POINT_STARTER: {
    name: 'Point Starter',
    condition: ({ points }) => points >= 50,
    color: '#00BCD4' // Cyan
  },
  LEVEL_UP: {
    name: 'Level Up',
    condition: ({ points }) => points >= 100,
    color: '#FFC107' // Amber
  },
  POINT_PRO: {
    name: 'Point Pro',
    condition: ({ points }) => points >= 500,
    color: '#E91E63' // Pink
  },
  SWEEEPSTAKES_CHAMP: {
    name: 'Sweeepstakes Champ',
    condition: ({ points }) => points >= 1000,
    color: '#FFD700' // Gold
  }
}
