import React, { useState, useEffect } from 'react'
import { Box, Grid, Typography } from '@mui/material'
import ProductCard from './ProductCard'
import axios from 'axios'
import { config, urlBase } from '../../Utils/constants'
import { useProducts } from '../../Context/ProductContext'

const ResultadoBuscador = ({ nombreProducto, stateDates }) => {

    const [products, setProducts] = useState([])
    const [reservas, setReservas] = useState([])
    const [dialogo, setDialogo] = useState(false)
    const { state } = useProducts()

    useEffect(() => {
        setProducts(state.productList.filter((product) => product.nombre == nombreProducto))
    }, [nombreProducto])

    useEffect(() => {
        axios
            .get(urlBase + 'reservas/producto/' + products[0]?.id, config)
            .then((res) => {
                setReservas(res.data)
            })
            .catch(console.log)

        reservas?.map((reserva) => {

            if ((stateDates[0]?.startDate <= (new Date(reserva?.fechaReserva)) &&
                    stateDates[0]?.endDate <= (new Date(reserva?.fechaReserva)))
                ||
                (stateDates[0]?.startDate >= (new Date(reserva?.fechaEntrega)) &&
                    stateDates[0]?.endDate >= (new Date(reserva?.fechaEntrega)))
            ) {
                setDialogo(false)
            } else {
                setDialogo(true)
            }
        })
    }, [products, stateDates])

    return (

        <Box width={'100%'}>
            {dialogo ?
                <Typography variant="h6"
                    sx={{
                        width: '100%',
                        textAlign: 'center',
                        textTransform: 'uppercase',
                        m: 2
                    }}>
                    Producto alquilado en las fechas seleccionadas
                </Typography>
                :
                <Grid container justifyContent={'space-evenly'} my={4}>
                    {products?.map((item) => (
                        <ProductCard key={item.id} data={item} />
                    ))}
                </Grid>}
        </Box>
    )
}

export default ResultadoBuscador