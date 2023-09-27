import { Box, Rating, Button, Grid, Typography } from '@mui/material'
import React from 'react'
import Categorias from '../Components/Home/Categorias'
import PrimaryBanner from '../Components/Home/PrimaryBanner'
import AboutUs from '../Components/Home/AboutUs'
import ProductosRecomendados from '../Components/Home/ProductosRecomendados'
import OurProducts from '../Components/Home/OurProducts'
import Buscador from '../Components/Home/Buscador'

const Home = () => {
    return (
        <Grid container>
            <PrimaryBanner />
            <OurProducts />
            <Buscador />
            <AboutUs />
            <ProductosRecomendados />
            <Categorias />
        </Grid>
    )
}

export default Home
