import {
  AddBox,
  ChevronLeft,
  Dashboard,
  ExpandLess,
  ExpandMore,
  Home,
  Logout,
  Menu as MenuIcon,
} from '@mui/icons-material'
import {
  Avatar,
  Backdrop,
  Box,
  CircularProgress,
  Collapse,
  Divider,
  Drawer as MuiDrawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import { CSSObject, styled, Theme } from '@mui/material/styles'
import { UserPayload } from 'contexts/UserReducer'
import useLocalStorage from 'hooks/useLocalStorage'
import { useRouter } from 'next/router'
import { FC, MouseEvent, ReactNode, useState } from 'react'
import { toast } from 'react-toastify'
import { logout } from 'services/auth'

const drawerWidth = 240

// #region INTERFACES
interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}
interface Props {
  content: ReactNode
}
// #endregion

// #region STYLED
const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
})

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
})

const DrawerHeader = styled('div')(({ theme }) => {
  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  } as any
})

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}))
// #endregion

const MAdminNavbar: FC<Props> = ({ content }) => {
  // #region GENERAL
  const { push, pathname } = useRouter()
  const [, setUser] = useLocalStorage<UserPayload>('user', null) // local storage

  const [openBackdrop, setOpenBackdrop] = useState(false)
  const [openDrawer, setOpenDrawer] = useState(false)
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
  const [openAddCollapse, setOpenAddCollapse] = useState(false)

  const handleDrawerOpen = () => {
    setOpenDrawer(true)
  }
  const handleDrawerClose = () => {
    setOpenDrawer(false)
  }

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }
  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleClickOpenAddCollapse = () => {
    if (!openDrawer) handleDrawerOpen()
    setOpenAddCollapse(!openAddCollapse)
  }

  async function onLogout(): Promise<void> {
    try {
      handleCloseUserMenu()
      setOpenBackdrop(true)

      // call logout API
      await logout()

      // remove user in local storage
      setUser(null)

      // push back to home and toast
      await push('/')
      toast.info('Logout success')
    } catch (err) {
      toast.error(err.message)
      console.error(err)
    }
  }

  const navbarItemList = [
    {
      label: 'Home',
      icon: <Home color="primary" />,
      pathname: '/',
      onClick: () => push('/', '/'),
    },
    {
      label: 'Dashboard',
      icon: <Dashboard color="primary" />,
      pathname: '/admin/dashboard',
      onClick: () => push('/admin/dashboard', '/admin/dashboard'),
    },
    {
      label: 'Add',
      icon: <AddBox color="primary" />,
      pathname: '',
      onClick: handleClickOpenAddCollapse,
    },
  ]

  const navbarItemAddList = [
    {
      label: 'User',
      pathname: '/admin/add/user',
      onClick: () => push('/admin/add/user', '/admin/add/user'),
    },
    {
      label: 'Product',
      pathname: '/admin/add/product',
      onClick: () => push('/admin/add/product', '/admin/add/product'),
    },
    {
      label: 'Coupon',
      pathname: '/admin/add/coupon',
      onClick: () => push('/admin/add/coupon', '/admin/add/coupon'),
    },
  ]

  const settingItemList = [
    {
      label: 'Logout',
      icon: <Logout color="primary" />,
      onClick: onLogout,
    },
  ]
  // #endregion

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" open={openDrawer}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(openDrawer && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            noWrap
            component="div"
            flexGrow={1}
            data-cy="admin-dashboard"
          >
            Admin Dashboard
          </Typography>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Trishop Logo" src="/images/trishop.png" />
              </IconButton>
            </Tooltip>

            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settingItemList.map((item) => (
                <MenuItem key={item.label} onClick={item.onClick}>
                  <ListItemIcon>
                    <Logout fontSize="small" color="primary" />
                  </ListItemIcon>

                  <Typography textAlign="center">{item.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={openDrawer}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeft color="primary" />
          </IconButton>
        </DrawerHeader>

        <Divider />

        <List>
          {navbarItemList.map((item) => (
            <ListItem key={item.label} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: openDrawer ? 'initial' : 'center',
                  px: 2.5,
                }}
                selected={item.pathname === pathname}
                onClick={item.onClick}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: openDrawer ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {item.icon}
                </ListItemIcon>

                <ListItemText
                  primary={item.label}
                  sx={{ opacity: openDrawer ? 1 : 0 }}
                />

                {item.label === 'Add' && openDrawer ? (
                  openAddCollapse ? (
                    <ExpandLess color="primary" />
                  ) : (
                    <ExpandMore color="primary" />
                  )
                ) : null}
              </ListItemButton>
            </ListItem>
          ))}

          <Collapse in={openAddCollapse} timeout="auto" unmountOnExit>
            <List disablePadding>
              {navbarItemAddList.map((item) => (
                <ListItem
                  key={item.label}
                  disablePadding
                  sx={{ display: 'block' }}
                >
                  <ListItemButton
                    sx={{
                      justifyContent: openDrawer ? 'initial' : 'center',
                      px: 2.5,
                      pl: 8.5,
                    }}
                    selected={item.pathname === pathname}
                    onClick={item.onClick}
                  >
                    <ListItemText
                      primary={item.label}
                      sx={{ opacity: openDrawer ? 1 : 0 }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Collapse>
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />

        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={openBackdrop}
        >
          <CircularProgress color="primary" />
        </Backdrop>

        {content}
      </Box>
    </Box>
  )
}

export default MAdminNavbar
