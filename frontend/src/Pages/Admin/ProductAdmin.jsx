import GetAppIcon from '@mui/icons-material/GetApp'
import PublishIcon from '@mui/icons-material/Publish'
import AddIcon from '@mui/icons-material/Add'
import {
    Box,
    Button,
    Container,
    Stack,
    SvgIcon,
    Typography,
} from '@mui/material'
import { ProductsTable } from '../../Components/Admin/Product/ProductsTable'
import ProductForm from '../../Components/Admin/Product/ProductForm'
import FormModalButton from '../../Components/Admin/FormModalButton'
import { useState } from 'react'

const ProductAdmin = () => {
    const [open, setOpen] = useState(false)

    const handleClose = () => {
        setOpen(false)
    }
    const handleClickOpen = () => {
        setOpen(true)
    }
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
                                <Typography variant="h4">Productos</Typography>
                            </Stack>
                            {/*<div>
                            <ProductFromDialog />
                                    </div>*/}
                            <FormModalButton
                                text={'Agregar producto'}
                                title={'Informacion del producto'}
                                handleClickOpen={handleClickOpen}
                                handleClose={handleClose}
                                open={open}
                            >
                                <ProductForm handleClose={handleClose} />
                            </FormModalButton>
                        </Stack>
                        <ProductsTable />
                    </Stack>
                </Container>
            </Box>
        </>
    )
}

export default ProductAdmin
