import { Paper, TableContainer } from '@mui/material'
import GroupChoreList from '../components/GroupChoreList'
import Leaderboard from '../components/Leaderboard'
import Statistic from '../components/Statistic'
import { useGroupStore } from '../stores/group'
import { useEffect, useState } from 'react'
import type { LeaderboardEntry } from '../types'

function Group() {
  const groupName = useGroupStore((state) => state.name)
  const chores = useGroupStore((state) => state.chores)

  const [leaderboardEntries, setLeaderboardEntries] = useState<LeaderboardEntry[]>([])

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const res = await fetch('/api/group/leaderboard')
      const data = await res.json()
      setLeaderboardEntries(data)
    }

    fetchLeaderboard()
  })

  return (
    <>
      <h1>{groupName}</h1>
      <div>
        <h2>Weekly Leaderboard</h2>
        <Paper>
          <Leaderboard entries={leaderboardEntries} />
        </Paper>
      </div>
      <div>
        <h2>Weekly Chores Completed</h2>
        <Statistic value="12" />
      </div>
      <div>
        <h2>All Chores</h2>
        <TableContainer component={Paper}>
          <GroupChoreList chores={chores} />
        </TableContainer>
      </div>
    </>
  )
}

export default Group
