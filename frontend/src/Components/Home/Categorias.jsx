import React, { useState, useEffect } from 'react'
import {
    Grid,
    Typography,
    Card,
    CardContent,
    CardMedia,
    CardActionArea,
    Modal
} from '@mui/material'
import axios from 'axios'
import { urlBase, config } from '../../Utils/constants'
import ProductsPagination from '../Common/ProductsPagination'
import ProductCard from './ProductCard'
import { useProducts } from '../../Context/ProductContext'

const Categorias = () => {
    const [categorias, setCategorias] = useState([])
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('')
    const [products, setProducts] = useState([])
    const [productosFiltrados, setProductosFiltrados] = useState([])
    const { state } = useProducts()

    useEffect(() => {
        setProducts(state.productList);
        axios
            .get(urlBase + 'categorias/')
            .then((res) => {
                setCategorias(res.data)
            })
            .catch(console.log)
    }, [])

    const handleCategoriasClick = (e) => {
        setCategoriaSeleccionada(e.target.innerText)
        setProductosFiltrados(
            products.filter((product) =>
                product.categoria.titulo == categoriaSeleccionada
            )
        )
    }
    return (
        <Grid container paddingY={{ xs: 2, sm: 3, md: 5 }}>
            <Typography
                variant="h4"
                sx={{
                    width: '100%',
                    textAlign: 'center',
                    textTransform: 'uppercase',
                }}
            >
                Categorias
            </Typography>
            <Grid paddingY={5} container spacing={6} paddingX={15}>
                {categorias.map((item) => (
                    <Grid
                        item
                        id={item.id}
                        key={item.id}
                        xs={12}
                        sm={6}
                        md={4}
                        lg={2}
                    >
                        <Card onClick={(e) => {
                            handleCategoriasClick(e)
                        }}>
                            <CardActionArea>
                                <CardContent>
                                    <Typography
                                        gutterBottom
                                        variant="h6"
                                        component="div"
                                    >
                                        {item.titulo}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Grid container
                justifyContent={'space-evenly'} my={4}
            >
                {productosFiltrados.map((item) =>
                    <ProductCard key={item.id} data={item} loading={state.loading} />
                )}
            </Grid>
        </Grid>
    )
}

export default Categorias
