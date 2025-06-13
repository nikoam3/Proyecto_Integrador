import React, { useState, useEffect } from 'react'
import { Box, Grid, Typography } from '@mui/material'
import ProductCard from './ProductCard'
import axios from 'axios'
import { config, urlBase } from '../../Utils/constants'
import { useProducts } from '../../Context/ProductContext'

const ResultadoBuscador = ({ nombreProducto, stateDates }) => {
    const [loading, setLoading] = useState(true)
    const [product, setProduct] = useState([])
    const [reservas, setReservas] = useState([])
    const [dialogo, setDialogo] = useState(false)
    const { state } = useProducts()

    useEffect(() => {
        setProduct(state.productList.find((product) => product.nombre == nombreProducto))
    }, [nombreProducto])

    useEffect(() => {
        if (product) {
            axios
                .get(urlBase + 'reservas/producto/' + product.id)
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
        }
    }, [product, stateDates])

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
                    {product ?
                        (<ProductCard key={product.id} data={product} loading={state.loading} />)
                        :
                        (<> </>)
                    }
                </Grid>}
        </Box>
    )
}

export default ResultadoBuscador