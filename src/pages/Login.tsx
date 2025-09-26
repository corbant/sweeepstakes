import { Paper } from '@mui/material'
import LoginForm from '../components/LoginForm'

function Login() {
  return (
    <Paper elevation={3} style={{ padding: '20px', maxWidth: '400px', margin: '40px auto' }}>
      <LoginForm />
    </Paper>
  )
}

export default Login
