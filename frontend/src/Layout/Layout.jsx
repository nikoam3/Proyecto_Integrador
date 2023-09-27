import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Components/Common/Navbar'
import Footer from '../Components/Common/Footer'
import { Box } from '@mui/system'
import ScrollToColor from '../Components/Common/ScrollHandler'

const Layout = () => {
    return (
        <Box sx={{ position: 'relative', minHeight: '100vh' }}>
            <Navbar threshold={600} />
            <Outlet />
            <Footer />
        </Box>
    )
}

export default Layout
