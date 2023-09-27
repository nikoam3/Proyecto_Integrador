import PropTypes from 'prop-types'
import {
    Box,
    Button,
    Divider,
    Drawer,
    Stack,
    SvgIcon,
    Typography,
} from '@mui/material'
import { items } from './items'
import { SideNavItem } from './SideNavItem'
import { Link, useLocation } from 'react-router-dom'
import Logotype from '../Common/Logotype'
import { dashboardRoutes } from '../../Utils/routes'

export const SideNav = (props) => {
    const pathname = useLocation().pathname
    const content = (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
            }}
        >
            <Box sx={{ p: 3 }}>
                {/*                 <Box
                    component={Link}
                    href="/"
                    sx={{
                        display: 'inline-flex',
                        height: 32,
                        width: 32,
                    }}
                >
                    <Logotype />
                    <Typography color="inherit" variant="subtitle1">
                        MR.Instruments
                    </Typography>
                </Box> */}
                <Box
                    component={Link}
                    to={'/home'}
                    sx={{
                        alignItems: 'center',
                        backgroundColor: 'rgba(255, 255, 255, 0.04)',
                        borderRadius: 1,
                        cursor: 'pointer',
                        display: 'flex',
                        gap: '12px',
                        p: '12px',
                    }}
                >
                    <Box sx={{ width: '32px', height: '32px' }}>
                        <Logotype />
                    </Box>
                    <div>
                        <Typography color="white" variant="subtitle1">
                            MR.Instruments
                        </Typography>
                    </div>
                </Box>
            </Box>
            <Divider sx={{ borderColor: 'neutral.700' }} />
            <Box
                component="nav"
                sx={{
                    flexGrow: 1,
                    px: 2,
                    py: 3,
                }}
            >
                <Stack
                    component="ul"
                    spacing={0.5}
                    sx={{
                        listStyle: 'none',
                        p: 0,
                        m: 0,
                    }}
                >
                    {items.map((item) => {
                        const active = item.path
                            ? pathname ===
                              '/' + dashboardRoutes.admin + '/' + item.path
                            : false
                        return (
                            <SideNavItem
                                active={active}
                                disabled={item.disabled}
                                external={item.external}
                                icon={item.icon}
                                key={item.title}
                                path={item.path}
                                title={item.title}
                            />
                        )
                    })}
                </Stack>
            </Box>
            <Divider sx={{ borderColor: 'neutral.700' }} />
            <Box
                sx={{
                    px: 2,
                    py: 3,
                }}
            >
                <Typography color="neutral.100" variant="subtitle2">
                    Digital House TIF
                </Typography>
                <Typography color="neutral.500" variant="body2">
                    Copyright {new Date().getFullYear()}
                </Typography>
            </Box>
        </Box>
    )

    return (
        <Drawer
            anchor="left"
            open
            PaperProps={{
                sx: {
                    backgroundColor: 'neutral.800',
                    color: 'common.white',
                    width: 280,
                },
            }}
            variant="permanent"
        >
            {content}
        </Drawer>
    )
}

SideNav.propTypes = {
    onClose: PropTypes.func,
    open: PropTypes.bool,
}
