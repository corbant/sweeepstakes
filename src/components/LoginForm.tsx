import { Button, TextField } from '@mui/material'
import { useUserStore } from '../stores/user'
import { usePageStore, Pages } from '../stores/page'

function LoginForm() {
  const userStore = useUserStore()
  const navigateTo = usePageStore((state) => state.navigateTo)

  function login() {
    userStore.login('test@example.com', 'password')
    navigateTo(Pages.DASHBOARD)
  }

  return (
    <form action={login}>
      <TextField label="Email" variant="outlined" fullWidth margin="normal" />
      <TextField label="Password" type="password" variant="outlined" fullWidth margin="normal" />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Login
      </Button>
    </form>
  )
}

export default LoginForm
