import { useUserStore } from '../stores/user'
import Checklist from '../components/Checklist'
import Statistic from '../components/Statistic'
import { Paper } from '@mui/material'

export default function Dashboard() {
  const user = useUserStore((state) => state.user)
  return (
    <>
      <h1>
        Dashboard of {user?.firstName} {user?.lastName}
      </h1>
      <div>
        <h2>Due Today</h2>
        <Paper>
          <Checklist
            items={[
              { text: 'Take out the trash', checked: false },
              { text: 'Wash the dishes', checked: true },
              { text: 'Mow the lawn', checked: false }
            ]}
          />
        </Paper>
      </div>
      <div>
        <h2>Weekly Chores Completed</h2>
        <Statistic value="5" />
      </div>
      <div>
        <h2>Current Leaderboard Position</h2>
        <Statistic value="#3" />
      </div>
      <div>
        <h2>Weekly Points Earned</h2>
        <Statistic value="120" />
      </div>
    </>
  )
}
