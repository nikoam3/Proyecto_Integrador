import React, { useEffect, useState } from 'react'
import ProductsPagination from '../Common/ProductsPagination'
import { Box, Grid, Typography, Skeleton } from '@mui/material'
import ProductCard from './ProductCard'

const OurProducts = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    return (
        <Box width={'100%'}>
            <Grid container justifyContent={'space-evenly'} my={4}>
                {products.map((item) => (
                    <ProductCard key={item.id} data={item} loading={loading} />
                ))}
            </Grid>
            <ProductsPagination
                setProducts={(p) => setProducts(p)}
                setLoading={setLoading}
                loading={loading}
            />
        </Box>
    )
}

export default OurProducts
