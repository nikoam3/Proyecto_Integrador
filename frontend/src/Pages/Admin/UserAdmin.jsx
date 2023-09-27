import AddIcon from '@mui/icons-material/Add'
import {
    Box,
    Button,
    Container,
    Stack,
    SvgIcon,
    Typography,
} from '@mui/material'
import { UsersTable } from '../../Components/Admin/User/UsersTable'
import FormModalButton from '../../Components/Admin/FormModalButton'
import UserForm from '../../Components/Admin/User/UserForm'
import { useState } from 'react'

const UserAdmin = () => {
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
                                <Typography variant="h4">Usuarios</Typography>
                            </Stack>
                            <FormModalButton
                                text={'Agregar Usuario'}
                                title={'Informacion del Usuario'}
                                handleClickOpen={handleClickOpen}
                                handleClose={handleClose}
                                open={open}
                            >
                                <UserForm handleClose={handleClose} />
                            </FormModalButton>
                        </Stack>
                        <UsersTable />
                    </Stack>
                </Container>
            </Box>
        </>
    )
}

export default UserAdmin
