import { useUserStore } from '../stores/user'
import Checklist from '../components/Checklist'
import Statistic from '../components/Statistic'
import { Paper } from '@mui/material'
import dayjs from 'dayjs'

export default function Dashboard() {
  const user = useUserStore((state) => state.user)

  console.log('user', user)

  const weeklyStats = user?.weeklyStats?.find(
    (stat) => stat.weekStart === dayjs().startOf('week').toDate()
  )

  const weeklyPoints = weeklyStats?.points ?? 0
  const weeklyChoresCompleted = weeklyStats?.choresCompleted ?? 0
  return (
    <>
      <h1>Dashboard</h1>
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
        <Statistic value={weeklyChoresCompleted} />
      </div>
      <div>
        <h2>Weekly Points Earned</h2>
        <Statistic value={weeklyPoints} />
      </div>
    </>
  )
}
