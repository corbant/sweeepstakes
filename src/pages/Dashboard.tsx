import { useUserStore } from '../stores/user'
import Checklist from '../components/Checklist'
import Statistic from '../components/Statistic'
import { Paper } from '@mui/material'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import type { Chore } from '../types'
import { useGroupStore } from '../stores/group'

export default function Dashboard() {
  const user = useUserStore((state) => state.user)
  const chores = useGroupStore((state) => state.chores)
  const [userChores, setUserChores] = useState<Chore[]>([])

  useEffect(() => {
    if (user && chores) {
      const filteredChores = chores.filter((chore) => chore.assignedTo.includes(user.id))
      setUserChores(filteredChores)
    }
  }, [user?.id, chores])

  const handleToggleChore = async (chore: Chore, completed: boolean) => {
    try {
      const res = await fetch(`/api/group/chore/${chore.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed })
      })

      if (res.ok) {
        const updatedChore = await res.json()
        setUserChores((prevChores) =>
          prevChores.map((c) => (c.id === updatedChore.id ? updatedChore : c))
        )
        // Update group store as well
        useGroupStore.setState({
          chores: useGroupStore
            .getState()
            .chores.map((c) => (c.id === updatedChore.id ? updatedChore : c))
        })
        // Refresh user data to get updated stats
        const userRes = await fetch('/api/user')
        if (userRes.ok) {
          const updatedUser = await userRes.json()
          useUserStore.setState({ user: updatedUser })
        }
      }
    } catch (error) {
      console.error('Error updating chore:', error)
    }
  }

  const weeklyStats = user?.weeklyStats?.find((stat) =>
    dayjs(stat.weekStart).isSame(dayjs().startOf('week'), 'week')
  )

  const weeklyPoints = weeklyStats?.points ?? 0
  const weeklyChoresCompleted = weeklyStats?.choresCompleted ?? 0

  const today = dayjs().startOf('day')
  const choresToday = userChores.filter((chore) => {
    const dueDate = dayjs(chore.dueDate).startOf('day')
    return dueDate.isSame(today, 'day') && !chore.completed
  })

  return (
    <>
      <h1>Dashboard</h1>
      <div>
        <h2>Due Today</h2>
        <Paper>
          <Checklist chores={choresToday} onToggle={handleToggleChore} />
        </Paper>
      </div>
      <div>
        <h2>Weekly Chores Completed</h2>
        <Statistic value={weeklyChoresCompleted} />
      </div>
      <div>
        <h2>Weekly Points Earned</h2>
        <Statistic value={weeklyPoints} />
      </div>
    </>
  )
}
