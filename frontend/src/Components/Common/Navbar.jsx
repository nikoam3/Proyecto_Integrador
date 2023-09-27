import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { publicRoutes } from '../../Utils/routes'
import {
    AppBar,
    Box,
    Button,
    IconButton,
    Toolbar,
    Typography,
    styled,
    useScrollTrigger,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import Logotype from './Logotype'
import jwt_decode from 'jwt-decode'
import { useAuthContext } from '../../hooks/useAuthContext'
import NavbarUserMenu from './NavbarUserMenu'

const Navbar = (props) => {
    const { user } = useAuthContext()
    let userDecoded = {}

    if (user) {
        userDecoded = jwt_decode(user)
    }

    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: props.threshold,
        target: props.window ? window() : undefined,
    })

    return (
        <AppBar
            sx={{
                height: '80px',
                transition: 'background-color 0.5s ease-out',
                '&.active': {
                    backgroundColor: 'white',
                },
                '&.inactive': {
                    backgroundColor: 'transparent',
                },
            }}
            className={trigger == true ? 'active' : 'inactive'}
        >
            <Toolbar sx={{ height: '100%' }}>
                <NavLink
                    to={publicRoutes.home}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        flexGrow: 1,
                    }}
                >
                    <Box sx={{ width: '48px', height: '48px' }}>
                        <Logotype />
                    </Box>
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: 'bold',
                            flexGrow: 1,
                            color: 'black',
                            paddingLeft: 1,
                        }}
                    >
                        MR. Instruments
                    </Typography>
                </NavLink>
                <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                    <IconButton disableRipple>
                        <MenuIcon />
                    </IconButton>
                </Box>
                <Box sx={{ display: { xs: 'none', sm: 'flex', gap: 12 } }}>
                    {user && <NavbarUserMenu userDecoded={userDecoded} />}
                    {!user && (
                        <>
                            <NavLink to={publicRoutes.register}>
                                <Button
                                    variant={
                                        trigger == true
                                            ? 'outlined'
                                            : 'contained'
                                    }
                                >
                                    Crear Cuenta
                                </Button>
                            </NavLink>
                            <NavLink to={publicRoutes.login}>
                                <Button
                                    variant={
                                        trigger == true
                                            ? 'outlined'
                                            : 'contained'
                                    }
                                >
                                    Iniciar Sesión
                                </Button>
                            </NavLink>
                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar
