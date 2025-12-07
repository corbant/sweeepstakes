import { Paper } from '@mui/material'
import LoginForm from '../components/LoginForm'
import { useUserStore } from '../stores/user'
import { usePageStore, Pages } from '../stores/page'

function Login() {
  const onLogin = (username: string, password: string) => {
    useUserStore.getState().login(username, password)
    usePageStore.getState().navigateTo(Pages.DASHBOARD)
  }

  return (
    <Paper elevation={3} style={{ padding: '20px', maxWidth: '400px', margin: '40px auto' }}>
      <LoginForm onLogin={onLogin} />
    </Paper>
  )
}

export default Login
