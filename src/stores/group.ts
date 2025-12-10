import { create } from 'zustand'
import type { Group, User } from '../types'
import type { Chore } from '../types'

interface GroupState {
  id: string
  name: string
  setName: (name: string) => void
  chores: Chore[]
  getGroupInfo: () => void
  clearGroupInfo: () => void
  changeGroupName: (newName: string) => void
  members: User[]
  completedChores: number
}

export const useGroupStore = create<GroupState>()((set) => ({
  id: '',
  name: '',
  setName: (name: string) => {
    set({ name })
  },
  chores: [],
  getGroupInfo: async () => {
    try {
      const group = await fetchGroupInfo()
      console.log('Fetched group info:', group)
      set({
        id: group.id,
        name: group.name,
        chores: group.chores,
        members: group.members,
        completedChores: group.completedChores
      })
    } catch (error) {
      console.error('Error fetching group info:', error)
    }
  },
  clearGroupInfo: () => set({ id: '', name: '', chores: [], members: [], completedChores: 0 }),
  changeGroupName: async (newName: string) => {
    const updatedGroup = await fetch(`/api/group`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newName })
    })
    const updatedData = await updatedGroup.json()
    set({ name: updatedData.name })
  },
  members: [],
  completedChores: 0
}))

const fetchGroupInfo = async (): Promise<Group> => {
  const res = await fetch('/api/group')
  const data = await res.json()
  return data
}
