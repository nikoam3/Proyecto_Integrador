import React from 'react'
import { Box, Typography } from '@mui/material'
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded'
import InstagramIcon from '@mui/icons-material/Instagram'
import TwitterIcon from '@mui/icons-material/Twitter'

const Footer = () => {
    return (
        <Box
            sx={{
                position: 'absolute',
                bottom: 0,
                display: 'flex',
                height: '50px',
                width: '100%',
                backgroundColor: 'primary.main',
                padding: 2,
            }}
        >
            <Box flexGrow={1}>
                <Typography>{`${new Date().getFullYear()} | Mr. Instruments`}</Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
                <FacebookRoundedIcon />
                <InstagramIcon />
                <TwitterIcon />
            </Box>
        </Box>
    )
}

export default Footer
