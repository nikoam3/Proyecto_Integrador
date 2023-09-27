import {
    Grid,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Button,
    Typography,
    Box,
} from '@mui/material'
import React, { useEffect } from 'react'
import { useProducts } from '../../Context/ProductContext'
import { Link } from 'react-router-dom'
import ProductCard from './ProductCard'

const GrillaProductos = () => {
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
    const { state } = useProducts()
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
            <Grid paddingY={10} container spacing={6} paddingX={15}>
                {(shuffle(state.productList).slice(-6)).map((product) => (
                    <ProductCard key={product.id} data={product} />
                ))}
            </Grid>
        </Grid>
    )
}

export default GrillaProductos
