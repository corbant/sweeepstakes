import { Paper } from '@mui/material'
import LoginForm from '../components/LoginForm'
import { useUserStore } from '../stores/user'
import { useNavigate } from 'react-router-dom'

type Props = {
  registerMode?: boolean
}

function Login(props: Props) {
  const navigate = useNavigate()

  const onLogin = async (data: { username: string; password: string }) => {
    try {
      await useUserStore.getState().login(data.username, data.password)
    } catch (error) {
      console.error('Login failed:', error)
    }

    navigate('/')
  }

  const onRegister = async (data: {
    username: string
    password: string
    firstName?: string
    lastName?: string
    groupId?: string
  }) => {
    if (!data.firstName || !data.lastName) {
      console.error('First name and last name are required for registration')
      return
    }
    try {
      await useUserStore
        .getState()
        .register(data.username, data.password, data.firstName, data.lastName, data.groupId)
    } catch (error) {
      console.error('Registration failed:', error)
    }
    navigate('/')
  }

  return (
    <Paper elevation={3} style={{ padding: '20px', maxWidth: '400px', margin: '40px auto' }}>
      <LoginForm
        onSubmit={props.registerMode ? onRegister : onLogin}
        registerMode={props.registerMode}
      />
    </Paper>
  )
}

export default Login
