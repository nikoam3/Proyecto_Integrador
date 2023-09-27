import { Grid, Typography } from '@mui/material'
import React from 'react'

const PrimaryBanner = () => {
    return (
        <Grid
            container
            paddingTop={10}
            paddingX={{ xs: 2, sm: 3, md: 5, lg: 12 }}
            sx={{
                height: '100vh',
                backgroundImage:
                    'url(https://images.pexels.com/photos/7120380/pexels-photo-7120380.jpeg)',
                backgroundSize: 'cover',
                backgroundPosition: '45% 50%',
                display: 'flex',
            }}
            width={'100%'}
        >
            <Grid
                item
                lg={6}
                md={12}
                sx={{
                    paddingTop: { xs: 8, lg: 12 },
                    fontWeight: 800,
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Typography
                    variant="h1"
                    sx={{
                        fontWeight: 'inherit',
                        marginBottom: 1,
                    }}
                >
                    APRENDE
                </Typography>
                <Typography
                    variant="h1"
                    sx={{
                        width: 'auto',
                        fontWeight: 'inherit',
                        marginBottom: 1,
                        background: 'linear-gradient(90deg, #F85532,#D22F94)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}
                >
                    ALQUILA
                </Typography>
                <Typography
                    variant="h1"
                    sx={{ fontWeight: 'inherit', marginBottom: 1 }}
                >
                    CREA
                </Typography>
            </Grid>
        </Grid>
    )
}

export default PrimaryBanner
