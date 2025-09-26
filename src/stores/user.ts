import { create } from 'zustand'

type User = {
  email: string
  firstName: string
  lastName: string
  avatar: {
    url?: string
    initials: string
    color: string
  }
  // other field
}

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
      const user = login(email, password)
      if (user) {
        return { user: user }
      }
      return { user: null }
    }),
  logout: () => set(() => ({ user: null }))
}))

function login(email: string, password: string): User | null {
  return {
    email,
    firstName: 'Test',
    lastName: 'User',
    avatar: { initials: 'TU', color: '#644fffff' }
  }
}
