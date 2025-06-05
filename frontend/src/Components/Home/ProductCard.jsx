import {
    Box,
    Grid,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Button,
    Typography,
    Skeleton,
    Chip,
} from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const ProductCard = ({ data, loading, setLoading }) => {
    return (
        <Grid item xs={12} sm={6} md={4} lg={2}>
            <Link to={`/detalle/${data.id}`}>
                <Card
                    sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'visible',
                        justifyContent: 'space-between',
                    }}
                >
                    {loading ? (
                        <Skeleton variant="rectangular" height={'250px'} />
                    ) : (
                        <CardMedia
                            component="img"
                            image={`${data.imagenes}I01.png`}
                            sx={{ height: '250px', objectFit: 'contain' }}
                        />
                    )}
                    <CardContent sx={{ py: 0 }}>
                        <Typography variant="h5" component="h2">
                            {loading ? <Skeleton /> : data.nombre}
                        </Typography>
                        {loading ? (
                            <Skeleton variant="rectangular" />
                        ) : (
                            <Box sx={{ display: 'flex', gap: 1, flexDirection: 'column',  }}>
                                {data.caracteristicas.map((item) => (
                                    <Chip
                                        key={item.id}
                                        label={item.titulo}
                                        size="small"
                                    />
                                ))}
                            </Box>
                        )}

                        <Typography>
                            {loading ? <Skeleton /> : data.descripcion}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        {loading ? (
                            <Skeleton width={'100%'} height={'50px'} />
                        ) : (
                            <Button variant="contained" sx={{ width: '100%' }}>
                                Resevar
                            </Button>
                        )}
                    </CardActions>
                </Card>
            </Link>
        </Grid>
    )
}

export default ProductCard
