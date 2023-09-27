import { Box, Button, TextField } from '@mui/material'
import axios from 'axios'
import { Formik } from 'formik'
import * as yup from 'yup'
import { config, urlBase } from '../../../../Utils/constants'

const CaracteristicasForm = () => {
    const handleFormSubmit = (values) => {
        const formData = {
            titulo: values.titulo,
        }
        axios
            .post(urlBase + 'caracteristicas', formData, config)
            .then((res) => {
                if (res.status == 200) {
                    console.log(res.data)
                }
            })
            .catch(console.log)
        //location.reload()
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
                            minWidth="300px"
                            gridTemplateColumns="repeat(8, minmax(0, 1fr))"
                        >
                            <TextField
                                fullWidth
                                variant="outlined"
                                type="text"
                                label="Titulo"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.titulo}
                                name="titulo"
                                error={!!touched.titulo && !!errors.titulo}
                                helperText={touched.titulo && errors.titulo}
                                sx={{ gridColumn: 'span 8' }}
                            />
                        </Box>
                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button
                                type="submit"
                                color="primary"
                                variant="contained"
                            >
                                Crear categoria
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </Box>
    )
}

const checkoutSchema = yup.object().shape({
    titulo: yup.string().required('Campo obligatorio'),
})
const initialValues = {
    titulo: '',
}

export default CaracteristicasForm
