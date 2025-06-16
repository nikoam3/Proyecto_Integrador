import { Box, Card, Container, Typography, ButtonBase, } from '@mui/material'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid'
import { Scrollbar } from '../Components/Common/Scrollbar'
import { useNavigate } from 'react-router-dom'
import { publicRoutes } from '../Utils/routes'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { urlBase } from '../Utils/constants'
import { useAuthContext } from '../hooks/useAuthContext'
import DeleteIcon from '@mui/icons-material/Delete';
import jwt_decode from 'jwt-decode'
import { useSnackbar } from '../Context/SnackContext';


const ListadoFavoritos = () => {
    const { user } = useAuthContext()
    const config = {headers: {Authorization :`Bearer ${user}`},}
    let userDecoded = {}
    const { showSnackbar } = useSnackbar()
    const [favoritos, setFavoritos] = useState([])
    const [refreshTable, setRefreshTable] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        revisarFavorito()
    }, [user, refreshTable])

    const revisarFavorito = () => {
        userDecoded = jwt_decode(user)
        axios
            .get(urlBase + 'favoritos/usuario/' + userDecoded.id, config)
            .then((res) => {
                setFavoritos(res.data)
            })
            .catch(console.log)
    }

    const columns = [
        {
            field: 'nombre',
            headerName: 'Nombre',
            flex: 1,
        },
        {
            field: 'imagenes',
            headerName: 'Imagen',
            renderCell: (favoritos) => <img width={'50px'} height={'50px'}
                src={favoritos.row.imagenes + 'I01.png'}
            />,
        },
        {
            field: 'precio',
            headerName: 'Precio',
            type: 'number',
            flex: 1,
        },
        {
            headerName: '',
            headerAlign: 'right',
            align: 'right',
            width: 150,
            cellClassName: 'actions',
            field: 'actions',
            type: 'actions',
            flex: 0.2,
            getActions: ({ row }) => {
                return [
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        color="inherit"
                        onClick={() => handleDelete(row)}
                    />,
                ]
            },
        },
    ]

    const handleDelete = (favorito) => {
        deleteFavorite(favorito)
    }

    const deleteFavorite = (favorito) => {
        axios
            .delete(urlBase + 'favoritos/producto/' + favorito.id, config)
            .then((res) => {
                if (res.status === 200) {
                    showSnackbar(`Producto eliminado de favoritos`, 'success')
                }
                setRefreshTable(!refreshTable)
            })
            .catch(console.log)
    }

    return (
        <Box sx={{
            flexGrow: 1,
            py: 10,
        }}
        >
            <Container maxWidth="xl">
                <Box spacing={3}>
                    <Typography variant="h4">Tus Favoritos</Typography>
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
                                rows={favoritos}
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