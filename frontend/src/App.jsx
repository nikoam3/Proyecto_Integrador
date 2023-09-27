import { Route, Routes } from 'react-router-dom'
import Layout from './Layout/Layout'
import Home from './Pages/Home'
import Contacto from './Pages/Contacto'
import Detalle from './Pages/Detalle'
import Detalle_params from './Pages/Detalle_params'
import Login from './Pages/Auth/Login'
import Register from './Pages/Auth/Register'
import ListadoFavoritos from './Pages/ListadoFavoritos'
import Historial from './Pages/Historial'

import { publicRoutes, dashboardRoutes } from './Utils/routes'
import Container from '@mui/material/Container'
import AdmLayout from './Layout/AdmLayout'
import ProductAdmin from './Pages/Admin/ProductAdmin'
import UserAdmin from './Pages/Admin/UserAdmin'
import SettingsAdmin from './Pages/Admin/SettingsAdmin'
import DashboardAdmin from './Pages/Admin/DashboardAdmin'
import AccountAdmin from './Pages/Admin/AccountAdmin.jsx'
import UserForm from './Components/Admin/User/UserForm'
import { AdminProvider } from './Context/AdminContext'

function App() {
    return (
        <Container disableGutters maxWidth="100%">
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path={'/'} element={<Home />} />
                    <Route path={publicRoutes.home} element={<Home />} />
                    <Route path={publicRoutes.contact} element={<Contacto />} />
                    <Route path={publicRoutes.detalle} element={<Detalle />} />
                    <Route
                        path={publicRoutes.detalle_params}
                        element={<Detalle_params />}
                    />
                    <Route
                        path={publicRoutes.favoritos}
                        element={<ListadoFavoritos />}
                    />
                    <Route
                        path={publicRoutes.historial}
                        element={<Historial />}
                    />
                </Route>
                <Route path={dashboardRoutes.admin} element={<AdmLayout />}>
                    <Route
                        path={dashboardRoutes.dashboard}
                        element={<DashboardAdmin />}
                    />
                    <Route
                        path={dashboardRoutes.products}
                        element={<ProductAdmin />}
                    />
                    <Route
                        path={dashboardRoutes.users}
                        element={<UserAdmin />}
                    />
                    <Route
                        path={dashboardRoutes.account}
                        element={<AccountAdmin />}
                    />

                    <Route
                        path={dashboardRoutes.settings}
                        element={<SettingsAdmin />}
                    />
                </Route>
                <Route path={publicRoutes.login} element={<Login />} />
                <Route path={publicRoutes.register} element={<Register />} />
            </Routes>
        </Container>
    )
}

export default App
