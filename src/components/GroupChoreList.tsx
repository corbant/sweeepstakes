import {
  Avatar,
  AvatarGroup,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import AddIcon from '@mui/icons-material/Add'
import type { Chore } from '../types'

type Props = {
  chores: Chore[]
}

function GroupChoreList(props: Props) {
  return (
    <Table stickyHeader>
      <TableHead>
        <TableRow>
          <TableCell>Chore</TableCell>
          <TableCell align="center">Assigned To</TableCell>
          <TableCell align="center">Due Date</TableCell>
          <TableCell align="right">
            <IconButton>
              <AddIcon />
            </IconButton>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {props.chores.map((chore, index) => (
          <TableRow key={index}>
            <TableCell>{chore.title}</TableCell>
            <TableCell align="center">
              <AvatarGroup spacing={48} sx={{ justifyContent: 'center' }} max={4}>
                {chore.assignedTo?.map((user) => (
                  <Avatar sx={{ bgcolor: user.avatar.color, width: 30, height: 30 }}>
                    {user.avatar.initials}
                  </Avatar>
                ))}
              </AvatarGroup>
            </TableCell>
            <TableCell align="center">{chore.dueDate.toDateString()}</TableCell>
            <TableCell align="right">
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default GroupChoreList
