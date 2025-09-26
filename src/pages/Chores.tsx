import { Divider, Paper } from '@mui/material'
import Checklist from '../components/Checklist'

function Chores() {
  return (
    <>
      <h1>Chores</h1>
      <Paper>
        <div>
          <h2>TODO</h2>
          <Checklist
            items={[
              { text: 'Chore A', checked: false },
              { text: 'Chore B', checked: false }
            ]}
          />
        </div>
        <Divider />
        <div>
          <h2>DONE</h2>
          <Checklist
            items={[
              { text: 'Chore C', checked: true },
              { text: 'Chore D', checked: true }
            ]}
          />
        </div>
      </Paper>
    </>
  )
}

export default Chores
