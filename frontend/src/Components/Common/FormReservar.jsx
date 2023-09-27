import React, { useState, useEffect } from 'react'
import {
    Box,
    Button,
    Dialog,
    DialogTitle,
    IconButton,
    InputAdornment,
    TextField
} from '@mui/material'
import axios from 'axios'
import CloseIcon from '@mui/icons-material/Close'
import { useSnackbar } from '../../Context/SnackContext'
import { Formik } from 'formik'
import * as yup from 'yup'
import { config, urlBase } from '../../Utils/constants'
import { publicRoutes } from '../../Utils/routes'
import { useNavigate } from 'react-router-dom'
import format from 'date-fns/format'

const FormReservar = ({
    handleOpen,
    handleClose,
    producto,
    usuario,
    stateDates,
    formData
}) => {
    const scroll = 'paper'
    const { showSnackbar } = useSnackbar()
    const navigate = useNavigate()

    const initialValues = {
        nombreProducto: producto?.nombre,
        descripcion: producto?.descripcion,
        precio: producto?.precio,
        nombreUsuario: `${usuario?.nombre} ${usuario?.apellido}`,
        email: usuario?.email,
        fechaReserva: format(stateDates[0]?.startDate, 'dd-MM-yyyy'),
        fechaEntrega: format(stateDates[0]?.endDate, 'dd-MM-yyyy'),
    }
    const handleFormSubmit = () => {
        axios
            .post(urlBase + 'reservas', formData, config)
            .then((response) => {
                if (response.status === 200) {
                    showSnackbar('Reserva creada con éxito!', 'success')
                    setTimeout(() => {
                        navigate(`/${publicRoutes.historial}`)
                    }, '1000')
                }
            })
            .catch((err) => {
                console.log(err);
                showSnackbar('Algo salío mal, inténtelo nuevamente', 'error')
                setTimeout(() => {
                    setIsLoading(false)
                }, '1000')
            })
    }
    return (
        <>
            <Dialog
                open={handleOpen}
                onClose={handleClose}
                scroll={scroll}>
                <DialogTitle sx={{
                    typography: 'subtitle2',
                    textAlign: 'center',
                    p: 4
                }}>
                    {'Detalle de la reserva'}
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <Formik
                    onSubmit={handleFormSubmit}
                    initialValues={initialValues}
                    validationSchema={checkoutSchema}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleSubmit,
                    }) => (
                        <form onSubmit={handleSubmit}>
                            {/*<DialogContentText>
                                <Typography sx={{
                                    textAlign: 'left',
                                    textDecoration: 'underline',
                                }}>
                                    {'DATOS USUARIO:'}
                                </Typography>
                            </DialogContentText>*/}
                            <Box
                                display="grid"
                                gap="10px"
                                sx={{
                                    '& > :not(style)': { m: 1, width: '40ch' },
                                }}
                            /*gridTemplateColumns="repeat(4, minmax(0, 1fr))"*/
                            >
                                <TextField
                                    type="text"
                                    label="Nombre Usuario"
                                    value={values.nombreUsuario}
                                    name="nombre"
                                    error={!!touched.nombre && !!errors.nombre}
                                    helperText={touched.nombre && errors.nombre}
                                />
                                <TextField
                                    type="email"
                                    label="Email"
                                    value={values.email}
                                    name="email"
                                    error={!!touched.nombre && !!errors.nombre}
                                    helperText={touched.nombre && errors.nombre}
                                />
                                {/*<DialogContentText>
                                    <Typography sx={{
                                        textAlign: 'left',
                                        textDecoration: 'underline',
                                    }}>
                                        {'DATOS PRODUCTOS:'}
                                    </Typography>
                                </DialogContentText>*/}
                                <TextField
                                    type="text"
                                    label="Producto"
                                    value={values.nombreProducto}
                                    name="Producto"
                                    error={!!touched.nombre && !!errors.nombre}
                                    helperText={touched.nombre && errors.nombre}
                                />
                                <TextField
                                    type="number"
                                    label="Precio"
                                    value={values.precio}
                                    name="precio"
                                    error={!!touched.precio && !!errors.precio}
                                    helperText={touched.precio && errors.precio}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                        readOnly: true,
                                    }}
                                />
                                <TextField
                                    type="text"
                                    label="Fecha de retiro"
                                    value={values.fechaReserva}
                                    name="Fecha de retiro"
                                    error={!!touched.precio && !!errors.precio}
                                    helperText={touched.precio && errors.precio}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                                <TextField
                                    type="text"
                                    label="Fecha de devolucion"
                                    value={values.fechaEntrega}
                                    name="Fecha de devolucion"
                                    error={!!touched.precio && !!errors.precio}
                                    helperText={touched.precio && errors.precio}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />

                            </Box>
                            <Box display="flex" justifyContent="end" mt="20px">
                                <Button
                                    type="submit"
                                    color="primary"
                                    variant="contained"
                                    sx={{ m: 1 }}
                                >
                                    RESERVAR
                                </Button>
                            </Box>
                        </form>
                    )}
                </Formik>
            </Dialog>
        </>
    )
}
const checkoutSchema = yup.object().shape({
    nombreUsuario: yup.string().required('Campo obligatorio'),
    email: yup.string().required('Campo obligatorio'),
    precio: yup.string().required('Campo obligatorio'),
    nombreProducto: yup.string().required('Campo obligatorio'),
})

export default FormReservar