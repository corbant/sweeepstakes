import { Paper, TableContainer } from '@mui/material'
import GroupChoreList from '../components/GroupChoreList'
import Leaderboard from '../components/Leaderboard'
import Statistic from '../components/Statistic'
import { useGroupStore } from '../stores/group'

function Group() {
  const groupName = useGroupStore((state) => state.name)
  const chores = useGroupStore((state) => state.chores)

  return (
    <>
      <h1>{groupName}</h1>
      <div>
        <h2>Weekly Leaderboard</h2>
        <Paper>
          <Leaderboard
            entries={[
              { name: 'Alice', score: 150 },
              { name: 'Bob', score: 120 },
              { name: 'Charlie', score: 100 }
            ]}
          />
        </Paper>
      </div>
      <div>
        <h2>Weekly Chores Completed</h2>
        <Statistic value="12" />
      </div>
      <div>
        <h2>All Chores</h2>
        <TableContainer component={Paper}>
          <GroupChoreList
            chores={chores}
          />
        </TableContainer>
      </div>
    </>
  )
}

export default Group
