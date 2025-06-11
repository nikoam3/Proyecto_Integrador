import React, { useState, useEffect } from 'react'
import { Grid, Autocomplete, TextField, Typography, Box } from '@mui/material'
import axios from 'axios'
import { config, urlBase } from '../../Utils/constants'
import ResultadoBuscador from './ResultadoBuscador'
import { DateRangePicker } from 'react-date-range'
import { useProducts } from '../../Context/ProductContext'

const Buscador = () => {
    const { state } = useProducts()
    const [products, setProducts] = useState([])
    const [nombreProducto, setNombreProducto] = useState("")
    const [stateDates, setStateDates] = useState([{
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    },]);

    useEffect(() => {
        setProducts(state.productList)
    }, [state])
    return (
        <>
            <Typography variant="h4"
                sx={{
                    width: '100%',
                    textAlign: 'center',
                    textTransform: 'uppercase',
                    m: 5
                }}>
                ¡Buscá por productos o por fechas de reservas!
            </Typography>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="flex-start"
            >
                <Grid item xs={3}>
                    <Autocomplete
                        options={products.map((product) => product.nombre)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Buscador"
                                InputProps={{
                                    ...params.InputProps,
                                    type: 'text',
                                }}
                            />
                        )}
                        onInputChange={(event, newValue) => {
                            setNombreProducto(newValue);
                        }}
                    />
                </Grid>
                <Grid>
                    <DateRangePicker
                        staticRanges={[]}
                        inputRanges={[]}
                        onChange={(item) => setStateDates([item.selection])}
                        showSelectionPreview={false}
                        moveRangeOnFirstSelection={false}
                        months={1}
                        ranges={stateDates}
                        direction="vertical"
                        fixedHeight={true}
                    />
                </Grid>
            </Grid>
            {<ResultadoBuscador nombreProducto={nombreProducto}
                stateDates={stateDates}
            />}
        </>
    )
}

export default Buscador
