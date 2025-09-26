import { Paper, TableContainer } from '@mui/material'
import GroupChoreList from '../components/GroupChoreList'
import Leaderboard from '../components/Leaderboard'
import Statistic from '../components/Statistic'

function Group() {
  return (
    <>
      <h1>Group Name</h1>
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
            chores={[
              {
                name: 'Take out trash',
                avatars: [
                  { initials: 'AB', color: 'red' },
                  { initials: 'CD', color: 'blue' }
                ],
                dueDate: '12/7'
              },
              {
                name: 'Wash dishes',
                avatars: [{ initials: 'EF', color: 'green' }],
                dueDate: '12/11'
              },
              {
                name: 'Mow lawn',
                avatars: [
                  { initials: 'GH', color: 'purple' },
                  { initials: 'IJ', color: 'orange' }
                ],
                dueDate: '12/4'
              }
            ]}
          />
        </TableContainer>
      </div>
    </>
  )
}

export default Group
