import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
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
import RouteUpdater from './components/RouteUpdater'
import { getPageName, Pages, usePageStore } from './stores/page'
import { useEffect } from 'react'
import { useUserStore } from './stores/user'
import { useGroupStore } from './stores/group'

const theme = createTheme({
  colorSchemes: {
    dark: true,
    light: true
  }
})

function App() {
  const page = usePageStore((state) => state.page)
  const navigateTo = usePageStore((state) => state.navigateTo)
  const user = useUserStore((state) => state.user)

  useEffect(() => {
    if (user) {
      useGroupStore.getState().getGroupInfo()
    } else {
      useGroupStore.getState().clearGroupInfo()
    }
  }, [user])

  return (
    <ThemeProvider theme={theme}>
      <title>{`Sweeepstakes - ${getPageName(page)}`}</title>
      <header>
        <BrandedNavbar
          theme={theme}
          menuBreakpoint="sm"
          navItems={[
            { label: 'Dashboard', page: Pages.DASHBOARD, icon: <DashboardIcon /> },
            { label: 'Chores', page: Pages.CHORES, icon: <ListAltIcon /> },
            { label: 'Group', page: Pages.GROUP, icon: <GroupsIcon /> },
            { label: 'Profile', page: Pages.PROFILE, icon: <AccountCircleIcon /> }
          ]}
        />
      </header>
      <main
        style={{
          paddingBottom:
            useMediaQuery(theme.breakpoints.down('sm')) && page !== Pages.LOGIN ? '56px' : 0,
          paddingTop: '64px',
          margin: '0 20px'
        }}
      >
        <Router>
          <RouteUpdater />
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
        </Router>
      </main>
      <footer>
        {useMediaQuery(theme.breakpoints.down('sm')) && page !== Pages.LOGIN && (
          <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
            <BottomNavigation
              value={page}
              onChange={(_, newValue) => {
                navigateTo(newValue)
              }}
            >
              <BottomNavigationAction value="" label="Dashboard" icon={<DashboardIcon />} />
              <BottomNavigationAction value="chores" label="Chores" icon={<ListAltIcon />} />
              <BottomNavigationAction value="group" label="Group" icon={<GroupsIcon />} />
              <BottomNavigationAction
                value="profile"
                label="Profile"
                icon={<AccountCircleIcon />}
              />
            </BottomNavigation>
          </Paper>
        )}
      </footer>
    </ThemeProvider>
  )
}

export default App
