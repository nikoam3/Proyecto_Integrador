import { SvgIcon } from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard'
import SettingsIcon from '@mui/icons-material/Settings'
import PersonIcon from '@mui/icons-material/Person'
import PeopleIcon from '@mui/icons-material/People'
import InventoryIcon from '@mui/icons-material/Inventory'
import { dashboardRoutes } from '../../Utils/routes'
export const items = [
    /*     {
        title: 'Dashboard',
        path: dashboardRoutes.dashboard,
        icon: (
            <SvgIcon fontSize="small">
                <DashboardIcon />
            </SvgIcon>
        ),
    }, */
    {
        title: 'Productos',
        path: dashboardRoutes.products,
        icon: (
            <SvgIcon fontSize="small">
                <InventoryIcon />
            </SvgIcon>
        ),
    },
    {
        title: 'Usuarios',
        path: dashboardRoutes.users,
        icon: (
            <SvgIcon fontSize="small">
                <PeopleIcon />
            </SvgIcon>
        ),
    },
    /*     {
        title: 'Cuenta',
        path: dashboardRoutes.account,
        icon: (
            <SvgIcon fontSize="small">
                <PersonIcon />
            </SvgIcon>
        ),
    }, */
    {
        title: 'Configuracion',
        path: dashboardRoutes.settings,
        icon: (
            <SvgIcon fontSize="small">
                <SettingsIcon />
            </SvgIcon>
        ),
    },
]
