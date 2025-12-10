import { Checkbox, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { useState } from 'react'

type Props = {
  items: { text: string; checked: boolean }[]
  onCheck?: (item: { text: string; checked: boolean }) => void
}

function Checklist(props: Props) {
  const [checked, setChecked] = useState([
    ...props.items.map((item, index) => (item.checked ? index : -1)).filter((index) => index !== -1)
  ])

  const handleToggle = (index: number) => () => {
    const currentIndex = checked.indexOf(index)
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(index)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    setChecked(newChecked)
    if (props.onCheck) {
      props.onCheck({ text: props.items[index].text, checked: newChecked.includes(index) })
    }
  }

  if (props.items.length === 0) {
    return <p>No items in checklist.</p>
  }

  return (
    <List>
      {props.items.map((item, index) => (
        <ListItem key={index}>
          <ListItemButton dense onClick={handleToggle(index)}>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={checked.includes(index)}
                tabIndex={-1}
                disableRipple
              />
            </ListItemIcon>
            <ListItemText
              sx={{ textDecoration: checked.includes(index) ? 'line-through' : 'none' }}
              primary={item.text}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  )
}

export default Checklist
