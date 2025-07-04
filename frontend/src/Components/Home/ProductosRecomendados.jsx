import {
    Grid,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Button,
    Typography,
    Box,
    Skeleton
} from '@mui/material'
import { useProducts } from '../../Context/ProductContext'
import ProductCard from './ProductCard'

const GrillaProductos = () => {
    const { state } = useProducts()

    function shuffle(lista) {
        let currentIndex = lista.length,
            randomIndex

        // While there remain elements to shuffle.
        while (currentIndex != 0) {
            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex)
            currentIndex--

                // And swap it with the current element.
                ;[lista[currentIndex], lista[randomIndex]] = [
                    lista[randomIndex],
                    lista[currentIndex],
                ]
        }

        return lista
    }

    return (
        <Grid container paddingY={{ xs: 2, sm: 3, md: 5 }}>
            <Typography
                variant="h3"
                sx={{
                    width: '100%',
                    textAlign: 'center',
                    textTransform: 'uppercase',
                }}
            >
                Productos recomendados
            </Typography>
            <Grid container sx={{
                justifyContent: "center",
            }} spacing={2}>
                {(shuffle(state.productList).slice(-5)).map((product) => (
                    <ProductCard key={product.id} data={product} loading={state.loading} />
                ))}
            </Grid>
        </Grid>
    )
}

export default GrillaProductos
