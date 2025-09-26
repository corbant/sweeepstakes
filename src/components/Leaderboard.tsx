import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material'

type Props = {
  entries: { name: string; score: number }[]
}

function Leaderboard(props: Props) {
  return (
    <List>
      {props.entries.map((entry, index) => (
        <ListItem key={index} secondaryAction={<span>{entry.score}</span>}>
          <ListItemIcon>{index + 1}</ListItemIcon>
          <ListItemText primary={`${entry.name}`} />
        </ListItem>
      ))}
    </List>
  )
}

export default Leaderboard
