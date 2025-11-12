import { create } from 'zustand'
import type { User } from '../types'
import type { Chore } from '../types'

interface GroupState {
  id: string
  name: string
  setName: (name: string) => void
  chores: Chore[]
  getGroupInfo: () => void
  clearGroupInfo: () => void
  users: User[]
}

export const useGroupStore = create<GroupState>((set) => ({
  id: '',
  name: '',
  setName: (name: string) => {
    set({ name })
  },
  chores: [],
  getGroupInfo: () => {
    // TODO: fetch group info from api
    set({ id: '1', name: 'Test Group', chores: [], users: [] })
  },
  clearGroupInfo: () => set({ id: '', name: '', chores: [], users: [] }),
  users: []
}))
