import React from 'react'
import { styled } from '@mui/material/styles'
import { SideNav } from '../Components/Admin/SideNav'
import { Outlet } from 'react-router-dom'
import { AdminProvider } from '../Context/AdminContext'

const SIDE_NAV_WIDTH = 280

const LayoutRoot = styled('div')({
    display: 'flex',
    flex: '1 1 auto',
    maxWidth: '100%',
    paddingLeft: SIDE_NAV_WIDTH,
})

const LayoutContainer = styled('div')({
    display: 'flex',
    flex: '1 1 auto',
    flexDirection: 'column',
    width: '100%',
})

export const AdmLayout = () => {
    return (
        <AdminProvider>
            <SideNav />
            <LayoutRoot>
                <LayoutContainer>
                    <Outlet />
                </LayoutContainer>
            </LayoutRoot>
        </AdminProvider>
    )
}

export default AdmLayout
