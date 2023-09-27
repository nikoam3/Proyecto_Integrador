import { Box, Grid, Typography } from '@mui/material'
import React from 'react'

const AboutUs = () => {
    return (
        <Grid
            container
            paddingTop={10}
            paddingX={{ xs: 2, sm: 3, md: 5, lg: 12 }}
            direction="row"
            justifyContent="center"
            alignItems="center"
        >
            <Grid item xs={12} sm={6}>
                <Box
                    sx={{
                        height: '500px',
                        maxWidth: '500px',
                        backgroundImage:
                            'url(https://images.pexels.com/photos/3364190/pexels-photo-3364190.jpeg)',
                        backgroundSize: 'cover',
                        backgroundPosition: '45% 50%',
                        marginLeft: 'auto',
                        marginRight: '50px',
                    }}
                />
            </Grid>

            <Grid item xs={12} sm={6} pl={5}>
                <Typography
                    maxWidth={400}
                    variant="h3"
                    textTransform={'uppercase'}
                    fontWeight={600}
                    marginBottom={2}
                >
                    Sintoniza tu pasión
                </Typography>
                <Typography variant="body1" maxWidth={500}>
                    Ya sea que estés buscando probar un nuevo instrumento o
                    necesites un compañero confiable para tu próxima actuación,
                    nuestro servicio de alquiler flexible permite que tu viaje
                    musical este listo para comenzar.
                </Typography>
            </Grid>
        </Grid>
    )
}

export default AboutUs
