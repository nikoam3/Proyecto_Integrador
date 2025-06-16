import React, { useState } from 'react'
import { Box, Button, Grid, TextField, Typography, IconButton, InputAdornment } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Formik } from 'formik'
import * as yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import { useLogin } from '../../hooks/useLogin'
import Logotype from '../../Components/Common/Logotype'

const Login = () => {
    let navigate = useNavigate()
    const { login, error, isLoading } = useLogin()
    const [showPassword, setShowPassword] = useState(false);

    const handleFormSubmit = async (values) => {
        await login(values.email, values.password)
    }
    const handleClickShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
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
                                'url(https://images.pexels.com/photos/3774606/pexels-photo-3774606.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)',
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
                        <Typography variant={'h4'} mb={2}>
                            Login
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
                                    gap="12px"
                                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                                >
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
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        type={showPassword ? 'text' : 'password'}
                                        label="Password"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.password}
                                        name="password"
                                        error={
                                            !!touched.password &&
                                            !!errors.password
                                        }
                                        helperText={
                                            touched.password && errors.password
                                        }
                                        sx={{ gridColumn: 'span 4' }}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="alternar visibilidad de la contraseña"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                    >
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Box>
                                <Box>
                                    <Typography
                                        variant="caption"
                                        sx={{ gridColumn: 'span 4' }}
                                    >
                                        ¿Todavía no tenés cuenta?
                                        <Link
                                            underline="always"
                                            component="button"
                                            to={'/register'}
                                        >
                                            {' Registrate'}
                                        </Link>
                                    </Typography>
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
                                    >
                                        Iniciar Sesion
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
    email: yup.string().email('correo invalido').required('Campo obligatorio'),
    password: yup.string().required('Campo obligatorio').min(6),
})

const initialValues = {
    email: '',
    password: '',
}

export default Login
