import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Chores from './pages/Chores'
import Group from './pages/Group'
import Profile from './pages/Profile'
import BrandedNavbar from './components/BrandedNavbar'
import DashboardIcon from '@mui/icons-material/Dashboard'
import ListAltIcon from '@mui/icons-material/ListAlt'
import GroupsIcon from '@mui/icons-material/Groups'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  ThemeProvider,
  createTheme,
  useMediaQuery
} from '@mui/material'

import './App.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import ProtectedRoute from './components/ProtectedRoute'
import { useEffect } from 'react'
import { useUserStore } from './stores/user'
import { useGroupStore } from './stores/group'

const theme = createTheme({
  colorSchemes: {
    dark: true,
    light: true
  }
})

function AppContent() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, notifications, addNotification, deleteNotification } = useUserStore(
    (state) => state
  )
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register'

  useEffect(() => {
    if (user) {
      useGroupStore.getState().getGroupInfo()
      const socket = new WebSocket('ws://localhost:4000/ws')
      socket.onopen = () => {
        socket.send(JSON.stringify({ type: 'subscribe', groupId: user.group, userId: user.id }))
      }
      socket.onmessage = (event) => {
        const data = JSON.parse(event.data)
        if (data.type === 'notification') {
          addNotification(data.message)
        }
      }
    } else {
      useGroupStore.getState().clearGroupInfo()
    }
  }, [user])

  const getPageTitle = (pathname: string) => {
    switch (pathname) {
      case '/login':
        return 'Login'
      case '/register':
        return 'Register'
      case '/chores':
        return 'Chores'
      case '/group':
        return 'Group'
      case '/profile':
        return 'Profile'
      default:
        return 'Dashboard'
    }
  }

  return (
    <>
      <title>{`Sweeepstakes - ${getPageTitle(location.pathname)}`}</title>
      <header>
        <BrandedNavbar
          theme={theme}
          menuBreakpoint="sm"
          navItems={[
            { label: 'Dashboard', path: '/', icon: <DashboardIcon /> },
            { label: 'Chores', path: '/chores', icon: <ListAltIcon /> },
            { label: 'Group', path: '/group', icon: <GroupsIcon /> },
            { label: 'Profile', path: '/profile', icon: <AccountCircleIcon /> }
          ]}
          notifications={notifications}
          deleteNotification={deleteNotification}
        />
      </header>
      <main
        style={{
          paddingBottom: isSmallScreen && !isAuthPage ? '56px' : 0,
          paddingTop: '64px',
          margin: '0 20px'
        }}
      >
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Login registerMode={true} />} />
          <Route
            path="/chores"
            element={
              <ProtectedRoute>
                <Chores />
              </ProtectedRoute>
            }
          />
          <Route
            path="/group"
            element={
              <ProtectedRoute>
                <Group />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </main>
      <footer>
        {isSmallScreen && !isAuthPage && (
          <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
            <BottomNavigation
              value={location.pathname}
              onChange={(_, newValue) => {
                navigate(newValue)
              }}
            >
              <BottomNavigationAction value="/" label="Dashboard" icon={<DashboardIcon />} />
              <BottomNavigationAction value="/chores" label="Chores" icon={<ListAltIcon />} />
              <BottomNavigationAction value="/group" label="Group" icon={<GroupsIcon />} />
              <BottomNavigationAction
                value="/profile"
                label="Profile"
                icon={<AccountCircleIcon />}
              />
            </BottomNavigation>
          </Paper>
        )}
      </footer>
    </>
  )
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  )
}

export default App
