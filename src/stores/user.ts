import { create } from 'zustand'
import type { User } from '../types'

interface UserState {
  isLoggedIn: () => boolean
  user: User | null
  login: (email: string, password: string) => void
  logout: () => void
}

export const useUserStore = create<UserState>((set, get) => ({
  isLoggedIn: () => !!get().user,
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null,
  login: async (email: string, password: string) => {
    try {
      const user = await login(email, password)
      if (user) {
        localStorage.setItem('user', JSON.stringify(user))
        set(() => ({ user: user }))
      }
    } catch (error) {
      throw error
    }
  },
  logout: () => {
    localStorage.removeItem('user')
    set(() => ({ user: null }))
  }
}))

const login = async (email: string, password: string): Promise<User | null> => {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: { 'Content-Type': 'application/json' }
  })
  const data = await res.json()
  if (!res.ok) {
    throw new Error(data.error || 'Failed to login')
  }
  const user = data.user as User
  return user
}
