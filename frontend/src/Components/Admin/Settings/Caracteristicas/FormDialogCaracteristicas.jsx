import * as React from 'react'

import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'

import { Chip } from '@mui/material'
import CaracteristicasForm from './CaracteristicasForm'

export default function FormDialogCaracteristicas() {
    const [open, setOpen] = React.useState(false)

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <>
            <Chip
                label={'Agregar'}
                variant="filled"
                onClick={handleClickOpen}
                color="primary"
            />
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Agregar Caracteristica</DialogTitle>
                <CaracteristicasForm />
            </Dialog>
        </>
    )
}
