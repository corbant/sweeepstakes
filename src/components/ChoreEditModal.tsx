import { Autocomplete, Modal, TextField } from '@mui/material'

type Props = {
  choreId: string
}

function ChoreEditModal(props: Props) {
  props
  return (
    <Modal open={true} onClose={() => {}}>
      <div>
        <TextField label="Chore Name" defaultValue="New Chore" fullWidth />
        <Autocomplete
          multiple={true}
          options={['Alice', 'Bob', 'Charlie']}
          renderInput={(params) => <TextField {...params} label="Assign To" />}
        />
      </div>
    </Modal>
  )
}

export default ChoreEditModal
