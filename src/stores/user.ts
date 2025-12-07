import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '../types'
import { useGroupStore } from './group'

interface UserState {
  isLoggedIn: () => boolean
  user: User | null
  login: (email: string, password: string) => void
  logout: () => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      isLoggedIn: () => !!get().user,
      user: null,
      login: async (username: string, password: string) => {
        try {
          const user = await login(username, password)
          if (user) {
            useGroupStore.getState().getGroupInfo()
            set(() => ({ user: user }))
          }
        } catch (error) {
          throw error
        }
      },
      logout: async () => {
        await logout()
        useGroupStore.getState().clearGroupInfo()
        set(() => ({ user: null }))
      }
    }),
    { name: 'user-storage' }
  )
)

const login = async (username: string, password: string): Promise<User> => {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    headers: { 'Content-Type': 'application/json' }
  })
  const data = await res.json()
  if (!res.ok) {
    throw new Error(data.errors || 'Failed to login')
  }
  const user = data as User
  return user
}

const logout = async (): Promise<void> => {
  await fetch('/api/auth/logout', { method: 'DELETE' })
}
