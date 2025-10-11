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
  user: null,
  login: (email: string, password: string) =>
    set(() => {
      // TODO: call backend api
      const user = login(email, password)
      if (user) {
        return { user: user }
      }
      return { user: null }
    }),
  logout: () => set(() => ({ user: null }))
}))

function login(email: string, password: string): User | null {
  password
  return {
    email,
    firstName: 'Test',
    lastName: 'User',
    avatar: { initials: 'TU', color: '#644fffff' }
  }
}
