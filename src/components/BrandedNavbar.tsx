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
  Typography,
  useMediaQuery,
  type Breakpoint,
  type Theme
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import NotificationsIcon from '@mui/icons-material/Notifications'
import { useState, type ReactNode } from 'react'
import { Pages, usePageStore, type Page } from '../stores/page'
import logo from '../assets/logo-color.svg'

type Props = {
  theme?: Theme
  menuBreakpoint?: Breakpoint
  navItems?: { label: string; page: Page; icon: ReactNode }[]
}

function BrandedNavbar(props: Props) {
  const [menuOpen, setMenuOpen] = useState(false)
  const page = usePageStore((state) => state.page)
  const navigateTo = usePageStore((state) => state.navigateTo)

  return (
    <AppBar position="fixed">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <div
          style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
          onClick={() => navigateTo('')}
        >
          <img src={logo} alt="Sweeepstakes Logo" style={{ width: 30, marginRight: 10 }} />
          <Typography variant="h6" style={{ display: 'inline', verticalAlign: 'middle' }}>
            Sweeepstakes
          </Typography>
        </div>
        <div>
          <IconButton>
            <Badge variant="dot" color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          {useMediaQuery(props.theme?.breakpoints.up(props.menuBreakpoint || 'sm') || '') && page !== Pages.LOGIN && (
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
                        selected={page === item.page}
                        onClick={() => {
                          navigateTo(item.page)
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
