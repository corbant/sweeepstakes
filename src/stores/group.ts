import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Group, User } from '../types'
import type { Chore } from '../types'

interface GroupState {
  id: string
  name: string
  setName: (name: string) => void
  chores: Chore[]
  getGroupInfo: () => void
  clearGroupInfo: () => void
  members: User[]
}

export const useGroupStore = create<GroupState>()(
  persist(
    (set) => ({
      id: '',
      name: '',
      setName: (name: string) => {
        set({ name })
      },
      chores: [],
      getGroupInfo: async () => {
        const group = await fetchGroupInfo()
        set({ id: group.id, name: group.name, chores: group.chores, members: group.members })
      },
      clearGroupInfo: () => set({ id: '', name: '', chores: [], members: [] }),
      members: []
    }),
    { name: 'group-storage' }
  )
)

const fetchGroupInfo = async (): Promise<Group> => {
  const res = await fetch('/api/group')
  const data = await res.json()
  return data
}
