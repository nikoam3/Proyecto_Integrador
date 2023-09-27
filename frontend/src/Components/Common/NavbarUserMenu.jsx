import * as React from 'react'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import PersonAdd from '@mui/icons-material/PersonAdd'
import Settings from '@mui/icons-material/Settings'
import Logout from '@mui/icons-material/Logout'
import { useLogout } from '../../hooks/useLogout'
import Person from '@mui/icons-material/Person'
import Favorite from '@mui/icons-material/Favorite'
import HistoryIcon from '@mui/icons-material/History';
import AdminPanelSettings from '@mui/icons-material/AdminPanelSettings'
import { NavLink } from 'react-router-dom'
import { publicRoutes } from '../../Utils/routes'

function stringAvatar(name) {
    return {
        children: `${name.split(' ')[0][0]}${
            name.split(' ')[1][0]
        }`.toUpperCase(),
    }
}

export default function NavbarUserMenu({ userDecoded }) {
    const { logout } = useLogout()
    const [anchorEl, setAnchorEl] = React.useState(null)
    const open = Boolean(anchorEl)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }
    return (
        <React.Fragment>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    textAlign: 'center',
                }}
            >
                <Tooltip title="Cuenta">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar
                            sx={{ width: 32, height: 32 }}
                            {...stringAvatar(userDecoded.fullname)}
                        />
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                sx={{
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={handleClose}>
                    <NavLink
                        to={publicRoutes.favoritos}
                        style={{ color: 'inherit', display: 'flex' }}
                    >
                        <ListItemIcon>
                            <Favorite fontSize="small" />
                        </ListItemIcon>
                        Favoritos
                    </NavLink>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <NavLink
                        to={publicRoutes.historial}
                        style={{ color: 'inherit', display: 'flex' }}
                    >
                        <ListItemIcon>
                            <HistoryIcon fontSize="small" />
                        </ListItemIcon>
                        Historial Alquileres
                    </NavLink>
                </MenuItem>
                {userDecoded.user_role === 'ROLE_ADMIN' ? (
                    <MenuItem onClick={handleClose}>
                        <NavLink
                            to={publicRoutes.admin}
                            style={{ color: 'inherit', display: 'flex' }}
                        >
                            <ListItemIcon>
                                <AdminPanelSettings fontSize="small" />
                            </ListItemIcon>
                            Admin Panel
                        </NavLink>
                    </MenuItem>
                ) : null}
                <MenuItem onClick={() => logout()}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Cerrar sesión
                </MenuItem>
            </Menu>
        </React.Fragment>
    )
}
