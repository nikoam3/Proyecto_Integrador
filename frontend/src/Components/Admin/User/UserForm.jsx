import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    TextField,
    Typography,
} from '@mui/material'
import axios from 'axios'
import { Formik } from 'formik'
import * as yup from 'yup'
import { urlBase } from '../../../Utils/constants'
import { useSnackbar } from '../../../Context/SnackContext'
import { useLoadUsers } from '../../../hooks/Admin/useLoadUsers'
import { useAuthContext } from '../../../hooks/useAuthContext'

const UserForm = ({ handleClose }) => {
    const { showSnackbar } = useSnackbar()
    const { getData } = useLoadUsers()
    const { user } = useAuthContext()
    let config = { headers: { Authorization: `Bearer ${user}` }, }
    config = { headers: { 'Content-Type': 'application/json' } }

    const handleFormSubmit = (values) => {
        const formData = {
            nombre: values.nombre,
            apellido: values.apellido,
            email: values.email,
            password: values.password,
            userRol: values.userRol ? 'ROLE_ADMIN' : 'ROLE_USER',
        }
        axios
            .post(urlBase + 'usuarios', formData, config)
            .then((response) => {
                showSnackbar(
                    `Usuario ${values.nombre} ${values.apellido} creado con exito!`,
                    'success'
                )
                getData()
                handleClose()
            })
            .catch((err) => {
                showSnackbar(`${err.response.data.message}`, 'error')
            })

        /* .then((res) => {
                if (res.status == 200) {
                    showSnackbar(
                        `Usuario ${values.nombre} ${values.apellido} creado con exito!`,
                        'success'
                    )
                    getData()
                    handleClose()
                }
            })
            .catch((error) => {
                console.log(error)
                if (res.status == 400) {
                    showSnackbar(
                        `No se puede registrar, el mail ${values.nombre} ${values.apellido} ya esta en uso!`,
                        'warning'
                    )
                    getData()
                    handleClose()
                }
            }) */
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
                            gap="8px"
                            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                            width={'400px'}
                        >
                            <Typography
                                variant="caption"
                                sx={{ gridColumn: 'span 4' }}
                            >
                                1. Ingresa el Nombre
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
                                error={!!touched.nombre && !!errors.nombre}
                                helperText={touched.nombre && errors.nombre}
                                sx={{ gridColumn: 'span 4' }}
                            />
                            <Typography
                                variant="caption"
                                sx={{ gridColumn: 'span 4' }}
                            >
                                2. Ingresa el Apellido
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
                                error={!!touched.apellido && !!errors.apellido}
                                helperText={touched.apellido && errors.apellido}
                                sx={{ gridColumn: 'span 4' }}
                            />
                            <Typography
                                variant="caption"
                                sx={{ gridColumn: 'span 4' }}
                            >
                                3. Ingresa el Email
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
                                error={!!touched.email && !!errors.email}
                                helperText={touched.email && errors.email}
                                sx={{ gridColumn: 'span 4' }}
                            />
                            <Typography
                                variant="caption"
                                sx={{ gridColumn: 'span 4' }}
                            >
                                4. Ingresa la contraseña (min. 6 caracteres)
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
                                error={!!touched.password && !!errors.password}
                                helperText={touched.password && errors.password}
                                sx={{ gridColumn: 'span 4' }}
                            />
                            <Typography
                                variant="caption"
                                sx={{ gridColumn: 'span 4' }}
                            >
                                5. Confirma la contraseña (deben coincidir)
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
                            <Typography
                                variant="caption"
                                sx={{ gridColumn: 'span 4' }}
                            >
                                6. Asignar Rol
                            </Typography>
                            <FormControlLabel
                                label={'Admin'}
                                control={
                                    <Checkbox
                                        name="userRol"
                                        onChange={handleChange}
                                    />
                                }
                            />
                        </Box>
                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button
                                type="submit"
                                color="primary"
                                variant="contained"
                                sx={{ width: '100%' }}
                            >
                                Crear usuario
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
    apellido: yup.string().required('Campo obligatorio'),
    email: yup.string().email('Email invalido').required('Campo obligatorio'),
    password: yup
        .string()
        .required('Campo obligatorio')
        .min(6, 'Minimo de 6 caracteres'),
    passwordConfirmation: yup
        .string()
        .required('Campo obligatorio')
        .oneOf([yup.ref('password'), null], 'Las contraseñas no coinciden'),
})
const initialValues = {
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    userRol: false,
}

export default UserForm
