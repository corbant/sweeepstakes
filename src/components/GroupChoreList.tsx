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
import { useGroupStore } from '../stores/group'
import ChoreEditModal from './ChoreEditModal'
import { useState } from 'react'
import dayjs from 'dayjs'

type Props = {
  chores: Chore[]
}

function GroupChoreList(props: Props) {
  const [openChoreModal, setOpenChoreModal] = useState(false)
  const [selectedChore, setSelectedChore] = useState<Chore | null>(null)
  return (
    <>
      <ChoreEditModal
        open={openChoreModal}
        onClose={() => setOpenChoreModal(false)}
        onSave={async (updatedChore) => {
          try {
            let res
            if (selectedChore) {
              res = await fetch(`/api/group/chore/${selectedChore.id}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  ...updatedChore,
                  dueDate: dayjs(updatedChore.dueDate).format('YYYY-MM-DD')
                })
              })
            } else {
              res = await fetch('/api/group/chores', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  ...updatedChore,
                  dueDate: dayjs(updatedChore.dueDate).format('YYYY-MM-DD')
                })
              })
            }
            if (!res.ok) {
              throw new Error('Failed to update chore')
            }
            const updatedChoreResponse = await res.json()
            if (selectedChore) {
              useGroupStore.setState({
                chores: useGroupStore
                  .getState()
                  .chores.map((chore) =>
                    chore.id === updatedChoreResponse.id ? updatedChoreResponse : chore
                  )
              })
            } else {
              useGroupStore.setState({
                chores: [...useGroupStore.getState().chores, updatedChoreResponse]
              })
            }
          } catch (error) {
            console.error(error)
          }
          setOpenChoreModal(false)
          setSelectedChore(null)
        }}
        chore={selectedChore}
      />
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Chore</TableCell>
            <TableCell align="center">Assigned To</TableCell>
            <TableCell align="center">Due Date</TableCell>
            <TableCell align="right">
              <IconButton onClick={() => setOpenChoreModal(true)}>
                <AddIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.chores.map((chore, index) => {
            const assignedUsers = chore.assignedTo.map(
              (userId) => useGroupStore.getState().members.find((user) => user.id === userId)!
            )
            return (
              <TableRow key={index}>
                <TableCell>{chore.title}</TableCell>
                <TableCell align="center">
                  <AvatarGroup spacing={54} sx={{ justifyContent: 'center' }} max={4}>
                    {assignedUsers.map((user) => (
                      <Avatar sx={{ bgcolor: user.avatar.color, width: 30, height: 30 }}>
                        {user.avatar.initials}
                      </Avatar>
                    ))}
                  </AvatarGroup>
                </TableCell>
                <TableCell align="center">{new Date(chore.dueDate).toDateString()}</TableCell>
                <TableCell align="right">
                  <IconButton
                    onClick={() => {
                      setSelectedChore(chore)
                      setOpenChoreModal(true)
                    }}
                  >
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </>
  )
}

export default GroupChoreList
