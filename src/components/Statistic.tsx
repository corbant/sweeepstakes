import { Box, Typography } from '@mui/material'

type Props = {
  value: string
}

function Statistic(props: Props) {
  return (
    <Box
      sx={{
        border: '1px solid gray',
        borderRadius: 2,
        padding: 2,
        minWidth: 150,
        textAlign: 'center'
      }}
    >
      <Typography variant="h4">{props.value}</Typography>
    </Box>
  )
}

export default Statistic
