import {
    Box,
    Rating,
    Button,
    Grid,
    Typography,
    ButtonBase,
} from '@mui/material'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import React, { useEffect, useState } from 'react'
import Carousel from '../Components/Product/Carousel'
import { useNavigate, useParams } from 'react-router-dom'
import { useProducts } from '../Context/ProductContext'
import axios from 'axios'
import { urlBase, config } from '../Utils/constants'
import Resenia from '../Components/Common/Resenia'
import jwt_decode from 'jwt-decode'
import { useAuthContext } from '../hooks/useAuthContext'
import Favorito from '../Components/Common/Favorito'
import CalendarPicker from '../Components/Admin/Product/CalendarPicker'
import format from 'date-fns/format'
import { publicRoutes } from '../Utils/routes'
import { useSnackbar } from '../Context/SnackContext'
import FormReservar from '../Components/Common/FormReservar'
import Compartir from '../Components/Common/Compartir'
import { parseJSON } from 'date-fns'

const Detalle = () => {
    const { showSnackbar } = useSnackbar()
    const params = useParams()
    const navigate = useNavigate()
    const { state, dispatch } = useProducts()
    const [stateDates, setStateDates] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
        },
    ])
    const [productoImagenes, setProductoImagenes] = useState('')
    const [usuarioLog, setUsuarioLog] = useState(null)
    const [openForm, setOpenForm] = useState(false)
    const [fechasReservado, setFechasReservado] = useState('')
    const { user } = useAuthContext()

    const formData = {
        /*fechaReserva: format(stateDates[0].startDate, 'dd-MM-yyyy'),
        fechaEntrega: format(stateDates[0].endDate, 'dd-MM-yyyy'),*/
        fechaReserva: stateDates[0].startDate.toISOString().replace('T', '@').slice(0, 19),
        fechaEntrega: stateDates[0].endDate.toISOString().replace('T', '@').slice(0, 19),
        productos: [
            {
                id: state.product?.id,
                descripcion: state.product?.descripcion,
                imagenes: state.product?.imagenes,
                nombre: state.product?.nombre,
                precio: state.product?.precio,
                categoria: state.product?.categoria,
                caracteristicas: state.product?.caracteristicas
            },
        ],
        reservaActiva: true,
        seguro: state.product?.precio,
        usuario: {
            id: parseInt(usuarioLog?.id),
            email: usuarioLog?.sub,
            fullname: usuarioLog?.fullname,
            userRol: usuarioLog?.user_role
        },
    }

    useEffect(() => {
        if (user) {
            const userDetails = jwt_decode(user)
            setUsuarioLog(userDetails)
        }
        axios
            .get(urlBase + 'productos/' + params?.id)
            .then((res) => {
                dispatch({ type: 'GET_UNIQUE', payload: res.data })
                setProductoImagenes(res.data.imagenes)
            })
        axios
            .get(urlBase + 'reservas/producto/' + params?.id)
            .then((res) => {
                setFechasReservado(res.data[0])
            })
    }, [])

    const handleOpenForm = () => {
        if (user) {
            if (fechasReservado?.fechaReserva == formData.fechaReserva ||
                fechasReservado?.fechaEntrega == formData.fechaEntrega) {
                showSnackbar('Las fechas seleccionadas son incorrectas, por favor vuelva a seleccionar', 'error')
            } else {
                setOpenForm(true)
            }
        } else {
            showSnackbar('Necesitas estar logeado para reservar, te vamos a redirigir hacía allí', 'warning')
            setTimeout(() => {
                navigate(`/${publicRoutes.login}`)
            }, '3000')

        }
    }
    const handleCloseForm = () => {
        setOpenForm(false)
    }
    return (
        <Grid
            container
            paddingY={{ xs: 12, md: 10 }}
            paddingX={{ xs: 2, sm: 3, md: 5, lg: 12 }}
        >
            <Grid container>
                <Grid
                    item
                    xs={12}
                    sm={6}
                    md={6}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                    }}
                >
                    <Box
                        display={'flex'}
                        width={'100%'}
                        alignItems={'flex-start'}
                        justifyContent={'space-between'}
                    >
                        <ButtonBase
                            onClick={() => navigate(-1)}
                            sx={{
                                marginBottom: 4,
                            }}
                        >
                            <KeyboardBackspaceIcon />
                        </ButtonBase>
                        <Box display={'flex'} flexDirection={'row'} gap={1} justifyContent={'center'}>
                            <Favorito style={{ 'cursor': 'pointer' }}
                                idProducto={params.id}
                                usuarioLog={usuarioLog}
                            />
                            <Compartir style={{ 'cursor': 'pointer' }}
                                descripcion={state.product?.descripcion}
                                productoImagenes={productoImagenes}
                            />
                        </Box>
                    </Box>
                    <Typography
                        variant="h4"
                        sx={{
                            marginBottom: 4,
                        }}
                    >
                        {state.product?.nombre}
                    </Typography>
                    <Box
                        container
                        sx={{
                            marginBottom: 2,
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <Typography variant="h4">
                            $ {state.product?.precio}
                        </Typography>
                        <Resenia
                            idProducto={params.id}
                            usuarioLog={usuarioLog}
                        />
                    </Box>
                    <Typography>{state.product?.descripcion}</Typography>
                    <CalendarPicker
                        reserveParams={params.id}
                        stateDates={stateDates}
                        setStateDates={setStateDates}
                    />
                    <Grid container>
                        <Grid item>
                            <Button
                                variant="outlined"
                                onClick={() => handleOpenForm()}
                            >
                                Reservar
                            </Button>
                        </Grid>
                        <FormReservar
                            handleOpen={openForm}
                            handleClose={handleCloseForm}
                            producto={state.product}
                            usuario={usuarioLog}
                            stateDates={stateDates}
                            formData={formData}
                        ></FormReservar>
                    </Grid>
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                    <Carousel productoImagenes={productoImagenes} />
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Detalle
