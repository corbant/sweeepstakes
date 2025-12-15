import {
  AppBar,
  Badge,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Popover,
  Typography,
  useMediaQuery,
  type Breakpoint,
  type Theme
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import NotificationsIcon from '@mui/icons-material/Notifications'
import GitHubIcon from '@mui/icons-material/GitHub'
import { useState, type ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import logo from '../assets/logo-color.svg'
import ClearIcon from '@mui/icons-material/Clear'

type Props = {
  theme?: Theme
  menuBreakpoint?: Breakpoint
  navItems?: { label: string; path: string; icon: ReactNode }[]
  notifications: string[]
  deleteNotification: (index: number) => void
}

function BrandedNavbar(props: Props) {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

  return (
    <AppBar position="fixed">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <div
          style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          <img src={logo} alt="Sweeepstakes Logo" style={{ width: 30, marginRight: 10 }} />
          <Typography variant="h6" style={{ display: 'inline', verticalAlign: 'middle' }}>
            Sweeepstakes
          </Typography>
        </div>
        <div>
          <a
            href="https://github.com/corbant/sweeepstakes"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconButton>
              <GitHubIcon />
            </IconButton>
          </a>
          {location.pathname !== '/login' && location.pathname !== '/register' && (
            <IconButton onClick={handleClick}>
              <Badge
                variant={props.notifications.length > 0 ? 'dot' : 'standard'}
                color="secondary"
              >
                <NotificationsIcon />
              </Badge>
            </IconButton>
          )}
          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
          >
            {props.notifications.length > 0 ? (
              <List style={{ width: 300 }}>
                {props.notifications.map((notification, index) => (
                  <ListItem
                    key={index}
                    secondaryAction={
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => props.deleteNotification(index)}
                      >
                        <ClearIcon />
                      </IconButton>
                    }
                  >
                    <ListItemText primary={notification} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography sx={{ padding: 2 }}>No new notifications</Typography>
            )}
          </Popover>
          {useMediaQuery(props.theme?.breakpoints.up(props.menuBreakpoint || 'sm') || '') &&
            location.pathname !== '/login' &&
            location.pathname !== '/register' && (
              <>
                <IconButton onClick={() => setMenuOpen(!menuOpen)}>
                  <MenuIcon />
                </IconButton>
                <Drawer anchor="right" open={menuOpen} onClose={() => setMenuOpen(false)}>
                  <div style={{ width: 250, padding: '20px' }}>
                    <Typography variant="h6" gutterBottom>
                      Menu
                    </Typography>
                  </div>
                  <List>
                    {props.navItems?.map((item) => (
                      <ListItem disablePadding key={item.label}>
                        <ListItemButton
                          selected={location.pathname === item.path}
                          onClick={() => {
                            navigate(item.path)
                            setMenuOpen(false)
                          }}
                        >
                          <ListItemIcon>{item.icon}</ListItemIcon>
                          <ListItemText primary={item.label} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Drawer>
              </>
            )}
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default BrandedNavbar
