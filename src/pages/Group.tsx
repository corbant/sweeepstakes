import { Paper, TableContainer, IconButton, Modal, Stack, Box, TextField } from '@mui/material'
import GroupChoreList from '../components/GroupChoreList'
import Leaderboard from '../components/Leaderboard'
import Statistic from '../components/Statistic'
import { useGroupStore } from '../stores/group'
import { useEffect, useState } from 'react'
import type { LeaderboardEntry } from '../types'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import EditIcon from '@mui/icons-material/Edit'
import CheckIcon from '@mui/icons-material/Check'

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
}

function Group() {
  const groupName = useGroupStore((state) => state.name)
  const chores = useGroupStore((state) => state.chores)
  const groupId = useGroupStore((state) => state.id)
  const completedChores = useGroupStore((state) => state.completedChores)

  const [leaderboardEntries, setLeaderboardEntries] = useState<LeaderboardEntry[]>([])
  const [inviteModalOpen, setInviteModalOpen] = useState(false)
  const [isEditingName, setIsEditingName] = useState(false)
  const [newGroupName, setNewGroupName] = useState(groupName)

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await fetch('/api/group/leaderboard')
        if (!res.ok) throw new Error('Failed to fetch leaderboard')
        const data = await res.json()
        setLeaderboardEntries(data)
      } catch (error) {
        console.error('Error fetching leaderboard:', error)
        setLeaderboardEntries([])
      }
    }

    fetchLeaderboard()
  }, [])

  return (
    <>
      <Stack direction="row" spacing={2} style={{ marginTop: '10px', marginBottom: '10px' }}>
        {isEditingName ? (
          <TextField value={newGroupName} onChange={(e) => setNewGroupName(e.target.value)} />
        ) : (
          <h1>{groupName}</h1>
        )}
        {!isEditingName ? (
          <IconButton onClick={() => setIsEditingName(true)}>
            <EditIcon />
          </IconButton>
        ) : (
          <IconButton
            onClick={() => {
              setIsEditingName(false)
              if (newGroupName !== groupName) useGroupStore.getState().changeGroupName(newGroupName)
            }}
          >
            <CheckIcon />
          </IconButton>
        )}
        <IconButton onClick={() => setInviteModalOpen(true)}>
          <PersonAddIcon />
        </IconButton>
        <Modal
          open={inviteModalOpen}
          onClose={() => setInviteModalOpen(false)}
          style={{ position: 'absolute' }}
        >
          <Box sx={modalStyle}>
            <h2>Invite Member</h2>
            <p>
              {'Invite link: '}
              <a
                href={`${window.location.origin}/register?groupId=${groupId}`}
                target="_blank"
              >{`${window.location.origin}/register?groupId=${groupId}`}</a>
            </p>
          </Box>
        </Modal>
      </Stack>

      <div>
        <h2>Weekly Leaderboard</h2>
        <Paper>
          <Leaderboard entries={leaderboardEntries} />
        </Paper>
      </div>
      <div>
        <h2>Chores Completed</h2>
        <Statistic value={completedChores} />
      </div>
      <div>
        <h2>All Chores</h2>
        <TableContainer component={Paper}>
          <GroupChoreList chores={chores} />
        </TableContainer>
      </div>
    </>
  )
}

export default Group
