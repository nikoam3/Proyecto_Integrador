import { useState } from 'react'
import ProductsPagination from '../Common/ProductsPagination'
import { Box, Grid } from '@mui/material'
import ProductCard from './ProductCard'
import { useProducts } from '../../Context/ProductContext'

const OurProducts = () => {
    const [products, setProducts] = useState([])
    const { state } = useProducts()
    return (
        <Box width={'100%'}>
            <Grid container justifyContent={'space-evenly'} my={4}>
                {products.map((item) => (
                    <ProductCard key={item.id} data={item} loading={state.loading} />
                ))}
            </Grid>
            <ProductsPagination
                setProducts={(p) => setProducts(p)}
                loading={state.loading}
            />
        </Box>
    )
}

export default OurProducts
