import {
    Box,
    CardActionArea,
    Container,
    Stack,
    Typography,
} from '@mui/material'
import Categories from '../../Components/Admin/Settings/Categories/Categories'
import Caracteristicas from '../../Components/Admin/Settings/Caracteristicas/Caracteristicas'
const SettingsAdmin = () => {
    return (
        <>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8,
                }}
            >
                <Container maxWidth="xl">
                    <Stack spacing={3}>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            spacing={4}
                        >
                            <Stack spacing={1}>
                                <Typography variant="h4">
                                    Configuracion
                                </Typography>
                            </Stack>
                        </Stack>
                        <Stack direction="row" spacing={4}>
                            <Stack spacing={1}>
                                <Typography variant="h5">Categorias</Typography>
                                <Categories />
                            </Stack>
                            <Stack spacing={1}>
                                <Typography variant="h5">
                                    Caracteristicas
                                </Typography>
                                <Caracteristicas />
                            </Stack>
                        </Stack>
                    </Stack>
                </Container>
            </Box>
        </>
    )
}

export default SettingsAdmin
