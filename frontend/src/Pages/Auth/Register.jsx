import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import Logotype from '../../Components/Common/Logotype'
import { publicRoutes } from '../../Utils/routes'
import axios from 'axios'
import { Formik } from 'formik'
import * as yup from 'yup'
import { config, urlBase } from '../../Utils/constants'
import { useSignup } from '../../hooks/useSignup'
import { Link } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress'
import Checkbox from '@mui/material/Checkbox'
import React, { useState } from 'react'
import { Scrollbar } from '../../Components/Common/Scrollbar'
import Terminos_Condiciones from './Terminos_Condiciones'

const Register = () => {
    const { signUp, error, isLoading } = useSignup()
    const [checked, setChecked] = useState(false)
    const [openTyC, setOpenTyC] = useState(false)
    const scroll = ''

    const handleChangeCheck = (event) => {
        setChecked(event.target.checked)
    }

    const handleOpenTyC = () => {
        setOpenTyC(true)
    }

    const handleCloseTyC = () => {
        setOpenTyC(false)
    }

    const handleFormSubmit = async (values) => {
        await signUp(
            values.nombre,
            values.apellido,
            values.email,
            values.password
        )
    }
    return (
        <Grid
            container
            flex
            alignItems={'stretch'}
            maxHeight={'100vh'}
            scroll={scroll}
        >
            <Grid item xs={0} sm={4} md={6} lg={8}>
                <Link to={'/home'}>
                    <Grid
                        item
                        sx={{
                            height: '100vh',
                            backgroundImage:
                                'url(https://images.pexels.com/photos/34221/violin-musical-instrument-music-sound.jpg)',
                            backgroundPosition: '50% 50%',
                            backgroundSize: 'cover',
                        }}
                    ></Grid>
                </Link>
            </Grid>
            <Grid
                item
                xs={12}
                sm={8}
                md={6}
                lg={4}
                sx={{
                    display: 'flex',
                    width: '100%',
                    pt: 3,
                }}
            >
                <Box
                    width={'100%'}
                    px={{ xs: 2, sm: 3, md: 2 }}
                    alignContent={'center'}
                    justifyContent={'center'}
                >
                    <Box height={'10%'} mb={3}>
                        <Logotype />
                    </Box>
                    <Box mb={2}>
                        <Typography variant={'h4'} mb={1}>
                            Hola, Bienvenido!
                        </Typography>
                        <Typography variant={'body'} color={'neutral.900'}>
                            Completa los campos para crear tu cuenta.
                        </Typography>
                    </Box>
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
                                    gap="8px"
                                    gridTemplateColumns="repeat(1, minmax(0, 1fr))"
                                    width={'100%'}
                                >
                                    <Typography
                                        variant="caption"
                                        sx={{ gridColumn: 'span 4' }}
                                    >
                                        1. Tu nombre
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        type="text"
                                        label="Nombre"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.nombre}
                                        name="nombre"
                                        error={
                                            !!touched.nombre && !!errors.nombre
                                        }
                                        helperText={
                                            touched.nombre && errors.nombre
                                        }
                                        sx={{ gridColumn: 'span 4' }}
                                    />
                                    <Typography
                                        variant="caption"
                                        sx={{ gridColumn: 'span 4' }}
                                    >
                                        2. Tu apellido
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        type="text"
                                        label="Apellido"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.apellido}
                                        name="apellido"
                                        error={
                                            !!touched.apellido &&
                                            !!errors.apellido
                                        }
                                        helperText={
                                            touched.apellido && errors.apellido
                                        }
                                        sx={{ gridColumn: 'span 4' }}
                                    />
                                    <Typography
                                        variant="caption"
                                        sx={{ gridColumn: 'span 4' }}
                                    >
                                        3. Email
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        type="text"
                                        label="Email"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.email}
                                        name="email"
                                        error={
                                            !!touched.email && !!errors.email
                                        }
                                        helperText={
                                            touched.email && errors.email
                                        }
                                        sx={{ gridColumn: 'span 4' }}
                                    />
                                    <Typography
                                        variant="caption"
                                        sx={{ gridColumn: 'span 4' }}
                                    >
                                        4. Contraseña
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        type="password"
                                        label="Contraseña"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.password}
                                        name="password"
                                        autoComplete="on"
                                        error={
                                            !!touched.password &&
                                            !!errors.password
                                        }
                                        helperText={
                                            touched.password && errors.password
                                        }
                                        sx={{ gridColumn: 'span 4' }}
                                    />
                                    <Typography
                                        variant="caption"
                                        sx={{ gridColumn: 'span 4' }}
                                    >
                                        5. Confirma la contraseña (deben
                                        coincidir)
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        type="password"
                                        label="Confirmar contraseña"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.passwordConfirmation}
                                        name="passwordConfirmation"
                                        autoComplete="on"
                                        error={
                                            !!touched.passwordConfirmation &&
                                            !!errors.passwordConfirmation
                                        }
                                        helperText={
                                            touched.passwordConfirmation &&
                                            errors.passwordConfirmation
                                        }
                                        sx={{ gridColumn: 'span 4' }}
                                    />
                                    <Box>
                                        <Checkbox
                                            checked={checked}
                                            onChange={handleChangeCheck}
                                            error={
                                                !!touched.checkboxx &&
                                                !!errors.checkboxx
                                            }
                                            helperText={
                                                touched.checkboxx &&
                                                errors.checkboxx
                                            }
                                        />
                                        <Typography
                                            variant="caption"
                                            sx={{ gridColumn: 'span 4' }}
                                        >
                                            Acepto
                                            <Link
                                                underline="always"
                                                component="button"
                                                onClick={() => handleOpenTyC()}
                                            >
                                                {' términos y condiciones'}
                                            </Link>
                                        </Typography>
                                    </Box>
                                    <Terminos_Condiciones
                                        handleOpen={openTyC}
                                        handleClose={handleCloseTyC}
                                    ></Terminos_Condiciones>
                                </Box>
                                <Box
                                    display="flex"
                                    justifyContent="end"
                                    mt="20px"
                                >
                                    <Button
                                        type="submit"
                                        color="primary"
                                        variant="contained"
                                        disabled={isLoading}
                                        sx={{ width: '100%' }}
                                    >
                                        {isLoading ? (
                                            <CircularProgress size={20} />
                                        ) : (
                                            'Registrate'
                                        )}
                                    </Button>
                                </Box>
                            </form>
                        )}
                    </Formik>
                </Box>
            </Grid>
        </Grid>
    )
}

const checkoutSchema = yup.object().shape({
    nombre: yup.string().required('Campo obligatorio'),
    apellido: yup.string().required('Campo obligatorio'),
    email: yup.string().email('correo invalido').required('Campo obligatorio'),
    password: yup.string().required('Campo obligatorio').min(6),
    passwordConfirmation: yup
        .string()
        .required('Campo obligatorio')
        .oneOf([yup.ref('password'), null], 'Las contraseñas deben coincidir'),
    checkboxx: yup.boolean().oneOf([false], 'Campo obligatorio'),
})

const initialValues = {
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    passwordConfirmation: '',
}

export default Register
