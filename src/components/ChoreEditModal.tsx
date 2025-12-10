import { useState, useEffect } from 'react'
import { Autocomplete, Box, Button, Modal, TextField, Typography } from '@mui/material'
import type { Chore, User } from '../types'
import { useGroupStore } from '../stores/group'
import dayjs from 'dayjs'

type Props = {
  chore?: Chore | null
  open: boolean
  onClose: () => void
  onSave: (chore: Omit<Chore, 'id' | 'completed'>) => void
}

function ChoreEditModal(props: Props) {
  const members = useGroupStore((state) => state.members)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [assignedTo, setAssignedTo] = useState<User[]>([])
  const [dueDate, setDueDate] = useState('')

  useEffect(() => {
    if (props.chore) {
      setTitle(props.chore.title)
      setDescription(props.chore.description)
      setDueDate(dayjs(props.chore.dueDate).format('YYYY-MM-DD'))
      const assigned = props.chore.assignedTo
        .map((userId) => members.find((m) => m.id === userId))
        .filter((m): m is User => m !== undefined)
      setAssignedTo(assigned)
    } else {
      setTitle('')
      setDescription('')
      setAssignedTo([])
      setDueDate('')
    }
  }, [props.chore, members])

  const handleSave = () => {
    props.onSave({
      title,
      description,
      assignedTo: assignedTo.map((u) => u.id),
      dueDate: new Date(dueDate)
    })
  }

  return (
    <Modal open={props.open} onClose={props.onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 500,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2
        }}
      >
        <Typography variant="h6" component="h2" sx={{ mb: 3 }}>
          {props.chore ? 'Edit Chore' : 'Create New Chore'}
        </Typography>

        <TextField
          label="Chore Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
          required
        />

        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          multiline
          rows={3}
          sx={{ mb: 2 }}
        />

        <Autocomplete
          multiple
          options={members}
          getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
          value={assignedTo}
          onChange={(_, newValue) => setAssignedTo(newValue)}
          renderInput={(params) => (
            <TextField {...params} label="Assign To" placeholder="Select members" />
          )}
          sx={{ mb: 2 }}
        />

        <TextField
          label="Due Date"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          slotProps={{
            inputLabel: {
              shrink: true
            }
          }}
          fullWidth
          sx={{ mb: 3 }}
          required
        />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button color="error" onClick={props.onClose} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleSave} variant="contained" disabled={!title || !dueDate}>
            {props.chore ? 'Save Changes' : 'Create Chore'}
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default ChoreEditModal
