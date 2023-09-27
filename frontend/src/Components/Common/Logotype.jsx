import styled from '@emotion/styled'
import { Icon, IconButton } from '@mui/material'
import React from 'react'

const Logo = styled('img')({
    height: '100%',
})

const Logotype = () => {
    return (
        <Icon sx={{ height: '100%', width: '100%' }}>
            <Logo src={'../images/logotipo.svg'} />
        </Icon>
    )
}

export default Logotype
