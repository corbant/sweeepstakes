import { Divider, Paper } from '@mui/material'
import Checklist from '../components/Checklist'
import { useEffect, useState } from 'react'
import type { Chore } from '../types'
import { useGroupStore } from '../stores/group'
import { useUserStore } from '../stores/user'

function Chores() {
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
      }
    } catch (error) {
      console.error('Error updating chore:', error)
    }
  }

  const todoChores = userChores.filter((chore) => !chore.completed)
  const doneChores = userChores.filter((chore) => chore.completed)

  return (
    <>
      <h1>Chores</h1>
      <Paper sx={{ padding: '12px' }}>
        <div>
          <h2>TODO</h2>
          <Checklist chores={todoChores} onToggle={handleToggleChore} />
        </div>
        <Divider />
        <div>
          <h2>DONE</h2>
          <Checklist chores={doneChores} onToggle={handleToggleChore} />
        </div>
      </Paper>
    </>
  )
}

export default Chores
