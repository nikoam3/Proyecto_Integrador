import { Box, Button, TextField } from '@mui/material'
import axios from 'axios'
import { Formik } from 'formik'
import * as yup from 'yup'
import { urlBase } from '../../../Utils/constants'
import React, { useState, useEffect } from "react";
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import { useSnackbar } from '../../../Context/SnackContext'
import { useAuthContext } from '../../../hooks/useAuthContext'


export default function ProductFormModify({ handleClose, producto }) {
    const { user } = useAuthContext()
    let config = { headers: { Authorization: `Bearer ${user}` }, }
    config = { headers: { 'Content-Type': 'application/json' } }
    const { showSnackbar } = useSnackbar()
    const [categoriasBBDD, setCategoriasBBDD] = useState([])
    const [caracteristicasBBDD, setCaracteristicasBBDD] = useState([])
    const [caracteristicas, setCaracteristicas] = useState([]);

    const handleChangeMultiSelect = (event) => {
        const value = event.target.value
        setCaracteristicas(value)
    };

    useEffect(() => {
        axios
            .get(urlBase + 'categorias')
            .then((res) => setCategoriasBBDD(res.data))
        axios
            .get(urlBase + 'caracteristicas')
            .then((res) => setCaracteristicasBBDD(res.data))
    }, [])

    const handleFormSubmit = (values) => {
        const formData = {
            nombre: values.nombre,
            descripcion: values.descripcion,
            precio: values.precio,
            categoria: { "id": values.categoria },
            caracteristicas: caracteristicas.length > 0 ? caracteristicas.map((caracteristica) => ({ "id": caracteristica })) : null,
        }
        axios
            .put(urlBase + 'productos/' + producto.id, formData, config)
            .then((res) => {
                showSnackbar(
                    `Producto ${values.nombre} modificado con exito!`,
                    'success')
                handleClose()
            })
            .catch((err) => {
                showSnackbar(`${err.response.data.message}`, 'warning')
            })
    }

    return (
        <Box m="20px">
            <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={checkoutSchema}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                }) => (
                    <form onSubmit={handleSubmit}>
                        <Box
                            display="grid"
                            gap="30px"
                            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                        >
                            <TextField
                                fullWidth
                                variant="outlined"
                                type="text"
                                /*label="Nombre"*/
                                label={producto.nombre}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.nombre}
                                name="nombre"
                                error={!!touched.nombre && !!errors.nombre}
                                helperText={touched.nombre && errors.nombre}
                                sx={{ gridColumn: 'span 5' }}

                            />
                            <TextField
                                fullWidth
                                variant="outlined"
                                type="text"
                                /*label="Descripción"*/
                                label={producto.descripcion}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.descripcion}
                                name="descripcion"
                                error={!!touched.descripcion && !!errors.descripcion}
                                helperText={touched.descripcion && errors.descripcion}
                                sx={{ gridColumn: 'span 5' }}
                            />
                            <TextField
                                fullWidth
                                variant="outlined"
                                type="number"
                                /*label="Precio"*/
                                label={producto.precio}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.precio}
                                name="precio"
                                error={!!touched.precio && !!errors.precio}
                                helperText={touched.precio && errors.precio}
                                sx={{ gridColumn: 'span 5' }}
                            />
                            <TextField
                                select
                                fullWidth
                                value={values.categoria}
                                name="categoria"
                                sx={{ gridColumn: 'span 5' }}
                                onChange={handleChange}
                                defaultValue=""
                                label={producto.categoria.titulo}
                            >
                                {categoriasBBDD.map((categoria) => (
                                    <MenuItem key={categoria.id} value={categoria.id}>
                                        {categoria.titulo}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                select
                                fullWidth
                                value={caracteristicas}
                                name="caracteristicas"
                                sx={{ gridColumn: 'span 5' }}
                                onChange={handleChangeMultiSelect}
                                label={producto.caracteristicas.map((caracteristica) => (`${caracteristica.titulo},`))}
                                SelectProps={{ multiple: true }}
                                defaultValue=""
                            >
                                {caracteristicasBBDD.map((caracteristica) => (
                                    <MenuItem key={caracteristica.id} value={caracteristica.id}>
                                        <Checkbox checked={caracteristicas.indexOf(caracteristica.id) > -1} />
                                        {caracteristica.titulo}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Box>
                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button
                                type="submit"
                                color="primary"
                                variant="contained"
                            >
                                Modificar producto
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </Box>
    )
}
const checkoutSchema = yup.object().shape({
    nombre: yup.string().required('Campo obligatorio'),
    descripcion: yup.string().required('Campo obligatorio'),
    precio: yup.string().required('Campo obligatorio'),
    categoria: yup.string().required('Campo obligatorio'),
    /*caracteristicas: yup.string().required('Campo obligatorio'),*/
})
const initialValues = {
    nombre: '',
    descripcion: '',
    precio: '',
    categoria: '',
    caracteristicas: '',
}
