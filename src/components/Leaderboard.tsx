import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import type { LeaderboardEntry } from '../types'
import { useGroupStore } from '../stores/group'

type Props = {
  entries: LeaderboardEntry[]
}

function Leaderboard(props: Props) {
  const members = useGroupStore((state) => state.members)

  return (
    <List>
      {props.entries
        .sort((a, b) => b.points - a.points)
        .map((entry, index) => {
          const user = members.find((member) => member.id === entry.id)
          return (
            <ListItem key={index} secondaryAction={<span>{entry.points}</span>}>
              <ListItemIcon>{index + 1}</ListItemIcon>
              <ListItemText primary={`${user?.firstName} ${user?.lastName}`} />
            </ListItem>
          )
        })}
    </List>
  )
}

export default Leaderboard
