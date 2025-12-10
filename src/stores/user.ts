import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '../types'
import { useGroupStore } from './group'

interface UserState {
  isLoggedIn: () => boolean
  user: User | null
  login: (email: string, password: string) => void
  register: (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    groupId?: string
  ) => void
  logout: () => void
  changeName: (firstName: string, lastName: string) => void
  notifications: string[]
  addNotification: (notification: string) => void
  deleteNotification: (index: number) => void
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
      register: async (
        username: string,
        password: string,
        firstName: string,
        lastName: string,
        groupId?: string
      ) => {
        try {
          const res = await fetch('/api/auth/register', {
            method: 'POST',
            body: JSON.stringify({
              username,
              password,
              firstName,
              lastName,
              groupId: groupId ? groupId : undefined
            }),
            headers: { 'Content-Type': 'application/json' }
          })
          const data = await res.json()
          if (!res.ok) {
            throw new Error(data.errors || 'Failed to register')
          }
          const user = data as User
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
      },
      changeName: async (firstName: string, lastName: string) => {
        const res = await fetch('/api/user', {
          method: 'PUT',
          body: JSON.stringify({ firstName, lastName }),
          headers: { 'Content-Type': 'application/json' }
        })
        const data = await res.json()
        if (!res.ok) {
          throw new Error(data.errors || 'Failed to change name')
        }
        set(() => ({ user: data }))
      },
      notifications: [],
      addNotification: (notification: string) => {
        set((state) => ({ notifications: [...state.notifications, notification] }))
      },
      deleteNotification: (index: number) => {
        const newNotifications = [...get().notifications]
        newNotifications.splice(index, 1)
        set(() => ({ notifications: newNotifications }))
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
