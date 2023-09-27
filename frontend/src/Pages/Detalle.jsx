import {
    Box,
    Rating,
    Button,
    Grid,
    Typography,
    ButtonBase,
} from '@mui/material'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import React from 'react'
import Carousel from '../Components/Product/Carousel'
import { useNavigate, useParams } from 'react-router-dom'

const Detalle = () => {
    const navigate = useNavigate()
    return (
        <Grid
            container
            paddingY={{ xs: 10, sm: 10, md: 14 }}
            paddingX={{ xs: 2, sm: 3, md: 5, lg: 12 }}
        >
            <Grid container>
                <Grid
                    item
                    xs={12}
                    sm={6}
                    md={6}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                    }}
                >
                    <ButtonBase
                        onClick={() => navigate(-1)}
                        sx={{
                            marginBottom: 4,
                        }}
                    >
                        <KeyboardBackspaceIcon />
                    </ButtonBase>
                    <Typography
                        variant="h4"
                        sx={{
                            marginBottom: 4,
                        }}
                    >
                        Guitarra Yamaha APXIII
                    </Typography>
                    <Box
                        container
                        sx={{
                            marginBottom: 2,
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <Typography variant="h4">$ 54,999</Typography>
                        <Rating name="read-only" value={2} readOnly />
                    </Box>
                    <Typography>
                        La serie APX, que siempre ha destacado por su ergonomía
                        particularmente cómoda, se presenta con el modelo 1200II
                        en su máximo esplendor, con maderas nobles sólidas y el
                        revolucionario previo SRT (Studio Response Technology),
                        exclusivo de Yamaha. Además de la rápida respuesta y del
                        ataque característico de la APX, el palorrosa sólido de
                        los costados y del fondo aporta un sustain más rico y un
                        sonido lleno de matices a esta guitarra de gama alta. Se
                        añaden nuevos elementos estéticos como el binding de
                        caoba, clavijeros con palometa de madera, marcadores de
                        madreperla como los de la mítica SG3000 en el diapasón.
                        La APX1200II está disponible en acabados Natural y
                        Translucent Black.
                    </Typography>
                    <Grid container>
                        <Grid item>
                            <Button>Reservar</Button>
                        </Grid>
                        <Grid item>
                            <Button>Agregar al carrito</Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <Carousel />
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Detalle
