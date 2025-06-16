import { Box, Card, Container, Typography, ButtonBase } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { Scrollbar } from '../Components/Common/Scrollbar'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { publicRoutes } from '../Utils/routes'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import axios from 'axios'
import { urlBase } from '../Utils/constants'
import { useAuthContext } from '../hooks/useAuthContext'
import jwt_decode from 'jwt-decode'

const ListadoFavoritos = () => {

    const { user } = useAuthContext()
    const [productos, setProductos] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        axios
            .get(urlBase + 'reservas/usuario/' + jwt_decode(user).id)
            .then((res) => {
                setProductos(res.data)
            })
            .catch(console.log)
    }, [])

    const columns = [
        {
            field: 'nombre',
            headerName: 'Nombre',
            type: 'text',
            flex: 1.5,
            renderCell: (productos) =>
                <p>
                    {productos.row.productos[0].nombre}
                </p>
        },
        {
            field: 'imagenes',
            headerName: 'Imagen',
            renderCell: (productos) =>
                <img width={'50px'} height={'50px'}
                    src={productos.row.productos[0].imagenes + 'I01.png'}
                />,
        },
        {
            field: 'precio',
            headerName: 'Precio',
            type: 'number',
            flex: 1,
            renderCell: (productos) =>
                <p>
                    {productos.row.productos[0].precio}
                </p>
        },
        {
            field: 'categoria',
            headerName: 'Categoría',
            type: 'string',
            flex: 1,
            renderCell: (productos) =>
                <p>
                    {productos.row.productos[0].categoria.titulo}
                </p>
        },
        {
            field: 'fechaReserva',
            headerName: 'Fecha Reserva',
            type: 'Date',
            flex: 1,
            renderCell: (productos) =>
                <p>
                    {new Date(productos.value).toLocaleDateString()}
                </p>
        },
        {
            field: 'fechaEntrega',
            headerName: 'Fecha Entrega',
            type: 'Date',
            flex: 1,
            renderCell: (productos) =>
                <p>
                    {new Date(productos.value).toLocaleDateString()}
                </p>
        },

    ]
    return (
        <Box sx={{
            flexGrow: 1,
            py: 10,
        }}
        >
            <Container maxWidth="xl">
                <Box spacing={3} m={2}>
                    <Typography variant="h4">Historial de tus alquileres</Typography>
                    <ButtonBase
                                onClick={() => navigate(`/${publicRoutes.home}`)}
                                sx={{
                                    marginBottom: 4,
                                }}
                            >
                                <KeyboardBackspaceIcon />
                    </ButtonBase>
                </Box>
                <Card>
                    <Scrollbar
                        sx={{
                            '.simplebar-placeholder': {
                                display: 'none',
                            },
                        }}
                    >
                        <Box sx={{ minWidth: 800 }}>
                            <DataGrid
                                rows={productos}
                                columns={columns}
                                initialState={{
                                    pagination: { paginationModel: { pageSize: 10 } },
                                }}
                                pageSizeOptions={[5, 10, 25]}
                            />
                        </Box>
                    </Scrollbar>
                </Card>
            </Container>
        </Box>
    );
}

export default ListadoFavoritos