import { Checkbox, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import type { Chore } from '../types'
import dayjs from 'dayjs'

type Props = {
  chores: Chore[]
  onToggle?: (chore: Chore, completed: boolean) => void
}

function Checklist(props: Props) {
  const handleToggle = (chore: Chore) => async () => {
    if (props.onToggle) {
      await props.onToggle(chore, !chore.completed)
    }
  }

  if (props.chores.length === 0) {
    return <p style={{ padding: 12 }}>No chores in checklist.</p>
  }

  return (
    <List>
      {props.chores.map((chore) => (
        <ListItem key={chore.id} secondaryAction={<p>{dayjs(chore.dueDate).format('MM/DD')}</p>}>
          <ListItemButton dense onClick={handleToggle(chore)}>
            <ListItemIcon>
              <Checkbox edge="start" checked={chore.completed} tabIndex={-1} disableRipple />
            </ListItemIcon>
            <ListItemText
              sx={{ textDecoration: chore.completed ? 'line-through' : 'none' }}
              primary={chore.title}
              secondary={chore.description}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  )
}

export default Checklist
