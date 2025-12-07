import { Button, TextField } from '@mui/material'

type Props = {
  onLogin: (username: string, password: string) => void
}

function LoginForm(props: Props) {
  return (
    <form
      action={(formData) =>
        props.onLogin(formData.get('username') as string, formData.get('password') as string)
      }
    >
      <TextField name="username" label="Username" variant="outlined" fullWidth margin="normal" />
      <TextField
        name="password"
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Login
      </Button>
    </form>
  )
}

export default LoginForm
